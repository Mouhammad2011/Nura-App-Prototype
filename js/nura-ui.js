
/* v4.js */
;
/* Nura V4 interaction layer: compact sidebar, language control, smooth video. */
(()=>{
  const labels={en:{focus:'Focus',stress:'Stress',calendar:'Calendar',language:'Language',settings:'Settings',profile:'Profile'},da:{focus:'Fokus',stress:'Stress',calendar:'Kalender',language:'Sprog',settings:'Indstillinger',profile:'Profil'},de:{focus:'Fokus',stress:'Stress',calendar:'Kalender',language:'Sprache',settings:'Einstellungen',profile:'Profil'}};
  const copy={
    'Welcome back':'Velkommen tilbage|Willkommen zurÃ¼ck','Dashboard':'Oversigt|Ãœbersicht','Home':'Hjem|Startseite','Notes':'Noter|Notizen','Quiz':'Quiz|Quiz','Focus':'Fokus|Fokus','Stress':'Stress|Stress','Session':'Session|Sitzung','Calendar':'Kalender|Kalender','Settings':'Indstillinger|Einstellungen','Profile':'Profil|Profil','Language':'Sprog|Sprache','Custom colour':'Brugerdefineret farve|Benutzerdefinierte Farbe','Choose your accent colour':'VÃ¦lg din accentfarve|WÃ¤hle deine Akzentfarbe','Current colour':'NuvÃ¦rende farve|Aktuelle Farbe','Save':'Gem|Speichern','Cancel':'Annuller|Abbrechen','Close':'Luk|SchlieÃŸen','Open':'Ã…bn|Ã–ffnen','Start':'Start|Starten','Pause':'Pause|Pause','Reset':'Nulstil|ZurÃ¼cksetzen','Today':'I dag|Heute','Daily Goals':'Dagens mÃ¥l|Tagesziele','Focus Timer':'Fokustimer|Fokus-Timer','Audio Library':'Lydbibliotek|Audiobibliothek','Search':'SÃ¸g|Suchen','Add':'TilfÃ¸j|HinzufÃ¼gen','Delete':'Slet|LÃ¶schen','Edit':'Rediger|Bearbeiten','Name':'Navn|Name','Age':'Alder|Alter','Theme':'Tema|Design','Notifications':'Notifikationer|Benachrichtigungen','Security':'Sikkerhed|Sicherheit','Account':'Konto|Konto','Sign Out':'Log ud|Abmelden','Sign In':'Log ind|Anmelden','Continue as Guest':'FortsÃ¦t som gÃ¦st|Als Gast fortfahren','Create Account':'Opret konto|Konto erstellen','Email address':'E-mailadresse|E-Mail-Adresse','Password':'Adgangskode|Passwort','Full name':'Fulde navn|VollstÃ¤ndiger Name','What do you want to learn today?':'Hvad vil du lÃ¦re i dag?|Was mÃ¶chtest du heute lernen?','Ask a concept...':'SpÃ¸rg om et emne...|Frage nach einem Thema...','New Chat':'Ny chat|Neuer Chat','Files':'Filer|Dateien','No files loaded':'Ingen filer indlÃ¦st|Keine Dateien geladen','Library':'Bibliotek|Bibliothek','Watch':'Ur|Uhr','Nura Watch':'Nura Ur|Nura Watch','Light Engine':'Lysmotor|Lichtmaschine','Deep Focus':'Dyb fokus|Tiefer Fokus','Stable Focus':'Stabilt fokus|Stabiler Fokus','Break Mode':'Pause-tilstand|Pausenmodus','Relaxation':'Afslapning|Entspannung'
  };
  function translateAll(lang){const variant=lang==='da'?0:lang==='de'?1:-1;const pairs=Object.entries(copy);const lookup=new Map();pairs.forEach(([en,vars])=>{const v=vars.split('|');lookup.set(en,en);lookup.set(v[0],en);lookup.set(v[1],en)});const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement&&!n.parentElement.closest('script,style,svg,textarea,pre,code')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{const trimmed=n.nodeValue.trim(),english=lookup.get(trimmed);if(english){const next=variant<0?english:copy[english].split('|')[variant];n.nodeValue=n.nodeValue.replace(trimmed,next)}});document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>['placeholder','title','aria-label'].forEach(attr=>{const raw=el.getAttribute(attr);const english=lookup.get(raw);if(english)el.setAttribute(attr,variant<0?english:copy[english].split('|')[variant])}))}
  function icon(path){return `<span class="i-wrap" style="width:18px;height:18px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`}
  function openCalendar(){if(typeof window.openCalendar==='function')window.openCalendar();else document.querySelector('[onclick*="openCalendar"]')?.click()}
  function init(){
    document.title='Nura App';
    const originalSetLanguage=window.nuraSetLanguage;
    window.nuraSetLanguage=(lang)=>{originalSetLanguage?.(lang);translateAll(lang)};
    const sidebar=document.getElementById('main-sidebar'), nav=sidebar?.querySelector('.sidebar-nav'), profile=document.querySelector('.user-menu-container');
    if(!sidebar||!nav)return;
    if(profile&&!document.querySelector('.sidebar-profile')){const slot=document.createElement('div');slot.className='sidebar-profile';slot.appendChild(profile);sidebar.insertBefore(slot,nav)}
    const bottom=document.createElement('div');bottom.className='sidebar-bottom';
    const stats=document.createElement('button');stats.className='sidebar-btn';stats.id='v4-stats-toggle';stats.title='Focus and stress';stats.innerHTML=icon('<path d="M4 16l5-5 3 3 7-8"/><path d="M14 6h5v5"/>')+'<span class="sidebar-btn-label">Stats</span><span class="v4-chevron">âŒ„</span>';
    const flyout=document.createElement('div');flyout.className='sidebar-flyout';flyout.id='v4-stats-menu';flyout.innerHTML='<button data-stat="focus" aria-pressed="true">âœ“ Focus <strong id="v4-focus-value"></strong></button><button data-stat="stress" aria-pressed="true">âœ“ Stress <strong id="v4-stress-value"></strong></button>';
    stats.onclick=(e)=>{e.stopPropagation();stats.classList.toggle('open');flyout.classList.toggle('open')};
    flyout.onclick=e=>{const btn=e.target.closest('[data-stat]');const type=btn?.dataset.stat;if(!type)return;const card=document.getElementById(type==='focus'?'dash-focus':'dash-stress')?.closest('.vital-big');if(!card)return;const visible=card.style.display!=='none';card.style.display=visible?'none':'';btn.setAttribute('aria-pressed',String(!visible));btn.firstChild.nodeValue=(visible?'':'âœ“ ')+(type==='focus'?'Focus ':'Stress ');localStorage.setItem('nura-v4-'+type,visible?'hidden':'shown')};
    const calendar=document.createElement('button');calendar.className='sidebar-btn';calendar.title='Calendar';calendar.innerHTML=icon('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>')+'<span class="sidebar-btn-label">Calendar</span>';calendar.onclick=openCalendar;
    const language=document.createElement('button');language.className='sidebar-btn sidebar-language-btn';language.title='Language';language.innerHTML=icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>')+'<span class="sidebar-btn-label">Language</span>';language.onclick=()=>{const current=localStorage.getItem('nura-language')||'da';const next=current==='da'?'de':current==='de'?'en':'da';window.nuraSetLanguage?.(next);refreshLanguage()};
    const settings=sidebar.querySelector('.sidebar-settings-btn');nav.insertBefore(stats,nav.children[1]);bottom.append(calendar,language);if(settings)bottom.append(settings);sidebar.append(bottom,flyout);
    document.addEventListener('click',()=>{stats.classList.remove('open');flyout.classList.remove('open')});
    ['focus','stress'].forEach(type=>{if(localStorage.getItem('nura-v4-'+type)==='hidden'){const btn=flyout.querySelector(`[data-stat="${type}"]`);btn?.click()}});makeColourPicker(); smoothVideo(); window.nuraSetLanguage(localStorage.getItem('nura-language')||'da'); refreshLanguage();
  }
  function refreshLanguage(){const l=localStorage.getItem('nura-language')||'da', t=labels[l]||labels.en;document.querySelector('#v4-stats-menu [data-stat="focus"]').childNodes[0].nodeValue=t.focus+' ';document.querySelector('#v4-stats-menu [data-stat="stress"]').childNodes[0].nodeValue=t.stress+' ';document.querySelector('#v4-stats-toggle .sidebar-btn-label').textContent='Stats';document.querySelectorAll('.sidebar-btn').forEach(b=>{if(b.title==='Calendar')b.querySelector('.sidebar-btn-label').textContent=t.calendar;if(b.title==='Language')b.querySelector('.sidebar-btn-label').textContent=t.language;if(b.title==='Settings')b.querySelector('.sidebar-btn-label').textContent=t.settings});document.getElementById('v4-focus-value').textContent=document.getElementById('top-focus')?.textContent||'--';document.getElementById('v4-stress-value').textContent=document.getElementById('top-stress')?.textContent||'--'}
  function makeColourPicker(){const control=document.querySelector('.colour-popup-controls');if(!control||document.getElementById('v4-colour-picker'))return;const picker=document.createElement('input');picker.id='v4-colour-picker';picker.className='v4-colour-picker';picker.type='color';picker.value=document.getElementById('colour-popup-hex')?.value||'#7c5cfc';picker.setAttribute('aria-label','Choose accent colour');picker.oninput=()=>{document.getElementById('colour-popup-hex').value=picker.value;window.applyCustomColour?.(picker.value)};control.prepend(picker)}
  function smoothVideo(){const video=document.getElementById('nura-desert-video');if(!video)return;video.preload='metadata';video.playbackRate=1;video.addEventListener('canplay',()=>video.classList.add('ready'),{once:true});if(video.readyState<3){video.pause();video.addEventListener('canplaythrough',()=>video.play().catch(()=>{}),{once:true})}}
  document.addEventListener('DOMContentLoaded',init);
})();

