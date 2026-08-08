
(function(){
'use strict';

/* ═══════════════════════════════════════
   V9.1 — DYNAMIC GREETING
   Reads hour and sets contextual greeting
   ═══════════════════════════════════════ */
function checkGreeting(){
  const h = new Date().getHours();
  let msg = '';
  if(h >= 2 && h < 5)        msg = "Last-minute fix? Hop in and finish it.";
  else if(h >= 5 && h < 7)   msg = "Early bird grind — respect. Let's go.";
  else if(h >= 7 && h < 10)  msg = "Morning session activated. Sharp mind incoming.";
  else if(h >= 10 && h < 12) msg = "Peak focus window. Make it count.";
  else if(h >= 12 && h < 14) msg = "Post-lunch? Power through — you've got this.";
  else if(h >= 14 && h < 17) msg = "Afternoon flow — the grind never stops.";
  else if(h >= 17 && h < 20) msg = "Evening session. Quiet hours = best hours.";
  else if(h >= 20 && h < 23) msg = "Night owl mode engaged. Focus up.";
  else                        msg = "Midnight? You're dedicated. Let's work.";

  // Inject greeting bar into dashboard page-header area
  const ph = document.querySelector('#dashboard .page-header');
  if(ph){
    let gb = document.getElementById('nura-greeting-bar');
    if(!gb){
      gb = document.createElement('div');
      gb.id = 'nura-greeting-bar';
      ph.querySelector('.page-sub')?.after(gb);
    }
    gb.textContent = msg;
  }
}

/* ═══════════════════════════════════════
   V9.2 — MUSIC ENGINE FIX
   Hard-coded shuffle + repeat logic
   In-flow mini bar (CSS handles positioning)
   ═══════════════════════════════════════ */

/* Override the ended handler for bulletproof repeat */
function v9_hookMusicEnded(){
  if(typeof musicAudio === 'undefined') return;
  // Remove all existing 'ended' listeners by cloning
  const newAudio = musicAudio;
  // We hook with a capturing listener at highest priority
  newAudio.addEventListener('ended', function v9EndedHandler(){
    /* musicRepeat: 0=none,1=all,2=one */
    if(window.musicRepeat === 2){
      // Repeat ONE: re-trigger current track from start
      newAudio.currentTime = 0;
      newAudio.play().catch(()=>{});
    } else if(window.musicRepeat === 1){
      // Repeat ALL: go to next (wraps around)
      if(window.musicShuffle){
        const next = Math.floor(Math.random() * window.musicLibrary.length);
        window.playMusicTrack(next);
      } else {
        const next = (window.currentTrackIdx + 1) % window.musicLibrary.length;
        window.playMusicTrack(next);
      }
    } else {
      // No repeat: shuffle or linear next, stop at end
      if(window.musicShuffle){
        const next = Math.floor(Math.random() * window.musicLibrary.length);
        window.playMusicTrack(next);
      } else {
        const next = window.currentTrackIdx + 1;
        if(next < window.musicLibrary.length){
          window.playMusicTrack(next);
        } else {
          // End of library — stop
          window.musicPlaying = false;
          window.updateMusicPlayIcons && window.updateMusicPlayIcons();
        }
      }
    }
  }, true); // capture = true, fires before existing handlers
}

/* Override cycleMusicRepeat to also update badge & aria */
/* Inject close button into mini music bar */
function v9_injectMiniBarClose(){
  const bar = document.getElementById('mini-music-bar');
  if(!bar || bar.querySelector('#mini-music-close')) return;
  const closeBtn = document.createElement('button');
  closeBtn.id = 'mini-music-close';
  closeBtn.title = 'Close player';
  closeBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  closeBtn.onclick = function(){
    window.killMusicPlayer && window.killMusicPlayer();
    bar.style.display = 'none';
  };
  bar.appendChild(closeBtn);
}

/* Move mini bar into .app flow (below .main) */
function v9_moveMiniBar(){
  const app = document.getElementById('app-root');
  const bar = document.getElementById('mini-music-bar');
  if(!app || !bar) return;
  // Move bar to end of app
  if(bar.parentNode !== app) app.appendChild(bar);
}

/* ═══════════════════════════════════════
   V9.3 — SMART LIGHT OVERRIDE
   updateLightingMode() clears SmartLight if custom colour is active
   ═══════════════════════════════════════ */
window.updateLightingMode = function(){
  const isCustom = (window.currentLightModeType === 'custom') ||
                   (document.getElementById('dash-colour-wheel-panel') &&
                    document.getElementById('dash-colour-wheel-panel').style.display !== 'none');
  if(isCustom){
    // Disable SmartLight completely when custom colour is active
    window.smartLightEnabled = false;
    if(window._smartLightInterval){
      clearInterval(window._smartLightInterval);
      window._smartLightInterval = null;
    }
    if(window.SmartLight === true) window.SmartLight = false;
  }
};

/* Hook into setLightModeType to call updateLightingMode */
window.addEventListener('load', function(){
  const orig = window.setLightModeType;
  if(typeof orig === 'function'){
    window.setLightModeType = function(type){
      window.currentLightModeType = type;
      orig(type);
      window.updateLightingMode();
    };
  }
});

/* ═══════════════════════════════════════
   V9.4 — QUIZ VALIDATION
   Replace alert() with custom error div
   ═══════════════════════════════════════ */
const QUIZ_ERROR_MSGS = [
  "Sorry, we still don't support geniuses — but we can take up to 20.",
  "20 questions is the limit. Even Einstein started small.",
  "Easy there, professor. Max is 20. That's plenty.",
  "Woah, ambitious! Nura caps at 20. Quality over quantity.",
  "We checked — your brain can only handle 20. Cap reached.",
  "The quiz council has decided: 20 max. Final answer.",
  "Beyond 20? That's just showing off. We support up to 20.",
  "Nura AI is smart, but we draw the line at 20 questions.",
  "Loading infinite questions... just kidding. 20 max.",
  "If knowledge is power, 20 questions is already a lot of power."
];
let _quizErrIdx = 0;

function showQuizError(msg){
  let errEl = document.getElementById('quiz-error-msg');
  if(!errEl){
    errEl = document.createElement('div');
    errEl.id = 'quiz-error-msg';
    const promptArea = document.querySelector('.quiz-prompt-area');
    if(promptArea) promptArea.appendChild(errEl);
  }
  errEl.textContent = msg || QUIZ_ERROR_MSGS[_quizErrIdx++ % QUIZ_ERROR_MSGS.length];
  errEl.classList.add('visible');
  clearTimeout(errEl._hideTimer);
  errEl._hideTimer = setTimeout(()=> errEl.classList.remove('visible'), 4500);
}
window.showQuizError = showQuizError;

/* Override generateQuiz to use custom input + validation */
function v9_patchQuiz(){
  const orig = window.generateQuiz;
  window.generateQuiz = async function(){
    // Hide previous error
    const errEl = document.getElementById('quiz-error-msg');
    if(errEl) errEl.classList.remove('visible');

    // Read count from the new number input (v9) or fallback to select
    let countEl = document.getElementById('quiz-count-input');
    let count;
    if(countEl){
      count = parseInt(countEl.value,10);
      if(isNaN(count) || count < 1) count = 5;
      if(count > 20){
        showQuizError(QUIZ_ERROR_MSGS[_quizErrIdx++ % QUIZ_ERROR_MSGS.length]);
        return;
      }
    } else {
      count = parseInt((document.getElementById('quiz-count-select') || {}).value || '10', 10);
    }

    const topic = document.getElementById('quiz-topic-input')?.value.trim();
    if(!topic){ window.playUiSound && window.playUiSound('tick'); document.getElementById('quiz-topic-input')?.focus(); return; }
    if(!window.getApiKey || !window.getApiKey()){ showQuizError('Set your Groq API key in Profile first.'); return; }

    document.getElementById('quiz-area').style.display='none';
    document.getElementById('quiz-results-area').style.display='none';
    document.getElementById('quiz-loading').style.display='block';
    window.playUiSound && window.playUiSound('open');

    const systemPrompt=`You are a quiz generator. Generate exactly ${count} multiple-choice quiz questions about: ${topic}.\n\nReturn ONLY valid JSON array, no other text, no markdown:\n[\n  {\n    "q": "Question text here?",\n    "opts": ["Option A","Option B","Option C","Option D"],\n    "ans": 0,\n    "exp": "Brief explanation of the correct answer."\n  }\n]\n\nThe "ans" field is the index (0-3) of the correct option in "opts".\nMake questions educational, varied in difficulty, and accurate.`;

    try{
      const res=await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+window.getApiKey()},
        body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:2000,messages:[{role:'user',content:systemPrompt}]})
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error.message);
      let raw=data.choices[0].message.content.trim();
      raw=raw.replace(/```json|```/g,'').trim();
      window.quizData=JSON.parse(raw);
      window.quizIdx=0; window.quizScore=0; window.quizAnswered=false;
      document.getElementById('quiz-loading').style.display='none';
      document.getElementById('quiz-area').style.display='block';
      document.getElementById('quiz-q-total').textContent=window.quizData.length;
      window.showQuizQuestion && window.showQuizQuestion();
      window.playUiSound && window.playUiSound('confirm');
    }catch(e){
      document.getElementById('quiz-loading').style.display='none';
      document.getElementById('quiz-area').style.display='block';
      document.getElementById('quiz-question-text').textContent='Error generating quiz: '+e.message;
      document.getElementById('quiz-options').innerHTML='';
    }
  };
}

