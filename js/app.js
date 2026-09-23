const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const config = window.NuraConfig || { firebase:{}, nuraMindEndpoint:'', storageEndpoint:'' };
const uid = () => user?.uid || 'anonymous';
const storageKey = () => `nura:state:${uid()}`;
const defaults = () => ({
  notes:[
    {id:'note-1',title:'Cognitive science notes',content:'Retrieval practice beats re-reading.\n\nMake the work slightly difficult enough that your brain has to reconstruct the answer. That friction is where durable learning begins.',category:'Study'},
    {id:'note-2',title:'Focus sprint ideas',content:'• Define the smallest useful outcome\n• Put the phone out of reach\n• Stop after one clean win',category:'Focus'}
  ],
  categories:['Study','Math','English','Geography','Science'], chats:[], quizResults:[], island:[], musicFolders:['Unsorted','Deep work','Calm','Movement'],
  preferences:{colorMode:'auto',customAccent:'#a7ebe4',clockFace:'digital',timeZone:'local',dateFormat:'weekday',dateOverride:'',autoCategorize:false}, profile:{displayName:''}
});

let user = null, state = defaults(), activeNote = null, activeChat = null, activeMode = 'Chat', sources = [];
let firebaseAuth = null, firestoreDb = null, firestoreSdk = null, authSdk = null, saveTimer = null;
let tracks = [], currentTrack = -1, seeking = false, shuffleEnabled = false, repeatEnabled = false, activePlaylist = null, selectedPlaylist = null, authMode = 'signin', lastTelemetry = {focus:76,stress:18}, stressAlertArmed = true, ambientAudio = null, activeAlarm = null, islandDragMeta = null, latestIslandItemId = null;
const audio = $('#audio');
function installIslandAlert(){const island=$('#island');if(!island||$('#islandAlert'))return;island.insertAdjacentHTML('beforeend','<section class="island-alert glass" id="islandAlert" aria-live="polite"><div><span class="alert-kicker">NURAMIND WELLNESS GUIDE</span><b id="islandAlertTitle">A short reset is ready</b><p id="islandAlertCopy"></p></div><button id="dismissIslandAlert" aria-label="Dismiss wellness alert">×</button><button class="preview-reset" id="startIslandReset">Begin 60s reset</button></section>');$('#dismissIslandAlert').onclick=()=>$('#islandAlert').classList.remove('open');$('#startIslandReset').onclick=()=>{countdownSeconds=60;countdownRunning=true;pinIsland('countdown');$('#islandAlert').classList.remove('open');toast('60-second recovery reset started');};}
installIslandAlert();
function installIslandAppearance(){}
installIslandAppearance();
function syncDashboardColorSuite(){const suite=$('.dashboard-color-switch'),picker=$('#dashboardColorPicker'),accent=$('#dashboardAccent'),status=$('#colorSuiteStatus');if(!suite)return;const manual=state.preferences?.colorMode==='custom';suite.querySelector('[data-color-mode="auto"]')?.classList.toggle('active',!manual);suite.querySelector('[data-color-mode="manual"]')?.classList.toggle('active',manual);picker.classList.toggle('hidden',!manual);accent.value=state.preferences?.customAccent||'#a7ebe4';status.textContent=manual?'Manual':'Auto scientific';}
function positionColorGlider(){const suite=$('.dashboard-color-switch'),active=suite?.querySelector('.active'),glider=$('#colorSuiteGlider');if(!suite||!active||!glider)return;glider.style.width=`${active.offsetWidth}px`;glider.style.transform=`translateX(${active.offsetLeft}px)`;}
function installDashboardColorSuite(){const suite=$('.dashboard-color-switch'),accent=$('#dashboardAccent');if(!suite||suite.dataset.ready)return;suite.dataset.ready='true';suite.innerHTML='<i id="colorSuiteGlider" aria-hidden="true"></i><button type="button" data-color-mode="auto">Auto scientific</button><button type="button" data-color-mode="manual">Manual color</button>';$$('[data-color-mode]').forEach(button=>button.onclick=()=>{state.preferences.colorMode=button.dataset.colorMode==='manual'?'custom':'auto';applyPalette();saveState();syncDashboardColorSuite();requestAnimationFrame(positionColorGlider);});accent.oninput=()=>{state.preferences.colorMode='custom';state.preferences.customAccent=accent.value;applyPalette(accent.value);saveState();syncDashboardColorSuite();requestAnimationFrame(positionColorGlider);};syncDashboardColorSuite();requestAnimationFrame(positionColorGlider);}
function installModeGlider(){const switcher=$('#modeSwitch');if(!switcher||$('#modeGlider'))return;switcher.insertAdjacentHTML('afterbegin','<i class="mode-glider" id="modeGlider" aria-hidden="true"></i>');}
function positionModeGlider(){const switcher=$('#modeSwitch'),active=switcher?.querySelector('.active'),glider=$('#modeGlider');if(!switcher||!active||!glider||!switcher.offsetWidth)return;glider.style.width=`${active.offsetWidth}px`;glider.style.transform=`translateX(${active.offsetLeft}px)`;}
installDashboardColorSuite();installModeGlider();window.addEventListener('resize',()=>requestAnimationFrame(()=>{positionModeGlider();positionColorGlider();}));
function installPlaybackModes(){const controls=$('.player-controls');if(!controls)return;const play=$('#playToggle');controls.insertAdjacentHTML('beforeend','<button id="shuffleToggle" type="button" aria-label="Toggle shuffle" title="Shuffle">⇄</button><button id="repeatToggle" type="button" aria-label="Toggle repeat" title="Repeat">↻</button>');controls.insertBefore($('#shuffleToggle'),play);controls.insertBefore($('#repeatToggle'),play.nextSibling);}
installPlaybackModes();

function escapeHtml(value){ return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function isGuest(){ return Boolean(user?.guest); }
function cloudReady(){ return Boolean(firebaseAuth && !isGuest()); }
function mindReady(){ return cloudReady(); }
function offlinePreview(){ return isGuest() || location.protocol === 'file:'; }
function toast(text){ $('#toast').textContent = text; $('#toast').classList.add('show'); setTimeout(() => $('#toast').classList.remove('show'), 2200); }
function showModal(html){ $('#modalContent').innerHTML = html; $('#modalLayer').classList.add('open'); $('#modalLayer').setAttribute('aria-hidden','false'); }
function closeModal(){ $('#modalLayer').classList.remove('open'); $('#modalLayer').setAttribute('aria-hidden','true'); }
function bindModalCancel(){ const cancel = $('#modalCancel'); if(cancel) cancel.onclick = closeModal; }
function saveState(){
  if(!user) return;
  localStorage.setItem(storageKey(), JSON.stringify(state));
  if(cloudReady() && firestoreDb){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => firestoreSdk.setDoc(firestoreSdk.doc(firestoreDb,'users',uid()), {nuraState:state,updatedAt:firestoreSdk.serverTimestamp()}, {merge:true}).catch(error => console.warn('Cloud state save failed', error)), 500);
  }
}
function loadState(){ try { state = {...defaults(), ...JSON.parse(localStorage.getItem(storageKey()) || '{}')}; } catch { state = defaults(); } }
async function pullCloudState(){
  if(!cloudReady() || !firestoreDb) return;
  try { const snapshot = await firestoreSdk.getDoc(firestoreSdk.doc(firestoreDb,'users',uid())); if(snapshot.exists() && snapshot.data().nuraState){ state = {...defaults(), ...snapshot.data().nuraState}; renderAll(); } }
  catch(error){ console.warn('Cloud state read failed', error); }
}

function profileName(){return state.profile?.displayName||user?.displayName||user?.email?.split('@')[0]||(user?.guest?'Guest':'Nura member');}
function renderProfileIdentity(){const displayName=profileName(),initials=displayName.split(/\s+/).map(part=>part[0]).join('').slice(0,2).toUpperCase();$('#greetingName').textContent=`${displayName.split(' ')[0]}.`;$('#profileName').textContent=displayName;$('#profileEmail').textContent=user?.guest?'Guest studio · this device':(user?.email||'Verified Nura account');$('#profileTrigger').textContent=initials;$$('.profile-avatar').forEach(node=>node.textContent=initials);}
function setUser(nextUser){
  user = nextUser; loadState(); if(!state.profile)state.profile={displayName:''}; delete state.profile.avatar; if(!state.profile.displayName&&!user.guest&&!user.displayName&&user.email)state.profile.displayName=user.email.split('@')[0]; applyPalette(); renderProfileIdentity(); $('#authWall').classList.add('dismiss');
  renderAll(); pullCloudState();
}

async function setupFirebase(){
  const firebase = config.firebase || {};
  if(!firebase.apiKey || !firebase.projectId) return;
  try {
    const [appModule, authModule, dbModule] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js')
    ]);
    const app = appModule.initializeApp(firebase); authSdk = authModule; firebaseAuth = authModule.getAuth(app); firestoreDb = dbModule.getFirestore(app); firestoreSdk = dbModule;
    authModule.onAuthStateChanged(firebaseAuth, current => { if(current) setUser({uid:current.uid,displayName:current.displayName || current.email?.split('@')[0] || 'Nura member',email:current.email,photoURL:current.photoURL,guest:false}); });
  } catch(error){ console.warn('Firebase initialization failed', error); $('#authStatus').textContent = 'Firebase could not initialize. Check config/app.js.'; }
}
async function googleLogin(){
  if(!firebaseAuth || !authSdk) return $('#authStatus').textContent = 'Add Firebase Web App config in config/app.js to enable sign-in.';
  try { $('#authStatus').textContent = 'Opening secure Google sign-in…'; await authSdk.signInWithPopup(firebaseAuth, new authSdk.GoogleAuthProvider()); closeModal(); }
  catch(error){ $('#authStatus').textContent = readableAuthError(error); }
}
function readableAuthError(error){ return ({'auth/email-already-in-use':'That email already has an account.','auth/invalid-credential':'Email or password is incorrect.','auth/weak-password':'Choose a password with at least 6 characters.'}[error?.code]) || 'Authentication did not complete. Please try again.'; }
function setAuthMode(mode){ authMode = mode; const signup = mode === 'signup'; $('#emailSubmit').innerHTML = `${signup ? 'Create account' : 'Sign in'} <span>→</span>`; $('#authPassword').autocomplete = signup ? 'new-password' : 'current-password'; $('#authToggle').innerHTML = signup ? 'Already have an account? <b>Sign in</b>' : 'Don’t have an account? <b>Sign up</b>'; $('#authStatus').textContent = signup ? 'Create a private Nura account with email and password.' : 'Private by design. You control your data.'; }
function validateAuthFields(){const email=$('#authEmail'),password=$('#authPassword');const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);const validPassword=password.value.length>=6;email.classList.toggle('invalid',Boolean(email.value)&&!validEmail);password.classList.toggle('invalid',Boolean(password.value)&&!validPassword);return validEmail&&validPassword;}
async function emailLogin(event){
  event.preventDefault();if(!validateAuthFields())return $('#authStatus').textContent='Check your email and password before continuing.'; if(!firebaseAuth || !authSdk) return $('#authStatus').textContent = 'Add Firebase Web App config in config/app.js first.';
  const email = $('#authEmail').value.trim(), password = $('#authPassword').value;
  try { $('#emailSubmit').disabled = true; $('#authStatus').textContent = authMode === 'signup' ? 'Creating your Nura account…' : 'Signing you in…'; const action = authMode === 'signup' ? authSdk.createUserWithEmailAndPassword : authSdk.signInWithEmailAndPassword; await action(firebaseAuth,email,password); closeModal(); }
  catch(error){ $('#authStatus').textContent = readableAuthError(error); } finally { $('#emailSubmit').disabled = false; }
}
$('#googleSignIn').onclick = googleLogin; $('#emailAuth').onsubmit = emailLogin;['#authEmail','#authPassword'].forEach(selector=>$(selector).addEventListener('input',validateAuthFields));$('#authToggle').onclick = () => setAuthMode(authMode === 'signup' ? 'signin' : 'signup');
$('#guestSignIn').onclick = () => setUser({uid:'guest',displayName:'Guest',guest:true});