;

/* v5.js */
;
/* Nura V5: simplify the shell and add account-aware NuraQuiz. */
(()=>{
  const guest=()=>{try{const p=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');return !!(p.isGuest||!p.email)}catch{return true}};
  const modal=()=>{let el=document.querySelector('.nura-guest-message');if(!el){el=document.createElement('div');el.className='nura-guest-message';el.innerHTML='<div class="nura-guest-card"><h2>Login required</h2><p>Login to use settings, Nura Mind, NuraQuiz, and NeuroMind plans. Guest mode only includes casual Nura Chat.</p><button class="btn primary" id="nura-guest-login">Log in</button></div>';document.body.append(el);el.querySelector('#nura-guest-login').onclick=()=>{el.classList.remove('show');window.authShowSignIn?.();window.showSignOutGate?.()};el.onclick=e=>{if(e.target===el)el.classList.remove('show')}}el.classList.add('show')};
  function initials(){const b=document.querySelector('.sidebar-profile .user-badge');const img=document.getElementById('user-badge-img');if(!b||!img)return;const p=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');const letter=(p.name||'G').trim().charAt(0).toUpperCase();if(!img.getAttribute('src')){img.style.display='none';let a=b.querySelector('.v5-avatar');if(!a){a=document.createElement('span');a.className='v5-avatar';a.style.cssText='width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,var(--accent),#d6b5ff);color:#fff;font:700 15px Outfit,sans-serif';b.append(a)}a.textContent=letter}}
  function quizMode(){const tutor=document.getElementById('tutor'), top=tutor?.querySelector('.tutor-topbar'), main=tutor?.querySelector('.tutor-main'), quiz=document.getElementById('quiz-panel');if(!tutor||!top||!main||!quiz)return;const holder=document.createElement('div');holder.className='nuraquiz-pane';holder.append(quiz);main.append(holder);const switcher=document.createElement('div');switcher.className='nura-mode-switcher';switcher.innerHTML='<button class="active" data-mode="chat">Nura Chat</button><button data-mode="quiz">NuraQuiz</button>';top.insertBefore(switcher,top.querySelector('.mode-tag'));switcher.onclick=e=>{const mode=e.target.dataset.mode;if(!mode)return;if(mode==='quiz'&&guest()){modal();return}switcher.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));holder.classList.toggle('active',mode==='quiz');tutor.querySelector('.tutor-chat-area').style.display=mode==='quiz'?'none':'';tutor.querySelector('.tutor-input-area').style.display=mode==='quiz'?'none':'';tutor.querySelector('.file-side-panel').style.display=mode==='quiz'?'none':''};}
  function quizResults(){const old=window.showQuizResults;window.showQuizResults=function(){old?.();const score=(document.getElementById('quiz-final-score')?.textContent||'0 / 1').match(/(\d+)\s*\/\s*(\d+)/);const pct=score?Math.round((Number(score[1])/Math.max(Number(score[2]),1))*100):0;const history=JSON.parse(localStorage.getItem('nura-quiz-history')||'[]');const prior=history.length?history[history.length-1].pct:null;history.push({pct,at:new Date().toISOString()});localStorage.setItem('nura-quiz-history',JSON.stringify(history.slice(-50)));let pop=document.querySelector('.nura-quiz-result');if(!pop){pop=document.createElement('div');pop.className='nura-quiz-result';pop.innerHTML='<div class="nura-quiz-result-card"><h2>NuraQuiz result</h2><div class="nura-quiz-result-score"></div><p></p><button class="btn primary">Done</button></div>';document.body.append(pop);pop.querySelector('button').onclick=()=>pop.classList.remove('show')}pop.querySelector('.nura-quiz-result-score').textContent=pct+'%';pop.querySelector('p').textContent=prior===null?'Your first saved quiz result.':`${pct-prior>=0?'+':''}${pct-prior}% from your previous quiz.`;pop.classList.add('show')};}
  function restrictions(){const mind=window.navNuraMind;window.navNuraMind=function(btn){if(guest()){modal();return}return mind?.(btn)};const settings=window.openSettingsModal;window.openSettingsModal=function(){if(guest()){modal();return}return settings?.()};}
  function languageSetting(){const ui=document.getElementById('spanel-ui');if(!ui||document.getElementById('v5-language-setting'))return;const row=document.createElement('div');row.className='s-row';row.id='v5-language-setting';row.innerHTML='<label class="s-label">Language</label><select class="s-input" style="max-width:160px"><option value="en">English</option><option value="da">Dansk</option><option value="de">Deutsch</option></select>';const select=row.querySelector('select');select.value=localStorage.getItem('nura-language')||'da';select.onchange=()=>window.nuraSetLanguage?.(select.value);ui.append(row)}
  function removeWatermark(){const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(/nura.*email.*verif|email.*verification.*required/i.test(n.nodeValue))n.parentElement.style.display='none'})}
  document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#v4-stats-toggle')?.remove();document.querySelector('#v4-stats-menu')?.remove();document.querySelectorAll('.sidebar-bottom>.sidebar-language-btn,.sidebar-bottom>button[title="Calendar"]').forEach(e=>e.remove());document.querySelector('.sidebar-nav button[onclick*="quiz-panel"]')?.remove();quizMode();quizResults();restrictions();languageSetting();removeWatermark();setTimeout(initials,60)});
})();

;