/* Swap quiz count SELECT → number INPUT */
function v9_upgradeQuizCountInput(){
  const sel = document.getElementById('quiz-count-select');
  if(!sel || document.getElementById('quiz-count-input')) return;
  const wrap = sel.parentElement;
  const inp = document.createElement('input');
  inp.type = 'number';
  inp.id = 'quiz-count-input';
  inp.className = 'modal-input';
  inp.min = '1';
  inp.max = '20';
  inp.value = '10';
  inp.placeholder = '1–20';
  inp.style.cssText = 'font-size:12px;padding:8px 12px;width:100px;';
  inp.addEventListener('input', ()=>{
    const v = parseInt(inp.value,10);
    if(!isNaN(v) && v > 20){
      showQuizError(QUIZ_ERROR_MSGS[_quizErrIdx++ % QUIZ_ERROR_MSGS.length]);
    } else {
      const errEl = document.getElementById('quiz-error-msg');
      if(errEl) errEl.classList.remove('visible');
    }
  });
  sel.replaceWith(inp);
}

/* ═══════════════════════════════════════
   V9.8 — NURA MIND MODES: Deep Search / Chat
   Injects mode switcher into tutor topbar
   ═══════════════════════════════════════ */
let _nuraMindMode = 'chat'; // 'chat' | 'research'

function v9_injectNuraMindModes(){
  const topbar = document.querySelector('.tutor-topbar');
  if(!topbar || document.getElementById('nura-mode-switcher')) return;

  const switcher = document.createElement('div');
  switcher.id = 'nura-mode-switcher';
  switcher.style.cssText = 'display:flex;align-items:center;margin-left:8px;position:relative;';
  switcher.innerHTML = `
    <button id="nura-model-dropdown-btn" onclick="toggleModelDropdown(event)" style="display:flex;align-items:center;gap:7px;background:var(--bg3);border:1px solid var(--glass-border);color:var(--text);font-family:'Outfit',sans-serif;font-size:12px;font-weight:500;padding:6px 12px;border-radius:9px;cursor:pointer;transition:all .2s;white-space:nowrap">
      <span id="nura-model-label">Nura Flow 1.0</span>
      <svg id="nura-model-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="transition:transform .2s"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div id="nura-model-dropdown" style="display:none;position:absolute;top:calc(100% + 6px);left:0;background:var(--bg2);border:1px solid var(--glass-border);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);z-index:500;min-width:220px;overflow:hidden;animation:loginIn .18s cubic-bezier(.2,.9,.25,1)">
      <div onclick="v9SetNuraMode('chat')" id="nura-tab-chat" style="padding:10px 14px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .15s" class="model-opt active-model" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background=''">
        <div style="width:28px;height:28px;border-radius:8px;background:rgba(var(--accent-rgb),.1);border:1px solid rgba(var(--accent-rgb),.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <div><div style="font-size:12px;font-weight:600;color:var(--text)">Nura Flow 1.0</div><div style="font-size:10px;color:var(--text3)">Conversational · Socratic teaching</div></div>
      </div>
      <div onclick="v9SetNuraMode('research')" id="nura-tab-research" style="padding:10px 14px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .15s" class="model-opt" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background=''">
        <div style="width:28px;height:28px;border-radius:8px;background:rgba(var(--accent-rgb),.1);border:1px solid rgba(var(--accent-rgb),.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <div><div style="font-size:12px;font-weight:600;color:var(--text)">Nura Quest 1.0</div><div style="font-size:10px;color:var(--text3)">Deep research · Cited sources</div></div>
      </div>
      <div id="nura-tab-code" style="padding:10px 14px;display:flex;align-items:center;gap:10px;position:relative" class="model-opt">
        <div style="width:28px;height:28px;border-radius:8px;background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
        <div><div style="font-size:12px;font-weight:600;color:var(--text)">Neuro Code 1.0 <span style="font-size:9px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.3);color:#c084fc;padding:1px 6px;border-radius:100px;margin-left:4px">PRO</span></div><div style="font-size:10px;color:var(--text3)">AI coding assistant · File output</div></div>
      </div>
    </div>
  `;
  // Insert after the Files toggle button
  const filesBtn = topbar.querySelector('#fsp-toggle-btn');
  if(filesBtn) filesBtn.after(switcher);
  else topbar.prepend(switcher);

  // Click outside closes dropdown
  document.addEventListener('click', function(e){
    const dd = document.getElementById('nura-model-dropdown');
    const btn = document.getElementById('nura-model-dropdown-btn');
    if(dd && btn && !btn.contains(e.target) && !dd.contains(e.target)){
      dd.style.display = 'none';
      const arrow = document.getElementById('nura-model-arrow');
      if(arrow) arrow.style.transform = 'rotate(0deg)';
    }
  });

  window.toggleModelDropdown = function(e){
    e && e.stopPropagation();
    const dd = document.getElementById('nura-model-dropdown');
    const arrow = document.getElementById('nura-model-arrow');
    const open = dd.style.display === 'block';
    dd.style.display = open ? 'none' : 'block';
    if(arrow) arrow.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
  };

  window.v9SetNuraMode = function(mode){
    // Pro gate for Neuro Code
    if(mode === 'code'){
      const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
      if(p.plan !== 'pro'){
        nuraDialog && nuraDialog({title:'Neuro Code — Pro Only',body:'Upgrade to Nura NeuroMind to unlock the AI coding assistant with file output.',icon:'info',confirmText:'Upgrade',cancelText:'Maybe later'}).then(r=>{ if(r) { closeSettingsModal && closeSettingsModal(); handleUpgradeClick && handleUpgradeClick(); } });
        return;
      }
    }
    _nuraMindMode = mode;
    // Update dropdown label
    const labels = {chat:'Nura Flow 1.0', research:'Nura Quest 1.0', code:'Neuro Code 1.0'};
    const lbl = document.getElementById('nura-model-label');
    if(lbl) lbl.textContent = labels[mode] || 'Nura Flow 1.0';
    // Close dropdown
    const dd = document.getElementById('nura-model-dropdown');
    if(dd) dd.style.display = 'none';
    const arrow = document.getElementById('nura-model-arrow');
    if(arrow) arrow.style.transform = 'rotate(0deg)';
    // Highlight active option
    document.querySelectorAll('.model-opt').forEach(el => el.style.background = '');
    const activeEl = document.getElementById('nura-tab-'+mode);
    if(activeEl) activeEl.style.background = 'var(--accent-glow)';
    // Update mode tag
    const modeTag = topbar.querySelector('.mode-tag');
    const tags = {chat:'<div class="mode-dot"></div>NURA FLOW · SOCRATIC', research:'<div class="mode-dot"></div>NURA QUEST · DEEP RESEARCH', code:'<div class="mode-dot"></div>NEURO CODE · AI DEVELOPER'};
    if(modeTag) modeTag.innerHTML = tags[mode] || tags.chat;
    // Wire code mode onclick
    if(mode !== 'code') {
      const codeEl = document.getElementById('nura-tab-code');
      if(codeEl) codeEl.onclick = ()=>v9SetNuraMode('code');
    }
    window.playUiSound && window.playUiSound('switch');
    window.updateSourcesBtn && window.updateSourcesBtn();
  };

  // Export mode for sendMsg to use
  window.getNuraMindMode = () => _nuraMindMode;
}