const pageTitles={dashboard:'Dashboard',notes:'Notes Studio',mind:'NuraMind',music:'Soundscape'};
let activePage='dashboard';
function setIslandTitle(){
  const el=$('#islandTitle'),next=pageTitles[activePage]||'Nura';
  if(el.textContent===next)return;
  el.textContent=next;
  el.classList.remove('title-swap');void el.offsetWidth;el.classList.add('title-swap');
}
// The enter/exit motion itself lives in css/master.css ("Island navigation motion"). JS only flips
// the state classes: .open plays the unfold, .closing plays the fold-back for ISLAND_EXIT_MS.
const ISLAND_EXIT_MS=420;let islandCloseTimer=null;
function setMobileIslandWidth(){const island=$('#island');if(!island)return;['width','min-width','max-width'].forEach(prop=>island.style.removeProperty(prop));} // sizing lives entirely in css/master.css
function openIsland(){const island=$('#island');clearTimeout(islandCloseTimer);island.classList.remove('closing');island.classList.add('open');setMobileIslandWidth(true);$('.island-trigger').setAttribute('aria-expanded','true');}
function closeIsland(){const island=$('#island');if(!island.classList.contains('open'))return;clearTimeout(islandCloseTimer);island.classList.remove('open');island.classList.add('closing');setMobileIslandWidth(false);$('.island-trigger').setAttribute('aria-expanded','false');islandCloseTimer=setTimeout(()=>island.classList.remove('closing'),ISLAND_EXIT_MS);}
setMobileIslandWidth(false);window.addEventListener('resize',()=>setMobileIslandWidth($('#island').classList.contains('open')),{passive:true});
function page(id){activePage=id;$$('.page').forEach(section => section.classList.toggle('active',section.id === id));closeIsland();$('#islandPreview').classList.remove('open');$('#islandAlert')?.classList.remove('open');setIslandTitle();if(id==='mind')requestAnimationFrame(positionModeGlider);window.scrollTo({top:0,behavior:'smooth'});}
$$('[data-page]').forEach(button => button.onclick = () => page(button.dataset.page));
$('.island-trigger').onclick = () => { if($('#island').classList.contains('open'))closeIsland();else openIsland(); };
$('#profileTrigger').onclick=()=>$('#profilePopover').classList.toggle('open');$('.close-popover').onclick=()=>$('#profilePopover').classList.remove('open');
$('#profileSettings').onclick = () => { $('#profilePopover').classList.remove('open'); openSettings('account'); };
const profileTrigger=$('#profileTrigger');Object.assign(profileTrigger.style,{position:'absolute',top:'17px',right:'17px',bottom:'auto',left:'auto',zIndex:'46',transform:'none',transition:'none'});window.addEventListener('scroll',()=>$('#profilePopover').classList.remove('open'),{passive:true});$('#deviceSettings').onclick = () => openSettings('devices');
$('#profileSignOut').onclick = async () => { if(cloudReady()) await authSdk.signOut(firebaseAuth); user = null; $('#profilePopover').classList.remove('open'); $('#authWall').classList.remove('dismiss'); setAuthMode('signin'); };
function renderProfileTheme(){}