/* v6.js */
;
/* Nura V6: Firebase-config-aware AI start, in-chat mode menu, complete UI copy pass. */
(()=>{
  const translations={
    'What do you want to learn today?':'Hvad vil du lÃ¦re i dag?|Was mÃ¶chtest du heute lernen?',
    'Open the Files panel or paste text to give Nura context â€” then ask anything.':'Ã…bn Filer-panelet eller indsÃ¦t tekst for at give Nura kontekst â€” spÃ¸rg derefter om hvad som helst.|Ã–ffne Dateien oder fÃ¼ge Text ein, um Nura Kontext zu geben â€” frage dann alles.',
    'No files loaded':'Ingen filer indlÃ¦st|Keine Dateien geladen','New Chat':'Ny chat|Neuer Chat','Files':'Filer|Dateien','Send':'Send|Senden','Add Note':'TilfÃ¸j note|Notiz hinzufÃ¼gen','Study Notes Log':'Studienotater|Lernnotizen','Auto-saved from Nura Mind Â· Click to open editor':'Gemmes automatisk fra Nura Mind Â· Klik for at Ã¥bne editoren|Automatisch von Nura Mind gespeichert Â· Zum Ã–ffnen klicken','Add subject...':'TilfÃ¸j fag...|Fach hinzufÃ¼gen','No notes yet.':'Ingen noter endnu.|Noch keine Notizen.','Chat with Nura Mind and ask it to save to notes.':'Chat med Nura Mind og bed den gemme noter.|Chatte mit Nura Mind und bitte es, Notizen zu speichern.','Nura Chat':'Nura Chat|Nura Chat','NuraQuiz':'NuraQuiz|NuraQuiz','Settings':'Indstillinger|Einstellungen','Home':'Hjem|Startseite','Watch':'Ur|Uhr','Notes':'Noter|Notizen','Language':'Sprog|Sprache','Theme':'Tema|Design','Light':'Lys|Hell','Dark':'MÃ¸rk|Dunkel','Custom colour':'Brugerdefineret farve|Benutzerdefinierte Farbe','Choose your accent colour':'VÃ¦lg din accentfarve|Akzentfarbe wÃ¤hlen','Generate Quiz':'Start quiz|Quiz starten','TOPIC / SUBJECT':'EMNE / FAG|THEMA / FACH','QUESTIONS (max 20)':'SPÃ˜RGSMÃ…L (maks. 20)|FRAGEN (max. 20)','Try Another Quiz':'PrÃ¸v en ny quiz|Neues Quiz versuchen','Question':'SpÃ¸rgsmÃ¥l|Frage','Score':'Resultat|Punktzahl'
  };
  function applyCopy(lang){const n=lang==='da'?0:lang==='de'?1:-1;const reverse=new Map;Object.entries(translations).forEach(([en,value])=>{reverse.set(en,en);value.split('|').forEach(v=>reverse.set(v,en))});const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:x=>x.parentElement&&!x.parentElement.closest('script,style,svg,textarea,pre,code')?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(x=>{const t=x.nodeValue.trim(),en=reverse.get(t);if(en)x.nodeValue=x.nodeValue.replace(t,n<0?en:translations[en].split('|')[n])});document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>['placeholder','title','aria-label'].forEach(a=>{const en=reverse.get(el.getAttribute(a));if(en)el.setAttribute(a,n<0?en:translations[en].split('|')[n])}))}
  function profileTopRight(){const profile=document.querySelector('.user-menu-container');if(!profile)return;let anchor=document.getElementById('v6-profile-anchor');if(!anchor){anchor=document.createElement('div');anchor.id='v6-profile-anchor';document.body.append(anchor)}anchor.append(profile)}
  function modeMenu(){const switcher=document.querySelector('.nura-mode-switcher');if(!switcher||document.getElementById('v6-mode-menu'))return;const select=document.createElement('select');select.id='v6-mode-menu';select.setAttribute('aria-label','Choose Nura AI mode');select.innerHTML='<option value="chat">Nura Chat</option><option value="quiz">NuraQuiz</option>';select.onchange=()=>switcher.querySelector(`[data-mode="${select.value}"]`)?.click();switcher.querySelectorAll('button').forEach(b=>b.style.display='none');switcher.append(select)}
  function waitForFirebaseKey(){['sendMsg','generateQuiz'].forEach(name=>{const original=window[name];if(typeof original!=='function'||original._v6)return;window[name]=async function(...args){if(!window.getApiKey?.()&&typeof window._fetchConfigKey==='function'){await window._fetchConfigKey();await new Promise(r=>setTimeout(r,80))}return original.apply(this,args)};window[name]._v6=true})}
  document.addEventListener('DOMContentLoaded',()=>{profileTopRight();modeMenu();waitForFirebaseKey();const set=window.nuraSetLanguage;window.nuraSetLanguage=(lang)=>{set?.(lang);applyCopy(lang)};applyCopy(localStorage.getItem('nura-language')||'da');document.querySelectorAll('*').forEach(el=>{if(/nura\s*Â·\s*email verification required/i.test(el.textContent||''))el.style.display='none'})});
})();

;

/* v7.js */
;
/* Nura V7: top bar restored; NuraQuiz belongs in Nura Flow's existing menu. */
(()=>{
  function restoreShell(){const top=document.getElementById('main-topbar');const right=top?.querySelector('.topbar-right');const profile=document.querySelector('.user-menu-container');if(top&&!top.querySelector('.v7-brand')){const left=document.createElement('div');left.className='topbar-left';left.innerHTML='<div class="v7-brand"><img src="assets/nura-logo.png" alt="Nura logo"><div>NURA<small>FOCUS Â· LEARN Â· GLOW</small></div></div>';top.prepend(left)}if(profile&&right)right.append(profile);document.getElementById('v6-profile-anchor')?.remove();document.querySelector('.nura-mode-switcher')?.remove();}
  function attachQuizToFlow(){const dropdown=document.getElementById('nura-model-dropdown');if(!dropdown||document.getElementById('nura-tab-quiz'))return false;const option=document.createElement('div');option.id='nura-tab-quiz';option.className='model-opt v7-quiz-option';option.innerHTML='<div style="width:28px;height:28px;border-radius:8px;background:rgba(124,92,252,.13);border:1px solid rgba(124,92,252,.3);display:grid;place-items:center;color:var(--accent2)">?</div><div><div style="font-size:12px;font-weight:600">NuraQuiz</div><div style="font-size:10px;color:var(--text3)">Topic-based questions Â· one at a time</div></div>';option.onclick=()=>activateQuiz();dropdown.append(option);return true}
  function activateQuiz(){const tutor=document.getElementById('tutor'),pane=document.querySelector('.nuraquiz-pane');if(!tutor||!pane)return;document.querySelectorAll('.model-opt').forEach(x=>x.style.background='');document.getElementById('nura-tab-quiz').style.background='var(--accent-glow)';document.getElementById('nura-model-label').textContent='NuraQuiz';document.getElementById('nura-model-dropdown').style.display='none';document.getElementById('nura-model-arrow').style.transform='rotate(0deg)';pane.classList.add('active');tutor.querySelector('.tutor-chat-area').style.display='none';tutor.querySelector('.tutor-input-area').style.display='none';tutor.querySelector('.file-side-panel').style.display='none'}
  function patchFlowModes(){const previous=window.v9SetNuraMode;if(typeof previous!=='function'||previous._v7)return false;window.v9SetNuraMode=function(mode){if(mode==='quiz'){activateQuiz();return}const result=previous(mode);const tutor=document.getElementById('tutor');document.querySelector('.nuraquiz-pane')?.classList.remove('active');if(tutor){tutor.querySelector('.tutor-chat-area').style.display='';tutor.querySelector('.tutor-input-area').style.display='';tutor.querySelector('.file-side-panel').style.display=''}return result};window.v9SetNuraMode._v7=true;return true}
  document.addEventListener('DOMContentLoaded',()=>{document.body.classList.remove('light-theme');localStorage.setItem('nura-theme','dark');restoreShell();let tries=0;const timer=setInterval(()=>{attachQuizToFlow();if(patchFlowModes()||++tries>25)clearInterval(timer)},120)});
})();

;

/* v8.js */
;
/* Nura V8: initials profile and no light/dark controls. */
(()=>{
  function initials(name){const parts=(name||'Nura User').trim().split(/\s+/).filter(Boolean);return (parts[0]?.[0]||'N')+(parts[1]?.[0]||'')}
  function setAvatar(){const button=document.querySelector('#main-topbar .user-badge');const img=document.getElementById('user-badge-img');if(!button||!img)return;let profile={};try{profile=JSON.parse(localStorage.getItem('nura-user-profile')||'{}')}catch{}const source=profile.pfp||profile.avatar||img.getAttribute('src')||'';let fallback=button.querySelector('.v8-initials-avatar');if(source){img.src=source;img.style.display='block';button.classList.remove('has-initials');fallback?.remove()}else{img.removeAttribute('src');button.classList.add('has-initials');if(!fallback){fallback=document.createElement('span');fallback.className='v8-initials-avatar';button.prepend(fallback)}fallback.textContent=initials(profile.name||document.getElementById('ud-name-display')?.textContent)} }
  function removeThemeControls(){document.querySelectorAll('#spanel-ui .s-row').forEach(row=>{const label=row.querySelector('.s-label')?.textContent.trim().toLowerCase();if(label==='theme'||label==='match device')row.remove()})}
  document.addEventListener('DOMContentLoaded',()=>{removeThemeControls();setAvatar();setTimeout(setAvatar,300);setTimeout(setAvatar,1000);const old=window.renderUserProfile;if(typeof old==='function')window.renderUserProfile=function(...args){const out=old.apply(this,args);setTimeout(setAvatar,0);return out}});
})();

;

/* v9.js */
;
/* Remove every theme control, including translated profile labels. */
(()=>{function removeTheme(){document.querySelectorAll('#userDropdown>div,#spanel-ui .s-row').forEach(row=>{const text=(row.textContent||'').trim().toLowerCase();if(/^(theme|tema|design)$/.test(text)||/^(theme|tema|design)\s*(dark|light|mÃ¸rk|lys|dunkel|hell)/.test(text)||text.includes('match device'))row.remove()});document.getElementById('theme-toggle-btn')?.parentElement?.remove();document.body.classList.remove('light-theme');localStorage.setItem('nura-theme','dark')}document.addEventListener('DOMContentLoaded',removeTheme)})();

;