/* Override sendMsg to support modes with source chips */
function v9_patchSendMsg(){
  const orig = window.sendMsg;
  if(!orig) return;
  window._v9_origSendMsg = orig;
  window.sendMsg = async function(){
    const mode = window.getNuraMindMode ? window.getNuraMindMode() : 'chat';

    if(mode === 'chat'){
      // Use original Socratic handler
      return orig();
    }

    // NEURO CODE MODE
    if(mode === 'code'){
      const codeInput = document.getElementById('chat-input');
      const codeText = codeInput?.value.trim();
      if(!codeText) return;
      let codeKey = getApiKey();
      if(!codeKey && typeof window._fetchConfigKey === 'function'){
        // Config key may not have loaded yet — fetch it live instead of failing immediately
        await window._fetchConfigKey();
        codeKey = getApiKey();
      }
      if(!codeKey){ v9_addChatMsg('ai','Neuro Code is unavailable — no API key configured. Contact support.'); return; }
      document.getElementById('chat-welcome-screen')?.remove();
      v9_addChatMsg('user', codeText, false);
      chatHistory.push({role:'user', content:codeText});
      saveChatHistory(chatHistory);
      codeInput.value = '';
      window.playUiSound && window.playUiSound('tick');
      const codeTypingId = 'code-typing-'+Date.now();
      v9_addChatMsg('ai','<span id="'+codeTypingId+'"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="animation:spin 1s linear infinite"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg> Neuro Code is writing your file…</span>', 'html');
      try{
        const sysPr = 'You are Neuro Code 1.0, an expert AI coding assistant. Write ONLY the complete code — no explanations, no markdown backticks, no preamble. Just the raw code starting immediately. Max 50000 characters.';
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{
          method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+codeKey},
          body:JSON.stringify({model:'llama-3.3-70b-versatile', max_tokens:4000, messages:[{role:'system',content:sysPr},{role:'user',content:codeText}]})
        });
        const d = await res.json();
        document.getElementById(codeTypingId)?.closest('.msg')?.remove();
        if(d.error){
          v9_addChatMsg('ai', 'Neuro Code API error: '+(d.error.message||JSON.stringify(d.error))+'<br><span style="font-size:10px;color:var(--text3)">Check that the API key is valid.</span>', 'html');
          return;
        }
        const code = (d.choices?.[0]?.message?.content||'').substring(0,50000);
        if(!code){
          v9_addChatMsg('ai', 'Neuro Code returned an empty response. Please try again or rephrase your request.', false);
          return;
        }
        // Detect extension
        const ext = /<!DOCTYPE|<html/i.test(code)?'html':/^<\?php/.test(code.trim())?'php':/^(import |from |def |class )/m.test(code)?'py':/^(const |let |function |class )/m.test(code)?'js':/^#include/m.test(code)?'cpp':'txt';
        const fname = 'neuro-code-'+Date.now()+'.'+ext;
        const blob = new Blob([code],{type:'text/plain'});
        const blobUrl = URL.createObjectURL(blob);
        // Generate a human description of what was built
        let descResp = '';
        try{
          const descR = await fetch('https://api.groq.com/openai/v1/chat/completions',{
            method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+codeKey},
            body:JSON.stringify({model:'llama3-8b-8192', max_tokens:120, messages:[{role:'user',content:'In 2-3 sentences, describe what this code does without showing any code: '+code.substring(0,800)}]})
          });
          const descD = await descR.json();
          descResp = descD.choices?.[0]?.message?.content?.trim() || '';
        }catch(e){}
        const desc = descResp || 'Your file is ready to download.';
        v9_addChatMsg('ai',
          '<p style="margin:0 0 12px;line-height:1.65">'+desc+'</p>'+
          '<div style="display:flex;align-items:center;gap:12px;background:var(--bg3);border:1px solid var(--glass-border);border-radius:10px;padding:12px 14px">'+
            '<div style="width:36px;height:36px;border-radius:9px;background:var(--accent-glow);border:1px solid var(--border-accent);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'+
            '</div>'+
            '<div style="flex:1;min-width:0">'+
              '<div style="font-size:12px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+fname+'</div>'+
              '<div style="font-size:10px;color:var(--text3);margin-top:2px">'+code.length.toLocaleString()+' characters &bull; '+ext.toUpperCase()+'</div>'+
            '</div>'+
            '<a href="'+blobUrl+'" download="'+fname+'" style="display:inline-flex;align-items:center;gap:5px;background:var(--accent-glow);border:1px solid var(--border-accent);color:var(--accent2);font-family:Outfit,sans-serif;font-size:11px;font-weight:600;padding:7px 12px;border-radius:8px;text-decoration:none;white-space:nowrap;flex-shrink:0">'+
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download'+
            '</a>'+
          '</div>'
        , 'html');
        chatHistory.push({role:'assistant', content: desc + ' (Generated ' + fname + ', ' + code.length.toLocaleString() + ' characters)'});
        saveChatHistory(chatHistory);
      }catch(e){ document.getElementById(codeTypingId)?.closest('.msg')?.remove(); v9_addChatMsg('ai','Code generation failed: '+e.message, false); }
      return;
    }

    // DEEP RESEARCH MODE
    const input = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const text = input?.value.trim();
    if(!text) return;
    if(!window.getApiKey || !window.getApiKey()){
      v9_addChatMsg('ai','<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> No API key — contact support.'); return;
    }

    // Remove welcome screen
    document.getElementById('chat-welcome-screen')?.remove();
    v9_addChatMsg('user', text);
    chatHistory.push({role:'user', content:text});
    saveChatHistory(chatHistory);
    input.value = '';
    window.playUiSound && window.playUiSound('tick');

    // Typing indicator
    const typing = document.createElement('div');
    typing.id = 'v9-typing';
    typing.className = 'msg ai';
    typing.style.cssText = 'display:flex;flex-direction:column;gap:2px;align-items:flex-start';
    typing.innerHTML = `<div style="font-size:10px;color:var(--text3);margin-bottom:3px">NuraSearch</div><div class="msg-bubble" style="max-width:90%"><div class="typing-indicator"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>`;
    chatBox?.appendChild(typing);
    if(chatBox) chatBox.scrollTop = chatBox.scrollHeight;

    const ctx = window.parsedLecturesContext || '';
    const sysPrompt = `You are NuraSearch, a deep research AI embedded in a study app. Provide thorough, well-structured research answers. When citing sources, wrap each URL in [SOURCE: url] tags so the UI can render them as expandable chips. Be comprehensive but clear.${ctx ? `\n\nContext from user files:\n${ctx.substring(0,3000)}` : ''}`;

    try{
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+window.getApiKey()},
        body:JSON.stringify({
          model:'llama-3.3-70b-versatile', max_tokens:900,
          messages:[
            {role:'system', content:sysPrompt},
            {role:'user', content: text}
          ]
        })
      });
      const data = await res.json();
      document.getElementById('v9-typing')?.remove();
      const reply = data.choices?.[0]?.message?.content || 'No response.';
      chatHistory.push({role:'assistant', content:reply});
      saveChatHistory(chatHistory);
      v9_addChatMsg('ai', reply, true);
      window.playUiSound && window.playUiSound('confirm');
    } catch(e){
      document.getElementById('v9-typing')?.remove();
      v9_addChatMsg('ai','Error: '+e.message);
    }
  };
}

/* Accumulated sources for side panel */
let _nuraSources = [];