function installDigitalSeconds(){const clock=$('#liveClock');if(clock&&!$('#secondsNow'))$('#timeNow').insertAdjacentHTML('afterend','<small id="secondsNow">:00</small>');}
function clockOptions(){const pref=state.preferences||{};const timeZone=pref.timeZone==='local'?undefined:pref.timeZone;const dateFormat=pref.dateFormat==='numeric'?{year:'numeric',month:'2-digit',day:'2-digit'}:pref.dateFormat==='short'?{month:'short',day:'numeric'}:{weekday:'long',month:'short',day:'numeric'};return {timeZone,dateFormat};}
function updateClock(){const now=new Date(),options=clockOptions(),override=state.preferences?.dateOverride;const displayDate=override?new Date(`${override}T12:00:00`):now;$('#timeNow').textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',timeZone:options.timeZone});$('#secondsNow').textContent=now.toLocaleTimeString([], {second:'2-digit',timeZone:options.timeZone});$('#dateNow').textContent=displayDate.toLocaleDateString([], {...options.dateFormat,timeZone:options.timeZone});}
function showClockCustomizer(){const pref=state.preferences||{};showModal(`<h2>Clock studio</h2><p>Refine the digital timepiece without changing your system clock.</p><label class="modal-label">Time zone<select id="clockTimezone"><option value="local">Local time</option><option value="UTC">UTC</option><option value="Europe/Copenhagen">Copenhagen</option><option value="America/New_York">New York</option><option value="America/Los_Angeles">Los Angeles</option><option value="Asia/Tokyo">Tokyo</option></select></label><label class="modal-label">Date treatment<select id="clockDateFormat"><option value="weekday">Weekday + date</option><option value="short">Short date</option><option value="numeric">Numeric date</option></select></label><label class="modal-label">Date override <input id="clockDateOverride" type="date" value="${escapeHtml(pref.dateOverride||'')}"/></label><div class="modal-actions"><button class="secondary" id="clearClockDate">Use system date</button><button class="secondary" id="modalCancel">Cancel</button><button class="primary" id="saveClock">Apply</button></div>`);bindModalCancel();$('#clockTimezone').value=pref.timeZone||'local';$('#clockDateFormat').value=pref.dateFormat||'weekday';$('#clearClockDate').onclick=()=>{$('#clockDateOverride').value='';};$('#saveClock').onclick=()=>{state.preferences.timeZone=$('#clockTimezone').value;state.preferences.dateFormat=$('#clockDateFormat').value;state.preferences.dateOverride=$('#clockDateOverride').value;saveState();updateClock();closeModal();};}
$('#liveClock').oncontextmenu=event=>{event.preventDefault();showClockCustomizer();};
installDigitalSeconds();updateClock(); setInterval(updateClock, 1000);
let sessionSeconds = 0, sessionRunning = false, countdownSeconds = 0, countdownRunning = false;
function duration(seconds){const hours=Math.floor(seconds/3600),minutes=Math.floor(seconds%3600/60),remainder=seconds%60;return hours?`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(remainder).padStart(2,'0')}`:`${String(minutes).padStart(2,'0')}:${String(remainder).padStart(2,'0')}`;}
function installTimerInputs(){const input=$('#countdownInput');if(!input||$('#countdownHours'))return;const stepper=(unit,id,value,max)=>`<label><span>${unit}</span><span class="duration-stepper"><input id="${id}" type="number" min="0" max="${max}" value="${value}"/><span><button type="button" data-duration-step="${id}" data-step="1" aria-label="Increase ${unit}">⌃</button><button type="button" data-duration-step="${id}" data-step="-1" aria-label="Decrease ${unit}">⌄</button></span></span></label>`;input.insertAdjacentHTML('afterend',`<div class="duration-inputs" aria-label="Countdown duration">${stepper('h','countdownHours',0,24)}${stepper('m','countdownMinutes',25,59)}${stepper('s','countdownSecondsInput',0,59)}</div>`);input.hidden=true;}
function validateDuration(){const hours=$('#countdownHours'),minutes=$('#countdownMinutes'),seconds=$('#countdownSecondsInput');if(!hours||!minutes||!seconds)return;let h=Number(hours.value)||0,m=Number(minutes.value)||0,s=Number(seconds.value)||0;const invalid=h<0||m<0||s<0||h>24||m>59||s>59;[hours,minutes,seconds].forEach(input=>input.classList.toggle('invalid',invalid));h=Math.max(0,Math.min(24,h));const total=m*60+s;if(h===24){m=0;s=0;}else{m=Math.floor(total/60);h+=Math.floor(m/60);m%=60;s=total%60;if(h>24){h=24;m=0;s=0;}}hours.value=h;minutes.value=m;seconds.value=s;if(invalid)setTimeout(()=>[hours,minutes,seconds].forEach(input=>input.classList.remove('invalid')),900);}
function installDurationValidation(){['#countdownHours','#countdownMinutes','#countdownSecondsInput'].forEach(selector=>$(selector)?.addEventListener('input',validateDuration));$$('[data-duration-step]').forEach(button=>button.onclick=()=>{const input=$(`#${button.dataset.durationStep}`);if(!input)return;input.value=(Number(input.value)||0)+Number(button.dataset.step);validateDuration();});}
function requestedCountdown(){const hours=Number($('#countdownHours')?.value)||0,minutes=Number($('#countdownMinutes')?.value)||0,seconds=Number($('#countdownSecondsInput')?.value)||0;return Math.max(1,Math.min(86400,hours*3600+minutes*60+seconds));}
function stopCompletionChime(){if(!activeAlarm)return;clearInterval(activeAlarm.interval);activeAlarm.context.close?.();activeAlarm=null;}
function playCompletionChime(){stopCompletionChime();const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;const context=new AudioContext(),tone=()=>{const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type='sine';oscillator.frequency.value=1760;gain.gain.setValueAtTime(.0001,context.currentTime);gain.gain.exponentialRampToValueAtTime(.075,context.currentTime+.012);gain.gain.exponentialRampToValueAtTime(.0001,context.currentTime+.26);oscillator.connect(gain).connect(context.destination);oscillator.start();oscillator.stop(context.currentTime+.28);};tone();activeAlarm={context,interval:setInterval(tone,520)};const stop=()=>stopCompletionChime();document.addEventListener('pointerdown',stop,{once:true});document.addEventListener('keydown',stop,{once:true});toast('Timer complete · tap anywhere to silence');}
installTimerInputs();installDurationValidation();
setInterval(() => { if(sessionRunning){ sessionSeconds++; $('#sessionClock').textContent = duration(sessionSeconds); } if(countdownRunning){ countdownSeconds--; if(countdownSeconds <= 0){ countdownRunning = false; $('#countdownStart').textContent = 'Begin'; playCompletionChime(); toast('Intention timer complete'); } else $('#countdownStart').textContent = duration(countdownSeconds); } }, 1000);
$('#sessionToggle').onclick = () => { sessionRunning = !sessionRunning; $('#sessionToggle').textContent = sessionRunning ? '❚❚' : '▶'; if(sessionRunning) pinIsland('session'); };
$('#countdownStart').onclick = () => { if(!countdownRunning){ countdownSeconds = requestedCountdown(); countdownRunning = true; pinIsland('countdown'); } else { countdownRunning = false; $('#countdownStart').textContent='Begin'; } };

let points = Array.from({length:24}, (_, index) => 72 + Math.sin(index*.57)*9 + Math.random()*5);
function hexToHue(hex){ const value = hex.replace('#',''); const rgb = [0,2,4].map(index => parseInt(value.slice(index,index+2),16)/255); const max = Math.max(...rgb), min = Math.min(...rgb); if(max === min) return 170; const delta=max-min; let hue=max===rgb[0]?((rgb[1]-rgb[2])/delta)%6:max===rgb[1]?(rgb[2]-rgb[0])/delta+2:(rgb[0]-rgb[1])/delta+4; return Math.round(hue*60+(hue<0?360:0)); }
function applyPalette(accent){ const pref = state.preferences || {}; const automatic=lastTelemetry.focus>78?'#9fe9dc':lastTelemetry.stress>40?'#83bdd4':'#aebcff'; const color = accent || (pref.colorMode === 'auto' ? automatic : pref.customAccent) || '#a7ebe4'; document.body.dataset.theme='dark';document.body.dataset.islandTheme='dark';document.documentElement.style.setProperty('--accent',color);document.documentElement.style.setProperty('--line',`color-mix(in srgb,${color} 26%,transparent)`);document.documentElement.style.setProperty('--accent-glow',`color-mix(in srgb,${color} 22%,transparent)`); document.documentElement.style.setProperty('--wash-hue',`${hexToHue(color)-170}deg`); document.documentElement.style.setProperty('--wash-saturation',pref.colorMode === 'custom' ? '1.4' : '1.1'); }
function renderTelemetry(){
  const focus = Math.max(30,Math.min(99,Math.round(points.at(-1)))); const stress = Math.round(Math.max(8,Math.min(68,95-focus+Math.random()*7))); const calm = Math.round(Math.max(10,Math.min(94,100-stress-Math.random()*8))); const flow = Math.round(Math.max(15,Math.min(98,(focus+calm)/2+Math.random()*5))); lastTelemetry={focus,stress};
  const chartTop=38,chartBottom=130,coords=points.map((value,index)=>[index/(points.length-1)*560,chartBottom-(value/100*(chartBottom-chartTop))]); const line=`M${coords.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(' L')}`;
  $('#focusLine').setAttribute('d',line); $('#focusArea').setAttribute('d',`${line} L560,150 L0,150Z`); $('#focusValue').textContent=focus; $('#calmValue').textContent=`${focus}%`; $('#stressValue').textContent=`${stress}%`; $('#flowValue').textContent=`${calm}%`; $('#calmBar').style.width=`${focus}%`; $('#stressBar').style.width=`${stress}%`; $('#flowBar').style.width=`${calm}%`; $('#focusStatus').textContent=focus>80?'Optimal':focus>60?'Steady':'Reset suggested';
  if(state.preferences?.colorMode === 'auto') applyPalette(focus>78?'#9fe9dc':stress>40?'#83bdd4':'#aebcff');
  const advice=stress>42?['Take a reset.','Stress is rising. A slow four-count breath can steady the curve.']:focus>82?['Lean into flow.','Your attention curve is stable. Keep the next task deliberately small.']:['Rebuild momentum.','One clear task can bring the signal back into a useful rhythm.']; $('#insightTitle').textContent=advice[0];$('#insightCopy').textContent=advice[1];
  if(stress >= 38 && stressAlertArmed){ triggerStressAlert(stress); stressAlertArmed=false; }
  if(stress < 28) stressAlertArmed=true;
}
setInterval(()=>{points=[...points.slice(1),points.at(-1)+(Math.random()-.48)*11];renderTelemetry();},2200); renderTelemetry();

const widgetMeta = {clock:{icon:'◷',label:'Local clock',detail:()=>$('#timeNow').textContent},session:{icon:'●',label:'Focus session',detail:()=>`${duration(sessionSeconds)} elapsed · ${sessionRunning?'running':'paused'}`},countdown:{icon:'◔',label:'Countdown',detail:()=>countdownRunning?`${duration(countdownSeconds)} remaining`:'Ready to start'},review:{icon:'•',label:'Review chapter 4',detail:()=> 'Pinned from your focus queue'},sprint:{icon:'•',label:'Plan next sprint',detail:()=> 'Pinned from your focus queue'},stress:{icon:'!',label:'NuraMind reset',detail:()=>`Stress signal ${lastTelemetry.stress}% · a 60-second reset is ready`}};
Object.assign(widgetMeta,{focus:{icon:'◒',label:'Focus signal',detail:()=>`${$('#calmValue').textContent} attention stability`},stress:{icon:'!',label:'Stress signal',detail:()=>`${$('#stressValue').textContent} recovery load`},recovery:{icon:'♡',label:'HRV / recovery',detail:()=>`${$('#flowValue').textContent} recovery balance`}});
function telemetryWidgets(){const bindings=[['#calmBar','focus'],['#stressBar','stress'],['#flowBar','recovery']];bindings.forEach(([selector,kind])=>{const card=$(selector)?.closest('.metric-row');if(!card)return;card.classList.add('island-draggable','telemetry-draggable');card.draggable=true;card.dataset.widget=kind;card.title=`Drag ${widgetMeta[kind].label} into the Dynamic Island`;});}
function rejectIslandCapacity(){const island=$('#island');island.classList.remove('capacity-reject');requestAnimationFrame(()=>island.classList.add('capacity-reject'));setTimeout(()=>island.classList.remove('capacity-reject'),720);toast("Can't add more than 10 items to the Dynamic Island.");}
function pinIsland(kind,details){if(state.island.some(item=>item.kind===kind))return;if(state.island.length>=10){rejectIslandCapacity();return;}const meta=details||widgetMeta[kind]||{icon:'•',label:kind,detail:()=> 'Pinned tool'},item={id:`island-${Date.now()}-${kind}`,kind,label:meta.label,icon:meta.icon,detail:meta.detail};state.island.push(item);latestIslandItemId=item.id;saveState();renderIsland();requestAnimationFrame(()=>{const holder=$('#islandTasks');if(holder)holder.scrollTo({left:holder.scrollWidth,behavior:'smooth'});});}
function renderIsland(){ const holder=$('#islandTasks'); holder.innerHTML=state.island.map(item=>`<button class="island-indicator ${item.id===latestIslandItemId?'island-indicator-enter':''}" draggable="true" data-island="${item.id}" title="${escapeHtml(item.label)}"><span>${escapeHtml(item.icon)}</span></button>`).join(''); $('#island').classList.toggle('has-tasks',Boolean(state.island.length)); $$('.island-indicator').forEach(button=>{button.ondragstart=event=>{const item=state.island.find(entry=>entry.id===button.dataset.island),box=button.getBoundingClientRect();islandDragMeta={id:button.dataset.island,icon:item?.icon||'•',x:box.left+box.width/2,y:box.top+box.height/2};event.dataTransfer.setData('application/nura-island',button.dataset.island);};button.onclick=event=>showIslandPreview(button.dataset.island,event.currentTarget);});setTimeout(()=>{latestIslandItemId=null;},450);}
function showIslandPreview(id,target){const item=state.island.find(entry=>entry.id===id);if(!item)return;const meta=widgetMeta[item.kind]||{detail:()=> 'Pinned tool'},detail=typeof item.detail==='function'?item.detail():meta.detail();const box=target.getBoundingClientRect(),preview=$('#islandPreview');const reset=item.kind==='stress'?'<button class="preview-reset" id="previewReset">Begin 60s reset</button>':'';preview.innerHTML=`<b>${escapeHtml(item.label)}</b><span>${escapeHtml(detail)}</span>${reset}<small>Drag onto the workspace to unpin</small>`;preview.style.left=`${Math.min(Math.max(12,box.left-50),innerWidth-220)}px`;preview.style.top=`${Math.max(10,box.top-104)}px`;preview.classList.add('open');const button=$('#previewReset');if(button)button.onclick=()=>{countdownSeconds=60;countdownRunning=true;pinIsland('countdown');preview.classList.remove('open');toast('60-second reset started');};}
function triggerStressAlert(stress){pinIsland('stress');$('#island').classList.add('alerting');$('#islandAlertTitle').textContent=`Stress signal at ${stress}%`;$('#islandAlertCopy').textContent='Pause your shoulders, exhale slowly for four counts, then choose one gentle next action.';$('#islandAlert').classList.add('open');toast('NuraMind prepared a calm reset');setTimeout(()=>$('#island').classList.remove('alerting'),6000);}
function animateIslandRelease(id,x,y){const item=state.island.find(entry=>entry.id===id),start=islandDragMeta?.id===id?islandDragMeta:{x:innerWidth/2,y:45,icon:item?.icon||'•'},token=document.createElement('div'),ripple=document.createElement('div');token.className='island-release-token';token.textContent=start.icon;ripple.className='island-release-ripple';Object.assign(token.style,{left:`${start.x-16}px`,top:`${start.y-16}px`});Object.assign(ripple.style,{left:`${x-18}px`,top:`${y-18}px`});document.body.append(token,ripple);token.animate([{transform:'scale(1)',opacity:1,filter:'blur(0)'},{transform:'scale(.3)',opacity:0,filter:'blur(4px)'}],{duration:260,easing:'cubic-bezier(.25,.7,.25,1)',fill:'forwards'}).finished.finally(()=>token.remove());ripple.animate([{transform:'scale(.15)',opacity:.72},{transform:'scale(2.6)',opacity:0}],{duration:420,easing:'cubic-bezier(.2,.75,.25,1)',fill:'forwards'}).finished.finally(()=>ripple.remove());}
function removeIsland(id,point){if(!state.island.some(item=>item.id===id))return;if(point?.x&&point?.y)animateIslandRelease(id,point.x,point.y);state.island=state.island.filter(item=>item.id!==id);saveState();renderIsland();$('#islandPreview').classList.remove('open');toast('Removed from Dynamic Island'); }
function draggableWidgets(){ $$('.island-draggable').forEach(element=>{element.ondragstart=event=>{const meta=widgetMeta[element.dataset.widget]||{icon:'•',label:'Widget'};event.dataTransfer.effectAllowed='copy';event.dataTransfer.setData('application/nura-widget',element.dataset.widget);element.classList.add('is-dragging');const badge=document.createElement('div');badge.className='drag-badge';badge.setAttribute('aria-hidden','true');badge.innerHTML=`<span>${escapeHtml(meta.icon)}</span>`;document.body.append(badge);event.dataTransfer.setDragImage(badge,24,24);requestAnimationFrame(()=>badge.remove());};element.ondragend=()=>element.classList.remove('is-dragging');});}
const islandDrop=$('#island');let islandDragDepth=0;islandDrop.ondragenter=event=>{if(!event.dataTransfer.types.includes('application/nura-widget'))return;event.preventDefault();islandDragDepth++;islandDrop.classList.add('drag-target');};islandDrop.ondragover=event=>{if(event.dataTransfer.types.includes('application/nura-widget'))event.preventDefault();};islandDrop.ondragleave=event=>{if(!event.dataTransfer.types.includes('application/nura-widget'))return;islandDragDepth=Math.max(0,islandDragDepth-1);if(!islandDragDepth)islandDrop.classList.remove('drag-target');};islandDrop.ondrop=event=>{event.preventDefault();islandDragDepth=0;islandDrop.classList.remove('drag-target');const widget=event.dataTransfer.getData('application/nura-widget');if(widget)pinIsland(widget);};
function nearIslandDropZone(x,y){const box=islandDrop.getBoundingClientRect(),padding=68;return x>=box.left-padding&&x<=box.right+padding&&y>=box.top-padding&&y<=box.bottom+padding;}
document.addEventListener('dragover',event=>{if(!event.dataTransfer.types.includes('application/nura-widget'))return;const nearby=nearIslandDropZone(event.clientX,event.clientY),full=state.island.length>=10;islandDrop.classList.toggle('drag-target',nearby&&!full);islandDrop.classList.toggle('capacity-full',nearby&&full);if(nearby)event.preventDefault();});
document.addEventListener('drop',event=>{const widget=event.dataTransfer?.getData('application/nura-widget');if(widget&&nearIslandDropZone(event.clientX,event.clientY)){event.preventDefault();pinIsland(widget);}islandDragDepth=0;islandDrop.classList.remove('drag-target','capacity-full');});
document.addEventListener('dragend',()=>{islandDragDepth=0;islandDrop.classList.remove('drag-target');});
// Touch drag-to-island: native HTML5 drag-and-drop (dragstart/dragover/drop) never fires on touch
// devices, so a finger dragging an .island-draggable widget just scrolls the page instead. This
// mirrors the desktop drag flow above using Pointer Events, which do fire for touch.
(function touchDragToIsland(){
  const HOLD_MS = 130; // hold time before a touch converts into a drag
  // .island-draggable has touch-action:none (see CSS), so the browser never starts its own
  // scroll/pan gesture on these widgets — that's what used to fight an upward drag. Because that
  // race is gone, this no longer needs to cancel on early movement the way an earlier version did.
  let session = null;
  const positionGhost = (ghost, x, y) => { ghost.style.left = `${x - 24}px`; ghost.style.top = `${y - 24}px`; };
  const endSession = () => {
    if (!session) return;
    clearTimeout(session.holdTimer);
    session.source.classList.remove('is-dragging');
    session.ghost?.remove();
    islandDrop.classList.remove('drag-target', 'capacity-full');
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointercancel', onUp);
    session = null;
  };
  const onMove = event => {
    if (!session || event.pointerId !== session.pointerId || !session.dragging) return;
    event.preventDefault();
    positionGhost(session.ghost, event.clientX, event.clientY);
    const full = state.island.length >= 10;
    const nearby = nearIslandDropZone(event.clientX, event.clientY);
    islandDrop.classList.toggle('drag-target', nearby && !full);
    islandDrop.classList.toggle('capacity-full', nearby && full);
  };
  const onUp = event => {
    if (!session || event.pointerId !== session.pointerId) return;
    if (session.dragging && nearIslandDropZone(event.clientX, event.clientY)) {
      const box = islandDrop.getBoundingClientRect();
      pinIsland(session.widget);
      animateIslandRelease(state.island[state.island.length - 1]?.id, box.left + box.width / 2, box.top + box.height / 2);
      session.source.dataset.draggedAt = String(Date.now());
    }
    endSession();
  };
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    const source = event.target.closest('.island-draggable');
    if (!source) return;
    if (event.target.closest('button, input, a, textarea, select') && !source.matches('.postit')) return; // preserve real controls, but Post-it cards are draggable buttons
    const widget = source?.dataset.widget;
    if (!widget) return;
    session = { pointerId: event.pointerId, source, widget, dragging: false, ghost: null };
    session.holdTimer = setTimeout(() => {
      if (!session) return;
      session.dragging = true;
      navigator.vibrate?.(8);
      source.classList.add('is-dragging');
      const meta = widgetMeta[widget] || { icon: '•' };
      const ghost = document.createElement('div');
      ghost.className = 'drag-badge';
      ghost.setAttribute('aria-hidden', 'true');
      ghost.innerHTML = `<span>${escapeHtml(meta.icon)}</span>`;
      document.body.append(ghost);
      session.ghost = ghost;
      positionGhost(ghost, event.clientX, event.clientY);
    }, HOLD_MS);
    document.addEventListener('pointermove', onMove, { passive: false });
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  });
})();
// Touch drag-out-of-island: the reverse of the above — hold a pinned chip and drag it clear of
// the island to unpin it, mirroring the desktop dragend/drop-outside-the-island behaviour below.
(function touchDragFromIsland(){
  const HOLD_MS = 130;
  let session = null;
  const positionGhost = (ghost, x, y) => { ghost.style.left = `${x - 24}px`; ghost.style.top = `${y - 24}px`; };
  const insideIsland = (x, y) => { const box = islandDrop.getBoundingClientRect(); return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom; };
  const endSession = () => {
    if (!session) return;
    clearTimeout(session.holdTimer);
    session.source.classList.remove('is-dragging');
    session.ghost?.remove();
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointercancel', onUp);
    session = null;
  };
  const onMove = event => {
    if (!session || event.pointerId !== session.pointerId || !session.dragging) return;
    event.preventDefault();
    positionGhost(session.ghost, event.clientX, event.clientY);
    session.ghost.classList.toggle('remove-ready', !insideIsland(event.clientX, event.clientY));
  };
  const onUp = event => {
    if (!session || event.pointerId !== session.pointerId) return;
    if (session.dragging && !insideIsland(event.clientX, event.clientY)) removeIsland(session.id, { x: event.clientX, y: event.clientY });
    endSession();
  };
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') return;
    const source = event.target.closest('.island-indicator');
    if (!source) return;
    const id = source.dataset.island, item = state.island.find(entry => entry.id === id);
    if (!id || !item) return;
    session = { pointerId: event.pointerId, source, id, dragging: false, ghost: null };
    session.holdTimer = setTimeout(() => {
      if (!session) return;
      session.dragging = true;
      navigator.vibrate?.(8);
      source.classList.add('is-dragging');
      const ghost = document.createElement('div');
      ghost.className = 'drag-badge';
      ghost.setAttribute('aria-hidden', 'true');
      ghost.innerHTML = `<span>${escapeHtml(item.icon)}</span>`;
      document.body.append(ghost);
      session.ghost = ghost;
      positionGhost(ghost, event.clientX, event.clientY);
    }, HOLD_MS);
    document.addEventListener('pointermove', onMove, { passive: false });
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  });
})();
$('#canvas').ondragover=event=>event.preventDefault();$('#canvas').ondrop=event=>{const id=event.dataTransfer.getData('application/nura-island');if(id)removeIsland(id,{x:event.clientX,y:event.clientY});};
document.addEventListener('dragend',event=>{const id=event.dataTransfer?.getData?.('application/nura-island');const landing=document.elementFromPoint(event.clientX,event.clientY);if(id&&event.clientX&&event.clientY&&!landing?.closest('#island'))removeIsland(id,{x:event.clientX,y:event.clientY});islandDragMeta=null;});
function showContextMenu(x,y,items){const menu=$('#contextMenu');menu.innerHTML=items.map(item=>`<button data-context-action="${item.id}" class="${item.danger?'danger':''}">${escapeHtml(item.label)}</button>`).join('');menu.style.left=`${Math.min(x,innerWidth-196)}px`;menu.style.top=`${Math.min(y,innerHeight-120)}px`;menu.classList.add('open');$$('[data-context-action]').forEach(button=>button.onclick=()=>{menu.classList.remove('open');items.find(item=>item.id===button.dataset.contextAction)?.run();});}
function bindLongPress(element,openMenu){let timer=null,point=null,handled=false;const clear=()=>{clearTimeout(timer);timer=null;};element.addEventListener('pointerdown',event=>{if(event.pointerType!=='touch')return;handled=false;point={clientX:event.clientX,clientY:event.clientY,preventDefault(){}};timer=setTimeout(()=>{handled=true;navigator.vibrate?.(8);openMenu(point);},560);});element.addEventListener('pointermove',clear);element.addEventListener('pointerup',clear);element.addEventListener('pointercancel',clear);element.addEventListener('click',event=>{if(handled){event.preventDefault();event.stopImmediatePropagation();handled=false;}},true);}
document.addEventListener('click',event=>{if(!event.target.closest('#contextMenu'))$('#contextMenu').classList.remove('open');if(!event.target.closest('#islandPreview')&&!event.target.closest('.island-indicator'))$('#islandPreview').classList.remove('open');if(!event.target.closest('#sourcePopover')&&!event.target.closest('.source-link'))$('#sourcePopover').classList.remove('open');if(!event.target.closest('#profilePopover')&&!event.target.closest('#profileTrigger'))$('#profilePopover').classList.remove('open');if(activePage==='notes'&&activeNote&&!event.target.closest('.postit'))closeNote();if(!event.target.closest('#island'))closeIsland();if(!event.target.closest('#islandAlert')&&!event.target.closest('#island'))$('#islandAlert')?.classList.remove('open');});
$('#modalLayer').onclick=event=>{if(event.target===$('#modalLayer'))closeModal();};
function renameCategory(name){showModal(`<h2>Rename category</h2><input id="renameInput" maxlength="30" value="${escapeHtml(name)}" autofocus><div class="modal-actions"><button class="secondary" id="modalCancel">Cancel</button><button class="primary" id="saveRename">Save</button></div>`);bindModalCancel();$('#saveRename').onclick=()=>{const next=$('#renameInput').value.trim();if(!next)return $('#renameInput').focus();if(!state.categories.includes(next)){state.categories=state.categories.map(category=>category===name?next:category);state.notes.forEach(note=>{if(note.category===name)note.category=next;});if(state.category===name)state.category=next;saveState();renderNotes();closeModal();}};}
function deleteCategory(name){if(name==='All')return toast('Keep the All category available');state.categories=state.categories.filter(category=>category!==name);state.notes.forEach(note=>{if(note.category===name)note.category='Study';});if(state.category===name)state.category='All';saveState();renderNotes();toast(`${name} notes moved to Study`);}