/* v10.js */
;
/* V10: Firebase-key wait, chat-native NuraQuiz and refined local UI behavior. */
(()=>{let quiz=null;const sleep=n=>new Promise(r=>setTimeout(r,n));const hist=()=>JSON.parse(localStorage.getItem('nura-quiz-results')||'[]');
const typing=on=>{let e=document.getElementById('v10-typing');if(on&&!e){e=document.createElement('div');e.id='v10-typing';e.className='v10-typing';e.innerHTML='<i></i><i></i><i></i>';document.getElementById('chat-box')?.append(e)}if(!on)e?.remove()};
async function key(){if(!window.getApiKey?.()&&window._fetchConfigKey){await window._fetchConfigKey();await sleep(120)}return window.getApiKey?.()}
function results(){let e=document.getElementById('v10-results');if(!e){e=document.createElement('div');e.id='v10-results';e.className='v10-results';e.innerHTML='<div class="v10-results-card"><button>â—</button><h3>Results</h3><div></div></div>';e.querySelector('button').onclick=()=>e.classList.remove('show');document.body.append(e)}e.querySelector('.v10-results-card div').innerHTML=hist().slice().reverse().map(x=>`<div class="v10-result"><strong>${x.topic}</strong><br>${x.score}% Â· ${new Date(x.at).toLocaleDateString()}</div>`).join('')||'No quiz results yet.';e.classList.add('show')}
function addResultsTab(){const host=document.getElementById('nura-chathist-tab')?.parentElement;if(host&&!document.getElementById('nura-results-tab')){const b=document.createElement('button');b.id='nura-results-tab';b.textContent='RESULTS';b.onclick=results;host.prepend(b)}}
function addQuizModel(){const dd=document.getElementById('nura-model-dropdown');if(!dd||document.getElementById('nura-tab-quiz'))return false;const b=document.createElement('div');b.id='nura-tab-quiz';b.className='model-opt';b.style.cssText='padding:10px 14px;cursor:pointer';b.textContent='NuraQuiz â€” conversational quiz mode';b.onclick=()=>{document.getElementById('nura-model-label').textContent='NuraQuiz';dd.style.display='none';document.getElementById('chat-input').placeholder='Make me a quiz about biology and make it 10 questions';};dd.append(b);const labels={chat:'NuraChat',research:'NuraSearch',code:'Neurode'};Object.entries(labels).forEach(([m,n])=>{const e=document.getElementById('nura-tab-'+m);if(e)e.querySelector('div div')?.replaceChildren(n)});return true}
async function startQuiz(text){const count=Math.min(Number(text.match(/(\d+)\s*questions?/i)?.[1]||10),20),topic=(text.match(/(?:about|on)\s+(.+?)(?:\s+and\s+make|$)/i)?.[1]||text).trim(),k=await key();if(!k){addMsg('ai','Nura is connecting to Firebase. Please send that again in a moment.');return}typing(true);await sleep(1200);try{const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+k},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:2200,messages:[{role:'user',content:`Return only JSON: ${count} multiple choice quiz questions about ${topic}, [{"q":"","opts":["","","",""],"ans":0}]`}]})}),d=await r.json();quiz={topic,items:JSON.parse(d.choices[0].message.content.replace(/```json|```/g,'')),i:0,ok:0};typing(false);ask()}catch{typing(false);addMsg('ai','I could not generate that quiz. Try again.')}}
function ask(){const q=quiz.items[quiz.i];addMsg('ai',`Question ${quiz.i+1}/${quiz.items.length}: ${q.q}\nA. ${q.opts[0]}\nB. ${q.opts[1]}\nC. ${q.opts[2]}\nD. ${q.opts[3]}`)}
async function answer(text){const c='ABCD'.indexOf(text.trim().charAt(0).toUpperCase());if(c<0){addMsg('ai','Please answer A, B, C, or D.');return}quiz.ok+=c===quiz.items[quiz.i].ans?1:0;quiz.i++;if(quiz.i<quiz.items.length){typing(true);await sleep(1100);typing(false);ask();return}const score=Math.round(quiz.ok/quiz.items.length*100),h=hist(),old=h.at(-1)?.score;h.push({topic:quiz.topic,score,at:new Date().toISOString()});localStorage.setItem('nura-quiz-results',JSON.stringify(h));document.dispatchEvent(new CustomEvent('nuraquizcomplete'));addMsg('ai',`Quiz complete: ${score}% (${old==null?'first result':(score-old>=0?'+':'')+(score-old)+'% compared with your last quiz'}).`);quiz=null;results()}
function timer(){const presets=document.querySelector('.focus-timer-wrap div[style*="flex-wrap"]');if(presets){presets.innerHTML='<select id="ft-mode-select"><option value="50">Deep Work Â· 50 min</option><option value="25">Focus Â· 25 min</option><option value="10">Breather Â· 10 min</option><option value="5">Calm Down Â· 5 min</option><option value="custom">Custom</option></select>';presets.className='ft-custom-row';presets.querySelector('select').onchange=e=>{if(e.target.value==='custom'){document.getElementById('ft-custom-min')?.focus()}else window.applyFocusPreset?.(Number(e.target.value),e.target.selectedOptions[0].text)}}}
document.addEventListener('DOMContentLoaded',()=>{addResultsTab();timer();let n=0;const t=setInterval(()=>{if(addQuizModel()||++n>30)clearInterval(t)},120);const old=window.sendMsg;window.sendMsg=async function(){const input=document.getElementById('chat-input'),text=input?.value.trim();if(!text)return;if(quiz){input.value='';addMsg('user',text);return answer(text)}if(/\b(make|create|give)\b.*\bquiz\b/i.test(text)){input.value='';addMsg('user',text);return startQuiz(text)}const k=await key();if(!k){addMsg('ai','Nura is connecting to Firebase. Please try again in a moment.');return}typing(true);await sleep(1100);typing(false);return old?.()};document.querySelectorAll('.modal,.popup,.nw-popup,.nw-alert-overlay,.colour-popup-overlay').forEach(e=>e.addEventListener('click',x=>{if(x.target===e)e.classList.remove('open','show')}))});})();

;

/* v12.js */
;
/* V12 applies V10's conversational quiz only and locks visible UI copy to English. */
(()=>{function removeCalendar(){document.querySelectorAll('.sidebar button').forEach(b=>{const text=(b.textContent||'').trim().toLowerCase();if(text.includes('calendar')||text.includes('kalender')||b.title==='Calendar')b.remove()})}function english(){localStorage.setItem('nura-language','en');document.documentElement.lang='en';window.nuraSetLanguage?.('en');document.querySelectorAll('.sidebar-btn-label').forEach(e=>{const m={hjem:'Home',ur:'Watch',noter:'Notes',indstillinger:'Settings',kalender:'Calendar'};const v=e.textContent.trim().toLowerCase();if(m[v])e.textContent=m[v]})}document.addEventListener('DOMContentLoaded',()=>{removeCalendar();english();document.querySelectorAll('.nura-mode-switcher,[id="v6-mode-menu"]').forEach(e=>e.remove());const noteNav=[...document.querySelectorAll('.sidebar-nav button')].find(b=>(b.textContent||'').includes('Quiz'));noteNav?.remove()})})();

;

/* v13.js */
;
/* Turn visible close controls into Mac-style red dots. */
(()=>{document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('button').forEach(b=>{const title=(b.title||'').toLowerCase(),text=(b.textContent||'').trim();if(title.includes('close')||title.includes('dismiss')||text==='Ã—'||text==='âœ•'||text==='X')b.classList.add('mac-close')})})();})();

;

/* v14-final.js */
;
/* Ensure NuraQuiz uses normal chat messages and the sidebar owns the brand. */
(()=>{function normalQuiz(){const item=document.getElementById('nura-tab-quiz');if(!item)return false;item.onclick=()=>{document.getElementById('nura-model-label').textContent='NuraQuiz';document.getElementById('nura-model-dropdown').style.display='none';document.querySelectorAll('.nuraquiz-pane').forEach(e=>e.style.display='none');const tutor=document.getElementById('tutor');tutor?.querySelector('.tutor-chat-area')?.style.setProperty('display','');tutor?.querySelector('.tutor-input-area')?.style.setProperty('display','');tutor?.querySelector('.file-side-panel')?.style.setProperty('display','');const input=document.getElementById('chat-input');if(input){input.placeholder='I want you to give me a quiz about geometry and ask me 10 questions';input.focus()}};return true}document.addEventListener('DOMContentLoaded',()=>{document.querySelector('.v7-brand')?.remove();let tries=0;const t=setInterval(()=>{if(normalQuiz()||++tries>30)clearInterval(t)},120)})})();

;