function v9_addChatMsg(role, text, parseSourceChips){
  const chatBox = document.getElementById('chat-box');
  if(!chatBox) return;

  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.style.cssText = 'display:flex;flex-direction:column;gap:2px;' + (role==='user'?'align-items:flex-end':'align-items:flex-start');

  let htmlContent = text;

  if(parseSourceChips && role === 'ai'){
    // Strip [SOURCE: url] tags — collect into side panel, never show inline
    htmlContent = text.replace(/\[SOURCE:\s*(https?:\/\/[^\]]+)\]/gi, (_, url)=>{
      _nuraSources.push(url);
      return '';
    });
    htmlContent = htmlContent.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    htmlContent = htmlContent.replace(/\n/g,'<br>');
    // Refresh sources list if panel is open
    if(document.getElementById('nura-sources-panel')?.classList.contains('open')){
      renderSourcesList();
    }
  } else if(parseSourceChips === 'html') {
    // Raw HTML allowed — used for rich AI messages (Neuro Code file cards etc.)
    htmlContent = text;
  } else {
    htmlContent = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  }

  const modeLabels = {chat:'Nura Mind', research:'NuraSearch', code:'Neuro Code'};
  const senderLabel = role==='user' ? 'You' : (modeLabels[_nuraMindMode] || 'Nura Mind');
  const isUser = role === 'user';
  const bubbleStyle = isUser
    ? 'max-width:82%;font-size:12px;line-height:1.6;background:rgba(var(--accent-rgb),0.08);border:1px solid rgba(var(--accent-rgb),0.18);border-radius:12px 12px 3px 12px;padding:10px 13px'
    : 'max-width:88%;font-size:12px;line-height:1.6';
  div.innerHTML = `<div style="font-size:10px;color:var(--text3);margin-bottom:3px">${senderLabel}</div><div class="msg-bubble" style="${bubbleStyle}">${htmlContent}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ═══════════════════════════════════════
   V9.10 — STATS DAILY GOALS WIDGET
   Moves (mirrors) the daily goal graph into Stats
   ═══════════════════════════════════════ */
function v9_buildStatsDailyGoals(){
  const statsPanel = document.getElementById('stats-panel');
  if(!statsPanel || document.getElementById('stats-daily-goals-panel')) return;

  const wrap = document.createElement('div');
  wrap.id = 'stats-daily-goals-panel';
  wrap.innerHTML = `
    <div style="font-size:10px;color:var(--text3);letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px">Daily Goals — This Week</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div style="font-size:12px;color:var(--text2)">Today's Progress</div>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:18px;color:var(--accent2)" id="stats-prog-pct">0%</div>
    </div>
    <div style="height:4px;background:var(--bg4);border-radius:100px;overflow:hidden;margin-bottom:12px">
      <div id="stats-prog-fill" style="height:100%;background:linear-gradient(90deg,var(--accent),var(--gold2));border-radius:100px;width:0%;transition:width .5s"></div>
    </div>
    <div style="font-size:10px;color:var(--text3);letter-spacing:1.5px;margin-bottom:6px">WEEK AT A GLANCE</div>
    <div id="stats-week-bars" style="display:flex;gap:6px;align-items:flex-end;height:48px;margin-bottom:4px"></div>
    <div id="stats-week-days" style="display:flex;gap:6px"></div>
  `;

  // Insert before calendar
  const calPanel = document.getElementById('stats-calendar-panel');
  if(calPanel) statsPanel.insertBefore(wrap, calPanel);
  else statsPanel.appendChild(wrap);

  v9_syncStatsDailyGoals();
}

function v9_syncStatsDailyGoals(){
  // Mirror the dashboard week bars into stats
  const src = document.getElementById('week-bars');
  const dst = document.getElementById('stats-week-bars');
  const srcDays = document.getElementById('week-days');
  const dstDays = document.getElementById('stats-week-days');
  if(!src || !dst) return;
  dst.innerHTML = src.innerHTML;
  if(srcDays && dstDays) dstDays.innerHTML = srcDays.innerHTML;

  // Sync progress
  const pct = document.getElementById('prog-pct')?.textContent || '0%';
  const fill = document.getElementById('prog-fill')?.style.width || '0%';
  const sp = document.getElementById('stats-prog-pct');
  const sf = document.getElementById('stats-prog-fill');
  if(sp) sp.textContent = pct;
  if(sf) sf.style.width = fill;
}

/* ═══════════════════════════════════════
   V9 BOOT — runs on DOMContentLoaded + load
   ═══════════════════════════════════════ */


/* ═══════════════════════════════════════
   SOURCES PANEL
   ═══════════════════════════════════════ */
function updateSourcesBtn(){
  const btn   = document.getElementById('nura-sources-btn');
  const count = document.getElementById('nura-src-count');
  if(btn)   btn.style.display = (_nuraSources.length > 0 && _nuraMindMode==='research') ? 'flex' : 'none';
  if(count) count.textContent = _nuraSources.length;
}

window.toggleSourcesPanel = function(e){
  if(e) e.stopPropagation();
  const panel = document.getElementById('nura-sources-panel');
  if(!panel) return;
  const opening = !panel.classList.contains('open');
  panel.classList.toggle('open');
  if(opening) renderSourcesList();
};
// alias for onclick="" calls
function toggleSourcesPanel(e){ window.toggleSourcesPanel(e); }

function renderSourcesList(){
  const ul = document.getElementById('nura-sources-list');
  if(!ul) return;
  if(_nuraSources.length === 0){
    ul.innerHTML = '<li style="padding:14px 2px;font-size:12px;color:var(--text3)">No sources yet — use NuraSearch and ask a question.</li>';
    return;
  }
  // Deduplicate, then keep only the 3 most important (last 3 = most recent/relevant)
  const unique = [...new Set(_nuraSources)];
  const top3 = unique.slice(-3).reverse();
  ul.innerHTML = top3.map((url) => {
    let domain = url;
    try { domain = new URL(url).hostname.replace('www.', ''); } catch(e) {}
    return `<li>
      <a href="${url}" target="_blank" rel="noopener">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:2px;color:var(--accent2)"><path d="M10 13a5 5 0 0 0 7.5.4l2-2a5 5 0 0 0-7-7l-1.2 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.4l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></svg>
        <div style="min-width:0;flex:1">
          <span class="src-domain">${domain}</span>
          <span class="src-url">${url}</span>
        </div>
      </a>
    </li>`;
  }).join('');
  if(unique.length > 3){
    ul.innerHTML += `<li style="padding:8px 2px;font-size:10px;color:var(--text3)">Showing 3 most relevant of ${unique.length} total sources.</li>`;
  }
}

/* ═══════════════════════════════════════
   FETCH API KEY FROM FIREBASE CONFIG
   ═══════════════════════════════════════ */
(function(){
  // Fetch from Firestore config/app — works for guests + signed-in users
  let _configFetchInFlight = null;
  async function fetchConfigKey(){
    // De-dupe overlapping calls — return the same in-flight promise
    if(_configFetchInFlight) return _configFetchInFlight;
    _configFetchInFlight = (async () => {
      // Wait (briefly) for the Firebase SDK/_db to exist if it hasn't loaded yet
      let tries = 0;
      while(typeof _db === 'undefined' && tries < 20){ await new Promise(r=>setTimeout(r,250)); tries++; }
      if(typeof _db === 'undefined') return;
      try{
        const snap = await _db.collection('config').doc('app').get();
        if(snap.exists){
          const d = snap.data();
          // Accept multiple possible field-name variants so this works regardless
          // of exactly how the field was named in Firestore.
          const groq = d.groqKey || d.groq_api || d.groqApi || d.groqAPI || d['groq api'] || d.groq;
          const gem  = d.geminiKey || d.gemini_api || d.geminiApi || d['gemini api'] || d.gemini;
          if(groq) window._nuraConfigKey = groq;
          if(gem)  window._nuraGeminiKey  = gem;
          if(!groq) console.warn('Nura: no Groq key field found in config/app. Checked: groqKey, groq_api, groqApi, groqAPI, "groq api", groq. Actual fields present:', Object.keys(d));
        }
      }catch(e){ console.warn('Config key fetch failed:', e); }
      _configFetchInFlight = null;
    })();
    return _configFetchInFlight;
  }
  // Fetch as soon as the page is ready — no fixed delay
  document.addEventListener('DOMContentLoaded', function(){ fetchConfigKey(); });
  window._fetchConfigKey = fetchConfigKey;
})();

/* ═══════════════════════════════════════
   CHAT HISTORY PANEL — Firebase backed
   ═══════════════════════════════════════ */
let _chatHistPanelOpen = false;

window.toggleChatHistoryPanel = function(e){
  if(e) e.stopPropagation();
  _chatHistPanelOpen = !_chatHistPanelOpen;
  const panel = document.getElementById('nura-chathist-panel');
  if(panel) panel.classList.toggle('open', _chatHistPanelOpen);
  // Close sources panel if open
  if(_chatHistPanelOpen){
    document.getElementById('nura-sources-panel')?.classList.remove('open');
    loadChatHistoryPanel();
  }
};

let _chatHistLoadToken = 0;
window.loadChatHistoryPanel = async function(){
  const listEl = document.getElementById('nura-chathist-list');
  if(!listEl) return;
  // Each call gets its own token — only the LATEST call is allowed to render its result
  const myToken = ++_chatHistLoadToken;
  listEl.innerHTML = '<div style="font-size:11px;color:var(--text3);padding:12px 0;text-align:center">Loading…</div>';
  const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
  let sessions = [];
  if(user){
    try{
      const snap = await _db.collection('users').doc(user.uid).collection('chats')
        .orderBy('ts','desc').limit(20).get();
      sessions = snap.docs.map(d => ({id: d.id, ...d.data()}));
    }catch(e){ console.warn('Chat load failed',e); }
  }
  // Always also merge localStorage sessions (guests + offline fallback)
  try{
    const local = JSON.parse(localStorage.getItem('nura-chat-sessions')||'[]');
    // Merge: add local sessions not already in Firebase results
    local.forEach(ls => {
      if(!sessions.find(s => s.title === ls.title && Math.abs((s.ts||0)-(ls.ts||0)) < 2000)){
        sessions.push(ls);
      }
    });
    // Re-sort by ts desc
    sessions.sort((a,b) => (b.ts||0)-(a.ts||0));
  }catch(e){}
  // A newer call started while we were awaiting — discard this stale result
  if(myToken !== _chatHistLoadToken) return;
  if(sessions.length === 0){
    listEl.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:20px 0;text-align:center">No previous conversations yet.<br>Start chatting and they\'ll appear here!</div>';
    return;
  }
  listEl.innerHTML = sessions.map((s,i) => {
    const sid = s.id || String(i);
    const msgsJson = JSON.stringify(JSON.stringify(s.messages||[]));
    const title = (s.title||'Untitled Chat').replace(/'/g,"&#39;");
    const date  = s.ts ? new Date(s.ts).toLocaleDateString() : '';
    return `<div style="background:var(--bg3);border:1px solid var(--glass-border);border-radius:9px;margin-bottom:8px;overflow:hidden;transition:border-color .18s" onmouseover="this.style.borderColor='var(--border-accent)'" onmouseout="this.style.borderColor='var(--glass-border)'">
      <!-- Title row with edit + delete -->
      <div style="display:flex;align-items:center;gap:6px;padding:8px 10px 4px">
        <div class="chat-hist-title" id="cht-title-${sid}" onclick="restoreChatSession('${sid}',${msgsJson})" style="flex:1;font-size:11px;font-weight:600;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer" title="Click to open">${title}</div>
        <button onclick="renameChatSession('${sid}')" title="Rename" style="flex-shrink:0;background:none;border:none;color:var(--text3);cursor:pointer;padding:2px;border-radius:4px;display:flex;align-items:center;transition:color .15s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text3)'">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 3a2.8 2.8 0 0 1 4 4L7 21l-4 1 1-4Z"/></svg>
        </button>
        <button onclick="deleteChatSession('${sid}')" title="Delete" style="flex-shrink:0;background:none;border:none;color:var(--text3);cursor:pointer;padding:2px;border-radius:4px;display:flex;align-items:center;transition:color .15s" onmouseover="this.style.color='#ff8080'" onmouseout="this.style.color='var(--text3)'">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div onclick="restoreChatSession('${sid}',${msgsJson})" style="padding:0 10px 8px;font-size:9px;color:var(--text3);cursor:pointer">${date} &bull; ${s.msgCount||0} msg${(s.msgCount||0)===1?'':'s'}</div>
    </div>`;
  }).join('');
}

window.restoreChatSession = function(id, messagesJson){
  let messages = [];
  try{ messages = JSON.parse(messagesJson); }catch(e){}
  const chatBox = document.getElementById('chat-box');
  if(!chatBox) return;
  chatBox.innerHTML = '';
  chatHistory = messages;
  saveChatHistory(chatHistory);
  // Render messages — user can continue chatting after this
  if(messages.length === 0){
    const welcome = document.createElement('div');
    welcome.id = 'chat-welcome-screen';
    welcome.className = 'chat-welcome-container';
    welcome.innerHTML = '<h1 class="chat-welcome-title">Chat restored</h1><p style="color:var(--text2);font-size:13px">Continue the conversation below.</p>';
    chatBox.appendChild(welcome);
  } else {
    messages.forEach(m => {
      if(m.role==='user') v9_addChatMsg('user', m.content, false);
      else if(m.role==='assistant') v9_addChatMsg('ai', m.content, false);
    });
  }
  // Close panel and focus input so user can immediately type
  _chatHistPanelOpen = false;
  document.getElementById('nura-chathist-panel')?.classList.remove('open');
  setTimeout(()=>{ document.getElementById('chat-input')?.focus(); }, 100);
  window.playUiSound && window.playUiSound('open');
};

/* ── AI title generator via Groq ── */
async function _generateChatTitle(messages){
  try{
    const firstUser = messages.find(m=>m.role==='user');
    if(!firstUser) return 'New Chat';
    const key = getApiKey();
    if(!key) return firstUser.content.substring(0,40);
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({model:'llama3-8b-8192', max_tokens:12, messages:[{role:'user',content:'Give a 3-5 word title for this conversation: "'+firstUser.content.substring(0,120)+'". Reply ONLY with the title, no quotes or punctuation.'}]})
    });
    const d = await r.json();
    return d.choices?.[0]?.message?.content?.trim() || firstUser.content.substring(0,40);
  }catch(e){ return 'Chat '+new Date().toLocaleDateString(); }
}

// Override startNewConversation — snapshot BEFORE clearing so we don't lose data
const _origStartNew = window.startNewConversation;
window.startNewConversation = function(){
  // Snapshot chatHistory NOW
  const snapshot = (chatHistory && chatHistory.length >= 2) ? chatHistory.slice() : null;
  // Clear chat immediately
  if(typeof _origStartNew === 'function') _origStartNew();
  // Save snapshot in background
  if(snapshot){
    const firstUser = snapshot.find(m=>m.role==='user');
    const fallback = firstUser ? firstUser.content.substring(0,45) : 'Chat';
    const sessionData = { title:fallback, messages:snapshot, msgCount:snapshot.length, ts:Date.now() };
    _generateChatTitle(snapshot).then(async aiTitle=>{
      sessionData.title = aiTitle;
      const user = typeof _auth!=='undefined' ? _auth.currentUser : null;
      if(user){
        try{ await _db.collection('users').doc(user.uid).collection('chats').add(sessionData); }
        catch(e){ console.warn('Save failed',e); }
      }
      try{
        const local=JSON.parse(localStorage.getItem('nura-chat-sessions')||'[]');
        local.unshift({...sessionData,id:Date.now().toString()});
        localStorage.setItem('nura-chat-sessions',JSON.stringify(local.slice(0,20)));
      }catch(e){}
      // Single refresh, only after BOTH writes are truly finished — no race
      loadChatHistoryPanel && loadChatHistoryPanel();
    }).catch(async ()=>{
      const user=typeof _auth!=='undefined'?_auth.currentUser:null;
      if(user){ try{ await _db.collection('users').doc(user.uid).collection('chats').add(sessionData); }catch(e){} }
      try{
        const local=JSON.parse(localStorage.getItem('nura-chat-sessions')||'[]');
        local.unshift({...sessionData,id:Date.now().toString()});
        localStorage.setItem('nura-chat-sessions',JSON.stringify(local.slice(0,20)));
      }catch(e){}
      loadChatHistoryPanel && loadChatHistoryPanel();
    });
  }
};


/* ═══════════════════════════════════════
   UPGRADE MODAL
   ═══════════════════════════════════════ */
window.openUpgradeModal = function(){
  const el = document.getElementById('upgrade-modal-overlay');
  if(el){ el.style.display = 'flex'; document.getElementById('userDropdown')?.classList.remove('open'); }
}
window.closeUpgradeModal = function(){
  document.getElementById('upgrade-modal-overlay').style.display = 'none';
  // Reset to card view
  selectPayment('card');
  document.getElementById('pay-success').style.display = 'none';
  document.getElementById('pay-form-card').style.display = 'flex';
}

window.selectPayment = function(method){
  ['card','paypal','klarna'].forEach(m => {
    const btn = document.getElementById('pay-btn-'+m);
    const form = document.getElementById('pay-form-'+m);
    const active = m === method;
    if(btn){ btn.style.border = active ? '2px solid rgba(168,85,247,0.6)' : '1px solid var(--border)'; btn.style.background = active ? 'rgba(168,85,247,0.12)' : 'transparent'; }
    if(form) form.style.display = active ? (m==='card'?'flex':'block') : 'none';
  });
}

window.formatCardNumber = function(inp){
  let v = inp.value.replace(/\D/g,'').substring(0,16);
  inp.value = v.replace(/(.{4})/g,'$1 ').trim();
}
window.formatExpiry = function(inp){
  let v = inp.value.replace(/\D/g,'');
  // Clamp month to 1-12
  if(v.length >= 2){
    let month = parseInt(v.substring(0,2),10);
    if(month > 12) month = 12;
    if(month < 1 && v.length >= 2) month = 1;
    v = String(month).padStart(2,'0') + ' / ' + v.substring(2,4);
  }
  inp.value = v;
}

window.processPayment = async function(){
  const name   = document.getElementById('cc-name')?.value.trim();
  const number = document.getElementById('cc-number')?.value.replace(/\s/g,'');
  const expiry = document.getElementById('cc-expiry')?.value.trim();
  const cvv    = document.getElementById('cc-cvv')?.value.trim();
  const fields = [
    {el: document.getElementById('cc-name'),   ok: !!name},
    {el: document.getElementById('cc-number'),  ok: number.length >= 12},
    {el: document.getElementById('cc-expiry'),  ok: !!expiry},
    {el: document.getElementById('cc-cvv'),     ok: cvv.length >= 3}
  ];
  let hasError = false;
  fields.forEach(({el, ok}) => {
    if(!el) return;
    if(!ok){
      hasError = true;
      // Find the outermost wrapper (position:relative parent = icon+input row)
      const wrapper = el.closest('[style*="position:relative"]') || el.parentElement || el;
      // Remove any previous error message for this field
      const prevMsg = wrapper.parentElement?.querySelector('[data-err-for="'+el.id+'"]');
      if(prevMsg) prevMsg.remove();
      // Shake + red border on wrapper
      el.style.borderColor = '#ff6b6b';
      wrapper.style.animation = 'nura-shake .35s ease';
      // Insert error msg AFTER the wrapper (not inside it) to avoid layout shifts
      const msg = document.createElement('div');
      msg.setAttribute('data-err-for', el.id);
      msg.style.cssText = 'font-size:10px;color:#ff6b6b;margin-top:3px;margin-left:2px;animation:fadeIn .15s ease';
      msg.textContent = 'Please fill in this field';
      wrapper.after(msg);
      setTimeout(() => {
        el.style.borderColor = '';
        wrapper.style.animation = '';
        if(msg.parentNode) msg.remove();
      }, 2800);
    }
  });
  if(hasError) return;
  // Demo — mark user as pro in Firestore
  const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
  if(user){
    try{
      await _fbSaveProfile(user.uid, { plan: 'pro', upgradedAt: Date.now() });
    }catch(e){}
  }
  // Update local profile
  try{
    const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
    p.plan = 'pro';
    localStorage.setItem('nura-user-profile', JSON.stringify(p));
  }catch(e){}
  // Show loading spinner
  const formEl = document.getElementById('pay-form-card');
  const submitBtn = formEl?.querySelector('button[onclick*="processPayment"]');
  if(submitBtn){ submitBtn.disabled=true; submitBtn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="animation:spin 1s linear infinite"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Processing…'; }
  // Simulate payment processing
  await new Promise(r=>setTimeout(r,1800));
  // Show success with checkmark then close
  formEl && (formEl.style.display='none');
  const successEl = document.getElementById('pay-success');
  if(successEl) successEl.style.display='block';
  // Update badge
  const badge = document.getElementById('ud-plan-badge');
  if(badge){ badge.textContent='NEUROMIND PRO'; badge.style.color='#c084fc'; }
  renderUserProfile && renderUserProfile();
  // After 1.5s close modal and show billing save prompt
  setTimeout(()=>{
    closeUpgradeModal && closeUpgradeModal();
    // Store pending billing for save prompt
    window._pendingBilling = {name, number: number.slice(-4), expiry};
    document.getElementById('billing-save-overlay').style.display='flex';
  }, 1800);
}

/* ═══════════════════════════════
   CHAT HISTORY — RENAME + DELETE
   ═══════════════════════════════ */
window.renameChatSession = async function(sid){
  const titleEl = document.getElementById('cht-title-' + sid);
  const oldTitle = titleEl ? titleEl.textContent : 'Chat';
  const newTitle = await nuraDialog({title:'Rename Conversation', body:'Enter a new name for this chat.', icon:'edit', input: oldTitle, confirmText:'Save', cancelText:'Cancel'});
  if(!newTitle || newTitle.trim() === oldTitle) return;
  const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
  if(user){
    try{ await _db.collection('users').doc(user.uid).collection('chats').doc(sid).update({title: newTitle.trim()}); }catch(e){}
  }
  // Update localStorage too
  try{
    const local = JSON.parse(localStorage.getItem('nura-chat-sessions')||'[]');
    const idx = local.findIndex(s => String(s.id) === String(sid));
    if(idx >= 0){ local[idx].title = newTitle.trim(); localStorage.setItem('nura-chat-sessions', JSON.stringify(local)); }
  }catch(e){}
  if(titleEl) titleEl.textContent = newTitle.trim();
};

window.deleteChatSession = async function(sid){
  const ok = await nuraDialog({title:'Delete Conversation', body:'This conversation will be permanently deleted and cannot be recovered.', icon:'danger', confirmText:'Delete', cancelText:'Cancel'});
  if(!ok) return;
  const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
  if(user){
    try{ await _db.collection('users').doc(user.uid).collection('chats').doc(sid).delete(); }catch(e){}
  }
  try{
    const local = JSON.parse(localStorage.getItem('nura-chat-sessions')||'[]');
    localStorage.setItem('nura-chat-sessions', JSON.stringify(local.filter(s => String(s.id) !== String(sid))));
  }catch(e){}
  // Remove from DOM immediately
  const item = document.getElementById('cht-title-' + sid)?.closest('div[style*="border-radius:9px"]');
  if(item) item.remove();
};

/* ═══════════════════════════════
   SUBSCRIPTION — UPGRADE / CANCEL
   ═══════════════════════════════ */
window.handleUpgradeClick = function(){
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  // Block guests
  if(p.isGuest || !p.email){
    document.getElementById('userDropdown')?.classList.remove('open');
    // Show sign-in prompt
    authShowSignIn();
    showSignOutGate();
    // Show a message
    const errEl = document.getElementById('auth-error-msg');
    if(errEl){ errEl.textContent = 'Please sign in or create an account to upgrade.'; errEl.style.color = '#f0a040'; }
    return;
  }
  if(p.plan === 'pro'){
    cancelSubscription();
  } else {
    openUpgradeModal();
  }
};

window.cancelSubscription = async function(){
  const confirmed = await nuraDialog({
    title: 'Cancel Subscription',
    body: 'You will lose access to Neuro Code and other Pro features at the end of your billing period. Are you sure?',
    icon: 'cancel',
    confirmText: 'Yes, cancel',
    cancelText: 'Keep subscription'
  });
  if(!confirmed) return;
  const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
  if(user){ try{ await _fbSaveProfile(user.uid, {plan:'free', cancelledAt: Date.now()}); }catch(e){} }
  try{
    const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
    p.plan = 'free';
    localStorage.setItem('nura-user-profile', JSON.stringify(p));
  }catch(e){}
  renderUserProfile && renderUserProfile();
  nuraDialog({title:'Subscription Cancelled',body:'You will keep Pro access until the end of this billing period.',icon:'info',confirmText:'Got it'});
};

/* ═══════════════════════════════════════
   NURA MIND — GUEST GATE
   ═══════════════════════════════════════ */
window.navNuraMind = function(btn){
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  const isGuest = p.isGuest || !p.email;
  if(isGuest){
    showNuraMindGuestGate();
    return;
  }
  nav('tutor', btn);
};

function showNuraMindGuestGate(){
  // Remove existing overlay if any
  document.getElementById('nura-mind-guest-gate')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'nura-mind-guest-gate';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:4000;background:rgba(0,0,0,0.82);display:flex;align-items:center;justify-content:center;padding:20px;animation:loginIn .3s cubic-bezier(.2,.9,.25,1)';

  overlay.innerHTML = `
    <div style="background:#0d0f1c;border:1px solid rgba(255,255,255,0.08);border-radius:20px;width:min(380px,92vw);padding:36px 32px;text-align:center;position:relative;box-shadow:0 32px 80px rgba(0,0,0,.9)">
      <div style="position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent);border-radius:1px"></div>

      <!-- Icon -->
      <div style="width:52px;height:52px;border-radius:15px;background:linear-gradient(135deg,rgba(180,140,60,0.15),rgba(180,140,60,0.06));border:1px solid rgba(201,168,76,0.25);display:flex;align-items:center;justify-content:center;margin:0 auto 18px">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.8)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5v.6A3 3 0 0 0 4 9v1a3 3 0 0 0 1 2.2V14a3.5 3.5 0 0 0 3.5 3.5v1A2.5 2.5 0 0 0 11 21a1.5 1.5 0 0 0 1.5-1.5V5.5A3.5 3.5 0 0 0 9.5 2Z"/><path d="M14.5 2A3.5 3.5 0 0 1 18 5.5v.6A3 3 0 0 1 20 9v1a3 3 0 0 1-1 2.2V14a3.5 3.5 0 0 1-3.5 3.5v1A2.5 2.5 0 0 1 13 21a1.5 1.5 0 0 1-1.5-1.5"/></svg>
      </div>

      <div style="font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px">Nura Mind</div>
      <div style="font-size:13px;color:var(--text3);line-height:1.65;margin-bottom:24px">
        Nura Mind is available to registered users.<br>Sign in or create a free account to access AI-powered learning.
      </div>

      <!-- Buttons -->
      <div style="display:flex;flex-direction:column;gap:10px">
        <button onclick="document.getElementById('nura-mind-guest-gate').remove();authShowSignIn();showSignOutGate();" style="width:100%;padding:12px;background:linear-gradient(135deg,rgba(180,140,60,0.18),rgba(180,140,60,0.08));border:1px solid rgba(201,168,76,0.35);color:#e2c97e;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;border-radius:11px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='linear-gradient(135deg,rgba(180,140,60,0.28),rgba(180,140,60,0.14))'" onmouseout="this.style.background='linear-gradient(135deg,rgba(180,140,60,0.18),rgba(180,140,60,0.08))'">
          Sign In
        </button>
        <button onclick="document.getElementById('nura-mind-guest-gate').remove();authShowSignUp();showSignOutGate();" style="width:100%;padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text2);font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;border-radius:11px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor='rgba(255,255,255,0.22)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
          Create Free Account
        </button>
        <button onclick="document.getElementById('nura-mind-guest-gate').remove()" style="background:none;border:none;color:var(--text3);font-size:12px;cursor:pointer;padding:4px;font-family:inherit">
          Maybe later
        </button>
      </div>
    </div>`;

  // Close on backdrop click
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}

/* ═══════════════════════════════════════
   NOISE GENERATOR (Web Audio API)
   ═══════════════════════════════════════ */
let _noiseCtx = null, _noiseNode = null, _noiseGain = null;

window.playNoiseTrack = function(type, idx){
  stopNoiseTrack();
  try{
    _noiseCtx = new (window.AudioContext||window.webkitAudioContext)();
    const bufferSize = _noiseCtx.sampleRate * 2;
    const buffer = _noiseCtx.createBuffer(1, bufferSize, _noiseCtx.sampleRate);
    const data = buffer.getChannelData(0);

    if(type === 'white'){
      for(let i=0;i<bufferSize;i++) data[i] = Math.random()*2-1;
    } else if(type === 'pink'){
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for(let i=0;i<bufferSize;i++){
        const w=Math.random()*2-1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
        b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
        b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
        data[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11;
        b6=w*0.115926;
      }
    } else { // brown
      let last=0;
      for(let i=0;i<bufferSize;i++){
        const w=Math.random()*2-1;
        data[i]=(last+0.02*w)/1.02; last=data[i]; data[i]*=3.5;
      }
    }

    _noiseNode = _noiseCtx.createBufferSource();
    _noiseNode.buffer = buffer;
    _noiseNode.loop = true;
    _noiseGain = _noiseCtx.createGain();
    _noiseGain.gain.value = musicVolume || 0.7;
    _noiseNode.connect(_noiseGain);
    _noiseGain.connect(_noiseCtx.destination);
    _noiseNode.start();

    // Update UI as if playing
    currentTrackIdx = idx;
    musicPlaying = true;
    window.musicPlaying = true;
    updateMusicPlayerUI();
  }catch(e){ console.warn('Noise gen failed',e); }
};

window.stopNoiseTrack = function(){
  try{ if(_noiseNode){ _noiseNode.stop(); _noiseNode.disconnect(); _noiseNode=null; } }catch(e){}
  try{ if(_noiseCtx){ _noiseCtx.close(); _noiseCtx=null; } }catch(e){}
};

/* ═══════════════════════════════════════
   SETTINGS MODAL JS
   ═══════════════════════════════════════ */
window.openSettingsModal = function(){
  document.getElementById('userDropdown')?.classList.remove('open');
  const overlay = document.getElementById('settings-modal-overlay');
  if(!overlay) return;
  overlay.style.display = 'flex';
  // Guest: hide Account and Security tabs
  const p2 = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  const guestMode = p2.isGuest || !p2.email;
  ['account','security'].forEach(tab => {
    const btn = document.getElementById('stab-'+tab);
    if(btn) btn.style.display = guestMode ? 'none' : '';
  });
  if(guestMode){
    // Default to Profile tab for guests
    showSettingsTab('profile');
  }
  // Populate fields
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  const nameEl = document.getElementById('s-name'); if(nameEl) nameEl.value = p.name||'';
  const ageEl  = document.getElementById('s-age');  if(ageEl)  ageEl.value  = p.age||'';
  const emailEl= document.getElementById('s-email');if(emailEl) emailEl.value = p.email||'';
  const planBadge = document.getElementById('s-plan-badge');
  if(planBadge){ planBadge.textContent = p.plan==='pro'?'NeuroMind Pro':'Free'; planBadge.style.color = p.plan==='pro'?'#c084fc':'var(--accent2)'; }
  // PFP
  if(p.avatar){ const prev=document.getElementById('s-pfp-preview'); if(prev) prev.innerHTML=`<img src="${p.avatar}" style="width:100%;height:100%;object-fit:cover"/>`; }
  // Security
  const user = typeof _auth!=='undefined' ? _auth.currentUser : null;
  if(user){
    const verEl=document.getElementById('s-email-verified'); if(verEl) verEl.textContent = user.emailVerified?'Email verified ✓':'Not verified';
    const lastEl=document.getElementById('s-last-login'); if(lastEl) lastEl.textContent = user.metadata?.lastSignInTime||'—';
  }
  showSettingsTab('profile');
};

window.closeSettingsModal = function(){
  document.getElementById('settings-modal-overlay').style.display = 'none';
};

window.showSettingsTab = function(tab){
  document.querySelectorAll('.spanel').forEach(p=>p.style.display='none');
  document.querySelectorAll('.stab').forEach(b=>b.classList.remove('active-stab'));
  const panel = document.getElementById('spanel-'+tab);
  const btn   = document.getElementById('stab-'+tab);
  if(panel) panel.style.display='flex';
  if(btn)   btn.classList.add('active-stab');
  if(tab === 'account') settingsLoadBilling && settingsLoadBilling();
};

window.settingsSave = function(){
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  const n = document.getElementById('s-name')?.value.trim(); if(n) p.name=n;
  const a = document.getElementById('s-age')?.value.trim();  if(a) p.age=a;
  localStorage.setItem('nura-user-profile',JSON.stringify(p));
  const ni=document.getElementById('profile-name-input'); if(ni) ni.value=p.name||'';
  const ai=document.getElementById('profile-age-input');  if(ai) ai.value=p.age||'';
  renderUserProfile && renderUserProfile();
  const user=typeof _auth!=='undefined'?_auth.currentUser:null;
  if(user && typeof _fbSaveProfile==='function') _fbSaveProfile(user.uid,{name:p.name,age:p.age}).catch(()=>{});
};

window.settingsPfpUpload = function(inp){
  const file=inp.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{ showPfpCropEditor(e.target.result); };
  reader.readAsDataURL(file);
};

/* PFP crop editor */
window.showPfpCropEditor = function(src){
  // Remove existing editor
  document.getElementById('pfp-crop-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'pfp-crop-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;padding:20px';
  overlay.innerHTML = `
    <div style="background:var(--bg2);border:1px solid var(--glass-border);border-radius:18px;padding:24px;text-align:center;width:min(340px,92vw)">
      <div style="font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px">Crop Profile Photo</div>
      <div style="font-size:11px;color:var(--text3);margin-bottom:16px">Drag to reposition · Scroll to zoom</div>
      <div style="position:relative;width:200px;height:200px;border-radius:50%;overflow:hidden;margin:0 auto 16px;border:2px solid var(--border-accent);cursor:grab;background:#111" id="pfp-crop-circle">
        <img id="pfp-crop-img" src="${src}" style="position:absolute;transform-origin:center;user-select:none;pointer-events:none;max-width:none"/>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;justify-content:center">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        <input type="range" id="pfp-zoom" min="0.5" max="3" step="0.05" value="1" style="flex:1;accent-color:var(--accent)" oninput="pfpApplyTransform()"/>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="document.getElementById('pfp-crop-overlay').remove()" style="flex:1;padding:10px;background:var(--bg3);border:1px solid var(--glass-border);color:var(--text2);font-family:'Outfit',sans-serif;font-size:13px;border-radius:10px;cursor:pointer">Cancel</button>
        <button onclick="pfpSaveCrop('${src}')" style="flex:1;padding:10px;background:var(--accent-glow);border:1px solid var(--border-accent);color:var(--accent2);font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;border-radius:10px;cursor:pointer">Save Photo</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  // Init drag
  const circle = document.getElementById('pfp-crop-circle');
  const img    = document.getElementById('pfp-crop-img');
  let offsetX=0, offsetY=0, startX=0, startY=0, dragging=false;
  // Center image initially
  img.onload = ()=>{
    const scale = parseFloat(document.getElementById('pfp-zoom').value);
    img.style.width  = (img.naturalWidth  * scale)+'px';
    img.style.height = (img.naturalHeight * scale)+'px';
    offsetX = (200 - img.naturalWidth  * scale)/2;
    offsetY = (200 - img.naturalHeight * scale)/2;
    img.style.left = offsetX+'px'; img.style.top = offsetY+'px';
  };
  circle.onmousedown = circle.ontouchstart = e=>{ dragging=true; const p=e.touches?e.touches[0]:e; startX=p.clientX-offsetX; startY=p.clientY-offsetY; circle.style.cursor='grabbing'; };
  document.onmousemove = document.ontouchmove = e=>{ if(!dragging)return; const p=e.touches?e.touches[0]:e; offsetX=p.clientX-startX; offsetY=p.clientY-startY; img.style.left=offsetX+'px'; img.style.top=offsetY+'px'; };
  document.onmouseup = document.ontouchend = ()=>{ dragging=false; circle.style.cursor='grab'; };

  window.pfpApplyTransform = function(){
    const scale = parseFloat(document.getElementById('pfp-zoom').value);
    img.style.width  = (img.naturalWidth  * scale)+'px';
    img.style.height = (img.naturalHeight * scale)+'px';
  };
};