function currentNote(){ return state.notes.find(note=>note.id===activeNote); }
function renderNotes(){
  const selected=state.category||'All',categories=['All',...state.categories],icons={All:'◌',Study:'▤',Math:'∑',English:'✎',Geography:'⌖',Science:'◈'};$('#categoryList').innerHTML=categories.map(category=>`<button class="category-tag ${selected===category?'active':''}" data-category="${escapeHtml(category)}"><i>${icons[category]||'◇'}</i><span>${escapeHtml(category)}</span><small>${category==='All'?state.notes.length:state.notes.filter(note=>note.category===category).length}</small></button>`).join('');
  $$('[data-category]').forEach(button=>{const menu=event=>{event.preventDefault?.();const category=button.dataset.category;if(category==='All')return;showContextMenu(event.clientX,event.clientY,[{id:'rename',label:'Rename category',run:()=>renameCategory(category)},{id:'delete',label:'Delete category',danger:true,run:()=>deleteCategory(category)}]);};button.onclick=()=>{state.category=button.dataset.category;saveState();renderNotes();};button.oncontextmenu=menu;bindLongPress(button,menu);}); const notes=state.notes.filter(note=>selected==='All'||note.category===selected);
  notes.forEach(note=>widgetMeta[`note:${note.id}`]={icon:'✎',label:note.title||'Untitled note',detail:()=>note.content?.slice(0,100)||'Quick note'});$('#noteGrid').innerHTML=notes.length?notes.map((note,index)=>note.id===activeNote?`<article class="postit postit-${index%5} expanded" data-note="${note.id}"><span class="postit-tag">${escapeHtml(note.category)}</span><input class="inline-note-title" value="${escapeHtml(note.title||'Untitled note')}" aria-label="Note title"/><textarea class="inline-note-content" aria-label="Note content" placeholder="Start writing something worth keeping…">${escapeHtml(note.content||'')}</textarea><span class="note-collapse-hint">Click outside to close</span></article>`:`<button class="postit postit-${index%5} island-draggable" data-note="${note.id}" data-widget="note:${note.id}" draggable="true"><span class="postit-tag">${escapeHtml(note.category)}</span><b>${escapeHtml(note.title||'Untitled')}</b><p>${escapeHtml(note.content||'Empty note').replace(/\n/g,' ')}</p></button>`).join(''):'<div class="empty-state">No notes in this category. Create one to begin.</div>';
  $$('[data-note]').forEach(card=>{const menu=event=>{event.preventDefault?.();const id=card.dataset.note,note=state.notes.find(entry=>entry.id===id);if(!note)return;showContextMenu(event.clientX,event.clientY,[{id:'pin',label:'Add to Dynamic Island',run:()=>pinIsland(`note:${id}`,{icon:'✎',label:note.title||'Untitled note',detail:()=>note.content?.slice(0,100)||'Quick note'})},{id:'delete',label:'Delete note',danger:true,run:()=>deleteNoteById(id)}]);};if(!card.classList.contains('expanded'))card.onclick=()=>{if(Date.now()-(Number(card.dataset.draggedAt)||0)<550)return;openNote(card.dataset.note);};card.oncontextmenu=menu;bindLongPress(card,menu);});
  const title=$('.inline-note-title'),content=$('.inline-note-content');if(title&&content){const saveInline=()=>{const note=currentNote();if(!note)return;note.title=title.value.trim()||'Untitled note';note.content=content.value;if(state.preferences.autoCategorize)note.category=inferNoteCategory(note);saveState();};title.oninput=saveInline;content.oninput=saveInline;title.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();content.focus();}};content.onkeydown=event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();saveInline();content.blur();closeNote();}};}
  draggableWidgets();
  if(activeNote && !currentNote()) closeNote();
}
function openNote(id){activeNote=id;if(!currentNote())return;renderNotes();requestAnimationFrame(()=>$('.inline-note-title')?.focus());}
function closeNote(){if(!activeNote)return;activeNote=null;renderNotes();}
function deleteNoteById(id){const note=state.notes.find(entry=>entry.id===id);if(!note)return;state.notes=state.notes.filter(entry=>entry.id!==id);state.island=state.island.filter(item=>item.kind!==`note:${id}`);if(activeNote===id)closeNote();saveState();renderNotes();renderIsland();toast('Note deleted');}
function inferNoteCategory(note){const text=`${note.title} ${note.content}`.toLowerCase();if(/equation|algebra|calculus|geometry|number|math/.test(text))return 'Math';if(/essay|grammar|novel|writing|english/.test(text))return 'English';if(/map|country|capital|geography|climate/.test(text))return 'Geography';if(/experiment|biology|physics|chemistry|science/.test(text))return 'Science';return 'Study';}
async function categorizeNotesWithNura(notes=state.notes){if(!notes.length)return;const fallback=()=>notes.forEach(note=>note.category=inferNoteCategory(note));if(offlinePreview()||!mindReady()){fallback();saveState();renderNotes();return;}try{const prompt=`Classify each note into one concise school-subject category. Existing categories: ${state.categories.join(', ')}. Create a new category only when none fits. Return JSON with a categories array in exactly the same order as the note titles. Titles: ${notes.map(note=>note.title||'Untitled').join(' | ')}`;const result=await askNura(prompt,'Library');if(!Array.isArray(result.categories)||result.categories.length!==notes.length)throw new Error('Invalid categories');result.categories.forEach((name,index)=>{const category=String(name).replace(/[^\w &/-]/g,'').trim().slice(0,30)||inferNoteCategory(notes[index]);if(!state.categories.includes(category))state.categories.push(category);notes[index].category=category;});}catch{fallback();}saveState();renderNotes();}
function curateNotes(){categorizeNotesWithNura().then(()=>toast('Notes organized by NuraMind'));}
function saveNote(){const note=currentNote();if(!note)return;note.title=$('#noteTitle').value.trim()||'Untitled note';note.content=$('#noteContent').value;if(state.preferences.autoCategorize)note.category=inferNoteCategory(note);saveState();renderNotes();}
// Notes are intentionally created from NuraMind summaries instead of a blank-note button.
$('#noteTitle').oninput=saveNote;$('#noteContent').oninput=saveNote;$('#collapseNote').onclick=closeNote;$('#deleteNote').onclick=()=>{const note=currentNote();if(note)deleteNoteById(note.id);};
$('#noteTitle').onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();saveNote();$('#noteContent').focus();}};$('#noteContent').onkeydown=event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();saveNote();$('#noteContent').blur();toast('Note saved');}};
function showCategoryModal(){showModal(`<h2>New category</h2><p>Use a clear name. It will be available for every note.</p><input id="categoryInput" maxlength="30" placeholder="e.g. History" autofocus><div class="modal-actions"><button class="secondary" id="modalCancel">Cancel</button><button class="primary" id="saveCategory">Create</button></div>`);bindModalCancel();$('#saveCategory').onclick=()=>{const name=$('#categoryInput').value.trim();if(!name)return $('#categoryInput').focus();if(!state.categories.includes(name))state.categories.push(name);if(currentNote())currentNote().category=name;state.category=name;saveState();closeModal();renderNotes();if(activeNote)openNote(activeNote);};}
$('#addCategory').onclick=showCategoryModal;