/* v15.js */
;
/* V15: force the working V13 Firebase config fetch, restore Notes/X, and live-refresh chats. */
(()=>{async function fetchV13Config(){try{const db=window.firebase?.firestore?.();if(!db)return;const snap=await db.collection('config').doc('app').get();if(!snap.exists)return;const d=snap.data(),key=d.groqKey||d.groq_api||d.groqApi||d.groqAPI||d['groq api']||d.groq;if(key)window._nuraConfigKey=key;const gem=d.geminiKey||d.gemini_api||d.geminiApi||d['gemini api']||d.gemini;if(gem)window._nuraGeminiKey=gem}catch(e){console.warn('Nura Firebase config unavailable',e)}}
function stateFeed(){const cube=document.getElementById('lamp-cube-wrap');const host=cube?.parentElement;if(!host)return;host.innerHTML='<div class="v15-state-feed"><strong>AI state</strong><span id="v15-state-copy">Reading your current focusâ€¦</span></div>';const update=()=>{const f=document.getElementById('dash-focus')?.textContent||'--',s=document.getElementById('dash-stress')?.textContent||'--';const copy=document.getElementById('v15-state-copy');if(copy)copy.textContent=`Focus ${f}\nStress ${s}\nStay steady.`};update();setInterval(update,5000)}
function refreshDeletes(){const old=window.deleteChatSession;if(typeof old!=='function')return;window.deleteChatSession=async function(sid){await old(sid);await new Promise(r=>setTimeout(r,80));window.loadChatHistoryPanel?.()}}
document.addEventListener('DOMContentLoaded',()=>{window._fetchConfigKey=fetchV13Config;fetchV13Config();document.querySelectorAll('.mac-close').forEach(e=>e.classList.remove('mac-close'));stateFeed();refreshDeletes()});})();

;

/* final.js */
;
/* Final delivery: resilient Firebase-config fetch and a real cube replacement. */
(()=>{async function fetchFirebaseConfig(){try{const db=window.firebase?.firestore?.();if(!db)return false;const snap=await db.collection('config').doc('app').get();if(!snap.exists)return false;const d=snap.data();const key=d.groqKey||d.groq_api||d.groqApi||d.groqAPI||d['groq api']||d.groq;if(key)window._nuraConfigKey=key;const gem=d.geminiKey||d.gemini_api||d.geminiApi||d['gemini api']||d.gemini;if(gem)window._nuraGeminiKey=gem;return !!key}catch(e){console.warn('Firebase AI configuration could not be read.',e);return false}}
function stateFeed(){const wrap=document.getElementById('lamp-cube-wrap');if(!wrap)return false;const panel=wrap.parentElement;if(!panel||panel.dataset.finalFeed)return true;const feed=document.createElement('div');feed.className='vfinal-state-feed';feed.innerHTML='<b>AI state</b><span id="vfinal-state-copy">Reading focus and stressâ€¦</span>';panel.replaceWith(feed);const refresh=()=>{const focus=document.getElementById('dash-focus')?.textContent||'--',stress=document.getElementById('dash-stress')?.textContent||'--';const s=document.getElementById('vfinal-state-copy');if(s)s.textContent=`Focus ${focus}\nStress ${stress}\nNura is monitoring your pace.`};refresh();setInterval(refresh,4000);return true}
function removeWatermark(){const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(/nura\s*[Â·*]\s*email verification required/i.test(n.nodeValue))n.parentElement.style.display='none'})}
document.addEventListener('DOMContentLoaded',()=>{document.title='Nura App';window._fetchConfigKey=fetchFirebaseConfig;fetchFirebaseConfig();removeWatermark();let tries=0;const timer=setInterval(()=>{if(stateFeed()||++tries>25)clearInterval(timer)},100)});})();

;

/* final-v2.js */
;
/* Case-insensitive V13 Firestore config fetch, full Cube Light replacement, glass cursor. */
(()=>{async function config(){try{const db=window.firebase?.firestore?.();if(!db)return false;const snap=await db.collection('config').doc('app').get();if(!snap.exists)return false;const raw=snap.data(),normalized={};Object.entries(raw).forEach(([k,v])=>normalized[k.toLowerCase().replace(/[\s_\-]/g,'')]=v);const key=normalized.groqkey||normalized.groqapi||normalized.groq;if(key)window._nuraConfigKey=key;const gem=normalized.geminikey||normalized.geminiapi;if(gem)window._nuraGeminiKey=gem;return !!key}catch(e){console.warn('Could not read config/app from Firestore.',e);return false}}
function liveFeed(){const cube=[...document.querySelectorAll('.panel')].find(p=>/cube light engine/i.test(p.textContent||''));if(!cube)return false;cube.innerHTML='<div class="v2-live-feed"><h3>Live AI state feed</h3><div class="v2-live-item"><span class="v2-live-dot"></span><strong id="v2-state-title">Monitoring your pace</strong><br><span id="v2-state-copy">Nura is reading focus and stress trends.</span></div><div class="v2-live-item" id="v2-state-values">Focus -- Â· Stress --</div></div>';const refresh=()=>{const focus=document.getElementById('dash-focus')?.textContent||'--',stress=document.getElementById('dash-stress')?.textContent||'--';const copy=document.getElementById('v2-state-copy'),values=document.getElementById('v2-state-values');if(values)values.textContent=`Focus ${focus} Â· Stress ${stress}`;if(copy)copy.textContent=Number.parseInt(stress)>60?'Stress is elevated. Take the next task gently.':'Your current rhythm looks steady. Keep one task in view.'};refresh();setInterval(refresh,3500);return true}
function cursor(){if(!matchMedia('(pointer:fine)').matches)return;const c=document.createElement('div');c.className='v2-cursor';document.body.append(c);let down=false,x=0,y=0;const interactive=e=>e.target.closest('button,a,input,textarea,select,[role="button"]');addEventListener('pointermove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';if(down)c.classList.add('drag');c.classList.toggle('hover',!!interactive(e))});addEventListener('pointerdown',()=>{down=true;c.classList.add('down')});addEventListener('pointerup',()=>{down=false;c.classList.remove('down','drag');c.classList.add('click');setTimeout(()=>c.classList.remove('click'),230)});addEventListener('pointerleave',()=>c.style.opacity='0');addEventListener('pointerenter',()=>c.style.opacity='1')}
document.addEventListener('DOMContentLoaded',()=>{window._fetchConfigKey=config;config();let i=0;const t=setInterval(()=>{if(liveFeed()||++i>30)clearInterval(t)},100);cursor()});})();

;

/* results-fix.js */
;
(() => {
  const apply = () => {
    const resultsTab = document.getElementById('nura-results-tab');
    if (!resultsTab) return;
    resultsTab.textContent = 'RESULTS';
    resultsTab.setAttribute('aria-label', 'Quiz results');
    resultsTab.setAttribute('title', 'Quiz results');
  };
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', apply)
    : apply();
})();

;