window.pfpSaveCrop = function(originalSrc){
  // Draw cropped circle to canvas
  const circle = document.getElementById('pfp-crop-circle');
  const img    = document.getElementById('pfp-crop-img');
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.beginPath(); ctx.arc(100,100,100,0,Math.PI*2); ctx.clip();
  const left = parseFloat(img.style.left)||0;
  const top  = parseFloat(img.style.top)||0;
  const w = parseFloat(img.style.width)  || img.naturalWidth;
  const h = parseFloat(img.style.height) || img.naturalHeight;
  ctx.drawImage(img, left, top, w, h);
  const url = canvas.toDataURL('image/jpeg', 0.85);
  // Save
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  p.avatar = url;
  localStorage.setItem('nura-user-profile', JSON.stringify(p));
  // Update preview
  const prev = document.getElementById('s-pfp-preview');
  if(prev) prev.innerHTML=`<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`;
  // Save to Firestore
  const user = typeof _auth!=='undefined' ? _auth.currentUser : null;
  if(user && typeof _fbSaveProfile==='function') _fbSaveProfile(user.uid,{avatar:url}).catch(()=>{});
  renderUserProfile && renderUserProfile();
  document.getElementById('pfp-crop-overlay')?.remove();
};

/* Auto-use Google photo on login */
function _syncGoogleAvatar(){
  const user = typeof _auth!=='undefined' ? _auth.currentUser : null;
  if(!user || !user.photoURL) return;
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  if(!p.avatar && user.photoURL){
    p.avatar = user.photoURL;
    localStorage.setItem('nura-user-profile', JSON.stringify(p));
    renderUserProfile && renderUserProfile();
  }
}

