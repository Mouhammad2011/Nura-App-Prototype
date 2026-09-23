/** Firebase Functions v2 adapter: deploy separately from the static UI.
 * npm i firebase-functions firebase-admin
 * firebase functions:secrets:set GROQ_API_KEY
 */
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) initializeApp();
const groqKey = defineSecret('GROQ_API_KEY');
const modes = new Set(['Chat', 'Search', 'Deep Search', 'Quiz', 'Library']);

async function authenticate(request) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('Unauthenticated');
  return getAuth().verifyIdToken(token);
}

async function wikipediaSources(query) {
  const endpoint = new URL('https://en.wikipedia.org/w/api.php');
  endpoint.search = new URLSearchParams({ action:'query', list:'search', srsearch:query, srlimit:'4', format:'json', origin:'*' });
  const response = await fetch(endpoint);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.query?.search || []).map(item => ({ title:`Wikipedia: ${item.title}`, url:`https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replaceAll(' ', '_'))}` }));
}

function systemFor(mode) {
  const base = 'You are NuraMind, a concise focus and study companion. Never give medical diagnosis. Return valid JSON only.';
  if (mode === 'Quiz') return `${base} Generate the quiz requested by the user about their stated topic. Do not default to any prior topic. Return {"quiz":{"question":"...","choices":["..."],"answer":"...","explanation":"...","topic":"..."},"text":"..."}. Generate only one question at a time.`;
  if (mode === 'Deep Search') return `${base} Give a balanced, short research synthesis. Your external references are supplied separately by the server; do not fabricate citations. Return {"text":"..."}.`;
  if (mode === 'Library') return `${base} Classify each music title into a concise, useful folder. Return {"text":"...","categories":["folder for title 1","folder for title 2"]}. Keep categories in the same order as the supplied titles.`;
  return `${base} Answer directly, vary your phrasing, and return {"text":"..."}.`;
}

export const nuraMind = onRequest({ cors:true, secrets:[groqKey], timeoutSeconds:45 }, async (request, response) => {
  if (request.method !== 'POST') return response.status(405).json({ error:'POST required' });
  try {
    await authenticate(request);
    const { prompt, mode='Chat', conversation=[] } = request.body || {};
    if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 6000 || !modes.has(mode)) return response.status(400).json({ error:'Invalid request' });
    const payload = { model:'llama-3.3-70b-versatile', temperature:0.55, response_format:{ type:'json_object' }, messages:[{ role:'system', content:systemFor(mode) }, ...conversation.slice(-12).map(m=>({ role:m.role==='ai'?'assistant':'user', content:String(m.text).slice(0,6000) })), { role:'user', content:prompt }] };
    const groq = await fetch('https://api.groq.com/openai/v1/chat/completions', { method:'POST', headers:{ Authorization:`Bearer ${groqKey.value()}`, 'Content-Type':'application/json' }, body:JSON.stringify(payload) });
    if (!groq.ok) throw new Error(`Groq ${groq.status}`);
    const data = await groq.json();
    const answer = JSON.parse(data.choices?.[0]?.message?.content || '{}');
    if (typeof answer.text !== 'string' && !answer.quiz && !Array.isArray(answer.categories)) throw new Error('Invalid model payload');
    const sources = mode === 'Deep Search' ? await wikipediaSources(prompt) : [];
    return response.json({ text:answer.text || answer.quiz?.question || '', quiz:answer.quiz || null, categories:Array.isArray(answer.categories) ? answer.categories : null, sources });
  } catch (error) {
    const code = error.message === 'Unauthenticated' ? 401 : 502;
    return response.status(code).json({ error:'NuraMind request failed' });
  }
});