/* utility-menu.js */
;
(() => {
  const icons = {
    results: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a4 4 0 0 0 4 4M17 6h3v1a4 4 0 0 1-4 4"/></svg>',
    chats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    sources: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.5.4l2-2a5 5 0 0 0-7-7l-1.2 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.4l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></svg>'
  };

  const install = () => {
    const bar = document.querySelector('.tutor-topbar');
    const results = document.getElementById('nura-results-tab');
    const chats = document.getElementById('nura-chathist-tab');
    const sources = document.getElementById('nura-src-tab');
    if (!bar || !results || !chats || !sources || document.getElementById('nura-utility-menu')) return;

    const oldRail = chats.parentElement;
    const menu = document.createElement('div');
    menu.id = 'nura-utility-menu';
    bar.append(menu);
    [results, chats, sources].forEach((button, index) => {
      button.removeAttribute('style');
      button.onmouseover = null;
      button.onmouseout = null;
      button.onclick = null;
      button.className = 'nura-utility-tab';
      const kind = ['results', 'chats', 'sources'][index];
      button.dataset.utility = kind;
      button.innerHTML = `<span class="nura-utility-icon">${icons[kind]}</span><span>${kind.toUpperCase()}</span>`;
      menu.append(button);
    });
    oldRail?.remove();

    const resultsPanel = document.createElement('section');
    resultsPanel.id = 'nura-results-panel';
    resultsPanel.innerHTML = '<div class="nura-utility-panel-head"><strong>Quiz results</strong><button class="nura-utility-close" aria-label="Close results">Ã—</button></div><div id="nura-results-list"></div>';
    document.body.append(resultsPanel);

    const panels = {
      results: resultsPanel,
      chats: document.getElementById('nura-chathist-panel'),
      sources: document.getElementById('nura-sources-panel')
    };
    const buttons = { results, chats, sources };
    const closeAll = () => {
      Object.values(panels).forEach(panel => panel?.classList.remove('open'));
      Object.values(buttons).forEach(button => button.classList.remove('is-open'));
    };
    const position = () => {
      const rect = bar.getBoundingClientRect();
      document.documentElement.style.setProperty('--nura-utility-top', `${Math.round(rect.bottom + 8)}px`);
    };
    const renderResults = () => {
      const target = document.getElementById('nura-results-list');
      const entries = JSON.parse(localStorage.getItem('nura-quiz-results') || '[]').slice().reverse();
      target.innerHTML = entries.length
        ? entries.map(entry => `<div class="nura-result-row"><strong>${entry.topic || 'Quiz'}</strong><br>${entry.score ?? 0}% Â· ${new Date(entry.at || Date.now()).toLocaleDateString()}</div>`).join('')
        : '<div class="nura-result-empty">No quiz results yet. Start a NuraQuiz conversation to save your progress.</div>';
    };
    const open = kind => {
      const panel = panels[kind];
      const alreadyOpen = panel?.classList.contains('open');
      closeAll();
      if (alreadyOpen || !panel) return;
      position();
      panel.classList.add('open');
      buttons[kind].classList.add('is-open');
      if (kind === 'results') renderResults();
      if (kind === 'chats') window.loadChatHistoryPanel?.();
      if (kind === 'sources') window.renderSourcesList?.();
    };

    Object.entries(buttons).forEach(([kind, button]) => button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      open(kind);
    }));
    resultsPanel.querySelector('.nura-utility-close').addEventListener('click', closeAll);
    document.querySelectorAll('#nura-chathist-panel button[onclick*="toggleChatHistoryPanel"], #nura-sources-panel button[onclick*="toggleSourcesPanel"]').forEach(button => {
      button.onclick = closeAll;
    });
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !Object.values(panels).some(panel => panel?.contains(event.target))) closeAll();
    });
    window.addEventListener('resize', position);
    [document.getElementById('nura-chathist-list'), document.getElementById('nura-sources-list-wrap')].forEach(tray => {
      if (!tray) return;
      let velocity = 0;
      let frame = 0;
      const glide = () => {
        if (!velocity) { frame = 0; return; }
        tray.scrollLeft += velocity;
        frame = requestAnimationFrame(glide);
      };
      tray.addEventListener('pointermove', event => {
        const rect = tray.getBoundingClientRect();
        const edge = Math.min(72, rect.width * .18);
        velocity = event.clientX < rect.left + edge ? -8 : event.clientX > rect.right - edge ? 8 : 0;
        if (!velocity && frame) { cancelAnimationFrame(frame); frame = 0; }
        if (velocity && !frame) frame = requestAnimationFrame(glide);
      });
      tray.addEventListener('pointerleave', () => { velocity = 0; cancelAnimationFrame(frame); frame = 0; });
    });
    position();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', install) : install();
})();

;