window.settingsToggle = function(id){
  const el=document.getElementById('st-'+id);
  if(el) el.classList.toggle('active-toggle');
};

window.settingsUiVolume = function(val){
  // Adjust future UI sounds
  window._uiSoundVolume = parseFloat(val);
};

window.settingsMusicVolume = function(val){
  musicVolume = parseFloat(val);
  if(musicAudio) musicAudio.volume=musicVolume;
  if(_noiseGain) _noiseGain.gain.value=musicVolume;
};

window.settingsAccentColor = function(hex){
  document.documentElement.style.setProperty('--accent', hex);
};

window.settingsSendPasswordReset = async function(){
  const user=typeof _auth!=='undefined'?_auth.currentUser:null;
  if(!user||!user.email){ alert('No email on account.'); return; }
  try{
    await _auth.sendPasswordResetEmail(user.email);
    alert('Password reset email sent to '+user.email);
  }catch(e){ alert('Failed: '+e.message); }
};

// Close settings on backdrop click
document.addEventListener('click',function(e){
  const overlay=document.getElementById('settings-modal-overlay');
  if(overlay && e.target===overlay) closeSettingsModal();
});

/* ═══════════════════════════════════════
   OSCILLOGRAM — dashboard waveform visualiser
   ═══════════════════════════════════════ */