function ensureChat(){state.chats=state.chats.filter(chat=>chat.title!=='New conversation'||chat.messages.length);if(!state.chats.some(chat=>chat.id===activeChat))activeChat=state.chats[0]?.id||null;}
function getChat(){return state.chats.find(chat=>chat.id===activeChat);}
function renderChats(){ensureChat();const visible=state.chats.filter(chat=>chat.title);$('#chatList').innerHTML=visible.length?visible.map(chat=>`<button class="chat-item ${chat.id===activeChat?'active':''}" data-chat="${chat.id}">${escapeHtml(chat.title)}</button>`).join(''):'<div class="chat-empty">Your first question creates a named session.</div>';$$('[data-chat]').forEach(button=>{const menu=event=>{event.preventDefault?.();const id=button.dataset.chat;showContextMenu(event.clientX,event.clientY,[{id:'rename',label:'Rename session',run:()=>renameChat(id)},{id:'delete',label:'Delete session',danger:true,run:()=>deleteChat(id)}]);};button.onclick=()=>{activeChat=button.dataset.chat;renderChats();renderConversation();};button.oncontextmenu=menu;bindLongPress(button,menu);});}
async function saveNuraMindNote(text,prompt=''){const title=(prompt.replace(/(?:write|turn|make|create|save).{0,25}(?:note|notes)/i,'').trim()||text.split(/[.!?\n]/)[0]||'NuraMind summary').slice(0,48),note={id:`note-${Date.now()}`,title,content:text.trim(),category:inferNoteCategory({title,content:text})};state.notes.unshift(note);saveState();await categorizeNotesWithNura([note]);toast(`Saved to ${note.category}`);}
// Turns the whole active NuraMind chat into a note in Notes Studio, not just one message.
function localChatSummary(messages){
  const lines=messages.filter(message=>message.role==='user').map(message=>message.text.split(/[.!?\n]/)[0].trim()).filter(Boolean).slice(-6);
  const title=(lines[0]||'NuraMind session').slice(0,48);
  const content=lines.length?lines.map(line=>`- ${line}`).join('\n'):'A short NuraMind session with nothing to summarize yet.';
  return {title,content};
}
async function summarizeChatToNote(){
  const chat=getChat(),messages=(chat?.messages||[]).filter(message=>message?.text);
  if(!messages.length){toast('Nothing in this chat yet to summarize');return;}
  const button=$('#summarizeNote');if(button)button.disabled=true;
  try{
    let title,content;
    if(offlinePreview()||!mindReady()){
      ({title,content}=localChatSummary(messages));
    } else {
      const transcript=messages.map(message=>`${message.role==='user'?'You':'NuraMind'}: ${message.text}`).join('\n').slice(0,6000);
      const out=parseJsonReply((await groqChat([
        {role:'system',content:'You write short study notes from a chat transcript. Reply with JSON only in exactly this shape: {"title": string (max 8 words), "content": string (a concise summary in the reader\'s own study notes style, 3-6 short lines, "- " prefix for each line)}.'},
        {role:'user',content:transcript}
      ],{json:true,temperature:0.3,max_completion_tokens:600})).text);
      title=String(out.title||'NuraMind summary').slice(0,60);
      content=String(out.content||'').trim();
      if(!content)throw new Error('NuraMind returned an empty summary. Try again.');
    }
    const note={id:`note-${Date.now()}`,title,content,category:inferNoteCategory({title,content})};
    state.notes.unshift(note);
    saveState(); await categorizeNotesWithNura([note]);
    if(activePage==='notes')renderNotes();
    toast(`Saved to ${note.category} in Notes Studio`);
  }catch(error){
    console.error('[NuraMind] summarizeChatToNote',error);
    toast(error.message||'Could not summarize this chat.');
  }finally{
    if(button)button.disabled=false;
  }
}
function renderConversation(){const chat=getChat();$('#conversation').innerHTML=chat?chat.messages.map((message,index)=>`<div class="message ${message.role}" data-message-index="${index}">${escapeHtml(message.text)}</div>`).join('')||'<div class="message ai">What would make this session feel more intentional?</div>':'<div class="message ai">Begin with a question, and NuraMind will give the session a thoughtful name.</div>';$$('.message.ai[data-message-index]').forEach(element=>{const menu=event=>{event.preventDefault?.();const text=chat?.messages[Number(element.dataset.messageIndex)]?.text;if(text)showContextMenu(event.clientX,event.clientY,[{id:'note',label:'Save as note',run:()=>saveNuraMindNote(text)}]);};element.oncontextmenu=menu;bindLongPress(element,menu);});$('#conversation').scrollTop=$('#conversation').scrollHeight;}
function makeChat(){const chat={id:`chat-${Date.now()}`,title:'',messages:[],createdAt:Date.now()};state.chats.unshift(chat);activeChat=chat.id;return chat;}
function addMessage(text,role='ai',chat=getChat()||makeChat()){chat.messages.push({role,text,createdAt:Date.now()});if(role==='user'&&chat.messages.filter(message=>message.role==='user').length===1)chat.title=text.trim().replace(/\s+/g,' ').slice(0,42);saveState();renderChats();renderConversation();}
function renameChat(id){const chat=state.chats.find(entry=>entry.id===id);if(!chat)return;showModal(`<h2>Rename conversation</h2><input id="renameInput" maxlength="50" value="${escapeHtml(chat.title)}" autofocus><div class="modal-actions"><button class="secondary" id="modalCancel">Cancel</button><button class="primary" id="saveRename">Save</button></div>`);bindModalCancel();$('#saveRename').onclick=()=>{const title=$('#renameInput').value.trim();if(title){chat.title=title;saveState();renderChats();closeModal();}};}
function deleteChat(id){state.chats=state.chats.filter(chat=>chat.id!==id);if(activeChat===id)activeChat=state.chats[0]?.id||null;saveState();renderChats();renderConversation();toast('Conversation deleted');}
function setMode(mode){activeMode=mode;$$('#modeSwitch button').forEach(button=>button.classList.toggle('active',button.dataset.mode===mode));$('#modeTitle').textContent=mode==='Chat'?'NuraMind':mode;$('#modeSub').textContent=mode==='Quiz'?'Adaptive study session':mode==='Deep Search'?'Source-grounded research':'Focus companion';$('#promptInput').placeholder=mode==='Quiz'?'Name a topic — or just say hi for a random question…':mode==='Deep Search'?'Explore a question in depth…':'Ask NuraMind anything…';$('#sourcesButton').classList.toggle('hidden',!sources.length);requestAnimationFrame(positionModeGlider);}
function signInGate(feature){showModal(`<h2>Make Nura yours</h2><p>${escapeHtml(feature)} is available with a synced Nura account. Sign in or create an account to continue.</p><div class="modal-actions"><button class="secondary" id="modalCancel">Not now</button><button class="primary" id="modalGoogle">Continue with Google</button></div>`);bindModalCancel();$('#modalGoogle').onclick=googleLogin;}
$$('#modeSwitch button').forEach(button=>button.onclick=()=>setMode(button.dataset.mode));$('#newChat').onclick=()=>{makeChat();renderChats();renderConversation();$('#promptInput').focus();};
$('#promptInput').onkeydown=event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();$('#promptForm').requestSubmit();}};
function localNura(prompt,mode){const clean=prompt.trim(),topic=clean.replace(/(give|make|create|quiz|questions?|about|on)/gi,'').replace(/\d+/g,'').trim()||'this topic';if(mode==='Library'){const titles=(clean.match(/titles:\s*(.*)$/i)?.[1]||'').split('|').filter(Boolean);return {text:'Local library sorting complete.',categories:titles.map(heuristicFolder)};}if(mode==='Quiz'){if(quizNeedsRandomTopic(clean))return localRandomQuiz();const count=quizCountFromPrompt(clean);const banks=[['Active recall','Re-reading passively','Avoiding feedback','Skipping breaks'],['Break the topic into claims','Memorize without context','Ignore unfamiliar terms','Study without a goal'],['Explain one key idea aloud','Only highlight text','Delay practice','Use no examples'],['Test yourself before reviewing','Only reread the notes','Study everything at once','Avoid mistakes entirely'],['Space sessions out over days','Cram the night before','Study in one long sitting','Skip the hard parts'],['Teach it to someone else','Copy the material verbatim','Watch a video passively','Highlight without recall'],['Connect it to something known','Memorize in isolation','Ignore prior knowledge','Study out of context'],['Review mistakes afterward','Ignore wrong answers','Move on without checking','Guess and forget']];const questions=Array.from({length:count},(_,index)=>{const options=banks[(index+[...clean].reduce((sum,char)=>sum+char.charCodeAt(0),0))%banks.length];return {question:`Which approach is most useful when learning ${topic}? (${index+1}/${count})`,choices:options,answer:options[0],explanation:`Active engagement creates a stronger study loop for ${topic}.`};});return {text:'Local quiz prepared.',quizSet:{topic,questions}};}if(mode==='Deep Search'){const query=encodeURIComponent(clean);return {text:`Local research preview for “${clean}”. Connect the hosted NuraMind service for a sourced synthesis; these reference paths are ready to explore.`,sources:[{title:'Wikipedia',url:`https://en.wikipedia.org/w/index.php?search=${query}`},{title:'Google Scholar',url:`https://scholar.google.com/scholar?q=${query}`} ]};}if(mode==='Search')return {text:`Local search preview: “${clean}” is ready for focused exploration. Switch to Deep Search when you want reference links.`};const responses=[`A clear next move for “${clean}”: define one small outcome, work for ten uninterrupted minutes, then reassess.`,`For “${clean}”, protect momentum: remove one distraction and begin with the simplest meaningful step.`,`I’d frame “${clean}” as a focused experiment. Choose a concrete result, set a short timer, and capture what changed.`];return {text:responses[[...clean].length%responses.length]};}
// ---- NuraMind via Groq (LOCAL TESTING ONLY) ------------------------------------------------
// The Groq key is read from Firestore at config/app (field "Groq Api") after sign-in, then used
// straight from the browser. Anyone who can read that document can read the key, so use a throwaway
// key and lock the document down with the rules in firestore.rules.
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
// Groq shut down llama-3.3-70b-versatile on 16 Aug 2026. If Groq retires this one too, change it here.
const GROQ_MODEL = 'openai/gpt-oss-120b';
console.info('[NuraMind] build 3 · model', GROQ_MODEL);
const NURA_SYSTEM = 'You are NuraMind, a concise study and focus companion. Do not present health telemetry as medical advice.';
let groqKeyCache = null;
async function getGroqKey(){
  if(groqKeyCache) return groqKeyCache;
  if(!firestoreDb || !firestoreSdk) throw new Error('Firebase is not ready yet. Try again in a moment.');
  let snap;
  try { snap = await firestoreSdk.getDoc(firestoreSdk.doc(firestoreDb,'config','app')); }
  catch(error){ throw new Error(error?.code==='permission-denied' ? 'Firestore blocked reading config/app. Publish the rules from firestore.rules.' : 'Could not read the Groq key from Firestore.'); }
  const data = snap.exists() ? snap.data() : {};
  const key = String(data['Groq Api'] || Object.values(data).find(value=>typeof value==='string' && value.trim().startsWith('gsk_')) || '').trim();
  if(!key) throw new Error('No Groq key found in config/app. Add a string field whose value starts with gsk_.');
  return groqKeyCache = key;
}
async function groqChat(messages,opts={}){
  const {json=false,temperature=0.6,max_completion_tokens=2500,search=false}=opts;
  const key = await getGroqKey();
  const body = {model:GROQ_MODEL,messages,temperature,max_completion_tokens,reasoning_effort:'low'};
  // Browser search is a Groq built-in tool: it lets NuraMind look things up on the live web. It is
  // ALWAYS offered with tool_choice "auto" — the model decides. Forcing it ("required") makes Groq
  // reject the request with a 400 whenever the message needs no lookup (e.g. just "Hi"), which was
  // the "Tool choice is required, but model did not call a tool" error.
  if(search){ body.tools = [{type:'browser_search'}]; body.tool_choice = 'auto'; }
  let response;
  try {
    response = await fetch(GROQ_URL,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`},body:JSON.stringify(body)});
  } catch { throw new Error('Could not reach Groq. Check your internet connection.'); }
  if(!response.ok){
    if(response.status===401){ groqKeyCache = null; throw new Error('Groq rejected the API key. Check the value in Firestore.'); }
    if(response.status===404) throw new Error('Groq says this model no longer exists. Change GROQ_MODEL near the top of the NuraMind section in js/app.js.');
    if(response.status===429) throw new Error('Groq rate limit reached. Wait a moment and try again.');
    let detail = ''; try { detail = (await response.json())?.error?.message || ''; } catch {}
    // Safety net: if Groq complains about the tool at all, answer once more without browsing
    // instead of showing the person a raw API error.
    if(search && response.status===400 && /tool/i.test(detail)) return groqChat(messages,{...opts,search:false});
    throw new Error(`Groq error ${response.status}${detail?`: ${detail}`:''}`);
  }
  const data = await response.json();
  const message = data?.choices?.[0]?.message;
  const text = message?.content?.trim();
  if(!text) throw new Error('Groq returned an empty response.');
  return {text, sources: search ? extractGroqSources(data, message) : []};
}
// Pulls real, retrieved URLs out of a browser_search response. Groq's exact shape here has moved
// around (annotations vs. executed_tools vs. top-level citations), so this checks each spot it's
// documented to appear in rather than assuming one. Any spot that doesn't match is just skipped.
function extractGroqSources(data, message){
  const found = [];
  const add = (url, title) => { url = String(url||'').trim(); if(url && !found.some(item=>item.url===url)) found.push({url, title: String(title||url).trim()}); };
  (message?.annotations||[]).forEach(note => { const link = note?.url_citation || note?.citation || note; if(link?.url) add(link.url, link.title); });
  (data?.citations||[]).forEach(citation => { if(typeof citation === 'string') add(citation); else if(citation?.url) add(citation.url, citation.title); });
  (message?.executed_tools||[]).forEach(tool => (tool?.search_results?.results||tool?.output?.results||[]).forEach(result => result?.url && add(result.url, result.title)));
  return found.slice(0,6);
}
function parseJsonReply(text){
  try { return JSON.parse(text); } catch {}
  const match = text.match(/\{[\s\S]*\}/);
  if(match){ try { return JSON.parse(match[0]); } catch {} }
  throw new Error('NuraMind returned an unreadable answer. Try again.');
}
function chatHistory(prompt){
  const past = (getChat()?.messages || []).slice(-12).filter(message=>message?.text).map(message=>({role:message.role==='user'?'user':'assistant',content:String(message.text)}));
  if(past.length && past[past.length-1].role==='user' && past[past.length-1].content===prompt) past.pop();
  return [...past,{role:'user',content:prompt}];
}

// ---- Quiz: random start --------------------------------------------------------------------
// If the person doesn't name a topic in Quiz mode ("Hi", "quiz me", "give me a question"), NuraMind
// picks a random topic and starts a multiple-choice quiz instead of chatting. Change the number of
// questions in that case here:
const RANDOM_QUIZ_COUNT = 3;
const RANDOM_QUIZ_TOPICS = ['Space and the solar system','World geography and capitals','The human body','Chemistry basics','Everyday physics','Arithmetic and algebra','English grammar and vocabulary','Famous inventions','Ancient history','Animals and nature','Weather and earth science','Computers and the internet','Famous books and authors','Music and instruments','Famous landmarks','Food and nutrition'];
function quizFormatFromPrompt(prompt){const text=String(prompt||'').toLowerCase();if(/true\s*(?:or|\/|and)\s*false/.test(text))return 'true_false';if(/(?:no|not|don't|do not|without|instead of)\s+(?:a\s+)?multiple[ -]?choice|open[ -]?ended|text(?:ual)? answer|type (?:my|the) answer/.test(text))return 'text';return 'multiple_choice';}
function localQuizNura(prompt){const format=quizFormatFromPrompt(prompt),topic=quizNeedsRandomTopic(prompt)?'Mixed topics':prompt.replace(/.*?(?:about|on)\s+/i,'').trim()||'this topic',count=quizCountFromPrompt(prompt),questions=shuffled(LOCAL_QUIZ_BANK).slice(0,count).map(item=>format==='true_false'?{question:`True or false: this is a local practice question about ${topic}.`,format,choices:['True','False'],answer:'True',explanation:'Local preview questions use a simple true statement.'}:{question:item.question,format,choices:format==='text'?[]:shuffled(item.choices),answer:item.answer,explanation:item.explanation});return {text:'Local quiz ready.',quizSet:{topic,questions}};}
const LOCAL_QUIZ_BANK = [
  {question:'What is 12 × 12?',choices:['124','144','132','148'],answer:'144',explanation:'12 × 12 = 144.'},
  {question:'What is the square root of 81?',choices:['7','8','9','11'],answer:'9',explanation:'9 × 9 = 81.'},
  {question:'Solve 3x + 5 = 20. What is x?',choices:['3','5','15','25'],answer:'5',explanation:'Subtract 5 to get 3x = 15, then divide by 3.'},
  {question:'Which word is a synonym of “rapid”?',choices:['Swift','Gentle','Heavy','Silent'],answer:'Swift',explanation:'Rapid and swift both mean fast.'},
  {question:'Which spelling is correct?',choices:['Neccessary','Necessary','Necesary','Nessecary'],answer:'Necessary',explanation:'One C, two S’s: ne-ces-sa-ry.'},
  {question:'A word that describes a noun is called…',choices:['A verb','An adverb','An adjective','A pronoun'],answer:'An adjective',explanation:'Adjectives describe nouns, like “red” in “red apple”.'},
  {question:'What is the capital of Australia?',choices:['Sydney','Melbourne','Canberra','Perth'],answer:'Canberra',explanation:'Canberra was purpose-built as the capital.'},
  {question:'Which is the largest ocean on Earth?',choices:['Atlantic','Indian','Arctic','Pacific'],answer:'Pacific',explanation:'The Pacific covers about a third of the planet’s surface.'},
  {question:'Which river is the longest in Africa?',choices:['Congo','Nile','Niger','Zambezi'],answer:'Nile',explanation:'The Nile runs about 6,650 km.'},
  {question:'What is the chemical symbol for gold?',choices:['Ag','Gd','Au','Go'],answer:'Au',explanation:'Au comes from the Latin word “aurum”.'},
  {question:'Which planet is known as the Red Planet?',choices:['Venus','Mars','Jupiter','Mercury'],answer:'Mars',explanation:'Iron oxide on its surface gives Mars a red colour.'},
  {question:'Which part of the cell is called its “powerhouse”?',choices:['Nucleus','Ribosome','Mitochondrion','Membrane'],answer:'Mitochondrion',explanation:'Mitochondria release most of the cell’s energy.'},
  {question:'Which gas do plants absorb for photosynthesis?',choices:['Oxygen','Nitrogen','Carbon dioxide','Helium'],answer:'Carbon dioxide',explanation:'Plants turn CO₂ and water into sugar and oxygen.'},
  {question:'How many continents are there?',choices:['5','6','7','8'],answer:'7',explanation:'Africa, Antarctica, Asia, Australia/Oceania, Europe, North America and South America.'}
];
function shuffled(list){const copy=[...list];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function quizNeedsRandomTopic(prompt){
  const rest = String(prompt||'').toLowerCase().replace(/\d+/g,' ')
    .replace(/\b(hi|hey|hello|hallo|hej|hola|yo|sup|good|morning|afternoon|evening|thanks|thank|you|ok|okay|yes|no|please|pls|quiz|quizzes|question|questions|test|me|give|make|create|ask|start|begin|another|next|more|one|a|an|the|some|random|new|on|about|of|for|to|i|want|would|like|can|could|let|lets|let's|go|again|ready|now|and|with|multiple|choice|choices|something|anything|surprise|my|us|it|is|do|there|nura|nuramind|buddy|friend|everyone|dear|man|bro|whats|what|s|up|how|are|am|im|m)\b/g,' ')
    .replace(/[^a-z\u00c0-\u024f]+/g,' ').trim();
  return rest.length < 2;
}
function localRandomQuiz(count=RANDOM_QUIZ_COUNT){
  const questions = shuffled(LOCAL_QUIZ_BANK).slice(0,count).map(q=>({question:q.question,choices:shuffled(q.choices),answer:q.answer,explanation:q.explanation}));
  return {text:'Random quiz ready.',quizSet:{topic:'Mixed topics',random:true,questions}};
}
function quizCountFromPrompt(prompt){
  const match = String(prompt||'').match(/(\d{1,2})\s*(?:questions?|qs?)\b/i);
  const count = match ? parseInt(match[1],10) : 3;
  return Math.min(Math.max(count,1),8);
}
async function askNuraInner(prompt,mode){
  if(offlinePreview() || !mindReady()){ console.info('[NuraMind] using LOCAL replies (guest mode, file:// page, or not signed in)'); return mode==='Quiz'?localQuizNura(prompt):localNura(prompt,mode); }

  if(mode==='Library'){
    const out = parseJsonReply((await groqChat([{role:'system',content:'You sort music tracks into playlist folders. Reply with JSON only.'},{role:'user',content:prompt}],{json:true,temperature:0.2})).text);
    return {text:'Library sorted.',categories:Array.isArray(out.categories)?out.categories.map(String):[]};
  }

  if(mode==='Quiz'){
    const random = quizNeedsRandomTopic(prompt);
    const count = random ? RANDOM_QUIZ_COUNT : quizCountFromPrompt(prompt);
    const seedTopic = random ? shuffled(RANDOM_QUIZ_TOPICS)[0] : '';
    const topicRule = random
      ? `The person did not name a topic (they may only have said hello), so do NOT chat back. Write the quiz on this random topic: "${seedTopic}". Pick specific, varied facts rather than the most obvious ones.`
      : 'Write the quiz on the topic the person asked for.';
    const format=quizFormatFromPrompt(prompt);
    const formatRule=format==='true_false'?'Use exactly ["True", "False"] for every choices array.':format==='text'?'Do not include choices. Make each question answerable with a short typed response; include a concise answer string for matching.':'Use exactly four short choices and make answer identical to one choice.';
    const out = parseJsonReply((await groqChat([
      {role:'system',content:`${NURA_SYSTEM} You are in Quiz mode, so you ALWAYS answer with a quiz and never with conversation. ${topicRule} The requested question format is "${format}". ${formatRule} Write ${count} different questions, ordered easy to hard. Reply with JSON only in exactly this shape: {"topic": string, "format":"${format}", "questions": [{"question": string, "choices": ["optional strings"], "answer": string, "explanation": string}]}. The "questions" array must have exactly ${count} items.`},
      {role:'user',content: random ? `Give me a random quiz about ${seedTopic}.` : prompt}
    ],{json:true,temperature:random?0.9:0.7,max_completion_tokens:count*400+400})).text);
    const questions = (Array.isArray(out.questions)?out.questions:[]).map(q=>{
      const choices = format==='text'?[]:format==='true_false'?['True','False']:(Array.isArray(q?.choices) ? q.choices.map(String) : []);
      if(!q?.question || !String(q.answer||'').trim() || (format!=='text'&&(!choices.includes(String(q.answer))||choices.length<2))) return null;
      return {question:String(q.question),format,choices:format==='multiple_choice'?shuffled(choices):choices,answer:String(q.answer),explanation:String(q.explanation||'')};
    }).filter(Boolean);
    if(!questions.length) throw new Error('The quiz came back malformed. Try again.');
    return {text:'Quiz ready.',quizSet:{topic:String(out.topic||seedTopic||'Untitled'),random,questions}};
  }

  // Chat/Search/Deep Search all can browse the live web via Groq's browser_search tool. Chat lets
  // the model decide when a search is actually needed. Search and Deep Search are research modes, so
  // their prompts tell the model to search for anything factual, but it is never *forced* to.
  const modeNote = {
    'Search':' You can browse the live web with your browser_search tool — use it for any factual, current or specific question, and cite what you find in your answer. Greetings and small talk do not need a search; just reply naturally. Never write a complete, finished essay, report, or assignment for the person, even if asked directly; instead help them plan, outline, research, or improve their own draft, and say briefly why you\'re doing that instead.',
    'Deep Search':' Give a thorough, well-structured, source-grounded answer with short sections, using your browser_search tool to look things up rather than relying on memory alone (greetings and small talk do not need a search; just reply naturally). Never write a complete, finished essay, report, or assignment for the person, even if asked directly; instead help them plan, outline, research, or improve their own draft, and say briefly why you\'re doing that instead.',
    'Chat':' You can browse the live web with your browser_search tool when a question needs current or specific information — use it rather than guessing. Never write a complete, finished essay, report, or assignment for the person, even if asked directly; instead help them plan, outline, research, or improve their own draft, and say briefly why you\'re doing that instead.'
  }[mode] || '';
  const {text, sources} = await groqChat(
    [{role:'system',content:NURA_SYSTEM+modeNote},...chatHistory(prompt)],
    {temperature:mode==='Chat'?0.7:0.4,max_completion_tokens:mode==='Deep Search'?4000:2500,search:true}
  );
  return sources.length ? {text,sources} : {text};
}
async function askNura(prompt,mode=activeMode){
  try { return await askNuraInner(prompt,mode); }
  catch(error){ console.error('[NuraMind]',mode,error); throw error; }
}
function renderQuizSet(quizSet,chat){
  const questions = quizSet?.questions||[];
  if(!questions.length) return;
  let index = 0, correct = 0;
  if(quizSet.random) addMessage(`Random quiz — ${questions.length} question${questions.length===1?'':'s'}. Topic: ${quizSet.topic}. Tap an answer.`,'ai',chat);
  const showNext = () => {
    if(index >= questions.length){
      addMessage(`Quiz complete — ${correct}/${questions.length} correct.`,'ai',chat);
      state.quizResults.push({score:Math.round((correct/questions.length)*100),answers:questions.length,topic:quizSet.topic||'Untitled'});
      saveState(); renderChats(); renderQuizStats();
      setMode('Chat'); // so the next thing typed doesn't start another quiz by accident
      return;
    }
    const quiz = questions[index++];
    addMessage(`${quiz.question} (${index}/${questions.length})`,'ai',chat);
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = quiz.format==='text'?`<form class="quiz-text-answer"><input aria-label="Your answer" placeholder="Type your answer…"/><button>Send</button></form>`:quiz.choices.map(choice=>`<button>${escapeHtml(choice)}</button>`).join('');
    const submitAnswer=answer=>{
      const normalized=value=>String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');
      const isCorrect = normalized(answer)===normalized(quiz.answer);
      if(isCorrect) correct++;
      card.querySelectorAll('button').forEach(entry=>entry.disabled=true);
      card.querySelectorAll('input').forEach(input=>input.disabled=true);
      const selected=[...card.querySelectorAll('button')].find(button=>button.textContent.trim()===String(answer).trim());
      selected?.classList.add(isCorrect?'correct':'incorrect');
      const feedback = document.createElement('div');
      feedback.className = 'quiz-feedback';
      feedback.textContent = isCorrect ? `Correct. ${quiz.explanation||''}` : `Not quite. ${quiz.explanation||`The answer is ${quiz.answer}.`}`;
      card.append(feedback);
      chat.messages.push({role:'user',text:String(answer).trim(),createdAt:Date.now()});
      saveState(); renderChats(); const reply=document.createElement('div');reply.className='message user quiz-answer-echo';reply.textContent=String(answer).trim();$('#conversation').append(reply);
      setTimeout(showNext, 900); // auto-advance to the next question
    };
    card.querySelectorAll(':scope > button').forEach(button=>button.onclick=()=>submitAnswer(button.textContent.trim()));
    card.querySelector('.quiz-text-answer')?.addEventListener('submit',event=>{event.preventDefault();const input=card.querySelector('input'),answer=input.value.trim();if(answer)submitAnswer(answer);});
    $('#conversation').append(card);
    $('#conversation').scrollTop = $('#conversation').scrollHeight;
  };
  showNext();
}
$('#promptForm').onsubmit=async event=>{event.preventDefault();const prompt=$('#promptInput').value.trim();if(!prompt)return;const chat=getChat()||makeChat(),saveAsNote=/(?:as a note|to notes|make (?:this|that|it) (?:a )?note|create (?:a )?note|write (?:a )?note)/i.test(prompt);addMessage(prompt,'user',chat);$('#promptInput').value='';const thinking=document.createElement('div');thinking.className='message ai';thinking.textContent=offlinePreview()?'NuraMind is shaping a local response…':'NuraMind is thinking…';$('#conversation').append(thinking);try{const result=await askNura(prompt);thinking.remove();sources=Array.isArray(result.sources)?result.sources.filter(source=>source?.url&&source?.title):[];if(result.quizSet)renderQuizSet(result.quizSet,chat);else{addMessage(result.text,'ai',chat);if(saveAsNote)saveNuraMindNote(result.text,prompt);}$('#sourceCount').textContent=sources.length;$('#sourcesButton').classList.toggle('hidden',!sources.length);}catch(error){thinking.textContent=error.message;thinking.classList.add('error');}};
$('#summarizeNote')?.addEventListener('click',summarizeChatToNote);
$('#sourcesButton').onclick=()=>{if(!sources.length)return;$('#conversation').insertAdjacentHTML('beforeend',`<div class="source-links">${sources.map((source,index)=>`<button class="source-link" data-source="${index}">${escapeHtml(source.title)}</button>`).join('')}</div>`);$$('[data-source]').forEach(button=>button.onclick=()=>sourceAction(sources[Number(button.dataset.source)],button));};
function sourceAction(source,anchor){const rect=anchor.getBoundingClientRect(),popover=$('#sourcePopover');popover.style.left=`${Math.min(rect.left,innerWidth-236)}px`;popover.style.top=`${rect.bottom+8}px`;popover.innerHTML=`<p>${escapeHtml(source.title)}</p><button id="copySource">Copy link</button><button id="openSource">Open link</button>`;popover.classList.add('open');$('#copySource').onclick=async()=>{try{await navigator.clipboard.writeText(source.url);toast('Link copied');}catch{toast('Copy unavailable in this browser');}popover.classList.remove('open');};$('#openSource').onclick=()=>{window.open(source.url,'_blank','noopener');popover.classList.remove('open');};}
function renderQuizStats(){const results=state.quizResults||[];$('#quizEmpty').classList.toggle('hidden',Boolean(results.length));$('#quizStats').classList.toggle('hidden',!results.length);if(results.length){$('#quizScore').textContent=`${Math.round(results.reduce((sum,item)=>sum+(+item.score||0),0)/results.length)}%`;$('#quizCount').textContent=results.length;$('#answerCount').textContent=results.reduce((sum,item)=>sum+(+item.answers||0),0);}}

function curatedTracks(){return [];}
function formatTime(seconds){return Number.isFinite(seconds)?`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`:'0:00';}
function showFolderContext(folder,event){if(folder==='Unsorted')return;showContextMenu(event.clientX,event.clientY,[{id:'rename',label:'Rename collection',run:()=>renameMusicFolder(folder)},{id:'delete',label:'Delete collection',danger:true,run:()=>deleteMusicFolder(folder)}]);}
function renderMusicFolders(){const folders=state.musicFolders||[];$('#musicFolders').innerHTML=folders.map(folder=>`<button class="music-folder ${selectedPlaylist===folder?'active':''}" data-folder-drop="${escapeHtml(folder)}"><span>◒</span><b>${escapeHtml(folder)}</b><small>${tracks.filter(track=>track.folder===folder).length} tracks</small></button>`).join('');$$('[data-folder-drop]').forEach(button=>{const menu=event=>{event.preventDefault?.();showFolderContext(button.dataset.folderDrop,event);};button.onclick=()=>{selectedPlaylist=button.dataset.folderDrop;renderMusic();};button.ondragover=event=>event.preventDefault();button.ondrop=event=>{event.preventDefault();const index=Number(event.dataTransfer.getData('application/nura-track'));if(Number.isInteger(index)&&tracks[index]){tracks[index].folder=button.dataset.folderDrop;renderMusic();toast(`Added to ${button.dataset.folderDrop}`);}};button.oncontextmenu=menu;bindLongPress(button,menu);});}
function renderTracks(){const indexed=tracks.map((track,index)=>({track,index})).filter(entry=>!selectedPlaylist||entry.track.folder===selectedPlaylist),list=indexed.length?indexed.map(({track,index})=>`<div class="track ${index===currentTrack?'active':''}" draggable="true" data-track-row="${index}"><span class="track-number">${String(index+1).padStart(2,'0')}</span><div class="track-art">${index===currentTrack?'✦':'♫'}</div><div class="track-info"><b>${escapeHtml(track.title)}</b><span>${escapeHtml(track.folder||'Unsorted')} · ${escapeHtml(track.meta)}</span></div><select class="track-folder" data-track-folder="${index}" aria-label="Playlist">${state.musicFolders.map(folder=>`<option ${track.folder===folder?'selected':''}>${escapeHtml(folder)}</option>`).join('')}</select><button data-play-track="${index}" aria-label="Play">▶</button><button class="remove-track" data-remove-track="${index}" aria-label="Remove">×</button></div>`).join(''):'<div class="empty-state">Import music, then create playlists that match how you want to focus.</div>';$('#trackList').innerHTML=list;$('#trackCount').textContent=`${indexed.length} track${indexed.length===1?'':'s'}`;$$('[data-track-row]').forEach(row=>row.ondragstart=event=>event.dataTransfer.setData('application/nura-track',row.dataset.trackRow));$$('[data-play-track]').forEach(button=>button.onclick=()=>{activePlaylist=selectedPlaylist;playTrack(Number(button.dataset.playTrack));});$$('[data-remove-track]').forEach(button=>button.onclick=()=>removeTrack(Number(button.dataset.removeTrack)));$$('[data-track-folder]').forEach(select=>select.onchange=()=>{tracks[Number(select.dataset.trackFolder)].folder=select.value;renderMusic();});}
function renderMusic(){if(selectedPlaylist&&!state.musicFolders.includes(selectedPlaylist))selectedPlaylist=null;renderMusicFolders();renderTracks();$('#libraryTitle').textContent=selectedPlaylist||'Focus collections';$('#playlistControls').innerHTML=selectedPlaylist?`<button class="playlist-play" id="playSelectedPlaylist">Play playlist</button><button class="playlist-close" id="closePlaylist" aria-label="Close playlist">×</button>`:'';$('#playSelectedPlaylist')?.addEventListener('click',()=>playCollection(selectedPlaylist));$('#closePlaylist')?.addEventListener('click',()=>{selectedPlaylist=null;activePlaylist=null;renderMusic();});const enabled=Boolean(state.preferences?.autoCategorize);$('#autoCategorizeToggle').classList.toggle('on',enabled);$('#autoCategorizeStatus').textContent=enabled?'Auto-sort on':'Auto-sort off';}
function stopCuratedSound(){if(!ambientAudio)return;clearTimeout(ambientAudio.scheduler);ambientAudio.nodes.forEach(node=>{try{node.stop?.();node.disconnect?.();}catch{}});ambientAudio.context.close?.();ambientAudio=null;}
function startCuratedSound(track){stopCuratedSound();const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)throw new Error('Audio synthesis is unavailable');const context=new AudioContext(),master=context.createGain(),filter=context.createBiquadFilter(),nodes=[];master.gain.value=.12;filter.type='lowpass';filter.frequency.value=2600;filter.Q.value=.45;filter.connect(master).connect(context.destination);const playNote=(frequency,when,length,type='sine',level=.12)=>{const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,when);gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(level,when+.035);gain.gain.exponentialRampToValueAtTime(.0001,when+length);oscillator.connect(gain).connect(filter);oscillator.start(when);oscillator.stop(when+length+.04);nodes.push(oscillator,gain);};const beat=60/track.tempo,schedule=()=>{if(!ambientAudio)return;const start=context.currentTime+.08;for(let bar=0;bar<8;bar++){const base=track.tone*Math.pow(2,track.scale[bar%track.scale.length]/12),time=start+bar*beat*2;playNote(base/2,time,beat*1.9,'sine',.075);playNote(base,time+.05,beat*.72,'triangle',.075);playNote(base*1.5,time+beat,beat*.55,'sine',.045);if(track.tempo>90)playNote(base*2,time+beat*1.5,beat*.22,'triangle',.025);}ambientAudio.scheduler=setTimeout(schedule,Math.max(2500,beat*16*1000-300));};ambientAudio={context,nodes,scheduler:null};schedule();}
async function playTrack(index){const track=tracks[index];if(!track)return toast('Choose audio from your library first');currentTrack=index;$('#trackTitle').textContent=track.title;$('#trackMeta').textContent=`${track.folder||'Unsorted'} · ${track.meta}`;try{if(track.curated){audio.pause();audio.removeAttribute('src');startCuratedSound(track);$('#timeline').value=0;$('#timeline').disabled=true;$('#elapsed').textContent='live';$('#duration').textContent='∞';}else{stopCuratedSound();$('#timeline').disabled=false;audio.src=track.url;await audio.play();}$('#playToggle').textContent='❚❚';$('#record').classList.add('playing');renderTracks();}catch{toast('This audio track cannot be played by this browser.');}}
function playCollection(folder){const first=tracks.findIndex(track=>track.folder===folder);if(first<0)return toast(`Add tracks to ${folder} first`);activePlaylist=folder;playTrack(first);renderMusic();}
function stopPlayback(){audio.pause();stopCuratedSound();$('#playToggle').textContent='▶';$('#record').classList.remove('playing');}
function removeTrack(index){const track=tracks[index];if(index===currentTrack){stopPlayback();currentTrack=-1;$('#trackTitle').textContent='Select a track';$('#trackMeta').textContent='Your private audio library';}if(track?.url)URL.revokeObjectURL(track.url);tracks.splice(index,1);renderMusic();}
function applyLocalAutoCategories(list){list.forEach(track=>track.folder=heuristicFolder(track.title));}
async function categorizeTracksWithNura(list=tracks){if(!list.length)return;const fallback=()=>applyLocalAutoCategories(list);if(offlinePreview()||!mindReady()){fallback();renderMusic();return;}try{const prompt=`Assign each audio track to one concise playlist name. Existing playlists: ${state.musicFolders.join(', ')}. Create a new playlist only when none fits. Return JSON with a categories array in exactly the same order as these track titles: ${list.map(track=>track.title).join(' | ')}`;const result=await askNura(prompt,'Library');if(!Array.isArray(result.categories)||result.categories.length!==list.length)throw new Error('No usable categories returned');result.categories.forEach((folder,index)=>{const clean=String(folder).replace(/[^\w &/-]/g,'').trim().slice(0,30)||heuristicFolder(list[index].title);if(!state.musicFolders.includes(clean))state.musicFolders.push(clean);list[index].folder=clean;});}catch{fallback();}saveState();renderMusic();}
async function addAudio(files){const audioFiles=[...files].filter(file=>file.type.startsWith('audio/'));const added=audioFiles.map(file=>({title:file.name.replace(/\.[^.]+$/,''),meta:`${(file.size/1048576).toFixed(1)} MB`,folder:'Unsorted',url:URL.createObjectURL(file)}));tracks.push(...added);renderMusic();if(audioFiles.length){toast('NuraMind is organizing your audio…');await categorizeTracksWithNura(added);toast(`${audioFiles.length} track${audioFiles.length===1?'':'s'} added and organized`);}}
function showFolderModal(){showModal(`<h2>New music collection</h2><p>Create a collection for your private soundscape.</p><input id="folderInput" maxlength="30" placeholder="e.g. Exam prep" autofocus><div class="modal-actions"><button class="secondary" id="modalCancel">Cancel</button><button class="primary" id="saveFolder">Create</button></div>`);bindModalCancel();$('#saveFolder').onclick=()=>{const folder=$('#folderInput').value.trim();if(!folder)return $('#folderInput').focus();if(!state.musicFolders.includes(folder))state.musicFolders.push(folder);saveState();renderMusic();closeModal();};}
function renameMusicFolder(folder){showModal(`<h2>Rename collection</h2><input id="renameInput" maxlength="30" value="${escapeHtml(folder)}" autofocus><div class="modal-actions"><button class="secondary" id="modalCancel">Cancel</button><button class="primary" id="saveRename">Save</button></div>`);bindModalCancel();$('#saveRename').onclick=()=>{const next=$('#renameInput').value.trim();if(!next||state.musicFolders.includes(next))return $('#renameInput').focus();state.musicFolders=state.musicFolders.map(item=>item===folder?next:item);tracks.forEach(track=>{if(track.folder===folder)track.folder=next;});saveState();renderMusic();closeModal();};}
function deleteMusicFolder(folder){state.musicFolders=state.musicFolders.filter(item=>item!==folder);tracks.forEach(track=>{if(track.folder===folder)track.folder='Unsorted';});saveState();renderMusic();toast(`${folder} tracks moved to Unsorted`);}
function heuristicFolder(title){const value=title.toLowerCase();if(/rain|calm|sleep|ambient|ocean|piano|glass/.test(value))return 'Calm';if(/run|move|gym|beat|energy|runner/.test(value))return 'Movement';if(/focus|theta|study|work|lofi|current|garden/.test(value))return 'Deep work';return 'Unsorted';}
async function autoCategorizeTracks(){if(!tracks.length)return toast('Add audio before categorizing it');await categorizeTracksWithNura(tracks);toast('NuraMind organized your library');}
$('#audioUpload').onchange=event=>{void addAudio(event.target.files);};$('#folderUpload').onchange=event=>{void addAudio(event.target.files);};$('#newMusicFolder').onclick=showFolderModal;$('#autoCategorize').onclick=autoCategorizeTracks;$('#autoCategorizeToggle').onclick=()=>toast('New audio is always organized automatically.');
$('#playToggle').onclick=()=>{const active=tracks[currentTrack];if(active&&(active.curated?Boolean(ambientAudio):!audio.paused))stopPlayback();else playTrack(currentTrack<0?0:currentTrack);};$('#previous').onclick=()=>playTrack(Math.max(0,currentTrack-1));$('#next').onclick=()=>playTrack(Math.min(tracks.length-1,currentTrack+1));audio.onloadedmetadata=()=>{$('#timeline').max=Math.floor(audio.duration);$('#duration').textContent=formatTime(audio.duration);};audio.ontimeupdate=()=>{if(!seeking){$('#timeline').value=Math.floor(audio.currentTime);$('#elapsed').textContent=formatTime(audio.currentTime);}};audio.onended=()=>currentTrack<tracks.length-1?playTrack(currentTrack+1):stopPlayback();$('#timeline').onpointerdown=()=>seeking=true;$('#timeline').oninput=event=>$('#elapsed').textContent=formatTime(+event.target.value);$('#timeline').onchange=event=>{if(Number.isFinite(audio.duration))audio.currentTime=+event.target.value;seeking=false;};

function nextTrackIndex(direction=1){const scope=activePlaylist?tracks.map((track,index)=>track.folder===activePlaylist?index:null).filter(Number.isInteger):tracks.map((_,index)=>index);if(!scope.length)return -1;const current=Math.max(0,scope.indexOf(currentTrack));if(repeatEnabled&&direction===1)return scope[current];if(shuffleEnabled&&scope.length>1){let pick=current;while(pick===current)pick=Math.floor(Math.random()*scope.length);return scope[pick];}return scope[(current+direction+scope.length)%scope.length];}
function updatePlaybackModes(){const shuffle=$('#shuffleToggle'),repeat=$('#repeatToggle');if(!shuffle||!repeat)return;shuffle.classList.toggle('active',shuffleEnabled);repeat.classList.toggle('active',repeatEnabled);shuffle.setAttribute('aria-pressed',String(shuffleEnabled));repeat.setAttribute('aria-pressed',String(repeatEnabled));}
$('#previous').onclick=()=>playTrack(nextTrackIndex(-1));$('#next').onclick=()=>playTrack(nextTrackIndex(1));$('#shuffleToggle').onclick=()=>{shuffleEnabled=!shuffleEnabled;updatePlaybackModes();toast(shuffleEnabled?'Shuffle on':'Shuffle off');};$('#repeatToggle').onclick=()=>{repeatEnabled=!repeatEnabled;updatePlaybackModes();toast(repeatEnabled?'Repeat on':'Repeat off');};audio.onended=()=>{const next=nextTrackIndex(1);if(next>=0)playTrack(next);else stopPlayback();};

const settingsInfo={
  account:['Profile','Shape the identity shown across your Nura workspace.',()=>`<div class="profile-row"><div class="profile-avatar">${escapeHtml(profileName().split(/\s+/).map(part=>part[0]).join('').slice(0,2).toUpperCase())}</div><div><b>${escapeHtml(profileName())}</b><span>${escapeHtml(user.email||'Guest studio')}</span></div></div><label class="modal-label">Display name<input id="displayNameInput" maxlength="32" value="${escapeHtml(profileName())}"/></label><div class="modal-actions"><button class="primary" id="saveDisplayName">Save name</button></div><div class="setting-row"><div><b>Identity status</b><span>${isGuest()?'Private device profile':'Verified Firebase account'}</span></div><span class="status good">${isGuest()?'LOCAL':'CONNECTED'}</span></div>`],
  devices:['Devices','Your connected hardware and sensor calibration.',()=>`<div class="device-card"><b><span class="device-dot"></span> Nura One headband</b><span>Connected · 96% battery · Signal quality: excellent</span></div><div class="device-card"><b><span class="device-dot"></span> Nura cube lamp</b><span>Connected · 78% battery · Adaptive color enabled</span></div><div class="setting-row"><div><b>Sensor recalibration</b><span>Last calibrated today</span></div><button class="tiny" id="calibrate">Recalibrate</button></div>`],
  ui:['Appearance','Tune Nura’s color response to your focus signal.',()=>`<div class="settings-segmented"><i class="${state.preferences.colorMode==='custom'?'manual':''}"></i><button class="${state.preferences.colorMode==='auto'?'active':''}" data-setting-color="auto"><b>Auto scientific</b><span>Focus + stress response</span></button><button class="${state.preferences.colorMode==='custom'?'active':''}" data-setting-color="custom"><b>Manual hue</b><span>Choose a personal accent</span></button></div><div class="custom-color ${state.preferences.colorMode==='custom'?'visible':''}"><label for="accentPicker">Signature hue</label><input id="accentPicker" type="color" value="${escapeHtml(state.preferences.customAccent)}"/></div><div class="setting-row"><div><b>Timepiece</b><span>Digital format is locked for clarity</span></div><span class="status good">DIGITAL</span></div>`],
  preferences:['Preferences','Decide what deserves your attention.',()=>`<div class="setting-row"><div><b>Nura Stress pop-up</b><span>Suggest a reset when stress rises</span></div><button class="toggle on"><i></i></button></div><div class="setting-row"><div><b>Session completion sound</b><span>Subtle audio cue</span></div><button class="toggle on"><i></i></button></div>`],
  security:['Security','Keep your Nura space protected.',()=>`<div class="setting-row"><div><b>Recovery email</b><span>${escapeHtml(user.email||'Sign in to add recovery email')}</span></div><button class="tiny">Manage</button></div><div class="setting-row"><div><b>Password</b><span>${isGuest()?'Sign in to manage your password':'Managed through Firebase Authentication'}</span></div><button class="tiny">View account</button></div>`]
};
function openSettings(section='ui'){
  const render = current=>{const modal=$('#modalContent'),before=modal.getBoundingClientRect(),data=settingsInfo[current];showModal(`<div class="settings-modal"><aside>${Object.keys(settingsInfo).map(key=>`<button class="${key===current?'active':''}" data-overlay-setting="${key}">${key[0].toUpperCase()+key.slice(1)}</button>`).join('')}</aside><section><button class="modal-close" id="modalCancel">×</button><h2>${data[0]}</h2><p>${data[1]}</p><div>${data[2]()}</div></section></div>`);requestAnimationFrame(()=>{const after=modal.getBoundingClientRect(),scaleX=before.width?before.width/after.width:.94,scaleY=before.height?before.height/after.height:.9,moveX=before.width?before.left-after.left:0,moveY=before.height?before.top-after.top:0;modal.animate([{opacity:before.width?.96:.82,transformOrigin:'top left',transform:`translate(${moveX}px,${moveY}px) scale(${scaleX},${scaleY})`,filter:'blur(2px)'},{opacity:1,transformOrigin:'top left',transform:'translate(0,0) scale(1,1)',filter:'blur(0)'}],{duration:360,easing:'cubic-bezier(.2,.78,.2,1)',fill:'both'});});bindModalCancel();$$('[data-overlay-setting]').forEach(button=>button.onclick=()=>render(button.dataset.overlaySetting));bindSettingsControls();};render(section);
}
function bindSettingsControls(){
  $$('[data-setting-color]').forEach(button=>button.onclick=()=>{state.preferences.colorMode=button.dataset.settingColor;applyPalette();saveState();openSettings('ui');});
  const picker=$('#accentPicker');if(picker)picker.oninput=()=>{state.preferences.customAccent=picker.value;applyPalette(picker.value);saveState();};
  const saveName=$('#saveDisplayName');if(saveName)saveName.onclick=async()=>{const next=$('#displayNameInput').value.trim();if(!next)return $('#displayNameInput').focus();state.profile.displayName=next;user.displayName=next;saveState();renderProfileIdentity();if(cloudReady()&&authSdk?.updateProfile)try{await authSdk.updateProfile(firebaseAuth.currentUser,{displayName:next});}catch{}openSettings('account');};
  const calibration=$('#calibrate');if(calibration)calibration.onclick=()=>toast('Calibration started');
}

function polishVocabulary(){const replacements={Overview:'Dashboard','KNOWLEDGE SPACE':'THOUGHT LIBRARY','New note':'Compose note','Add category':'Create category','Delete note':'Discard note','Collapse':'Close note','CONVERSATIONS':'SESSIONS','QUIZ PROGRESS':'LEARNING SIGNAL','PERSONAL SOUNDSCAPE':'CURATED SOUNDSCAPE','Add files':'Import audio','Add folder':'Import a folder','Library sorting':'LIBRARY CURATION','Organize now':'Curate library'};const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(['SCRIPT','STYLE'].includes(node.parentElement?.tagName))continue;const clean=node.nodeValue.trim();if(replacements[clean])node.nodeValue=node.nodeValue.replace(clean,replacements[clean]);}}
function renderAll(){state.category=state.category==='Focus'?'All':(state.category||'All');state.categories=[...new Set((state.categories||[]).filter(category=>category!=='Focus'))];state.notes.forEach(note=>{if(note.category==='Focus')note.category=inferNoteCategory(note);});state.preferences={...defaults().preferences,...state.preferences,clockFace:'digital',autoCategorize:true};delete state.preferences.theme;delete state.preferences.islandTheme;state.profile={displayName:'',...state.profile};delete state.profile.avatar;$('#liveClock').className='hero-time live-clock digital';applyPalette();renderProfileTheme();renderProfileIdentity();renderIsland();telemetryWidgets();draggableWidgets();renderNotes();renderChats();renderConversation();renderQuizStats();renderMusic();updatePlaybackModes();installDashboardColorSuite();syncDashboardColorSuite();requestAnimationFrame(()=>{positionModeGlider();positionColorGlider();});$$('#modeSwitch button').forEach(button=>button.classList.remove('locked'));$('#mindAccess').textContent=isGuest()?'Offline guest studio · all features enabled':'Synced Nura workspace';$('#historyNotice').textContent=isGuest()?'Saved privately on this device':'Synced to your Nura profile';setIslandTitle();}
polishVocabulary();setIslandTitle();setupFirebase();