/* video-smooth.js */
;
(() => {
  const start = () => {
    const video = document.getElementById('nura-desert-video');
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      video.classList.add('nura-video-ready');
    };
    const warmUp = () => {
      if (typeof video.requestVideoFrameCallback !== 'function') {
        window.setTimeout(reveal, 220);
        return;
      }
      let frames = 0;
      const next = () => {
        video.requestVideoFrameCallback(() => {
          frames += 1;
          if (frames >= 3) reveal();
          else next();
        });
      };
      next();
    };
    video.addEventListener('playing', warmUp, { once: true });
    video.play().catch(() => {
      video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
    });
    if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) warmUp();
    window.setTimeout(reveal, 1800); // Never leave the fallback visible if a browser skips callbacks.
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();

;

/* fixes.js */
;
/* Last-loaded compatibility and UX fixes. Keeps legacy inline handlers working. */
(function () {
  'use strict';

  function dialog(title, message, confirmText) {
    let overlay = document.getElementById('nura-styled-dialog');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'nura-styled-dialog';
      overlay.className = 'nura-dialog-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `<section class="nura-dialog" role="dialog" aria-modal="true"><h2></h2><p></p><div class="nura-dialog-actions"><button class="btn primary">${confirmText || 'OK'}</button></div></section>`;
    overlay.querySelector('h2').textContent = title;
    overlay.querySelector('p').textContent = message;
    overlay.classList.add('open');
    overlay.querySelector('button').onclick = () => overlay.classList.remove('open');
    overlay.onclick = e => { if (e.target === overlay) overlay.classList.remove('open'); };
  }
  window.nuraDialogMessage = dialog;

  // The application key is loaded by app-09 from Firestore config/app.
  // Do not read an individual user's profile or local browser storage.
  window.getApiKey = function () {
    return window._nuraConfigKey || '';
  };
  window.saveApiKey = function () {
    dialog('Managed Groq key', 'Nura Mind reads its Groq key from Firestore config/app. There is nothing to save in a user profile.');
  };

  // Language preference is intentionally local for the prototype. It is shared
  // by the Profile drawer and Settings, so both controls always show the same
  // choice. New installs start in Danish as requested.
  const nuraTranslations = {
    da: {Settings:'Indstillinger', Profile:'Profil', Account:'Konto', Devices:'Enheder', Audio:'Lyd', UI:'Udseende', Preferences:'PrÃ¦ferencer', Security:'Sikkerhed', Language:'Sprog', Theme:'Tema', Notifications:'Notifikationer', 'Quiet Hours':'Stilletid', 'Display Name':'Visningsnavn', Age:'Alder', Subscription:'Abonnement', 'Manage Subscription':'Administrer abonnement', 'Hardware Sync':'Hardware-synkronisering', 'Master UI Volume':'Hovedlydstyrke', 'Audio Player Volume':'Afspillerlydstyrke', Soundscape:'Lydlandskab', 'Accent Colour':'Accentfarve', 'Stress Alert Threshold':'StressalarmgrÃ¦nse', 'Password Reset':'Nulstil adgangskode', Verification:'BekrÃ¦ftelse', 'Last Login':'Seneste login', Close:'Luk', Dark:'MÃ¸rk', Light:'Lys', 'Sign Out':'Log ud', 'Login / Create Account':'Log ind / Opret konto', Calendar:'Kalender', Dashboard:'Oversigt', 'Nura AI':'Nura AI', 'Focus Timer':'Fokustimer', 'Verify later':'BekrÃ¦ft senere', 'Verify now':'BekrÃ¦ft nu', 'Keep me logged in on this device':'Hold mig logget ind pÃ¥ denne enhed', 'Continue as Guest':'FortsÃ¦t som gÃ¦st', 'Create account':'Opret konto', 'Have an account?':'Har du en konto?', 'Sign in':'Log ind', 'New here?':'Ny her?', 'Today':'I dag', 'Save':'Gem', Clear:'Ryd', Library:'Bibliotek', 'Daily Goals':'Dagens mÃ¥l', 'Study Notes Log':'Studienotelog', 'AI Quiz Engine':'AI-quizmotor', 'New Conversation':'Ny samtale', 'Previous conversations':'Tidligere samtaler', 'View sources':'Vis kilder', 'Clear all sources':'Ryd alle kilder', 'Connect':'Forbind', Connected:'Forbundet', 'Send Reset Email':'Send nulstillingsmail', 'Not verified yet? Click here':'Ikke bekrÃ¦ftet endnu? Klik her', 'Manage Subscription':'Administrer abonnement', 'Free Plan':'Gratis abonnement', 'Upgrade to Nura NeuroMind':'Opgrader til Nura NeuroMind', 'Focus Session':'Fokussession', Start:'Start', Pause:'Pause', Reset:'Nulstil', 'Deep Work':'Dyb koncentration', Breather:'Pusterum', 'Calm Down':'Fald til ro', 'Custom mode':'Brugerdefineret tilstand'},
    de: {Settings:'Einstellungen', Profile:'Profil', Account:'Konto', Devices:'GerÃ¤te', Audio:'Audio', UI:'OberflÃ¤che', Preferences:'Einstellungen', Security:'Sicherheit', Language:'Sprache', Theme:'Design', Notifications:'Benachrichtigungen', 'Quiet Hours':'Ruhezeiten', 'Display Name':'Anzeigename', Age:'Alter', Subscription:'Abonnement', 'Manage Subscription':'Abonnement verwalten', 'Hardware Sync':'Hardware-Synchronisierung', 'Master UI Volume':'HauptlautstÃ¤rke', 'Audio Player Volume':'Player-LautstÃ¤rke', Soundscape:'Klanglandschaft', 'Accent Colour':'Akzentfarbe', 'Stress Alert Threshold':'Stressalarm-Schwelle', 'Password Reset':'Passwort zurÃ¼cksetzen', Verification:'BestÃ¤tigung', 'Last Login':'Letzte Anmeldung', Close:'SchlieÃŸen', Dark:'Dunkel', Light:'Hell', 'Sign Out':'Abmelden', 'Login / Create Account':'Anmelden / Konto erstellen', Calendar:'Kalender', Dashboard:'Ãœbersicht', 'Nura AI':'Nura AI', 'Focus Timer':'Fokus-Timer', 'Verify later':'SpÃ¤ter bestÃ¤tigen', 'Verify now':'Jetzt bestÃ¤tigen', 'Keep me logged in on this device':'Auf diesem GerÃ¤t angemeldet bleiben', 'Continue as Guest':'Als Gast fortfahren', 'Create account':'Konto erstellen', 'Have an account?':'Hast du ein Konto?', 'Sign in':'Anmelden', 'New here?':'Neu hier?', 'Today':'Heute', Save:'Speichern', Clear:'Leeren', Library:'Bibliothek', 'Daily Goals':'Tagesziele', 'Study Notes Log':'Notizenprotokoll', 'AI Quiz Engine':'KI-Quiz-Engine', 'New Conversation':'Neue Unterhaltung', 'Previous conversations':'Vorherige Unterhaltungen', 'View sources':'Quellen anzeigen', 'Clear all sources':'Alle Quellen lÃ¶schen', Connect:'Verbinden', Connected:'Verbunden', 'Send Reset Email':'Reset-E-Mail senden', 'Not verified yet? Click here':'Noch nicht bestÃ¤tigt? Hier klicken', 'Manage Subscription':'Abonnement verwalten', 'Free Plan':'Kostenloser Plan', 'Upgrade to Nura NeuroMind':'Auf Nura NeuroMind upgraden', 'Focus Session':'Fokus-Sitzung', Start:'Start', Pause:'Pause', Reset:'ZurÃ¼cksetzen', 'Deep Work':'Tiefenarbeit', Breather:'Atempause', 'Calm Down':'Beruhigen', 'Custom mode':'Benutzerdefinierter Modus'}
  };
  const nuraTextOriginal = new WeakMap();
  function applyLanguage(language) {
    const lang = ['da','en','de'].includes(language) ? language : 'da';
    const table = nuraTranslations[lang] || {};
    document.documentElement.lang = lang;
    // Translate text nodes instead of only childless elements. The earlier
    // approach missed most real buttons because their icon SVG is a child.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        return parent && !parent.closest('script,style,svg,textarea,pre,code') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const original = nuraTextOriginal.get(node) || node.nodeValue;
      if (!nuraTextOriginal.has(node)) nuraTextOriginal.set(node, original);
      const key = original.trim(); if (!key) return;
      const translated = lang === 'en' ? key : (table[key] || key);
      node.nodeValue = original.replace(key, translated);
    });
    document.querySelectorAll('[title],[placeholder],[aria-label]').forEach(el => {
      ['title','placeholder','aria-label'].forEach(attr => {
        const value = el.getAttribute(attr); if (!value) return;
        const key = 'nuraOriginal' + attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const original = el.dataset[key] || value; if (!el.dataset[key]) el.dataset[key] = original;
        if (table[original]) el.setAttribute(attr, table[original]); else if (lang === 'en') el.setAttribute(attr, original);
      });
    });
    ['profile-language-select','settings-language-select'].forEach(id => { const select=document.getElementById(id); if(select) select.value=lang; });
  }
  window.nuraSetLanguage = function(language) {
    localStorage.setItem('nura-language', language);
    applyLanguage(language);
  };

  function applySavedPreferences() {
    try {
      const p = JSON.parse(localStorage.getItem('nura-user-profile') || '{}');
      if (p.accent) {
        document.documentElement.style.setProperty('--accent', p.accent);
        const picker = document.getElementById('s-accent-color'); if (picker) picker.value = p.accent;
      }
      document.body.classList.toggle('light-theme', p.theme === 'light');
    } catch (_) {}
  }

  const legacySettingsSave = window.settingsSave;
  window.settingsSave = function () {
    if (typeof legacySettingsSave === 'function') legacySettingsSave();
    try {
      const p = JSON.parse(localStorage.getItem('nura-user-profile') || '{}');
      p.theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('nura-user-profile', JSON.stringify(p));
    } catch (_) {}
  };
  window.settingsAccentColor = function (hex) {
    document.documentElement.style.setProperty('--accent', hex);
    const p = JSON.parse(localStorage.getItem('nura-user-profile') || '{}');
    p.accent = hex; localStorage.setItem('nura-user-profile', JSON.stringify(p));
  };

  window.settingsSendPasswordReset = async function () {
    const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
    if (!user || !user.email) return dialog('No account email', 'Sign in with an email account before requesting a reset.');
    try {
      await _auth.sendPasswordResetEmail(user.email, { url: location.origin + location.pathname, handleCodeInApp: false });
      dialog('Reset email sent', `A password-reset link was sent to ${user.email}.`);
    } catch (error) { dialog('Could not send reset email', error.message || 'Check your Firebase Authentication configuration.'); }
  };

  window.sendVerificationEmail = async function () {
    const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
    if (!user) return dialog('Sign in first', 'You need to be signed in before verifying your email.');
    if (user.emailVerified && user.providerData && user.providerData.some(p => p.providerId === 'google.com')) return dialog('Google email verified', 'Google already verified this email address. No extra Firebase verification email is needed.');
    try {
      await user.sendEmailVerification({ url: location.origin + location.pathname, handleCodeInApp: false });
      dialog('Verification email sent', `Open the verification link sent to ${user.email}, then sign in again.`);
    } catch (error) { dialog('Could not send verification email', error.message || 'Check Firebase Authentication settings.'); }
  };

  function addVerificationButton() {
    const status = document.getElementById('s-email-verified');
    if (!status || document.getElementById('nura-verify-email')) return;
    const btn = document.createElement('button');
    btn.id = 'nura-verify-email'; btn.className = 's-btn'; btn.textContent = 'Not verified yet? Click here';
    btn.onclick = window.sendVerificationEmail;
    status.parentElement.appendChild(btn);
  }

  function installFocusPopup() {
    const timer = document.querySelector('.focus-timer-wrap');
    const topbar = document.querySelector('.topbar-right');
    if (!timer || !topbar || document.getElementById('nura-focus-overlay')) return;
    const placeholder = document.createComment('focus-timer-location');
    timer.parentNode.insertBefore(placeholder, timer);
    const overlay = document.createElement('div');
    overlay.id = 'nura-focus-overlay'; overlay.className = 'nura-focus-overlay';
    document.body.appendChild(overlay); overlay.appendChild(timer);
    const launch = document.createElement('button');
    launch.className = 'nura-focus-launch'; launch.textContent = 'Calendar';
    launch.onclick = () => { if (typeof window.openCalendarModal === 'function') window.openCalendarModal(); };
    overlay.onclick = e => { if (e.target === overlay) overlay.classList.remove('open'); };
    topbar.prepend(launch);

    // Existing dashboard cards call this legacy function. It must also open
    // the new modal shell, not only make the timer element visible.
    const legacyOpen = window.openFocusTimer;
    window.openFocusTimer = function () {
      if (typeof legacyOpen === 'function') legacyOpen();
      overlay.classList.add('open');
    };
    const legacyClose = window.closeFocusTimer;
    window.closeFocusTimer = function () {
      if (typeof legacyClose === 'function') legacyClose();
      overlay.classList.remove('open');
    };
  }

  function installDeviceGate() {
    const panel = document.getElementById('spanel-devices');
    if (!panel || document.getElementById('nura-connect-device')) return;
    const connected = localStorage.getItem('nura-device-connected') === 'true';
    const rows = [...panel.querySelectorAll('.s-row')];
    const gate = document.createElement('div');
    gate.id = 'nura-connect-device'; gate.className = 's-row';
    gate.innerHTML = `<label class="s-label">Nura Watch</label><button class="s-btn">${connected ? 'Connected' : 'Connect'}</button>`;
    panel.insertBefore(gate, rows[0] || null);
    const apply = () => rows.forEach(row => row.style.display = localStorage.getItem('nura-device-connected') === 'true' ? '' : 'none');
    gate.querySelector('button').onclick = () => { localStorage.setItem('nura-device-connected', 'true'); gate.querySelector('button').textContent = 'Connected'; apply(); dialog('Nura Watch connected', 'Device menus are now available.'); };
    apply();
    panel.addEventListener('click', e => { const b = e.target.closest('button'); if (b && /Calibrate Now/.test(b.textContent)) { e.preventDefault(); e.stopImmediatePropagation(); dialog('Calibration started', 'Wear your Nura Watch and stay still for 10 seconds.'); } }, true);
  }

  function simplifyFocusTimer() {
    const body = document.getElementById('ft-body');
    if (!body || body.dataset.compact) return;
    body.dataset.compact = 'true'; body.classList.add('ft-compact');
    body.innerHTML = '<div class="ft-main"><div class="ft-label" id="ft-label">FOCUS SESSION</div><div class="ft-time" id="ft-time">25:00</div><select class="ft-mode-select" aria-label="Focus timer mode" onchange="nuraSelectFocusPreset(this.value)"><option value="25|Focus Session">25 min Â· Focus Session</option><option value="50|Deep Work">50 min Â· Deep Work</option><option value="25|Focus Regain">25 min Â· Focus Regain</option><option value="10|Breather">10 min Â· Breather</option><option value="5|Calm Down">5 min Â· Calm Down</option></select></div><div class="ft-actions"><button class="ft-btn" id="ft-play-btn" onclick="toggleFocusTimer()">Start</button><button class="ft-skip" onclick="resetFocusTimer()" title="Reset timer"><span class="i-wrap" style="width:15px;height:15px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2-9.5L1 10"/></svg></span></button></div>';
    window.nuraSelectFocusPreset = value => { const [minutes, label] = value.split('|'); if (typeof window.applyFocusPreset === 'function') window.applyFocusPreset(Number(minutes), label); };
  }

  // The cropper stored `avatar`, while another profile renderer expected `pfp`.
  // Synchronise both names whenever a saved profile is rendered.
  function syncAvatar() {
    try {
      const p = JSON.parse(localStorage.getItem('nura-user-profile') || '{}');
      if (p.avatar && !p.pfp) { p.pfp = p.avatar; localStorage.setItem('nura-user-profile', JSON.stringify(p)); }
      if (p.pfp && !p.avatar) { p.avatar = p.pfp; localStorage.setItem('nura-user-profile', JSON.stringify(p)); }
    } catch (_) {}
  }

  function setVerificationState(user) {
    const verified = !!(user && user.emailVerified);
    document.body.classList.toggle('nura-unverified', !verified);
    let mark = document.getElementById('nura-unverified-watermark');
    if (!verified) {
      if (!mark) { mark = document.createElement('div'); mark.id = 'nura-unverified-watermark'; mark.className = 'nura-unverified-watermark'; document.body.appendChild(mark); }
      mark.textContent = 'NURA â€¢ EMAIL VERIFICATION REQUIRED';
    } else if (mark) mark.remove();
  }

  function showVerificationPrompt(user) {
    if (!user || document.getElementById('nura-verify-overlay')) return;
    const signedInWithGoogle = !!(user.providerData && user.providerData.some(p => p.providerId === 'google.com'));
    // Password/email accounts only become fully active after Firebase has
    // verified their email. Google tells Firebase the email is already owned.
    if (user.emailVerified && !signedInWithGoogle) return;
    const laterKey = 'nura-verify-later-v2-at-' + user.uid;
    const laterAt = Number(localStorage.getItem(laterKey) || 0);
    if (laterAt && Date.now() - laterAt < 2 * 24 * 60 * 60 * 1000) return;
    const overlay = document.createElement('div'); overlay.id = 'nura-verify-overlay'; overlay.className = 'nura-verify-overlay';
    const heading = signedInWithGoogle ? 'Google account recognised' : 'Verify your email';
    const message = signedInWithGoogle ? 'Google has already verified this email address. Nura will keep this confirmation in place for your account.' : 'Until you verify, Nura runs in guest mode and does not save a profile to Firebase.';
    const nowLabel = signedInWithGoogle ? 'Continue' : 'Verify now';
    overlay.innerHTML = `<section class="nura-verify-card" role="dialog" aria-modal="true"><h2>${heading}</h2><p>${message}</p><div class="nura-verify-actions"><button class="btn" id="nura-verify-later">Verify later</button><button class="btn primary" id="nura-verify-now">${nowLabel}</button></div></section>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#nura-verify-later').onclick = () => { localStorage.setItem(laterKey, String(Date.now())); overlay.remove(); };
    overlay.querySelector('#nura-verify-now').onclick = async () => {
      if (signedInWithGoogle) { localStorage.setItem(laterKey, String(Date.now())); overlay.remove(); return dialog('Google email verified', 'This Google account is already verified by Google.'); }
      try { await user.sendEmailVerification({url: location.origin + location.pathname, handleCodeInApp:false}); localStorage.setItem(laterKey, String(Date.now())); overlay.remove(); dialog('Verification email sent', 'Open the link in your inbox, then sign in again.'); } catch (e) { dialog('Could not send verification', e.message || 'Try again shortly.'); }
    };
  }

  const legacyCropSave = window.pfpSaveCrop;
  window.pfpSaveCrop = function () {
    if (typeof legacyCropSave === 'function') legacyCropSave.apply(this, arguments);
    syncAvatar();
    if (typeof window.renderUserProfile === 'function') window.renderUserProfile();
  };

  document.addEventListener('DOMContentLoaded', () => {
    syncAvatar(); applySavedPreferences(); applyLanguage(localStorage.getItem('nura-language') || 'da'); addVerificationButton(); installFocusPopup(); simplifyFocusTimer(); installDeviceGate();
    const goalPanel = document.getElementById('cal-day-goal-modal');
    if (goalPanel) document.body.appendChild(goalPanel);
    const pass = document.getElementById('auth-password');
    if (pass && !document.getElementById('nura-remember-device')) {
      const row = document.createElement('label'); row.className='nura-remember-row';
      row.innerHTML='<input id="nura-remember-device" type="checkbox"> Keep me logged in on this device';
      pass.closest('div[style]')?.insertAdjacentElement('afterend',row);
      const legacySignIn = window.authEmailSignIn;
      window.authEmailSignIn = function(){
        const persistence = document.getElementById('nura-remember-device')?.checked ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
        return _auth.setPersistence(persistence).then(()=>legacySignIn());
      };
    }
    const upgrade = document.getElementById('ud-upgrade-icon');
    if (upgrade && !document.getElementById('ud-upgrade-logo')) { const icon=document.createElement('span'); icon.id='ud-upgrade-logo'; icon.className='upgrade-nura-logo'; icon.setAttribute('aria-hidden','true'); icon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3.8 6.7v9.4L12 21l8.2-4.9V6.7L12 2Z"/><path d="m3.8 6.7 8.2 4.8 8.2-4.8M12 11.5V21"/></svg>'; upgrade.replaceWith(icon); }
    if (typeof _auth !== 'undefined') _auth.onAuthStateChanged(user => { if(!user) return setVerificationState(null); user.reload().catch(()=>{}).finally(()=>{ setVerificationState(user); showVerificationPrompt(user); }); });

    // Keep the current workspace after a reload instead of always returning home.
    const legacyNav = window.nav;
    window.nav = function(id, el){ localStorage.setItem('nura-last-page', id); return legacyNav(id, el); };
    const lastPage = localStorage.getItem('nura-last-page');
    if (lastPage && document.getElementById(lastPage)) { const button=[...document.querySelectorAll('.nav-btn')].find(b=>b.getAttribute('onclick')?.includes("'"+lastPage+"'")); if(button) window.nav(lastPage,button); }
    const legacyImportMusic = window.importMusicFiles;
    window.importMusicFiles = function(inp){
      const before = new Set((typeof musicLibrary!=='undefined'?musicLibrary:[]).map(t=>t.id));
      legacyImportMusic(inp);
      const terms={focus:['focus','study','lofi','lo-fi','ambient','calm'],energy:['workout','energy','upbeat','dance','edm'],sleep:['sleep','rain','night','brown','white noise'],classical:['classical','piano','orchestra','mozart']};
      (typeof musicLibrary!=='undefined'?musicLibrary:[]).filter(t=>!before.has(t.id)).forEach(t=>{ const text=t.name.toLowerCase(); const category=Object.keys(terms).find(k=>terms[k].some(word=>text.includes(word)))||'focus'; const folder=(typeof musicFolders!=='undefined'?musicFolders:[]).find(f=>f.name.toLowerCase().includes(category)); if(folder) t.folder=folder.id; t.category=category; });
      if(typeof saveMusicData==='function') saveMusicData(); if(typeof renderMusicTracklist==='function') renderMusicTracklist();
    };
  });
})();