(function(){
  let _oCtx=null, _analyser=null, _src=null, _rafId=null;

  function initOscillogram(){
    const canvas = document.getElementById('dash-music-oscillogram');
    if(!canvas) return;
    const ctx2d = canvas.getContext('2d');
    const W = canvas.offsetWidth || 200;
    canvas.width = W;

    // If noise is playing, show animated sine-like pattern
    if(_noiseCtx && _noiseNode){
      drawIdleWave(ctx2d, W, 28, true); return;
    }

    if(!musicAudio || musicAudio.paused || !musicAudio.src){
      drawIdleWave(ctx2d, W, 28, false); return;
    }

    try{
      if(!_oCtx){
        _oCtx = new (window.AudioContext||window.webkitAudioContext)();
        _analyser = _oCtx.createAnalyser();
        _analyser.fftSize = 256;
        _src = _oCtx.createMediaElementSource(musicAudio);
        _src.connect(_analyser);
        _analyser.connect(_oCtx.destination);
      }
      const buf = new Uint8Array(_analyser.frequencyBinCount);
      function draw(){
        _rafId = requestAnimationFrame(draw);
        _analyser.getByteTimeDomainData(buf);
        ctx2d.clearRect(0,0,W,28);
        ctx2d.beginPath();
        ctx2d.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent')||'#00e5ff';
        ctx2d.lineWidth = 1.5;
        ctx2d.shadowColor = ctx2d.strokeStyle;
        ctx2d.shadowBlur = 4;
        const sliceW = W/buf.length;
        let x=0;
        for(let i=0;i<buf.length;i++){
          const v=buf[i]/128; const y=v*14;
          i===0?ctx2d.moveTo(x,y):ctx2d.lineTo(x,y);
          x+=sliceW;
        }
        ctx2d.stroke();
      }
      if(_rafId) cancelAnimationFrame(_rafId);
      draw();
    }catch(e){ drawIdleWave(ctx2d,W,28,false); }
  }

  function drawIdleWave(ctx2d, W, H, animated){
    let t=0;
    function frame(){
      ctx2d.clearRect(0,0,W,H);
      ctx2d.beginPath();
      const color = getComputedStyle(document.documentElement).getPropertyValue('--accent')||'#00e5ff';
      ctx2d.strokeStyle = color;
      ctx2d.globalAlpha = animated ? 0.6 : 0.25;
      ctx2d.lineWidth = 1.5;
      for(let x=0;x<W;x++){
        const amp = animated ? 5*Math.sin(x*0.08+t)*Math.sin(x*0.03+t*0.5) : 0;
        x===0?ctx2d.moveTo(x,H/2+amp):ctx2d.lineTo(x,H/2+amp);
      }
      ctx2d.stroke();
      ctx2d.globalAlpha=1;
      if(animated){ t+=0.05; _rafId=requestAnimationFrame(frame); }
    }
    if(_rafId) cancelAnimationFrame(_rafId);
    frame();
  }

  // Refresh every second and on play/pause
  setInterval(initOscillogram, 1000);
  if(typeof musicAudio!=='undefined' && musicAudio){
    musicAudio.addEventListener('play',  initOscillogram);
    musicAudio.addEventListener('pause', initOscillogram);
  }
})();

/* ═══════════════════════════════════════
   COLOUR WHEEL POPUP
   ═══════════════════════════════════════ */
window.closeColourWheelPopup = function(){
  document.getElementById('colour-wheel-popup').style.display = 'none';
};

window.openColourWheelPopup = function(){
  const popup = document.getElementById('colour-wheel-popup');
  if(popup){ popup.style.display='flex'; initColourWheel && initColourWheel(); }
};

/* Restore last active panel on refresh */
(function(){
  const last = localStorage.getItem('nura-active-panel');
  if(last && last !== 'dashboard'){
    document.addEventListener('DOMContentLoaded', function(){
      setTimeout(function(){
        const btn = document.querySelector(`.nav-btn[onclick*="${last}"]`);
        if(btn) nav(last, btn);
      }, 100);
    });
  }
})();

/* Wire Neuro Code click after modes injected */
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
    const codeEl = document.getElementById('nura-tab-code');
    if(!codeEl) return;
    const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
    const isPro = p.plan === 'pro';
    codeEl.style.opacity = isPro ? '1' : '0.4';
    codeEl.style.cursor  = 'pointer';
    codeEl.onclick = ()=>{ window.v9SetNuraMode && window.v9SetNuraMode('code'); };
  }, 500);
});

/* ═══════════════════════════════════════
   NURA LAMP — rotatable 3D cube (drag + idle spin)
   ═══════════════════════════════════════ */
(function(){
  function initLampCube(){
    const wrap = document.getElementById('lamp-cube-wrap');
    const cube = document.getElementById('lamp-cube');
    if(!wrap || !cube || wrap.dataset.inited) return;
    wrap.dataset.inited = '1';
    let rx = -18, ry = 32, dragging = false, lastX = 0, lastY = 0, lastInteract = Date.now();
    function apply(){ cube.style.transform = 'rotateX('+rx+'deg) rotateY('+ry+'deg)'; }
    apply();
    function start(x,y){ dragging = true; lastX = x; lastY = y; lastInteract = Date.now(); wrap.style.cursor = 'grabbing'; }
    function move(x,y){
      if(!dragging) return;
      ry += (x - lastX) * 0.5;
      rx -= (y - lastY) * 0.5;
      rx = Math.max(-80, Math.min(80, rx));
      lastX = x; lastY = y; lastInteract = Date.now();
      apply();
    }
    function end(){ dragging = false; wrap.style.cursor = 'grab'; }
    wrap.addEventListener('mousedown', e => start(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY));
    window.addEventListener('mouseup', end);
    wrap.addEventListener('touchstart', e => { const t = e.touches[0]; start(t.clientX, t.clientY); }, {passive:true});
    window.addEventListener('touchmove', e => { const t = e.touches[0]; move(t.clientX, t.clientY); }, {passive:true});
    window.addEventListener('touchend', end);
    (function idleSpin(){
      if(!dragging && Date.now() - lastInteract > 2500){ ry += 0.15; apply(); }
      requestAnimationFrame(idleSpin);
    })();
  }
  document.addEventListener('DOMContentLoaded', initLampCube);
  window.addEventListener('load', initLampCube);
})();

window.addEventListener('DOMContentLoaded', function(){
  checkGreeting();
  // Close sources panel on outside click
  document.addEventListener('click', function(e){
    const panel = document.getElementById('nura-sources-panel');
    if(panel && panel.classList.contains('open') && !panel.contains(e.target)){
      const btn = document.getElementById('nura-sources-btn');
      if(!btn || !btn.contains(e.target)) panel.classList.remove('open');
    }
  });
  restoreLightModeType();
  v9_upgradeQuizCountInput();
  v9_patchQuiz();
  v9_injectNuraMindModes();
  v9_patchSendMsg();
  v9_injectMiniBarClose();
  v9_moveMiniBar();

  // Remove blob activation gate
  document.querySelectorAll('.nura-blob-gate').forEach(el=>el.remove());
  document.querySelectorAll('.nura-chat-hidden').forEach(el=>{
    el.classList.remove('nura-chat-hidden');
    el.classList.add('nura-chat-reveal');
  });
});

window.addEventListener('load', function(){
  // Hook music engine after all original scripts loaded
  v9_hookMusicEnded();

});

})(); // end IIFE
