
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ICON LIBRARY â€” inline SVG, replaces all emoji across the UI
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const ICON = {
  close:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  minimize:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  restore:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="1.5"/></svg>',
  warning:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a1.8 1.8 0 0 0 1.5 2.7h17.4a1.8 1.8 0 0 0 1.5-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  link:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.4l2-2a5 5 0 0 0-7-7l-1.2 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.4l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></svg>',
  edit:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>',
  check:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  target:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>',
  palette:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2s-.5-1.5-.5-2.3c0-1.2 1-2.2 2.2-2.2H17a4 4 0 0 0 4-4c0-5-4.3-9.5-9-9.5Z"/><circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="11" cy="6.8" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  sun:          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="6" y2="6"/><line x1="18" y1="18" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="6" y2="18"/><line x1="18" y1="6" x2="19.8" y2="4.2"/></svg>',
  moon:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  folder:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  folderOpen:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2L19.5 18a2 2 0 0 1-2 1.6H5.7a2 2 0 0 1-2-1.7Z"/></svg>',
  send:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  note:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h12l4 4v12H4Z"/><polyline points="16 4 16 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>',
  reset:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2-9.5L1 10"/></svg>',
  alarm:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 15 15"/><line x1="9" y1="2.5" x2="6.5" y2="4.5"/><line x1="15" y1="2.5" x2="17.5" y2="4.5"/></svg>',
  crystal:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6"/></svg>',
  pencil:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 0 1 4 4L7 21l-4 1 1-4Z"/></svg>',
  lock:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  brain:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5v.6A3 3 0 0 0 4 9v1a3 3 0 0 0 1 2.2V14a3.5 3.5 0 0 0 3.5 3.5v1A2.5 2.5 0 0 0 11 21a1.5 1.5 0 0 0 1.5-1.5V5.5A3.5 3.5 0 0 0 9.5 2Z"/><path d="M14.5 2A3.5 3.5 0 0 1 18 5.5v.6A3 3 0 0 1 20 9v1a3 3 0 0 1-1 2.2V14a3.5 3.5 0 0 1-3.5 3.5v1A2.5 2.5 0 0 1 13 21a1.5 1.5 0 0 1-1.5-1.5"/></svg>',
  trendDown:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>',
  trendUp:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
  checkCircle:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9"/></svg>',
  fileDoc:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>',
  filePdf:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><text x="6.5" y="17" font-size="6" fill="currentColor" stroke="none" font-family="sans-serif">PDF</text></svg>',
  clipboard:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>',
  lungs:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v8"/><path d="M12 11c-1.5-2-4-2.5-5.5-1.5C4 11 3 14 4 18c.5 1.8 2.2 2.3 3 1 .8-1.3.7-3.6 0-5"/><path d="M12 11c1.5-2 4-2.5 5.5-1.5C20 11 21 14 20 18c-.5 1.8-2.2 2.3-3 1-.8-1.3-.7-3.6 0-5"/></svg>',
  droplet:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5s6.5 7 6.5 12a6.5 6.5 0 0 1-13 0c0-5 6.5-12 6.5-12Z"/></svg>',
  eye:          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  arrowDown:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="6 13 12 19 18 13"/></svg>',
  arrowUp:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="6 11 12 5 18 11"/></svg>',
  signOut:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  signIn:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
  sparkle:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>',
  cube3d:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16.5V7.5L12 3 3 7.5v9L12 21l9-4.5Z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="12" x2="12" y2="21.2"/></svg>',
  quiz:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a2.8 2.8 0 1 1 4.3 2.4c-.9.6-1.5 1.1-1.5 2.2"/><line x1="12" y1="16.8" x2="12" y2="16.9"/></svg>',
  gamepad:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="11" rx="5.5"/><line x1="7" y1="11" x2="7" y2="14"/><line x1="5.5" y1="12.5" x2="8.5" y2="12.5"/><circle cx="16" cy="11.5" r="1" fill="currentColor" stroke="none"/><circle cx="18.5" cy="14" r="1" fill="currentColor" stroke="none"/></svg>',
  music:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  play:         '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20"/></svg>',
  pause:        '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>',
  skipFwd:      '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 4 15 12 5 20"/><rect x="17" y="4" width="2.5" height="16" rx="0.5"/></svg>',
  skipBack:     '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="19 4 9 12 19 20"/><rect x="4.5" y="4" width="2.5" height="16" rx="0.5"/></svg>',
  shuffle:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
  repeat:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  repeatOne:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/><text x="10.5" y="15.5" font-size="7" fill="currentColor" stroke="none" font-family="sans-serif">1</text></svg>',
  volumeUp:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 9 7 9 11 5 11 19 7 15 3 15" fill="currentColor" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8.5 8.5 0 0 1 0 12"/></svg>',
  volumeMute:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 9 7 9 11 5 11 19 7 15 3 15" fill="currentColor" stroke="none"/><line x1="16" y1="9" x2="21" y2="14"/><line x1="21" y1="9" x2="16" y2="14"/></svg>',
  plus:         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  expand:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
  upload:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
};
function icon(name,size=14){ return `<span class="i-wrap" style="display:inline-flex;width:${size}px;height:${size}px;flex-shrink:0">${(ICON[name]||'').replace('<svg ','<svg width="100%" height="100%" ')}</span>`; }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// API KEY â€” stored in localStorage, never hardcoded
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function getApiKey(){
  // Always use the key from Firestore config/app â€” never the user's local profile
  if(window._nuraConfigKey) return window._nuraConfigKey;
  return '';
}
function getGeminiKey(){
  // Gemini key lives only in Firestore config/app â€” never hardcoded in source
  return window._nuraGeminiKey || '';
}
function saveApiKey(){
  const val = document.getElementById('api-key-input').value.trim();
  if(val){
    localStorage.setItem('nura-api-key', val);
    // Also persist to Firestore so it syncs across devices
    const user = _auth.currentUser;
    if(user && typeof _fbSaveProfile === 'function'){
      _fbSaveProfile(user.uid, { groqKey: val }).catch(()=>{});
    }
    // Update local profile cache too
    try{
      const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
      p.groqKey = val;
      localStorage.setItem('nura-user-profile', JSON.stringify(p));
    }catch(e){}
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// AUTH â€” real sign-out gate (local-only, no backend).
// "Signed out" is a genuine boolean flag checked at boot: while it's true the
// app root is hidden and the gate screen is shown; nothing in the app is
// reachable until the user signs back in. Data is never deleted on sign-out.
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function isSignedOut(){
  // Only show gate if explicitly signed out
  return localStorage.getItem('nura-signed-out') === '1';
}

function showSignOutGate(){
  document.getElementById('app-root').classList.add('signed-out');
  document.getElementById('login-screen').classList.add('show');
  // Stop anything audible/running so a signed-out session is fully quiet
  try{ if(typeof stopProceduralNoise==='function') stopProceduralNoise(); }catch(e){}
  try{ if(typeof pauseQueueTrack==='function') pauseQueueTrack(); }catch(e){}
  try{ if(liveAudioStream){ liveAudioStream.pause(); } }catch(e){}
}

function hideSignOutGate(){
  document.getElementById('login-screen').classList.remove('show');
  document.getElementById('app-root').classList.remove('signed-out');
}

function logOut(){
  document.getElementById('userDropdown')?.classList.remove('open');
  _auth.signOut().catch(()=>{});
  localStorage.setItem('nura-signed-out','1');
  // Clear cached profile but keep local data (notes, music etc)
  localStorage.removeItem('nura-user-profile');
  authShowSignIn();
  showSignOutGate();
  playUiSound && playUiSound('switch');
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   AUTH SYSTEM â€” Firebase Auth (email + Google)
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function authShowSignIn(){
  document.getElementById('auth-signin-box').style.display = '';
  document.getElementById('auth-signup-box').style.display = 'none';
  const e = document.getElementById('auth-error-msg');
  if(e){ e.textContent=''; }
}
function authShowSignUp(){
  document.getElementById('auth-signin-box').style.display = 'none';
  document.getElementById('auth-signup-box').style.display = '';
  const e = document.getElementById('signup-error-msg');
  if(e){ e.textContent=''; }
}
function _authShowError(id, msg){
  const el = document.getElementById(id);
  if(el){ el.textContent = msg; }
}
function _authSetLoading(btnId, loading){
  const btn = document.getElementById(btnId);
  if(btn) btn.disabled = loading;
}

// â”€â”€ Called after Firebase confirms sign-in â”€â”€
async function _authComplete(firebaseUser){
  const uid = firebaseUser.uid;
  // Load any extra profile data (age, aiScale, groqKey) from Firestore
  const remote = (typeof _fbLoadProfile === 'function') ? await _fbLoadProfile(uid) : {};
  const merged = {
    uid:    uid,
    name:   remote.name   || firebaseUser.displayName || 'Student',
    age:    remote.age    || '',
    email:  firebaseUser.email || '',
    avatar: firebaseUser.photoURL || '',
    aiScale: remote.aiScale || '5',
    groqKey: remote.groqKey || '',
    plan:    remote.plan    || 'free'
  };
  localStorage.setItem('nura-user-profile', JSON.stringify(merged));
  localStorage.removeItem('nura-signed-out');
  hideSignOutGate();
  renderUserProfile();
  // Restore API key into input
  if(merged.groqKey && document.getElementById('api-key-input')){
    document.getElementById('api-key-input').value = merged.groqKey;
  }
  // Sync Google avatar if no custom one set
  setTimeout(()=>{ _syncGoogleAvatar && _syncGoogleAvatar(); }, 300);
  playUiSound && playUiSound('confirm');
}

// â”€â”€ Email / Password sign-in â”€â”€
function authEmailSignIn(){
  const email = (document.getElementById('auth-email')?.value||'').trim();
  const pass  = (document.getElementById('auth-password')?.value||'').trim();
  if(!email || !pass){ _authShowError('auth-error-msg','Enter your email and password.'); return; }
  _authShowError('auth-error-msg','Signing in...');
  _auth.signInWithEmailAndPassword(email, pass)
    .then(cred => _authComplete(cred.user))
    .catch(err => {
      const msgs = {
        'auth/user-not-found':     'No account found with that email.',
        'auth/wrong-password':     'Incorrect password.',
        'auth/invalid-email':      'Invalid email address.',
        'auth/invalid-credential': 'Incorrect email or password.',
        'auth/too-many-requests':  'Too many attempts â€” try again later.',
        'auth/network-request-failed': 'Network error â€” check your connection.'
      };
      _authShowError('auth-error-msg', msgs[err.code] || ('Sign-in failed: ' + err.message));
    });
}

// â”€â”€ Create account â”€â”€
function authCreateAccount(){
  const name  = (document.getElementById('signup-name')?.value||'').trim();
  const age   = (document.getElementById('signup-age')?.value||'').trim();
  const email = (document.getElementById('signup-email')?.value||'').trim();
  const pass  = (document.getElementById('signup-password')?.value||'').trim();
  if(!name)  { _authShowError('signup-error-msg','Enter your name.'); return; }
  if(!age)   { _authShowError('signup-error-msg','Enter your age.'); return; }
  if(!email || !email.includes('@')){ _authShowError('signup-error-msg','Enter a valid email.'); return; }
  if(pass.length < 6){ _authShowError('signup-error-msg','Password needs 6+ characters.'); return; }
  _authShowError('signup-error-msg','Creating account...');
  _auth.createUserWithEmailAndPassword(email, pass)
    .then(async cred => {
      // Save name + age to Firestore immediately
      await cred.user.updateProfile({ displayName: name });
      if(typeof _fbSaveProfile === 'function'){
        await _fbSaveProfile(cred.user.uid, { name, age, email });
      }
      return _authComplete(cred.user);
    })
    .catch(err => {
      const msgs = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email':        'Invalid email address.',
        'auth/weak-password':        'Password is too weak.'
      };
      _authShowError('signup-error-msg', msgs[err.code] || err.message);
    });
}

// â”€â”€ Google Sign-In (popup) â”€â”€
function authGoogleSignIn(){
  const provider = new firebase.auth.GoogleAuthProvider();
  _auth.signInWithPopup(provider)
    .then(cred => _authComplete(cred.user))
    .catch(err => {
      if(err.code !== 'auth/popup-closed-by-user'){
        _authShowError('auth-error-msg', 'Google sign-in failed: ' + err.message);
      }
    });
}

// â”€â”€ Google One Tap callback (fallback for the div-rendered button) â”€â”€
window.authGoogleCallback = function(response){
  const cred = firebase.auth.GoogleAuthProvider.credential(response.credential);
  _auth.signInWithCredential(cred)
    .then(result => _authComplete(result.user))
    .catch(() => _authShowError('auth-error-msg','Google Sign-In failed.'));
};

// â”€â”€ Guest mode â”€â”€
function authContinueAsGuest(){
  const existing = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  if(!existing.email){
    localStorage.setItem('nura-user-profile', JSON.stringify({
      name: 'Guest', age: '', email: '', isGuest: true
    }));
  }
  localStorage.removeItem('nura-signed-out');
  hideSignOutGate();
  renderUserProfile();
  playUiSound && playUiSound('confirm');
}

// â”€â”€ Legacy sign-back-in (kept for existing sessions) â”€â”€
function signBackIn(){
  localStorage.removeItem('nura-signed-out');
  hideSignOutGate();
  renderUserProfile();
  playUiSound && playUiSound('confirm');
}

function checkAuth(){
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  const firstVisit = !p.name && !p.email && !p.isGuest;
  if(isSignedOut() || firstVisit){
    authShowSignIn();
    showSignOutGate();
  } else {
    hideSignOutGate();
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SUBJECTS (customizable, saved to localStorage)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const DEFAULT_SUBJECTS = [];

function loadSubjects(){
  try{ return JSON.parse(localStorage.getItem('nura-subjects'))||[...DEFAULT_SUBJECTS]; }
  catch(e){ return [...DEFAULT_SUBJECTS]; }
}
function saveSubjects(arr){ localStorage.setItem('nura-subjects', JSON.stringify(arr)); }

let subjects = loadSubjects();

const TAG_CLASS_MAP = {
  Math:'tag-math',Physics:'tag-physics',Biology:'tag-biology',Chemistry:'tag-chemistry',
  English:'tag-english',History:'tag-history',Geography:'tag-geography',General:'tag-general'
};
function getTagClass(s){ return TAG_CLASS_MAP[s]||'tag-general'; }

function renderSubjectFilters(){
  const row = document.getElementById('filter-row');
  if(!row) return;
  if(subjects.length === 0){
    row.innerHTML = '';
    const grid = document.getElementById('notes-grid');
    if(grid) grid.innerHTML = `<div class="empty-state" style="text-align:center;padding:48px 24px">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" style="opacity:.18;margin-bottom:16px;color:var(--accent2)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:8px">No subjects yet</div>
      <div style="font-size:12px;color:var(--text3);line-height:1.8">Click the <strong>+</strong> button to add your first subject.<br>Then start chatting with Nura Mind and ask it to<br><em>"save my notes"</em> to build your knowledge base.</div>
    </div>`;
    return;
  }
  row.innerHTML = `<div class="filter-chip active" onclick="filterNotes('all',this)">All</div>` +
    subjects.map(s=>`<div class="filter-chip" onclick="filterNotes('${s}',this)" style="padding-right:6px">${s}<button class="chip-edit" onclick="event.stopPropagation();openEditSubjModal('${s}')" title="Rename">âœŽ</button><button class="chip-del" onclick="event.stopPropagation();deleteSubject('${s}')" title="Remove">âœ•</button></div>`).join('');
  // also update modals
  ['modal-subject'].forEach(id=>{
    const sel = document.getElementById(id);
    if(sel) sel.innerHTML = subjects.map(s=>`<option>${s}</option>`).join('');
  });
}

function addCustomSubject(){
  const inp = document.getElementById('new-subject-input');
  const val = inp.value.trim();
  if(!val||subjects.includes(val)) return;
  subjects.push(val);
  saveSubjects(subjects);
  inp.value='';
  renderSubjectFilters();
}

function deleteSubject(s){
  subjects = subjects.filter(x=>x!==s);
  saveSubjects(subjects);
  renderSubjectFilters();
  renderNotes('all');
}

let editingSubject = null;
function openEditSubjModal(s){
  editingSubject = s;
  document.getElementById('edit-subj-input').value = s;
  document.getElementById('edit-subj-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('edit-subj-input').focus(),80);
}
function closeEditSubjModal(){
  document.getElementById('edit-subj-overlay').classList.remove('open');
  editingSubject = null;
}
function commitSubjectEdit(){
  const newName = document.getElementById('edit-subj-input').value.trim();
  if(!newName||!editingSubject) return;
  if(subjects.includes(newName)&&newName!==editingSubject){ closeEditSubjModal(); return; }
  const idx = subjects.indexOf(editingSubject);
  if(idx>-1) subjects[idx] = newName;
  // Update notes that used the old subject name
  noteData.forEach(n=>{ if(n.subject===editingSubject) n.subject=newName; });
  saveSubjects(subjects);
  saveNotes(noteData);
  closeEditSubjModal();
  renderSubjectFilters();
  renderNotes('all');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NOTES
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function loadNotes(){ try{ return JSON.parse(localStorage.getItem('nura-notes')||'[]'); }catch(e){ return []; } }
function saveNotes(n){ localStorage.setItem('nura-notes', JSON.stringify(n)); }

let noteData = loadNotes();
if(noteData.length===0){
  noteData=[
    {id:Date.now()-3,subject:'Biology',q:'Why does mitosis produce identical cells?',a:'What must happen to DNA before a cell can split? Imagine a factory copying blueprints...',time:'Today Â· 14:32'},
    
    {id:Date.now()-1,subject:'Math',q:'How does differentiation work?',a:'Think of differentiation as finding the slope at any point on a curve...',time:'Yesterday Â· 16:45'},
  ];
  saveNotes(noteData);
}

function renderNotes(filter='all'){
  const grid = document.getElementById('notes-grid');
  const filtered = filter==='all' ? noteData : noteData.filter(n=>n.subject===filter);
  if(filtered.length===0){
    grid.innerHTML=`<div class="empty-state"><div style="font-size:32px;opacity:.2;margin-bottom:12px">â—ˆ</div><div style="font-size:13px;color:var(--text3);line-height:1.7">No notes yet.<br>Chat with Nura Mind and ask it to save to notes.</div></div>`;
    return;
  }
  grid.innerHTML = filtered.map(n=>`
    <div class="note-card" id="note-${n.id}" data-id="${n.id}" onclick="openNoteEditor(${n.id})">
      <div class="note-body">
        <div class="note-subject-tag ${getTagClass(n.subject)}">${n.subject}</div>
        <div class="note-q">${n.q}</div>
        <div class="note-a">${n.a}</div>
        <div class="note-time">${n.time}</div>
      </div>
      <button class="note-del" onclick="event.stopPropagation();deleteNote(${n.id})" title="Delete">âœ•</button>
    </div>`).join('');
  updateQCount();
}

function deleteNote(id){
  const el = document.querySelector(`[data-id="${id}"]`);
  if(el){ el.classList.add('deleting'); setTimeout(()=>_doDelete(id),350); }
  else _doDelete(id);
}
function _doDelete(id){
  noteData = noteData.filter(n=>n.id!==id);
  saveNotes(noteData);
  const active = document.querySelector('.filter-chip.active');
  const f = active ? active.textContent.replace('âœ•','').trim() : 'all';
  renderNotes(f==='All'?'all':f);
}

function filterNotes(f,el){
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderNotes(f);
}

function updateQCount(){
  document.getElementById('dash-q').textContent = noteData.length;
  document.getElementById('q-bar').style.width = Math.min(100,noteData.length*8)+'%';
}

let openAddModal = ()=>{ document.getElementById('modal-overlay').classList.add('open'); };
let closeModal = ()=>{ document.getElementById('modal-overlay').classList.remove('open'); };

function saveManualNote(){
  const subj = document.getElementById('modal-subject').value;
  const q = document.getElementById('modal-q').value.trim();
  const a = document.getElementById('modal-a').value.trim();
  if(!q) return;
  const note = {id:Date.now(),subject:subj,q,a:a||'No notes added.',time:'Just now'};
  noteData.unshift(note);
  saveNotes(noteData);
  renderNotes('all');
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  document.querySelector('.filter-chip').classList.add('active');
  closeModal();
  document.getElementById('modal-q').value='';
  document.getElementById('modal-a').value='';
}

// NOTE EDITOR
let editingNoteId = null;
function setEditLockUI(isEditMode){
  const iconEl = document.getElementById('edit-lock-icon');
  const labelEl = document.getElementById('edit-lock-label');
  if(iconEl) iconEl.innerHTML = isEditMode ? ICON.lock : ICON.pencil;
  if(labelEl) labelEl.textContent = isEditMode ? 'Lock' : 'Edit';
}
function openNoteEditor(id){
  const note = noteData.find(n=>n.id===id);
  if(!note) return;
  editingNoteId = id;
  document.getElementById('edit-note-title').textContent = `${note.subject} â€” Note`;
  document.getElementById('edit-workspace-q').value = note.q;
  document.getElementById('edit-workspace-a').value = note.a;
  document.getElementById('edit-workspace-q').readOnly = true;
  document.getElementById('edit-workspace-a').readOnly = true;
  setEditLockUI(false);
  document.getElementById('edit-save-action').style.display = 'none';
  document.getElementById('edit-note-overlay').classList.add('open');
}
function closeEditModal(){ document.getElementById('edit-note-overlay').classList.remove('open'); editingNoteId=null; }
function toggleEditLock(){
  const q=document.getElementById('edit-workspace-q'),a=document.getElementById('edit-workspace-a');
  const locked=q.readOnly;
  q.readOnly=!locked; a.readOnly=!locked;
  setEditLockUI(locked);
  document.getElementById('edit-save-action').style.display=locked?'block':'none';
}
function commitNoteEdit(){
  if(!editingNoteId) return;
  const idx = noteData.findIndex(n=>n.id===editingNoteId);
  if(idx===-1) return;
  noteData[idx].q = document.getElementById('edit-workspace-q').value.trim();
  noteData[idx].a = document.getElementById('edit-workspace-a').value.trim();
  saveNotes(noteData);
  renderNotes('all');
  closeEditModal();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PROFILE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function saveUserProfile(){
  const name = document.getElementById('profile-name-input').value.trim()||'Student';
  const age = document.getElementById('profile-age-input').value.trim()||'17';
  const scale = document.getElementById('profile-ai-scale').value||'5';
  const cur = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  cur.name=name; cur.age=age; cur.aiScale=scale;
  localStorage.setItem('nura-user-profile', JSON.stringify(cur));
  // Sync to Firestore
  const user = _auth?.currentUser;
  if(user && typeof _fbSaveProfile === 'function'){
    _fbSaveProfile(user.uid, {name, age, aiScale: scale}).catch(()=>{});
  }
  document.getElementById('scale-indicator').textContent=scale;
  const w=document.getElementById('welcome-user-text');
  if(w) w.textContent=`What do you want to learn today, ${name}?`;
  renderUserProfile();
}
function handlePfpUpload(inp){
  const file=inp.files[0]; if(!file) return;
  const r=new FileReader();
  r.onload=e=>{
    const cur=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
    cur.pfp=e.target.result;
    localStorage.setItem('nura-user-profile', JSON.stringify(cur));
    renderUserProfile();
  };
  r.readAsDataURL(file);
}
function removePfp(){
  const cur=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  delete cur.pfp;
  localStorage.setItem('nura-user-profile', JSON.stringify(cur));
  document.getElementById('profile-pfp-input').value='';
  renderUserProfile();
}
function renderUserProfile(){
  const p=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  // Update display-only name/age in dropdown
  const nameDisp = document.getElementById('ud-name-display');
  const ageDisp  = document.getElementById('ud-age-display');
  const isGuest  = p.isGuest || !p.email;
  if(nameDisp) nameDisp.textContent = isGuest ? 'Guest' : (p.name || 'Student');
  if(ageDisp)  ageDisp.textContent  = isGuest ? 'Not signed in' : (p.age ? 'Age ' + p.age : (p.email || ''));
  // Sync PFP everywhere: topbar avatar + settings preview
  const avatar = p.avatar || '';
  const avatarContent = avatar
    ? `<img src="${avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="width:55%;height:55%;opacity:.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  // Topbar user badge
  const userBadgeInner = document.querySelector('.user-badge-inner');
  if(userBadgeInner) userBadgeInner.innerHTML = avatarContent;
  // Settings preview
  const sPfp = document.getElementById('s-pfp-preview');
  if(sPfp) sPfp.innerHTML = avatar
    ? `<img src="${avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`
    : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="1.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  // Show/hide guest login button
  const loginBtn = document.getElementById('ud-login-btn');
  if(loginBtn) loginBtn.style.display = isGuest ? 'flex' : 'none';
  // Update Neuro Code tab opacity based on plan
  const codeTab = document.getElementById('nura-tab-code');
  if(codeTab) codeTab.style.opacity = (p.plan === 'pro') ? '1' : '0.4';
  // Plan badge
  const badge = document.getElementById('ud-plan-badge');
  const upgradeBtn  = document.getElementById('ud-upgrade-btn');
  const upgradeIcon = document.getElementById('ud-upgrade-icon');
  const upgradeLabel= document.getElementById('ud-upgrade-label');
  const isPro = p.plan === 'pro';
  if(badge){
    badge.textContent = isPro ? 'NEUROMIND PRO' : 'FREE PLAN';
    badge.style.color  = isPro ? '#c084fc' : 'var(--text3)';
    badge.style.background = isPro ? 'rgba(168,85,247,0.08)' : 'none';
    badge.style.borderRadius = isPro ? '6px' : '0';
  }
  if(upgradeBtn){
    upgradeBtn.style.background = isPro
      ? 'rgba(255,80,80,0.08)'
      : 'linear-gradient(135deg,rgba(168,85,247,0.18),rgba(59,130,246,0.18))';
    upgradeBtn.style.borderColor = isPro ? 'rgba(255,80,80,0.3)' : 'rgba(168,85,247,0.4)';
    upgradeBtn.style.color = isPro ? '#ff8080' : '#c084fc';
  }
  if(upgradeLabel) upgradeLabel.textContent = isPro ? 'Cancel Subscription' : 'Upgrade to Nura NeuroMind';
  if(upgradeIcon){
    upgradeIcon.innerHTML = isPro
      ? '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
      : '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>';
  }
  const name=p.name||'Student';
  document.getElementById('profile-name-input').value=name;
  document.getElementById('profile-age-input').value=p.age||'17';
  document.getElementById('profile-ai-scale').value=p.aiScale||'5';
  document.getElementById('scale-indicator').textContent=p.aiScale||'5';
  document.getElementById('user-badge-text').textContent=name;
  const savedKey=getApiKey();
  if(savedKey) document.getElementById('api-key-input').value=savedKey;
  // V10.1 Req 2: new PFP elements
  const pfpImg = document.getElementById('user-pfp-img');
  const pfpPlaceholder = document.getElementById('pfp-placeholder');
  const badgeImg = document.getElementById('user-badge-img');
  const pfpDeleteRow = document.getElementById('pfp-delete-row');
  if(p.pfp){
    if(pfpImg){ pfpImg.src=p.pfp; pfpImg.style.display='block'; }
    if(pfpPlaceholder) pfpPlaceholder.style.display='none';
    if(badgeImg){ badgeImg.src=p.pfp; badgeImg.style.display='inline-block'; }
    if(pfpDeleteRow) pfpDeleteRow.style.display='flex';
  } else {
    if(pfpImg) pfpImg.style.display='none';
    if(pfpPlaceholder) pfpPlaceholder.style.display='flex';
    if(badgeImg) badgeImg.style.display='none';
    if(pfpDeleteRow) pfpDeleteRow.style.display='none';
  }
  const w=document.getElementById('welcome-user-text');
  if(w) w.textContent=`What do you want to learn today, ${name}?`;
  updateThemeBtn();
}

// V10.1 Req 2: PFP modal functions
function openPfpModal(){
  const p=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  const row = document.getElementById('pfp-delete-row');
  if(row) row.style.display = p.pfp ? 'flex' : 'none';
  document.getElementById('pfp-action-modal').classList.add('show');
  document.getElementById('userDropdown')?.classList.remove('open');
}
function closePfpModal(){
  document.getElementById('pfp-action-modal').classList.remove('show');
}
function toggleUserDropdown(e){
  e.stopPropagation();
  document.getElementById('userDropdown').classList.toggle('open');
}
document.addEventListener('click',()=>document.getElementById('userDropdown')?.classList.remove('open'));

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DYNAMIC UI COLOUR ENGINE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// â”€â”€ Scientific color modes â”€â”€
// deep:  6500K Cool White â†’ boosts alertness, mimics daylight, enhances beta wave activity
// stable: 4500K Neutral White â†’ balances focus & comfort, reduces eye strain during moderate work
// break:  3000K Warm White â†’ triggers melatonin reduction pause, signals brain to rest/restore
// calm:   2200K Dim Amber â†’ suppresses cortisol, activates parasympathetic (rest+digest) response
const COLOR_MODES = {
  deep: {
    r:62, g:82, b:102,
    accent:'#3E5266', accent2:'#8FA3B5', glow:'rgba(62,82,102,0.45)',
    cubeBg:'#23262A', cubeBorder:'rgba(143,163,181,0.4)',
    barBg:'rgba(62,82,102,0.12)', barText:'#8FA3B5',
    barLabel:'DEEP FOCUS â€” COOL SLATE',
    bg:'#1E1C19', bg2:'#252320', bg3:'#2C2A26', bg4:'#36332E', bg5:'#454039',
    bodyGrad:'radial-gradient(ellipse at 30% 20%, rgba(62,82,102,0.05) 0%, transparent 60%)',
    gridColor:'rgba(62,82,102,0.03)',
    lmLabel:'Deep Focus', lmK:'Cool Slate', lmSci:'Focus â‰¥80% Â· Stress â‰¤30%',
    description:'Optimal deep-work window â€” a cool, low-saturation slate keeps the interface quiet'
  },
  stable: {
    r:91, g:107, b:130,
    accent:'#5B6B82', accent2:'#9CAAB9', glow:'rgba(91,107,130,0.4)',
    cubeBg:'#23262A', cubeBorder:'rgba(156,170,185,0.35)',
    barBg:'rgba(91,107,130,0.1)', barText:'#9CAAB9',
    barLabel:'STABLE FOCUS â€” GRAPHITE',
    bg:'#1E1C19', bg2:'#252320', bg3:'#2C2A26', bg4:'#36332E', bg5:'#454039',
    bodyGrad:'radial-gradient(ellipse at 20% 50%, rgba(91,107,130,0.04) 0%, transparent 60%)',
    gridColor:'rgba(91,107,130,0.03)',
    lmLabel:'Stable Focus', lmK:'Graphite', lmSci:'Focus â‰¥60%',
    description:'Steady working state â€” a neutral graphite accent, no particular pull either way'
  },
  break: {
    r:169, g:130, b:74,
    accent:'#A9824A', accent2:'#CBAA77', glow:'rgba(169,130,74,0.4)',
    cubeBg:'#26221C', cubeBorder:'rgba(203,170,119,0.4)',
    barBg:'rgba(169,130,74,0.12)', barText:'#CBAA77',
    barLabel:'BREAK MODE â€” WARM SAND',
    bg:'#1E1C19', bg2:'#252320', bg3:'#2C2A26', bg4:'#36332E', bg5:'#454039',
    bodyGrad:'radial-gradient(ellipse at 20% 60%, rgba(169,130,74,0.05) 0%, transparent 60%)',
    gridColor:'rgba(169,130,74,0.03)',
    lmLabel:'Break Mode', lmK:'Warm Sand', lmSci:'Focus <60%',
    description:'Attention has dipped â€” a warm sand tint signals it is time to step away'
  },
  calm: {
    r:181, g:105, b:74,
    accent:'#B5694A', accent2:'#D49A7F', glow:'rgba(181,105,74,0.4)',
    cubeBg:'#271E1A', cubeBorder:'rgba(212,154,127,0.4)',
    barBg:'rgba(181,105,74,0.12)', barText:'#D49A7F',
    barLabel:'RELAXATION â€” TERRACOTTA',
    bg:'#1E1C19', bg2:'#252320', bg3:'#2C2A26', bg4:'#36332E', bg5:'#454039',
    bodyGrad:'radial-gradient(ellipse at 25% 40%, rgba(181,105,74,0.06) 0%, transparent 60%)',
    gridColor:'rgba(181,105,74,0.03)',
    lmLabel:'Relaxation', lmK:'Terracotta', lmSci:'Stress >60%',
    description:'Stress is elevated â€” a muted terracotta accent eases the interface down'
  },
};

let currentColorMode = 'stable';
let smartLightEnabled = (localStorage.getItem('nura-smart-light') !== 'off');

function getLightMode(f,s){ if(s>60)return'calm'; if(f>=80&&s<=30)return'deep'; if(f>=60)return'stable'; return'break'; }

function applyColorMode(modeName){
  if(modeName === currentColorMode && document.body.dataset.colorMode === modeName) return;
  currentColorMode = modeName;
  document.body.dataset.colorMode = modeName;
  const m = COLOR_MODES[modeName];
  const root = document.documentElement;

  // Accent colors
  root.style.setProperty('--accent', m.accent);
  root.style.setProperty('--accent2', m.accent2);
  root.style.setProperty('--accent-rgb', `${m.r},${m.g},${m.b}`);
  root.style.setProperty('--accent-glow', `rgba(${m.r},${m.g},${m.b},0.08)`);
  root.style.setProperty('--border-accent', `rgba(${m.r},${m.g},${m.b},0.18)`);

  // Full UI background palette â€” the whole interface changes color
  if(!document.body.classList.contains('light-theme')){
    root.style.setProperty('--bg', m.bg);
    root.style.setProperty('--bg2', m.bg2);
    root.style.setProperty('--bg3', m.bg3);
    root.style.setProperty('--bg4', m.bg4);
    root.style.setProperty('--bg5', m.bg5);
  }

  // Update body background gradient (the atmospheric glow)
  document.body.style.setProperty('--body-bg-override', m.bodyGrad);

  // Update the pseudo-element grid color via a style injection
  let gridStyle = document.getElementById('__nura-grid-style');
  if(!gridStyle){ gridStyle=document.createElement('style'); gridStyle.id='__nura-grid-style'; document.head.appendChild(gridStyle); }
  gridStyle.textContent = `body::before{background-image:linear-gradient(${m.gridColor} 1px,transparent 1px),linear-gradient(90deg,${m.gridColor} 1px,transparent 1px)!important;}
  body::after{background:${m.bodyGrad}!important;}`;

  // Cube light engine visuals
  if(document.getElementById('cv-glow')){
    document.getElementById('cv-glow').style.background=m.glow;
    ['cv-top','cv-side','cv-front'].forEach(id=>{
      const el=document.getElementById(id);
      if(el){ el.style.background=m.cubeBg; el.style.borderColor=m.cubeBorder; }
    });
    const bar=document.getElementById('light-status-bar');
    if(bar){ bar.style.background=m.barBg; bar.style.color=m.barText; bar.textContent=m.barLabel; }
    const lbl=document.getElementById('lm-label');
    if(lbl){ lbl.style.color=m.accent2; lbl.textContent=m.lmLabel; }
    const lmk=document.getElementById('lm-k');
    if(lmk) lmk.textContent=m.lmK;
    const lmsci=document.getElementById('lm-science');
    if(lmsci) lmsci.textContent=m.lmSci;
  }

  // Update mode badge in topbar if present
  const modeBadge = document.getElementById('color-mode-badge');
  if(modeBadge){
    modeBadge.textContent = m.lmLabel;
    modeBadge.style.color = m.accent2;
    modeBadge.style.borderColor = `rgba(${m.r},${m.g},${m.b},0.3)`;
    modeBadge.title = m.description;
  }

  document.body.classList.add('glow-active');

  // Highlight active mode card on dashboard
  ['deep','stable','break','calm'].forEach(k=>{
    const card = document.getElementById('dmc-'+k);
    if(card) card.classList.toggle('active-mode', k===modeName);
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LIGHT MODE TYPE â€” 'focus' (auto 4-mode) or 'custom' (colour wheel)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let lightModeType = localStorage.getItem('nura-light-mode-type') || 'focus';
let customColourHex = localStorage.getItem('nura-custom-colour') || '#00e5ff';
let forcedMode = null; // when user manually clicks a mode card

function setLightModeType(type){
  lightModeType = type;
  localStorage.setItem('nura-light-mode-type', type);
  forcedMode = null;
  updateLightModeUI();
  if(type === 'custom'){
    applyCustomColour(customColourHex);
  } else {
    // Auto theming
    const f = Math.round(focusPct), s = Math.round(stressPct);
    applyColorMode(getLightMode(f, s));
  }
}

function forceLightMode(modeName){
  if(lightModeType !== 'focus') return;
  forcedMode = modeName;
  applyColorMode(modeName);
}

/* â”€â”€ Master Auto/Custom switch (replaces old Auto/Custom buttons) â”€â”€
   Behaves exactly like the dark/light theme switch: one click flips
   between the two states. On the dashboard, flipping it smoothly
   crossfades the 4 auto-mode cards out and the colour wheel in
   (or back again). â”€â”€ */
function toggleSmartLight(){
  setLightModeType(lightModeType === 'custom' ? 'focus' : 'custom');
  playUiSound && playUiSound('switch');
}

function updateLightModeUI(){
  const isFocus = lightModeType === 'focus';

  // Master switches (profile dropdown mini + dashboard) â€” mirror theme-switch behaviour
  ['smart-light-toggle','smart-light-toggle-mini'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.classList.toggle('on', !isFocus);
  });

  // Status labels
  ['sl-status-label','sl-status-label-mini'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = isFocus ? 'AUTO Â· '+(COLOR_MODES[currentColorMode]?.lmLabel?.toUpperCase()||'STABLE FOCUS') : 'CUSTOM COLOUR';
  });

  // Dashboard panel â€” smooth crossfade between mode cards and colour wheel
  const focusPanel = document.getElementById('dash-focus-modes');
  const wheelPanel = document.getElementById('dash-colour-wheel-panel');
  if(focusPanel && wheelPanel) crossfadeLightPanels(focusPanel, wheelPanel, isFocus);

  if(!isFocus) setTimeout(initColourWheel, 50);
}

/* Smooth show/hide swap between two sibling panels */
function crossfadeLightPanels(focusEl, customEl, showFocus){
  const show = showFocus ? focusEl : customEl;
  const hide = showFocus ? customEl : focusEl;
  if(hide.style.display !== 'none' && getComputedStyle(hide).opacity !== '0'){
    hide.style.transition = 'opacity .22s ease, transform .22s ease';
    hide.style.opacity = '0';
    hide.style.transform = 'translateY(4px) scale(.985)';
    setTimeout(()=>{
      hide.style.display = 'none';
      show.style.display = showFocus ? 'grid' : 'flex';
      show.style.opacity = '0';
      show.style.transform = 'translateY(4px) scale(.985)';
      show.style.transition = 'none';
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          show.style.transition = 'opacity .28s ease, transform .28s ease';
          show.style.opacity = '1';
          show.style.transform = 'translateY(0) scale(1)';
        });
      });
    }, 220);
  } else {
    hide.style.display = 'none';
    show.style.display = showFocus ? 'grid' : 'flex';
    show.style.opacity = '1';
    show.style.transform = 'none';
  }
}

function applyCustomColour(hex){
  // Guard against invalid input
  if(!/^#[0-9a-fA-F]{3,6}$/.test(hex)) return;
  customColourHex = hex;
  localStorage.setItem('nura-custom-colour', hex);
  // Mark the auto colour-mode cache as stale so that switching back to
  // Smart afterwards doesn't get short-circuited by applyColorMode()'s
  // "nothing changed" check (it compares against this dataset value).
  document.body.dataset.colorMode = 'custom';
  // Convert hex to r,g,b
  let r=0,g=0,b=0;
  if(hex.length===7){ r=parseInt(hex.slice(1,3),16); g=parseInt(hex.slice(3,5),16); b=parseInt(hex.slice(5,7),16); }
  else if(hex.length===4){ r=parseInt(hex[1]+hex[1],16); g=parseInt(hex[2]+hex[2],16); b=parseInt(hex[3]+hex[3],16); }
  const accent2 = brightenHex(r,g,b,0.35);
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--accent2', accent2);
  root.style.setProperty('--accent-rgb', `${r},${g},${b}`);
  root.style.setProperty('--accent-glow', `rgba(${r},${g},${b},0.09)`);
  root.style.setProperty('--border-accent', `rgba(${r},${g},${b},0.2)`);
  // Derive bg from hue
  if(!document.body.classList.contains('light-theme')){
    const hueFactor = 0.035;
    root.style.setProperty('--bg', `rgb(${Math.round(r*hueFactor+3)},${Math.round(g*hueFactor+3)},${Math.round(b*hueFactor+6)})`);
    root.style.setProperty('--bg2', `rgb(${Math.round(r*hueFactor*1.8+5)},${Math.round(g*hueFactor*1.8+5)},${Math.round(b*hueFactor*1.8+9)})`);
    root.style.setProperty('--bg3', `rgb(${Math.round(r*hueFactor*2.8+8)},${Math.round(g*hueFactor*2.8+8)},${Math.round(b*hueFactor*2.8+14)})`);
  }
  // Update grid style
  let gridStyle = document.getElementById('__nura-grid-style');
  if(!gridStyle){ gridStyle=document.createElement('style'); gridStyle.id='__nura-grid-style'; document.head.appendChild(gridStyle); }
  gridStyle.textContent = `body::before{background-image:linear-gradient(rgba(${r},${g},${b},0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(${r},${g},${b},0.025) 1px,transparent 1px)!important;}
  body::after{background:radial-gradient(ellipse at 25% 40%,rgba(${r},${g},${b},0.1) 0%,transparent 60%)!important;}`;
  // Update cube
  if(document.getElementById('cv-glow')){
    document.getElementById('cv-glow').style.background=`rgba(${r},${g},${b},0.6)`;
    ['cv-top','cv-side','cv-front'].forEach(id=>{ const el=document.getElementById(id); if(el){ el.style.borderColor=`rgba(${r},${g},${b},0.4)`; }});
    const bar=document.getElementById('light-status-bar');
    if(bar){ bar.style.background=`rgba(${r},${g},${b},0.08)`; bar.style.color=`rgba(${r},${g},${b},0.9)`; bar.textContent='CUSTOM COLOUR MODE'; }
  }
  // Update swatch preview
  const swatch = document.getElementById('cw-preview-swatch');
  if(swatch) swatch.style.background = hex;
  const hexInput = document.getElementById('cw-hex-input');
  if(hexInput && hexInput !== document.activeElement) hexInput.value = hex;
  // Update mini swatch in profile dropdown + colour popup swatch
  const miniSwatch = document.getElementById('custom-colour-mini-swatch');
  if(miniSwatch) miniSwatch.style.background = hex;
  const ccBtnSwatch = document.getElementById('cc-btn-swatch');
  if(ccBtnSwatch) ccBtnSwatch.style.background = hex;
  const popupSwatch = document.getElementById('colour-popup-swatch');
  if(popupSwatch) popupSwatch.style.background = hex;
  const popupHex = document.getElementById('colour-popup-hex');
  if(popupHex && popupHex !== document.activeElement) popupHex.value = hex;
  // V10.1: also sync custom-colour-preview in dashboard panel
  const dashPreview = document.getElementById('custom-colour-preview');
  if(dashPreview) dashPreview.style.background = hex;
  document.body.classList.add('glow-active');
}

function brightenHex(r,g,b,amount){
  const mix = v => Math.round(Math.min(255, v + (255-v)*amount));
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

function onHexInput(val){
  if(/^#[0-9a-fA-F]{6}$/.test(val)){ applyCustomColour(val); updateColourWheelCursor(val); }
}

// â”€â”€â”€ Colour Wheel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Generic builder: draws an HSL wheel onto any canvas + wires drag-to-pick onto any cursor el.
function buildColourWheel(canvasId, cursorId, onPick){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width/2, cy = canvas.height/2, r = cx - 2;
  for(let angle=0; angle<360; angle++){
    const startAngle = (angle-1) * Math.PI/180;
    const endAngle = (angle+1) * Math.PI/180;
    const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    grad.addColorStop(0, `hsl(${angle},0%,100%)`);
    grad.addColorStop(0.5, `hsl(${angle},100%,60%)`);
    grad.addColorStop(1, `hsl(${angle},100%,30%)`);
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,startAngle,endAngle); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
  }
  const darkGrad = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
  darkGrad.addColorStop(0.4, 'rgba(0,0,0,0)');
  darkGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fillStyle=darkGrad; ctx.fill();

  let picking = false;
  function pick(e){
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX!=null?e.clientX:e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY!=null?e.clientY:e.touches?.[0]?.clientY) - rect.top;
    const sx = x * (canvas.width/rect.width);
    const sy = y * (canvas.height/rect.height);
    const pixel = ctx.getImageData(Math.round(Math.max(0,Math.min(canvas.width-1,sx))),Math.round(Math.max(0,Math.min(canvas.height-1,sy))),1,1).data;
    if(pixel[3] < 10) return;
    const hex = '#' + [pixel[0],pixel[1],pixel[2]].map(v=>v.toString(16).padStart(2,'0')).join('');
    onPick(hex);
    const cursor = document.getElementById(cursorId);
    if(cursor){ cursor.style.left = (x/rect.width*100)+'%'; cursor.style.top = (y/rect.height*100)+'%'; }
  }
  canvas.addEventListener('mousedown', e=>{ picking=true; pick(e); playUiSound('tick'); });
  canvas.addEventListener('mousemove', e=>{ if(picking) pick(e); });
  document.addEventListener('mouseup', ()=>picking=false);
  canvas.addEventListener('touchstart', e=>{ picking=true; pick(e); e.preventDefault(); },{passive:false});
  canvas.addEventListener('touchmove', e=>{ if(picking){ pick(e); e.preventDefault(); } },{passive:false});
  document.addEventListener('touchend', ()=>picking=false);
}

function initColourWheel(){ buildColourWheel('colour-wheel','cw-cursor', applyCustomColour); }

function onWheelBrightnessChange(val){
  // Adjust the brightness of the current custom colour
  if(!/^#[0-9a-fA-F]{6}$/.test(customColourHex)) return;
  const r=parseInt(customColourHex.slice(1,3),16);
  const g=parseInt(customColourHex.slice(3,5),16);
  const b=parseInt(customColourHex.slice(5,7),16);
  // Convert to HSL, adjust L, back to hex
  const factor = val/100;
  const nr=Math.round(r*factor), ng=Math.round(g*factor), nb=Math.round(b*factor);
  const newHex = '#'+[nr,ng,nb].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('');
  applyCustomColour(newHex);
}

function updateColourWheelCursor(hex){
  // Not strictly needed but keep for future extension
}

// â”€â”€â”€ Colour Popup (profile dropdown shortcut) â€” same wheel, separate small canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let colourPopupWheelBuilt = false;
function openColourPopup(){
  document.getElementById('userDropdown')?.classList.remove('open');
  setLightModeType('custom');
  document.getElementById('colour-popup-overlay').classList.add('open');
  document.getElementById('colour-popup-hex').value = customColourHex;
  document.getElementById('colour-popup-swatch').style.background = customColourHex;
  if(!colourPopupWheelBuilt){
    buildColourWheel('colour-popup-wheel','colour-popup-cursor', hex=>{ applyCustomColour(hex); });
    colourPopupWheelBuilt = true;
  }
  playUiSound('open');
}
function closeColourPopup(){
  document.getElementById('colour-popup-overlay').classList.remove('open');
  playUiSound('close');
}
function onPopupBrightnessChange(val){ onWheelBrightnessChange(val); }
function onPopupHexInput(val){
  if(/^#[0-9a-fA-F]{6}$/.test(val)) applyCustomColour(val);
}

// Restore light mode type on load
function restoreLightModeType(){
  updateLightModeUI();
  if(lightModeType === 'custom'){
    applyCustomColour(customColourHex);
  }
  // Init wheel (always, it's hidden until custom mode)
  setTimeout(initColourWheel, 200);
}
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// Seed from a high-entropy source on every page load so curves never repeat
const _seed = Date.now() ^ (Math.random() * 0xFFFFFFFF | 0) ^ (performance.now() * 1000 | 0);
let _rng = _seed;
function seededRand(){
  _rng ^= _rng << 13; _rng ^= _rng >> 17; _rng ^= _rng << 5;
  return ((_rng >>> 0) / 0xFFFFFFFF);
}

// Random starting points (seeded so they differ every refresh)
let focusPct  = 45 + seededRand() * 40;   // 45-85
let stressPct = 5  + seededRand() * 35;   // 5-40
let focusDir  = seededRand() > 0.5 ? 1 : -1;
let stressDir = seededRand() > 0.5 ? 1 : -1;

// Perlin-like noise for organic movement
let focusNoisePhase  = seededRand() * Math.PI * 2;
let stressNoisePhase = seededRand() * Math.PI * 2;
let focusNoiseSpeed  = 0.03 + seededRand() * 0.04;
let stressNoiseSpeed = 0.02 + seededRand() * 0.035;

// Momentum variables for smoother direction changes
let focusMomentum  = (seededRand() - 0.5) * 2;
let stressMomentum = (seededRand() - 0.5) * 1.5;

// Track previous stress for Nura Watch notification
let prevStress = stressPct;
let stressWasPastThreshold = stressPct > 60;

function updateVitals(){
  focusNoisePhase  += focusNoiseSpeed  * (0.7 + seededRand() * 0.6);
  stressNoisePhase += stressNoiseSpeed * (0.7 + seededRand() * 0.6);

  // Multi-layered noise: fast micro-jitter + slow drift + occasional spikes
  const focusDrift   = Math.sin(focusNoisePhase) * 1.4 + Math.sin(focusNoisePhase * 2.3) * 0.6;
  const stressDrift  = Math.sin(stressNoisePhase) * 1.1 + Math.sin(stressNoisePhase * 1.7) * 0.5;
  const focusJitter  = (seededRand() - 0.5) * 2.8;
  const stressJitter = (seededRand() - 0.5) * 2.0;

  // Momentum: randomly shift direction with variable probability
  if(seededRand() < 0.08) focusMomentum  += (seededRand() - 0.5) * 4;
  if(seededRand() < 0.07) stressMomentum += (seededRand() - 0.5) * 3;
  focusMomentum  = Math.max(-3, Math.min(3, focusMomentum  * 0.92));
  stressMomentum = Math.max(-2.5, Math.min(2.5, stressMomentum * 0.93));

  // Occasional large swings (8% chance each tick)
  const focusSpike  = seededRand() < 0.08 ? (seededRand() - 0.45) * 7 : 0;
  const stressSpike = seededRand() < 0.08 ? (seededRand() - 0.45) * 5 : 0;

  focusPct  += focusDrift + focusJitter  + focusMomentum  * 0.4 + focusSpike;
  stressPct += stressDrift + stressJitter + stressMomentum * 0.4 + stressSpike;

  // Clamp and bounce
  if(focusPct  >= 97 || focusPct  <= 38) focusMomentum  *= -0.7;
  if(stressPct >= 80 || stressPct <= 4)  stressMomentum *= -0.7;
  focusPct  = Math.max(38, Math.min(97, focusPct));
  stressPct = Math.max(4,  Math.min(80, stressPct));

  const f = Math.round(focusPct), s = Math.round(stressPct);

  // Nura Watch threshold notification: only when dropping FROM >60% TO â‰¤60%
  if(stressWasPastThreshold && s <= 60){
    stressWasPastThreshold = false;
    // Trigger the coming-down notification
    setTimeout(()=> triggerStressComingDownAlert(f, s), 200);
  } else if(s > 60){
    stressWasPastThreshold = true;
  }
  prevStress = s;

  ['top-focus','dash-focus','stats-focus','fe-focus'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=f+'%'; });
  ['top-stress','dash-stress','stats-stress','fe-stress'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=s+'%'; });
  ['focus-bar-fill','stats-focus-bar','focus-slider'].forEach(id=>{ const el=document.getElementById(id); if(el) el.style.width=f+'%'; });
  ['stress-bar-fill','stats-stress-bar','stress-slider'].forEach(id=>{ const el=document.getElementById(id); if(el) el.style.width=s+'%'; });

 // health text
  const ht = document.getElementById('nura-health-text');
  if (ht) {
    if (s > 60) ht.textContent = `âš  High cortisol detected. Take slow abdominal breaths or activate Calm Down light mode.`;
    else if (f > 80 && s < 25) ht.textContent = `âš¡ Alpha brainwaves peaked. Optimal deep learning window â€” stay in the zone.`;
    else if (f < 55) ht.textContent = "ðŸ“‰ Attention dipping below baseline. Try a short stretch or switch to Break Mode lighting.";
    else ht.textContent = "âœ… Vitals normalized. Steady homeostatic balance across neural clusters.";
  }
  if(lightModeType !== 'custom') applyColorMode(getLightMode(f,s));
  NuraWatch.onVitalsUpdate(f,s);
}
setInterval(updateVitals,3000);

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SESSION TIMER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let sessionOn=false,secs=0,sessInt=null;
function toggleSession(){
  sessionOn=!sessionOn;
  document.getElementById('start-btn').textContent=sessionOn?'Pause':'Resume';
  if(sessionOn) sessInt=setInterval(tick,1000); else clearInterval(sessInt);
}
function resetSession(){
  clearInterval(sessInt);sessionOn=false;secs=0;
  document.getElementById('start-btn').textContent='Start Session';
  setTimers('00:00');
  document.getElementById('prog-fill').style.width='0%';
  document.getElementById('prog-pct').textContent='0%';
  document.getElementById('dash-time').textContent='00:00';
  document.getElementById('time-bar').style.width='0%';
}
function tick(){
  secs++;
  const m=String(Math.floor(secs/60)).padStart(2,'0'),s2=String(secs%60).padStart(2,'0');
  const t=m+':'+s2;
  setTimers(t);
  document.getElementById('dash-time').textContent=t;
  const pct=Math.min(100,Math.round((secs/7200)*100));
  document.getElementById('prog-fill').style.width=pct+'%';
  document.getElementById('prog-pct').textContent=pct+'%';
  document.getElementById('time-bar').style.width=pct+'%';
}
function setTimers(t){ document.getElementById('main-timer').textContent=t; document.getElementById('top-timer-val').textContent=t; }

const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const wH=[65,80,40,90,55,20,0];
function buildWeek(){
  // Find today's day index: Mon=0 ... Sun=6
  const jsDay=new Date().getDay(); // 0=Sun,1=Mon...6=Sat
  const todayIdx=(jsDay+6)%7; // convert: Mon=0...Sun=6
  document.getElementById('week-bars').innerHTML=days.map((d,i)=>`<div class="week-bar-col"><div class="wbar${i===todayIdx?' today':''}" style="height:${Math.max(2,wH[i]*.44)}px"></div></div>`).join('');
  document.getElementById('week-days').innerHTML=days.map((d,i)=>`<div class="wday${i===todayIdx?' today':''}">${d}</div>`).join('');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CALENDAR
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let calYear=new Date().getFullYear(), calMonth=new Date().getMonth();
function openCalendar(){
  // Delegates to the properly-scoped calendar engine (window.openCalendarModal),
  // which has access to calRender(). Calling calRender() directly from here
  // threw "calRender is not defined" since it lives in a separate closure.
  if(window.openCalendarModal) window.openCalendarModal();
}
function closeCalendar(){
  if(window.closeCalendarModal) window.closeCalendarModal();
}
function calNav(dir, type='month'){
  if(type==='year'){
    calYear += dir;
  } else {
    calMonth += dir;
    if(calMonth>11){calMonth=0;calYear++;}
    if(calMonth<0){calMonth=11;calYear--;}
  }
  renderCalendar();
  playUiSound('tick');
}
function renderCalendar(){
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-month-label').textContent=MONTHS[calMonth]+' '+calYear;
  const grid=document.getElementById('cal-grid');
  const today=new Date(); const todayStr=`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const firstDay=new Date(calYear,calMonth,1).getDay();
  const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
  const studiedDays=JSON.parse(localStorage.getItem('nura-studied-days')||'{}');
  let html='';
  for(let i=0;i<firstDay;i++) html+=`<div></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const key=`${calYear}-${calMonth}-${d}`;
    const isToday=key===todayStr;
    const studied=studiedDays[key];
    const bg=isToday?'rgba(var(--accent-rgb),0.4)':studied?'var(--accent-glow)':'rgba(255,255,255,0.04)';
    const border=isToday?'var(--border-accent)':studied?'rgba(var(--accent-rgb),0.2)':'var(--glass-border-soft)';
    const color=isToday||studied?'var(--accent2)':'var(--text3)';
    html+=`<div onclick="toggleStudyDay('${key}')" style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:${isToday?600:400};color:${color};background:${bg};border:1px solid ${border};border-radius:7px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor='var(--border-accent)'" onmouseout="this.style.borderColor='${border}'">${d}</div>`;
  }
  grid.innerHTML=html;
}
function toggleStudyDay(key){
  const days=JSON.parse(localStorage.getItem('nura-studied-days')||'{}');
  if(days[key]) delete days[key]; else days[key]=true;
  localStorage.setItem('nura-studied-days',JSON.stringify(days));
  renderCalendar();
  playUiSound('tick');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CLOCK
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function startClock(){
  setInterval(()=>{
    const now=new Date();
    document.getElementById('dash-clock-time').textContent=now.toTimeString().split(' ')[0];
    document.getElementById('dash-clock-date').textContent=now.toLocaleDateString('en-US',{weekday:'short',year:'numeric',month:'short',day:'numeric'});
  },1000);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAV
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function nav(id,el){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  el.classList.add('active');
}
function toggleTheme(){
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('nura-theme', isLight ? 'light' : 'dark');
  updateThemeBtn();
  playUiSound('switch');
}
function updateThemeBtn(){
  const btn = document.getElementById('theme-toggle-btn');
  if(!btn) return;
  const isLight = document.body.classList.contains('light-theme');
  const iconEl = document.getElementById('theme-toggle-icon');
  const labelEl = document.getElementById('theme-toggle-label');
  if(iconEl) iconEl.innerHTML = isLight ? ICON.moon : ICON.sun;
  if(labelEl) labelEl.textContent = isLight ? 'Switch to Dark' : 'Switch to Light';
}
function applyStoredTheme(){
  if(localStorage.getItem('nura-theme')==='light') document.body.classList.add('light-theme');
  updateThemeBtn();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SOUNDSCAPE â€” Layered Web Audio Engine
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let audioCtx=null,activeSourceNodes=[],activeOscNodes=[],masterGainNode=null,soundNode=null,liveAudioStream=null,customAudioUrlObject=null,audioPlaying=false;

function initAudioEngine(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') audioCtx.resume();
}

function makeWhiteNoise(dur=8){
  const sr=audioCtx.sampleRate,buf=audioCtx.createBuffer(1,sr*dur,sr),d=buf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  const src=audioCtx.createBufferSource(); src.buffer=buf; src.loop=true; return src;
}

function makePinkNoise(dur=8){
  const sr=audioCtx.sampleRate,buf=audioCtx.createBuffer(1,sr*dur,sr),d=buf.getChannelData(0);
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
  for(let i=0;i<d.length;i++){
    const w=Math.random()*2-1;
    b0=.99886*b0+w*.0555179;b1=.99332*b1+w*.0750759;b2=.969*b2+w*.153852;
    b3=.8665*b3+w*.3104856;b4=.55*b4+w*.5329522;b5=-.7616*b5-w*.016898;
    d[i]=(b0+b1+b2+b3+b4+b5+b6+w*.5362)*.11; b6=w*.115926;
  }
  const src=audioCtx.createBufferSource(); src.buffer=buf; src.loop=true; return src;
}

function makeFilter(type,freq,q){
  const f=audioCtx.createBiquadFilter(); f.type=type; f.frequency.value=freq;
  if(q!=null) f.Q.value=q; return f;
}
function makeLFO(freq,depth){
  const osc=audioCtx.createOscillator(); osc.type='sine'; osc.frequency.value=freq;
  const g=audioCtx.createGain(); g.gain.value=depth;
  osc.connect(g); return {osc,out:g};
}
function makeGain(v){ const g=audioCtx.createGain(); g.gain.value=v; return g; }

function stopProceduralNoise(){
  activeSourceNodes.forEach(n=>{try{n.stop();}catch(e){}});
  activeOscNodes.forEach(n=>{try{n.stop();}catch(e){}});
  activeSourceNodes=[]; activeOscNodes=[];
  if(masterGainNode){try{masterGainNode.disconnect();}catch(e){} masterGainNode=null;}
  soundNode=null;
  if(liveAudioStream){liveAudioStream.pause();liveAudioStream=null;}
}

function startProceduralNoise(type){
  initAudioEngine(); stopProceduralNoise();
  const vol=parseFloat(document.getElementById('volume-control').value);
  masterGainNode=makeGain(vol);
  masterGainNode.connect(audioCtx.destination);
  // compat shim so adjustSoundscapeVolume still works
  soundNode={gainNodeRef:masterGainNode};

  if(type==='rain'){
    // â”€â”€ Layer A: Soft high-frequency hiss (fine rain droplets in air) â”€â”€
    const hiss=makeWhiteNoise(9);
    const hpf=makeFilter('highpass',2600,null);
    const shelf=makeFilter('highshelf',6000,null); shelf.gain.value=-8; // tame harshness
    const hissG=makeGain(0.18);
    const lfo1=makeLFO(0.06,0.04); lfo1.osc.start();
    lfo1.out.connect(hissG.gain);
    hiss.connect(hpf); hpf.connect(shelf); shelf.connect(hissG); hissG.connect(masterGainNode);

    // â”€â”€ Layer B: Mid-frequency patter (drops hitting leaves/ground) â”€â”€
    const patter=makeWhiteNoise(6);
    const bpf=makeFilter('bandpass',1300,1.2);
    const lp=makeFilter('lowpass',4000,null);
    const patterG=makeGain(0.22);
    const lfo2=makeLFO(0.11,0.07); lfo2.osc.start();
    lfo2.out.connect(patterG.gain);
    patter.connect(bpf); bpf.connect(lp); lp.connect(patterG); patterG.connect(masterGainNode);

    // â”€â”€ Layer C: Low rumble â€” rain on a surface, body of sound â”€â”€
    const rumble=makePinkNoise(11);
    const lpf=makeFilter('lowpass',520,null);
    const rumbleG=makeGain(0.20);
    const lfo3=makeLFO(0.04,0.05); lfo3.osc.start();
    lfo3.out.connect(rumbleG.gain);
    rumble.connect(lpf); lpf.connect(rumbleG); rumbleG.connect(masterGainNode);

    // â”€â”€ Layer D: Occasional swell (gust of heavier rain) â”€â”€
    const swell=makePinkNoise(7);
    const bpf2=makeFilter('bandpass',700,0.7);
    const swellG=makeGain(0.0);
    const lfo4=makeLFO(0.035,0.12); lfo4.osc.start();
    lfo4.out.connect(swellG.gain);
    swell.connect(bpf2); bpf2.connect(swellG); swellG.connect(masterGainNode);

    hiss.start(); patter.start(); rumble.start(); swell.start();
    activeSourceNodes.push(hiss,patter,rumble,swell);
    activeOscNodes.push(lfo1.osc,lfo2.osc,lfo3.osc,lfo4.osc);

  } else if(type==='ocean'){
    // â”€â”€ Layer A: Deep ocean bed (very lowpass pink noise) â”€â”€
    const base=makePinkNoise(12);
    const lpf=makeFilter('lowpass',600,null);
    const baseG=makeGain(0.38);
    // Slow wave swell LFO at ~0.08Hz (one wave every ~12 seconds)
    const waveLfo=makeLFO(0.08,0.28); waveLfo.osc.start();
    waveLfo.out.connect(baseG.gain);
    base.connect(lpf); lpf.connect(baseG); baseG.connect(masterGainNode);

    // â”€â”€ Layer B: Shore foam / surf mid layer â”€â”€
    const surf=makeWhiteNoise(8);
    const bpf=makeFilter('bandpass',800,0.8);
    const surfG=makeGain(0.0); // fully LFO-driven, peaks on each wave
    const surfLfo=makeLFO(0.08,0.18); surfLfo.osc.start();
    // slight phase offset so foam peaks just after swell
    setTimeout(()=>{ try{ surfLfo.osc.frequency.setValueAtTime(0.08,audioCtx.currentTime); }catch(e){} },200);
    surfLfo.out.connect(surfG.gain);
    surf.connect(bpf); bpf.connect(surfG); surfG.connect(masterGainNode);

    // â”€â”€ Layer C: High airy spray on breakwater â”€â”€
    const spray=makeWhiteNoise(5);
    const hpf=makeFilter('highpass',2400,null);
    const sprayG=makeGain(0.0);
    const sprayLfo=makeLFO(0.075,0.08); sprayLfo.osc.start();
    sprayLfo.out.connect(sprayG.gain);
    spray.connect(hpf); hpf.connect(sprayG); sprayG.connect(masterGainNode);

    base.start(); surf.start(); spray.start();
    activeSourceNodes.push(base,surf,spray);
    activeOscNodes.push(waveLfo.osc,surfLfo.osc,sprayLfo.osc);

  } else { // binaural
    // â”€â”€ True binaural beat: two pure sine waves 8Hz apart (alpha focus) â”€â”€
    // 196Hz left + 204Hz right â†’ 8Hz alpha beat felt in the brain
    const osc1=audioCtx.createOscillator(); osc1.type='sine'; osc1.frequency.value=196;
    const osc2=audioCtx.createOscillator(); osc2.type='sine'; osc2.frequency.value=204;
    const g1=makeGain(0.13), g2=makeGain(0.13);
    osc1.connect(g1); g1.connect(masterGainNode);
    osc2.connect(g2); g2.connect(masterGainNode);

    // â”€â”€ Soft pink noise underneath for comfort (keeps it from being stark) â”€â”€
    const pink=makePinkNoise(6);
    const lpf=makeFilter('lowpass',280,null);
    const pinkG=makeGain(0.035);
    pink.connect(lpf); lpf.connect(pinkG); pinkG.connect(masterGainNode);

    // â”€â”€ Very gentle amplitude tremolo to avoid listener fatigue â”€â”€
    const tremoloLfo=makeLFO(8,0.02); tremoloLfo.osc.start();
    tremoloLfo.out.connect(g1.gain); tremoloLfo.out.connect(g2.gain);

    osc1.start(); osc2.start(); pink.start();
    activeSourceNodes.push(pink);
    activeOscNodes.push(osc1,osc2,tremoloLfo.osc);
  }
}

function toggleSoundscape(){
  const btn=document.getElementById('play-audio-btn'),type=document.getElementById('track-select').value;
  if(audioPlaying){stopProceduralNoise();btn.textContent='Play Track';audioPlaying=false;}
  else{
    audioPlaying=true;btn.textContent='Stop Track';
    if(['binaural','rain','ocean'].includes(type)) startProceduralNoise(type);
    else if(type==='custom-imported-track'&&customAudioUrlObject){liveAudioStream=new Audio(customAudioUrlObject);liveAudioStream.volume=parseFloat(document.getElementById('volume-control').value);liveAudioStream.play().catch(()=>{});}
    else{liveAudioStream=new Audio('https://stream.live.vc.bbcmedia.co.uk/bbc_radio_three');liveAudioStream.volume=parseFloat(document.getElementById('volume-control').value);liveAudioStream.play().catch(()=>{});}
  }
}
function adjustSoundscapeVolume(v){ if(soundNode&&soundNode.gainNodeRef) soundNode.gainNodeRef.gain.setValueAtTime(parseFloat(v),audioCtx.currentTime); if(liveAudioStream) liveAudioStream.volume=parseFloat(v); }
// â”€â”€ IndexedDB helpers for large audio files â”€â”€
function openAudioDB(){
  return new Promise((res,rej)=>{
    const req=indexedDB.open('nura-audio-db',1);
    req.onupgradeneeded=e=>e.target.result.createObjectStore('audio');
    req.onsuccess=e=>res(e.target.result);
    req.onerror=e=>rej(e.target.error);
  });
}
async function saveAudioToDB(name,blob){
  const db=await openAudioDB();
  return new Promise((res,rej)=>{
    const tx=db.transaction('audio','readwrite');
    tx.objectStore('audio').put({name,blob},'custom-track');
    tx.oncomplete=()=>res();
    tx.onerror=e=>rej(e.target.error);
  });
}
async function loadAudioFromDB(){
  const db=await openAudioDB();
  return new Promise((res,rej)=>{
    const tx=db.transaction('audio','readonly');
    const req=tx.objectStore('audio').get('custom-track');
    req.onsuccess=e=>res(e.target.result||null);
    req.onerror=e=>rej(e.target.error);
  });
}

function _injectCustomTrackUI(name){
  const sel=document.getElementById('track-select');
  let opt=document.getElementById('custom-injected-audio-node');
  if(!opt){opt=document.createElement('option');opt.id='custom-injected-audio-node';opt.value='custom-imported-track';sel.appendChild(opt);}
  opt.textContent=`ðŸ“‚ ${name.substring(0,22)}`; opt.selected=true;
  const lbl=document.getElementById('audio-file-label');
  if(lbl) lbl.textContent=name.length>26?name.substring(0,24)+'â€¦':name;
}

function handleCustomAudioImport(inp){
  const f=inp.files[0]; if(!f) return;
  if(customAudioUrlObject) URL.revokeObjectURL(customAudioUrlObject);
  customAudioUrlObject=URL.createObjectURL(f);
  _injectCustomTrackUI(f.name);
  // Save the raw blob to IndexedDB â€” no size limit issues
  const lbl=document.getElementById('audio-file-label');
  saveAudioToDB(f.name, f).then(()=>{
    if(lbl) lbl.textContent=(f.name.length>26?f.name.substring(0,24)+'â€¦':f.name)+' âœ“';
  }).catch(err=>{
    console.warn('IndexedDB save failed:',err);
    if(lbl) lbl.textContent='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Could not persist ('+f.name.substring(0,16)+')';
  });
}

async function loadSavedAudio(){
  try{
    const saved=await loadAudioFromDB();
    if(!saved) return;
    if(customAudioUrlObject) URL.revokeObjectURL(customAudioUrlObject);
    customAudioUrlObject=URL.createObjectURL(saved.blob);
    _injectCustomTrackUI(saved.name);
  }catch(e){ console.warn('Could not restore saved audio:',e); }
}
function changeSoundscapeTrack(){ if(audioPlaying){toggleSoundscape();toggleSoundscape();} }

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LECTURE FILE PROCESSING
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let parsedLecturesContext='';
async function processLectureFiles(inp){
  const files=inp.files; if(!files.length)return;
  const status=document.getElementById('lecture-status');
  status.textContent='Processing â³';
  let text='';
  for(let file of files){
    try{
      if(file.name.endsWith('.txt')){ text+=`\n[FILE: ${file.name}]\n${await file.text()}\n`; }
      else if(file.name.endsWith('.docx')){
        const ab=await file.arrayBuffer();
        const out=await mammoth.extractRawText({arrayBuffer:ab});
        text+=`\n[DOCX: ${file.name}]\n${out.value}\n`;
      }else if(file.name.endsWith('.pdf')){
        const ab=await file.arrayBuffer();
        pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const doc=await pdfjsLib.getDocument({data:ab}).promise;
        let pdf='';
        for(let i=1;i<=doc.numPages;i++){const pg=await doc.getPage(i);const c=await pg.getTextContent();pdf+=c.items.map(x=>x.str).join(' ')+'\n';}
        text+=`\n[PDF: ${file.name}]\n${pdf}\n`;
      }
    }catch(err){console.error(err);}
  }
  parsedLecturesContext+=text;
  status.textContent=`âœ… ${files.length} file(s) loaded`;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SOURCE POPUP
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function showSourcePopup(sources){
  const popup=document.getElementById('source-popup');
  const body=document.getElementById('source-popup-body');
  // un-minimize if previously minimized
  popup.classList.remove('minimized');
  document.getElementById('sp-min-btn').textContent='âž–';
  body.style.display='';

  if(!sources||sources.length===0){
    body.innerHTML=`<div class="sp-no-source">No specific sources cited for this response.</div>`;
  } else {
    body.innerHTML=sources.map(s=>`
      <div class="sp-source-item">
        <div class="sp-source-name">${s.title||'Source'}</div>
        ${s.url?`<div class="sp-source-url">${s.url}</div><button class="sp-open-btn" onclick="openSourceLink('${s.url.replace(/'/g,'\\\'')}')" type="button">Open in new tab â†—</button>`:'<div class="sp-source-url">No URL available</div>'}
      </div>`).join('');
  }
  popup.classList.add('show');
}
function openSourceLink(url){
  try{ window.open(url,'_blank','noopener,noreferrer'); }catch(e){}
}
function closeSourcePopup(){ document.getElementById('source-popup').classList.remove('show'); }
function minimizeSourcePopup(){
  const popup=document.getElementById('source-popup');
  const body=document.getElementById('source-popup-body');
  const btn=document.getElementById('sp-min-btn');
  const minimized=popup.classList.toggle('minimized');
  body.style.display=minimized?'none':'';
  btn.textContent=minimized?'ðŸ”²':'âž–';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LINKS HUB
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function openLinkPopup(){ document.getElementById('linkPopup').classList.add('show');document.getElementById('popupTrigger').style.display='none'; }
function closeLinkPopup(){ document.getElementById('linkPopup').classList.remove('show');document.getElementById('popupTrigger').style.display='flex'; }
function minimizeLinkPopup(){ const p=document.getElementById('linkPopup');p.classList.toggle('minimized');document.getElementById('popup-min-btn').textContent=p.classList.contains('minimized')?'ðŸ”²':'âž–'; }
function addCustomHubLink(){
  const inp=document.getElementById('custom-link-input');let url=inp.value.trim();if(!url)return;
  if(!/^https?:\/\//i.test(url)) url='https://'+url;
  appendLinkToHub(url); inp.value='';
  saveLinkHub();
}
function appendLinkToHub(url){
  const cont=document.getElementById('custom-links-list');
  const item=document.createElement('div');
  item.style='display:flex;justify-content:space-between;align-items:center;background:var(--bg3);padding:4px 8px;border-radius:6px;font-size:10px;border:1px solid var(--border);margin-top:2px';
  let lbl=url.replace(/^https?:\/\/(www\.)?/i,'');if(lbl.length>22)lbl=lbl.substring(0,20)+'...';
  item.innerHTML=`<a href="${url}" target="_blank" style="color:var(--accent2);text-decoration:none;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${url}">ðŸ”— ${lbl}</a><button onclick="this.parentElement.remove();saveLinkHub()" style="background:none;border:none;color:var(--text3);cursor:pointer;padding:0 2px;font-size:10px;margin-left:4px">âœ•</button>`;
  cont.appendChild(item);
}
function saveLinkHub(){
  const links=[...document.querySelectorAll('#custom-links-list a')].map(a=>({url:a.href}));
  localStorage.setItem('nura-custom-links',JSON.stringify(links));
}
function loadLinkHub(){
  try{const links=JSON.parse(localStorage.getItem('nura-custom-links')||'[]');links.forEach(l=>appendLinkToHub(l.url));}catch(e){}
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// AI TUTOR â€” Socratic + multilingual + persistent conversation
// Supported: English, Danish (Dansk), German (Deutsch), Arabic (Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Persist conversation history in localStorage
function saveChatHistory(h){ try{ localStorage.setItem('nura-chat-history', JSON.stringify(h)); }catch(e){} }
function loadChatHistory(){ try{ return JSON.parse(localStorage.getItem('nura-chat-history')||'[]'); }catch(e){ return []; } }

let chatHistory = loadChatHistory();
const chatBox = document.getElementById('chat-box');

// Restore existing messages in the chat UI on page load
(function restoreChatUI(){
  if(chatHistory.length === 0) return;
  const ws = document.getElementById('chat-welcome-screen');
  if(ws) ws.remove();
  for(let i=0; i<chatHistory.length; i++){
    const h = chatHistory[i];
    if(h.role==='user') addMsg('user', h.content);
    else if(h.role==='assistant') addMsg('ai', h.content);
  }
})();

// â”€â”€ Chat session archive â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Each saved session: { id, title, ts, messages: [{role,content}] }
function loadChatSessions(){ try{ return JSON.parse(localStorage.getItem('nura-chat-sessions')||'[]'); }catch(e){ return []; } }
function saveChatSessions(arr){ try{ localStorage.setItem('nura-chat-sessions',JSON.stringify(arr)); }catch(e){} }

function archiveCurrentChat(){
  if(!chatHistory || chatHistory.length < 2) return; // nothing worth saving
  const sessions = loadChatSessions();
  // Use first user message as title (max 40 chars)
  const firstUser = chatHistory.find(m=>m.role==='user');
  const title = firstUser ? firstUser.content.substring(0,40) : 'Chat ' + (sessions.length+1);
  sessions.unshift({ id: Date.now(), title, ts: new Date().toLocaleDateString(), messages: chatHistory });
  // Keep last 30 sessions
  saveChatSessions(sessions.slice(0,30));
}

function startNewConversation(){
  archiveCurrentChat();
  chatHistory = [];
  saveChatHistory(chatHistory);
  chatBox.innerHTML = '';
  if(typeof _nuraSources !== 'undefined'){ _nuraSources = []; updateSourcesBtn && updateSourcesBtn(); }
  const welcome = document.createElement('div');
  welcome.className = 'chat-welcome-container';
  welcome.id = 'chat-welcome-screen';
  const p = JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  welcome.innerHTML = `<h1 class="chat-welcome-title" id="welcome-user-text">New conversation started, ${p.name||'Student'}!</h1><p style="color:var(--text2);font-size:13px;max-width:480px;margin:0 auto;line-height:1.7">Ask anything in English, Danish, German, or Arabic.</p>`;
  chatBox.appendChild(welcome);
  // Refresh dropdown if open

}

async function detectSubject(question){
  try{
    const res=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getApiKey()},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:15,messages:[{role:'system',content:`Reply with ONLY one word from: ${subjects.join(', ')}, General. No other text.`},{role:'user',content:'Classify: '+question}]})});
    const data=await res.json();
    const raw=data.choices?.[0]?.message?.content?.trim()||'General';
    return subjects.find(s=>raw.toLowerCase().includes(s.toLowerCase()))||'General';
  }catch(e){return'General';}
}

function useHint(el){ document.getElementById('chat-input').value=el.textContent; nav('tutor',document.querySelectorAll('.nav-btn')[3]); document.getElementById('chat-input').focus(); }

function addMsg(role,text){
  const div=document.createElement('div');
  div.className='msg '+role;
  div.innerHTML=`<div class="msg-sender">${role==='user'?'You':'Nura Mind'}</div><div class="msg-bubble">${text}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop=chatBox.scrollHeight;
}

async function sendMsg(){
  const input=document.getElementById('chat-input');
  const btn=document.getElementById('ask-btn');
  const text=input.value.trim();
  if(!text||btn.disabled) return;

  if(!getApiKey()){ addMsg('ai','<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> No API key set. Open your profile menu (top right) and paste your Groq key.'); return; }

  // dismiss welcome
  const ws=document.getElementById('chat-welcome-screen');
  if(ws){ ws.style.opacity='0'; setTimeout(()=>ws.remove(),400); }

  addMsg('user',text);
  input.value=''; btn.disabled=true;

  const typing=document.createElement('div');
  typing.className='msg ai';
  typing.innerHTML=`<div class="msg-sender">Nura Mind</div><div class="msg-bubble"><div class="typing-indicator"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>`;
  chatBox.appendChild(typing);
  chatBox.scrollTop=chatBox.scrollHeight;

  chatHistory.push({role:'user',content:text});

  const p=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');

  // Chat mode: a normal, casual conversational friend â€” short replies, no Socratic
  // structure, no source citations. (Deep, sourced research lives in NuraSearch mode.)
  const systemPrompt=`You are Nura Mind, talking to ${p.name||'a student'} (age ${p.age||'17'}) like a friendly, down-to-earth study buddy â€” not a teacher, not a textbook.

LANGUAGE: detect the language the user just wrote in (English, Danish "Dansk", German "Deutsch", or Arabic "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©") and reply ENTIRELY in that same language. Never mix languages mid-reply.

TONE & LENGTH: be casual and natural, like texting a smart friend. Keep most replies SHORT â€” usually 1 to 4 sentences. Don't lecture, don't pad with filler, don't structure things into numbered teaching steps. If they ask something real, just answer it plainly and helpfully. If they're just chatting, chat back normally.

Never mention or list sources, citations, or links â€” this mode doesn't cite sources.

${parsedLecturesContext?`They've shared some notes/files. Use this if it's relevant to what they're asking:\n${parsedLecturesContext.substring(0,3000)}`:''}`;

  try{
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getApiKey()},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:400,messages:[{role:'system',content:systemPrompt},...chatHistory]})});
    const data=await res.json();
    if(data.error) throw new Error(data.error.message);
    const fullReply=data.choices?.[0]?.message?.content||'Hmm, try that again?';

    if(chatBox.contains(typing)) chatBox.removeChild(typing);
    addMsg('ai',fullReply);
    chatHistory.push({role:'assistant',content:fullReply});
    saveChatHistory(chatHistory);

    // Notes are NEVER auto-created from casual chat or per-message anymore.
    // Only when the user explicitly asks for a summary/notes does Nura Mind
    // look at the WHOLE conversation and write one consolidated note.
    await maybeSaveConversationNote(text);
  }catch(e){
    if(chatBox.contains(typing)) chatBox.removeChild(typing);
    addMsg('ai',`Error: ${e.message}. Check your Groq API key in the profile menu.`);
  }
  btn.disabled=false; input.focus();
}

/* â”€â”€ Explicit-request note saving â”€â”€
   Detects phrases like "summarize my conversation and add it to my notes".
   When matched, sends the FULL conversation (not just the last message) to
   the AI and asks it to distill the study-relevant content (skipping small
   talk) into one well-organized note, instead of one note per message. â”€â”€ */
function isNoteSaveRequest(text){
  const t = text.toLowerCase();
  const mentionsNotes = /\bnotes?\b/.test(t);
  const mentionsAction = /(summar\w*|add|save)/.test(t);
  return mentionsNotes && mentionsAction;
}

async function maybeSaveConversationNote(triggerText){
  if(!isNoteSaveRequest(triggerText)) return;
  if(chatHistory.length < 2) return; // nothing substantial to summarize yet

  try{
    const transcript = chatHistory.map(m=> (m.role==='user'?'Student: ':'Nura Mind: ')+m.content).join('\n');
    const sumPrompt = `Read this conversation between a student and their AI study buddy. Write ONE well-organized study note that captures the study-relevant content discussed across the WHOLE conversation â€” concepts explained, facts given, questions answered. Completely ignore small talk / casual chit-chat that isn't about a study topic.

Reply with ONLY valid JSON, no markdown fences, in this exact shape:
{"subject":"<one of: ${subjects.join(', ')}>","title":"<short note title, 6 words max>","summary":"<the note body â€” concise but complete, use line breaks between distinct points>"}

If there is genuinely no study-relevant content in the conversation (it was all casual chat), reply with: {"summary":""}

Conversation:
${transcript.substring(0,6000)}`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getApiKey()},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:700,messages:[{role:'user',content:sumPrompt}]})});
    const data = await res.json();
    let raw = (data.choices?.[0]?.message?.content || '{}').replace(/```json|```/g,'').trim();
    let parsed; try{ parsed = JSON.parse(raw); }catch(e){ parsed = null; }
    if(!parsed || !parsed.summary){
      addMsg('ai',"I didn't see anything study-related to save yet â€” ask me about a topic first, then I can add it to your notes.");
      return;
    }

    const now=new Date();
    const timeStr='Today Â· '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
    const subject = subjects.includes(parsed.subject) ? parsed.subject : 'General';
    const note={id:Date.now(), subject, q: parsed.title||'Conversation summary', a: parsed.summary, time: timeStr};
    noteData.unshift(note);
    saveNotes(noteData);
    renderNotes(document.querySelector('.filter-chip.active')?.textContent.replace('âœ•','').trim()||'all');
    addMsg('ai','âœ“ Saved a summary of our conversation to your notes.');
  }catch(e){
    // Don't break the chat flow over a note-saving failure
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DRAGGABLE POPUPS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function makeDraggable(popup, handle){
  let dragging=false, startX=0, startY=0, origLeft=0, origTop=0;

  function startDrag(cx, cy){
    const rect=popup.getBoundingClientRect();
    // Switch from bottom/right to top/left so we can freely reposition
    popup.style.bottom='auto'; popup.style.right='auto';
    popup.style.top=rect.top+'px'; popup.style.left=rect.left+'px';
    origLeft=rect.left; origTop=rect.top;
    startX=cx; startY=cy;
    dragging=true;
    document.body.style.userSelect='none';
  }

  function moveDrag(cx, cy){
    if(!dragging) return;
    const dx=cx-startX, dy=cy-startY;
    const maxL=window.innerWidth-popup.offsetWidth;
    const maxT=window.innerHeight-popup.offsetHeight;
    popup.style.left=Math.max(0,Math.min(maxL,origLeft+dx))+'px';
    popup.style.top=Math.max(0,Math.min(maxT,origTop+dy))+'px';
  }

  function endDrag(){ dragging=false; document.body.style.userSelect=''; }

  handle.addEventListener('mousedown',e=>{
    if(e.target.tagName==='BUTTON'||e.target.closest('button')) return;
    startDrag(e.clientX,e.clientY); e.preventDefault();
  });
  document.addEventListener('mousemove',e=>moveDrag(e.clientX,e.clientY));
  document.addEventListener('mouseup',endDrag);

  handle.addEventListener('touchstart',e=>{
    if(e.target.tagName==='BUTTON'||e.target.closest('button')) return;
    const t=e.touches[0]; startDrag(t.clientX,t.clientY); e.preventDefault();
  },{passive:false});
  document.addEventListener('touchmove',e=>{
    if(!dragging) return;
    const t=e.touches[0]; moveDrag(t.clientX,t.clientY); e.preventDefault();
  },{passive:false});
  document.addEventListener('touchend',endDrag);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NEURO STATUS DOT â€” hardware link simulator
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const NEURO_STATES = [
  {color:'#00e5ff', shadow:'#00e5ff', label:'RX'},
  {color:'#ffffff', shadow:'#aaaaff', label:'SYNC'},
  {color:'#c8a84b', shadow:'#c8a84b', label:'CAL'},
];
let neuroStateIdx = 0;
function cycleNeuroStatus(){
  neuroStateIdx = (neuroStateIdx + 1) % NEURO_STATES.length;
  const s = NEURO_STATES[neuroStateIdx];
  const dot = document.getElementById('neuro-status-dot');
  const lbl = document.getElementById('neuro-status-label');
  if(dot){ dot.style.background=s.color; dot.style.boxShadow=`0 0 8px ${s.shadow}`; }
  if(lbl) lbl.textContent=s.label;
}
// Cycle state every 4-8 seconds to simulate live headband packets
setInterval(cycleNeuroStatus, 5500 + Math.random()*3000);
// Brief "flash" on vitals update to show data coming in
function neuroFlash(){
  const dot = document.getElementById('neuro-status-dot');
  if(!dot) return;
  dot.style.transform='scale(1.8)'; dot.style.opacity='1';
  setTimeout(()=>{ dot.style.transform=''; dot.style.opacity=''; }, 180);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FOCUS SESSION TIMER â€” background-capable + persistent alarm
// Uses localStorage timestamps so timer survives tab switching
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let ftCustomLabel = 'Focus Session';
let ftTotalSecs   = 25 * 60;   // what the timer was set to
let ftSecsLeft    = 25 * 60;
let ftRunning     = false;
let ftInterval    = null;
let ftMinimized   = false;
let ftStartedAt   = null;      // epoch ms when timer last started
let ftSecsAtStart = 25 * 60;   // ftSecsLeft value when timer last started
let alarmInterval = null;
let alarmCtx      = null;

// Save / restore timer state across page reloads
function ftSaveState(){
  localStorage.setItem('nura-ft', JSON.stringify({
    customLabel: ftCustomLabel, totalSecs: ftTotalSecs,
    secsLeft: ftSecsLeft, running: ftRunning,
    startedAt: ftStartedAt, secsAtStart: ftSecsAtStart
  }));
}

function ftRestoreState(){
  try{
    const s = JSON.parse(localStorage.getItem('nura-ft')||'{}');
    if(!s.totalSecs) return;
    ftCustomLabel = s.customLabel || 'Focus Session';
    ftTotalSecs   = s.totalSecs;
    ftSecsAtStart = s.secsAtStart || s.secsLeft;
    if(s.running && s.startedAt){
      // Calculate elapsed while tab was away
      const elapsed = Math.floor((Date.now() - s.startedAt) / 1000);
      ftSecsLeft = Math.max(0, s.secsLeft - elapsed);
      ftStartedAt = s.startedAt;
      ftRunning = true;
    } else {
      ftSecsLeft = s.secsLeft || s.totalSecs;
      ftRunning = false;
    }
  } catch(e){}
}

function applyFocusPreset(minutes, label){
  if(ftRunning){ clearInterval(ftInterval); ftRunning=false; }
  ftCustomLabel = label;
  ftTotalSecs   = minutes * 60;
  ftSecsLeft    = minutes * 60;
  ftStartedAt   = null;
  document.getElementById('ft-play-btn').textContent = 'â–¶ Start';
  document.getElementById('ft-phase').textContent = label.toUpperCase();
  document.getElementById('ft-label').textContent  = label.toUpperCase();
  renderFtTime(); ftSaveState();
}

function applyCustomFocusTime(){
  const mEl = document.getElementById('ft-custom-min');
  const sEl = document.getElementById('ft-custom-sec');
  const mins = parseInt(mEl.value)||0;
  const secs = parseInt(sEl.value)||0;
  const total = mins*60 + secs;
  if(total <= 0) return;
  if(ftRunning){ clearInterval(ftInterval); ftRunning=false; }
  ftCustomLabel = `${mins}:${String(secs).padStart(2,'0')} Custom`;
  ftTotalSecs   = total;
  ftSecsLeft    = total;
  ftStartedAt   = null;
  document.getElementById('ft-play-btn').textContent = 'â–¶ Start';
  document.getElementById('ft-phase').textContent = 'CUSTOM';
  document.getElementById('ft-label').textContent  = 'CUSTOM TIMER';
  mEl.value=''; sEl.value='';
  renderFtTime(); ftSaveState();
}

function renderFtTime(){
  const m = String(Math.floor(ftSecsLeft/60)).padStart(2,'0');
  const s = String(ftSecsLeft%60).padStart(2,'0');
  document.getElementById('ft-time').textContent = m+':'+s;
  // Update topbar badge too
  const badge = document.getElementById('top-timer-val');
  if(badge && ftRunning) badge.textContent = m+':'+s;
}

function toggleFocusTimer(){
  ftRunning = !ftRunning;
  document.getElementById('ft-play-btn').textContent = ftRunning ? 'â¸ Pause' : 'â–¶ Resume';
  if(ftRunning){
    ftStartedAt   = Date.now();
    ftSecsAtStart = ftSecsLeft;
    ftInterval = setInterval(()=>{
      // Recompute from wall clock so background drift is corrected
      const elapsed = Math.floor((Date.now() - ftStartedAt) / 1000);
      ftSecsLeft = Math.max(0, ftSecsAtStart - elapsed);
      renderFtTime(); ftSaveState();
      if(ftSecsLeft <= 0){
        clearInterval(ftInterval); ftRunning = false;
        ftSaveState();
        triggerAlarm();
      }
    }, 500);
  } else {
    clearInterval(ftInterval);
    ftSaveState();
  }
}

function resetFocusTimer(){
  clearInterval(ftInterval); ftRunning=false;
  ftSecsLeft = ftTotalSecs; ftStartedAt=null;
  document.getElementById('ft-play-btn').textContent='â–¶ Start';
  renderFtTime(); ftSaveState();
}

function minimizeFocusTimer(){
  ftMinimized = !ftMinimized;
  const wrap = document.getElementById('focus-timer-wrap');
  wrap.classList.toggle('ft-minimized', ftMinimized);
  document.getElementById('ft-min-btn').textContent = ftMinimized ? 'â–¡' : 'â”€';
}

function openFocusTimer(){
  const wrap = document.getElementById('focus-timer-wrap');
  wrap.style.display = '';
  if(ftMinimized){ ftMinimized=false; wrap.classList.remove('ft-minimized'); document.getElementById('ft-min-btn').textContent='â”€'; }
}

function closeFocusTimer(){
  clearInterval(ftInterval); ftRunning=false;
  document.getElementById('focus-timer-wrap').style.display='none';
  ftSaveState();
}

// â”€â”€ Alarm: beeps every 2s for 30s or until stopped â”€â”€
function playBeep(ctx){
  const seq = [{f:880,t:0,d:.15},{f:1100,t:.18,d:.15},{f:880,t:.36,d:.3}];
  seq.forEach(({f,t,d})=>{
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value=f; o.type='sine';
    g.gain.setValueAtTime(0,ctx.currentTime+t);
    g.gain.linearRampToValueAtTime(.4,ctx.currentTime+t+.02);
    g.gain.linearRampToValueAtTime(0,ctx.currentTime+t+d);
    o.start(ctx.currentTime+t); o.stop(ctx.currentTime+t+d+.05);
  });
}

let alarmEndTime = 0;
function triggerAlarm(){
  const overlay = document.getElementById('ft-alarm-overlay');
  overlay.style.display = 'flex';
  document.getElementById('ft-alarm-title').textContent = 'TIME\'S UP!';
  document.getElementById('ft-alarm-msg').textContent = `"${ftCustomLabel}" timer has ended.`;
  alarmEndTime = Date.now() + 30000; // beep for 30s
  try{ alarmCtx = new (window.AudioContext||window.webkitAudioContext)(); } catch(e){}
  alarmInterval = setInterval(()=>{
    if(Date.now() >= alarmEndTime){ stopAlarm(); return; }
    try{ if(alarmCtx) playBeep(alarmCtx); } catch(e){}
  }, 2000);
  // First beep immediately
  try{ if(alarmCtx) playBeep(alarmCtx); } catch(e){}
}

function stopAlarm(){
  clearInterval(alarmInterval); alarmInterval=null;
  if(alarmCtx){ try{alarmCtx.close();}catch(e){} alarmCtx=null; }
  document.getElementById('ft-alarm-overlay').style.display='none';
}

// Make focus timer draggable
(function(){
  const wrap = document.getElementById('focus-timer-wrap');
  const handle = document.getElementById('ft-handle');
  let dragging=false, startX=0, startY=0, origLeft=0, origTop=0;
  function startDrag(cx,cy){
    const r = wrap.getBoundingClientRect();
    // Lock width explicitly so no reflow can change it during drag
    wrap.style.width = r.width+'px';
    wrap.style.transform='none'; wrap.style.bottom='auto'; wrap.style.left=r.left+'px'; wrap.style.top=r.top+'px';
    origLeft=r.left; origTop=r.top; startX=cx; startY=cy; dragging=true;
    document.body.style.userSelect='none';
  }
  function moveDrag(cx,cy){
    if(!dragging) return;
    const dx=cx-startX, dy=cy-startY;
    wrap.style.left=Math.max(0,Math.min(window.innerWidth-wrap.offsetWidth,origLeft+dx))+'px';
    wrap.style.top=Math.max(0,Math.min(window.innerHeight-wrap.offsetHeight,origTop+dy))+'px';
  }
  function endDrag(){ dragging=false; document.body.style.userSelect=''; }
  handle.addEventListener('mousedown',e=>{if(e.target.tagName==='BUTTON')return;startDrag(e.clientX,e.clientY);e.preventDefault();});
  document.addEventListener('mousemove',e=>moveDrag(e.clientX,e.clientY));
  document.addEventListener('mouseup',endDrag);
  handle.addEventListener('touchstart',e=>{if(e.target.tagName==='BUTTON')return;const t=e.touches[0];startDrag(t.clientX,t.clientY);e.preventDefault();},{passive:false});
  document.addEventListener('touchmove',e=>{if(!dragging)return;const t=e.touches[0];moveDrag(t.clientX,t.clientY);e.preventDefault();},{passive:false});
  document.addEventListener('touchend',endDrag);
})();



// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FILE SIDE PANEL
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let filePanelOpen = false;
let loadedFiles = []; // {name, size, type, text}

function toggleFileSidePanel(){
  filePanelOpen = !filePanelOpen;
  const panel = document.getElementById('file-side-panel');
  const btn = document.getElementById('fsp-toggle-btn');
  panel.classList.toggle('open', filePanelOpen);
  btn.classList.toggle('active', filePanelOpen);
}

function updateFilePanelUI(){
  // Force badge sync
  const _badge = document.getElementById('fsp-file-count');
  const _statusEl = document.getElementById('lecture-status');
  const n = (typeof loadedFiles !== 'undefined') ? loadedFiles.length : 0;
  if(_badge){ _badge.textContent=n; _badge.style.display=n>0?'inline-flex':'none'; }
  if(_statusEl) _statusEl.textContent = n>0 ? n+' file'+(n>1?'s':'')+' loaded' : 'No files loaded';
  const list = document.getElementById('fsp-files-list');
  const empty = document.getElementById('fsp-empty-state');
  const count = document.getElementById('fsp-file-count');
  const status = document.getElementById('lecture-status');
  if(loadedFiles.length === 0){
    if(empty) empty.style.display='';
    list.innerHTML = '';
    list.appendChild(empty);
    count.style.display='none';
    status.textContent='No files loaded';
  } else {
    if(empty) empty.style.display='none';
    count.textContent = loadedFiles.length;
    count.style.display='inline-flex';
    status.textContent=`âœ… ${loadedFiles.length} file(s) loaded`;
    list.innerHTML = loadedFiles.map((f,i)=>{
      const icon = f.name.endsWith('.pdf') ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>' : f.name.endsWith('.docx') ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>' : f.name.startsWith('[Pasted]') ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';
      const sizeStr = f.size > 1024*1024 ? (f.size/1024/1024).toFixed(1)+'MB' : Math.round(f.size/1024)+'KB';
      const preview = f.text ? f.text.substring(0,60).replace(/\n/g,' ')+'â€¦' : '';
      return `<div class="fsp-file-item">
        <span class="fsp-file-icon">${icon}</span>
        <div class="fsp-file-info">
          <div class="fsp-file-name" title="${f.name}">${f.name.length>28?f.name.substring(0,26)+'â€¦':f.name}</div>
          <div class="fsp-file-meta">${sizeStr} Â· ${f.type||'text'}</div>
        </div>
        <button class="fsp-file-del" onclick="removeLoadedFile(${i})" title="Remove">âœ•</button>
      </div>`;
    }).join('');
  }
  // Rebuild context
  parsedLecturesContext = loadedFiles.map(f=>`[FILE: ${f.name}]\n${f.text}`).join('\n\n');
}

function removeLoadedFile(idx){
  loadedFiles.splice(idx, 1);
  updateFilePanelUI();
}

async function handleFilePanelImport(inp){
  const files = inp.files; if(!files.length) return;
  for(let file of files){
    const status = document.getElementById('lecture-status');
    status.textContent = 'Processingâ€¦';
    let text = '';
    try{
      if(file.name.endsWith('.txt')) text = await file.text();
      else if(file.name.endsWith('.docx')){
        const ab = await file.arrayBuffer();
        const out = await mammoth.extractRawText({arrayBuffer:ab});
        text = out.value;
      } else if(file.name.endsWith('.pdf')){
        const ab = await file.arrayBuffer();
        pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const doc = await pdfjsLib.getDocument({data:ab}).promise;
        let pdf='';
        for(let i=1;i<=doc.numPages;i++){const pg=await doc.getPage(i);const c=await pg.getTextContent();pdf+=c.items.map(x=>x.str).join(' ')+'\n';}
        text = pdf;
      }
      loadedFiles.unshift({name:file.name, size:file.size, type:file.type||'document', text});
      // Keep max 10 files
      if(loadedFiles.length > 10) loadedFiles = loadedFiles.slice(0,10);
    } catch(err){ console.error(err); }
  }
  inp.value='';
  updateFilePanelUI();
}

async function handleFilePanelPaste() {
  try {
    const text = await navigator.clipboard.readText();
    if (!text.trim()) {
      showPaperModal('Clipboard is empty or contains no text.', false, null, null);
      return;
    }
    const name = `[Pasted] ${new Date().toLocaleTimeString()}`;
    loadedFiles.unshift({
      name,
      size: text.length,
      type: 'text',
      text
    });
    if (loadedFiles.length > 10) loadedFiles = loadedFiles.slice(0, 10);
    updateFilePanelUI();

    // Fallback prompt if clipboard API denied
    showPaperModal('Paste your text below:', true, '', (text) => {
      if (text && text.trim()) {
        const name = `[Pasted] ${new Date().toLocaleTimeString()}`;
        loadedFiles.unshift({
          name,
          size: text.length,
          type: 'text',
          text
        });
        updateFilePanelUI();
      }
    });
  } catch (err) {
    console.error("Paste failed:", err);
  }
}

// Drag-and-drop on file side panel dropzone
window.addEventListener('DOMContentLoaded', () => {
  const dz = document.getElementById('fsp-dropzone');
  if (!dz) return;
  dz.addEventListener('dragover', e => {
    e.preventDefault();
    dz.classList.add('drag-over');
  });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', e => {
    e.preventDefault();
    dz.classList.remove('drag-over');
    const dt = e.dataTransfer;
    if (dt.files.length) {
      // inject into our handler
      handleFilePanelImport({
        files: dt.files,
        value: ''
      });
    } else if (dt.getData('text')) {
      const text = dt.getData('text');
      const name = `[Dropped text] ${new Date().toLocaleTimeString()}`;
      loadedFiles.unshift({
        name,
        size: text.length,
        type: 'text',
        text
      });
      updateFilePanelUI();
    }
  });
});

// â”€â”€â”€ keep old processLectureFiles wired so nothing breaks â”€â”€â”€
async function processLectureFiles(inp) {
  await handleFilePanelImport(inp);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NURA WATCH â€” AI State Monitor (rewritten)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const NuraWatch = (() => {
  let snoozedUntil = 0;
  let lastAlertTime = 0;
  let smallPopupVisible = false;
  let alertOverlayVisible = false;
  let alertBodyMinimized = false;
  let dashboardUpdateTimer = null;
  const ALERT_COOLDOWN = 3 * 60 * 1000;
  const SNOOZE_DURATION = 5 * 60 * 1000;

  // â”€â”€ Prompts â”€â”€
  function buildPrompt(f, s, isAlert) {
    const severity = s > 60 && f < 55 ? 'CRISIS â€” both stress critically high AND focus critically low' :
                     s > 60 ? `HIGH STRESS (${s}%)` : `LOW FOCUS (${f}%)`;
    return `You are Nura Watch, an AI wellness monitor embedded in a study app. You're analyzing real-time EEG biometric data.

Current vitals:
- Focus: ${f}%
- Stress: ${s}%
${isAlert ? `\nâš  ${severity} â€” this is an alert state. Be warm and urgent.` : `\nMONITOR MODE â€” provide a calm, insightful observation.`}

Write a SHORT, warm message (2 sentences max):
1. Name what's happening in their brain right now (be specific and neuroscience-y)
2. Give ONE actionable micro-intervention they can do in the next 60 seconds

Then on a new line:
TIPS: [{"icon":"emoji","text":"short action"}] â€” exactly 3 tips as JSON array

No bullet points. Be caring, not clinical.`;
  }

  function buildDashboardPrompt(f, s) {
    return `You are Nura Watch. In ONE sentence (max 15 words), give a sharp, insightful observation about this student's current brain state:
Focus: ${f}% | Stress: ${s}%

Make it feel like a brilliant neuroscientist is watching. Examples:
- "Sharp alpha waves detected â€” you're locked in, protect this window."
- "Cortisol elevation noted; a 90-second walk resets the HPA axis."
- "Pre-burnout theta pattern â€” your hippocampus needs a recovery break now."

Write ONLY the sentence, nothing else.`;
  }

  async function callClaude(prompt) {
    // Anthropic API blocks browser CORS â€” use Groq (same key stored in profile) instead
    let apiKey = '';
    try { apiKey = (JSON.parse(localStorage.getItem('nura-user-profile')||'{}')).groqKey||''; } catch(e){}
    if(!apiKey) throw new Error('No API key');
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+apiKey},
      body: JSON.stringify({model:'llama3-8b-8192', max_tokens:400, messages:[{role:'user',content:prompt}]})
    });
    const d = await r.json();
    return d.choices?.[0]?.message?.content||'';
  }

  function parseReply(reply) {
    const split = reply.split('TIPS:');
    const message = split[0].trim();
    let tips = [];
    if (split[1]) { try { tips = JSON.parse(split[1].trim()); } catch(e){} }
    return { message, tips };
  }

  function fallbackContent(f, s) {
    return {
      message: s > 60 ? `Your stress is spiking at ${s}% â€” that's a cortisol surge. Try 4 slow breaths right now: inhale 4 counts, hold 4, exhale 6.`
                      : `Focus has slipped to ${f}% â€” your default mode network is taking over. Look 20 feet away for 20 seconds to reset.`,
      tips: [
        {icon:'ðŸ«', text:'4-7-8 breathing cycle (60 sec)'},
        {icon:'ðŸ’§', text:'Drink water, stand up briefly'},
        {icon:'ðŸ‘ï¸', text:'20-20-20 eye reset rule'}
      ]
    };
  }

  // â”€â”€ Dashboard comment (small watch window) â”€â”€
  async function updateDashboardComment(f, s) {
    const el = document.getElementById('nwdc-text');
    if (!el) return;
    el.classList.add('fading');
    await new Promise(r=>setTimeout(r,400));
    try {
      const reply = await callClaude(buildDashboardPrompt(f, s));
      el.textContent = '"' + reply.trim().replace(/^["']|["']$/g,'') + '"';
    } catch(e) {
      el.textContent = `Focus ${f}% Â· Stress ${s}% â€” Nura Watch monitoring.`;
    }
    el.classList.remove('fading');
  }

  // â”€â”€ Small popup (manual open via Watch pill) â”€â”€
  function openSmallPopup() {
    const f = Math.round(focusPct), s = Math.round(stressPct);
    const popup = document.getElementById('nw-popup');
    document.getElementById('nw-focus-val').textContent = f+'%';
    document.getElementById('nw-stress-val').textContent = s+'%';
    document.getElementById('nw-popup-body').innerHTML = '<div class="nw-loading"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
    document.getElementById('nw-popup-tips').innerHTML = '';
    popup.classList.add('show');
    smallPopupVisible = true;
    document.getElementById('nw-alert-badge').style.display = 'none';

    callClaude(buildSmallPopupContent(f, s)).then(reply => {
      if(s >= 60){
        const {message, tips} = parseReply(reply);
        document.getElementById('nw-popup-body').textContent = message;
        if (tips.length) document.getElementById('nw-popup-tips').innerHTML =
          tips.map(t=>`<div class="nw-tip"><span class="nw-tip-icon">${t.icon}</span>${t.text}</div>`).join('');
      } else {
        // No exercises below 60% stress
        document.getElementById('nw-popup-body').textContent = reply.replace(/^"|"$/g,'').trim();
        document.getElementById('nw-popup-tips').innerHTML = '';
      }
    }).catch(() => {
      const {message, tips} = fallbackContent(f, s);
      document.getElementById('nw-popup-body').textContent = message;
      if(s >= 60){
        document.getElementById('nw-popup-tips').innerHTML =
          tips.map(t=>`<div class="nw-tip"><span class="nw-tip-icon">${t.icon}</span>${t.text}</div>`).join('');
      } else {
        document.getElementById('nw-popup-tips').innerHTML = '';
      }
    });
  }

  function closeSmallPopup(e) {
    if (e) e.stopPropagation();
    document.getElementById('nw-popup').classList.remove('show');
    smallPopupVisible = false;
  }

  // â”€â”€ Big alert overlay (auto on high stress) â”€â”€
  async function triggerBigAlert(f, s) {
    if (Date.now() < snoozedUntil) return;
    if (alertOverlayVisible) return;
    if (Date.now() - lastAlertTime < ALERT_COOLDOWN) return;
    lastAlertTime = Date.now();
    alertBodyMinimized = false;

    document.getElementById('nwa-focus-val').textContent = f+'%';
    document.getElementById('nwa-stress-val').textContent = s+'%';
    document.getElementById('nw-alert-msg').innerHTML = '<div class="nw-loading"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
    document.getElementById('nw-alert-tips').innerHTML = '';
    document.getElementById('nw-alert-body').className = 'nw-alert-body expanded';
    document.getElementById('nw-alert-min-btn').textContent = 'â”€';
    document.getElementById('nw-alert-overlay').classList.add('show');
    alertOverlayVisible = true;

    // Show badge too
    document.getElementById('nw-alert-badge').style.display = 'block';

    try {
      const reply = await callClaude(buildPrompt(f, s, true));
      const {message, tips} = parseReply(reply);
      document.getElementById('nw-alert-msg').textContent = message;
      document.getElementById('nw-alert-tips').innerHTML =
        tips.map(t=>`<div class="nw-alert-tip"><span class="nw-alert-tip-icon">${t.icon}</span>${t.text}</div>`).join('');
    } catch(e) {
      const {message, tips} = fallbackContent(f, s);
      document.getElementById('nw-alert-msg').textContent = message;
      document.getElementById('nw-alert-tips').innerHTML =
        tips.map(t=>`<div class="nw-alert-tip"><span class="nw-alert-tip-icon">${t.icon}</span>${t.text}</div>`).join('');
    }
  }

  function dismissBigAlert() {
    document.getElementById('nw-alert-overlay').classList.remove('show');
    document.getElementById('nw-alert-badge').style.display = 'none';
    alertOverlayVisible = false; alertBodyMinimized = false;
  }

  function minimizeBigAlert() {
    alertBodyMinimized = !alertBodyMinimized;
    document.getElementById('nw-alert-body').className = 'nw-alert-body ' + (alertBodyMinimized ? 'collapsed' : 'expanded');
    document.getElementById('nw-alert-min-btn').textContent = alertBodyMinimized ? 'â–¡' : 'â”€';
  }

  function snoozeBigAlert(mins) {
    const ms = mins ? (mins * 60 * 1000) : SNOOZE_DURATION;
    snoozedUntil = Date.now() + ms;
    dismissBigAlert();
  }

  // â”€â”€ Toggle small popup from pill â”€â”€
  function togglePanel() {
    if (smallPopupVisible) closeSmallPopup();
    else openSmallPopup();
  }

  // â”€â”€ Vitals check loop â”€â”€
  function check(f, s) {
    if (s > 60) { triggerBigAlert(f, s); }
  }

  // Only show exercises/tips when stress >= 60%
  function buildSmallPopupContent(f, s) {
    if(s >= 60){
      return callClaude(buildPrompt(f, s, false));
    } else {
      // No exercises shown below 60% stress â€” just an observation
      return callClaude(`You are Nura Watch. In 1-2 sentences, give a calm neuroscience observation about this state:
Focus: ${f}% | Stress: ${s}%
No tips, no exercises â€” just insight. Example: "Your prefrontal cortex is engaged and stress hormones are at baseline â€” an ideal state for deep encoding."
Write ONLY the sentences.`);
    }
  }

  let tickCount = 0;
  function onVitalsUpdate(f, s) {
    tickCount++;
    if (tickCount === 1 || tickCount % 8 === 0) {
      clearTimeout(dashboardUpdateTimer);
      dashboardUpdateTimer = setTimeout(() => updateDashboardComment(f, s), 500);
    }
    check(f, s);
  }

  // â”€â”€ Stress coming down notification â”€â”€
  function triggerComingDownNotif(f, s) {
    const existing = document.getElementById('nw-coming-down-notif');
    if(existing) existing.remove();
    const notif = document.createElement('div');
    notif.id = 'nw-coming-down-notif';
    notif.style.cssText = `position:fixed;bottom:20px;right:20px;z-index:8000;background:var(--bg2);border:1px solid rgba(80,200,120,0.4);border-radius:14px;padding:14px 18px;max-width:280px;box-shadow:0 8px 30px rgba(0,0,0,0.5);animation:fadeIn .3s ease`;
    notif.innerHTML = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:16px">ðŸ“‰</span><span style="font-family:'Bebas Neue',sans-serif;font-size:14px;letter-spacing:2px;color:#80e8a0">STRESS EASING</span><button onclick="this.closest('#nw-coming-down-notif').remove()" style="margin-left:auto;background:none;border:none;color:var(--text3);cursor:pointer;font-size:12px">âœ•</button></div><div style="font-size:12px;color:var(--text2);line-height:1.5">Stress dropped to ${s}% â†“ â€” your cortisol is settling. Exercises hidden, maintain your calm.</div>`;
    document.body.appendChild(notif);
    setTimeout(()=>{ if(notif.parentNode) notif.remove(); }, 8000);
  }

  return { onVitalsUpdate, closeSmallPopup, snoozeBigAlert, dismissBigAlert, minimizeBigAlert, togglePanel, triggerComingDownNotif, buildSmallPopupContent };
})();

// Wire stress-coming-down alert from vitals engine
function triggerStressComingDownAlert(f, s){
  NuraWatch.triggerComingDownNotif(f, s);
}

// Global helpers
function dismissNuraWatch(e) { NuraWatch.closeSmallPopup(e); }
function snoozeNuraWatch(e)  { if(e) e.stopPropagation(); NuraWatch.closeSmallPopup(); }
// V10.3: the pill no longer opens a separate floating popup â€” it jumps to the
// merged Nura Watch tab (formerly Stats), which now also shows the live AI
// state commentary that used to live only in that popup.
function openNuraWatchTab(){
  const btn = document.querySelector('.nav-btn[onclick*="stats-panel"]');
  if(btn) nav('stats-panel', btn);
  refreshWatchTabState();
}
function toggleNuraWatchPanel() { openNuraWatchTab(); } // legacy alias, kept in case anything else still calls it
function dismissNuraAlert()  { NuraWatch.dismissBigAlert(); }
function minimizeNuraAlert() { NuraWatch.minimizeBigAlert(); }
function snoozeNuraAlert(mins){ NuraWatch.snoozeBigAlert(mins); }

// Click-outside closes small popup
document.addEventListener('click', e => {
  const popup = document.getElementById('nw-popup');
  const pill  = document.querySelector('.nura-watch-pill');
  if (!popup || !popup.classList.contains('show')) return;
  if (popup.contains(e.target) || (pill && pill.contains(e.target))) return;
  NuraWatch.closeSmallPopup();
});

// Make Nura Watch small popup draggable
(function(){
  const popup  = document.getElementById('nw-popup');
  const handle = document.getElementById('nw-popup-header');
  if (!popup || !handle) return;
  let dragging=false,startX=0,startY=0,origLeft=0,origTop=0;
  function startDrag(cx,cy){
    const r=popup.getBoundingClientRect();
    popup.style.animation='none'; popup.style.top=r.top+'px'; popup.style.left=r.left+'px';
    popup.style.right='auto'; popup.style.bottom='auto';
    origLeft=r.left; origTop=r.top; startX=cx; startY=cy; dragging=true;
    document.body.style.userSelect='none';
  }
  function moveDrag(cx,cy){
    if(!dragging) return;
    popup.style.left=Math.max(0,Math.min(window.innerWidth-popup.offsetWidth,origLeft+(cx-startX)))+'px';
    popup.style.top=Math.max(0,Math.min(window.innerHeight-popup.offsetHeight,origTop+(cy-startY)))+'px';
  }
  function endDrag(){ dragging=false; document.body.style.userSelect=''; }
  handle.addEventListener('mousedown',e=>{if(e.target.tagName==='BUTTON')return;startDrag(e.clientX,e.clientY);e.preventDefault();});
  document.addEventListener('mousemove',e=>moveDrag(e.clientX,e.clientY));
  document.addEventListener('mouseup',endDrag);
})();

// Make Nura Alert card draggable (by header)
(function(){
  const card   = document.getElementById('nw-alert-card');
  const handle = document.getElementById('nw-alert-header');
  const overlay= document.getElementById('nw-alert-overlay');
  if (!card || !handle) return;
  let dragging=false,startX=0,startY=0,origLeft=0,origTop=0;
  function startDrag(cx,cy){
    const r=card.getBoundingClientRect();
    card.style.position='fixed'; card.style.top=r.top+'px'; card.style.left=r.left+'px';
    card.style.margin='0'; card.style.transform='none';
    overlay.style.alignItems='flex-start'; overlay.style.justifyContent='flex-start';
    origLeft=r.left; origTop=r.top; startX=cx; startY=cy; dragging=true;
    document.body.style.userSelect='none';
  }
  function moveDrag(cx,cy){
    if(!dragging) return;
    card.style.left=Math.max(0,Math.min(window.innerWidth-card.offsetWidth,origLeft+(cx-startX)))+'px';
    card.style.top=Math.max(0,Math.min(window.innerHeight-card.offsetHeight,origTop+(cy-startY)))+'px';
  }
  function endDrag(){ dragging=false; document.body.style.userSelect=''; }
  handle.addEventListener('mousedown',e=>{if(e.target.tagName==='BUTTON')return;startDrag(e.clientX,e.clientY);e.preventDefault();});
  document.addEventListener('mousemove',e=>moveDrag(e.clientX,e.clientY));
  document.addEventListener('mouseup',endDrag);
})();

async function initApp(){
  ftRestoreState();
  renderFtTime();
  if(ftRunning) toggleFocusTimer(); // re-engage the interval
  renderSubjectFilters();
  renderNotes('all');
  buildWeek();
  startClock();
  updateVitals();
  loadLinkHub();
  await loadSavedAudio();
}

// When returning to the tab, resync the timer from wall clock
document.addEventListener('visibilitychange', ()=>{
  if(!document.hidden && ftRunning && ftStartedAt){
    clearInterval(ftInterval);
    const elapsed = Math.floor((Date.now() - ftStartedAt) / 1000);
    ftSecsLeft = Math.max(0, ftSecsAtStart - elapsed);
    if(ftSecsLeft <= 0){
      ftRunning = false; ftSaveState(); triggerAlarm();
    } else {
      // Restart interval from current position
      ftStartedAt   = Date.now();
      ftSecsAtStart = ftSecsLeft;
      ftInterval = setInterval(()=>{
        const el = Math.floor((Date.now() - ftStartedAt) / 1000);
        ftSecsLeft = Math.max(0, ftSecsAtStart - el);
        renderFtTime(); ftSaveState();
        if(ftSecsLeft <= 0){ clearInterval(ftInterval); ftRunning=false; ftSaveState(); triggerAlarm(); }
      }, 500);
    }
    renderFtTime();
  }
});

// Boot
window.addEventListener('DOMContentLoaded',()=>{
  applyStoredTheme();
  renderUserProfile();
  checkAuth();
  initApp();
  makeDraggable(document.getElementById('source-popup'),  document.querySelector('#source-popup .sp-header'));
  makeDraggable(document.getElementById('linkPopup'),     document.querySelector('#linkPopup .popup-header'));
  init3DCube();
  initAiBlobCanvas();
  renderMusicFolders();
  renderMusicTracklist();
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 3D CUBE â€” Stats Section, Canvas Based, XYZ draggable
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function init3DCube(){
  const canvas = document.getElementById('cube-3d-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2;
  let rotX = 0.5, rotY = 0.8, rotZ = 0;
  let dragging = false, lastMX = 0, lastMY = 0;
  let autoRotating = true;
  let cubeColor = [0,229,255];
  let glowPhase = 0;

  function project(v){
    const fov = 280;
    const z = fov + v[2];
    return [CX + v[0] * fov / z, CY + v[1] * fov / z];
  }

  function rotateVec(v, rx, ry, rz){
    let [x,y,z] = v;
    // X rotation
    let ny = y*Math.cos(rx)-z*Math.sin(rx); let nz = y*Math.sin(rx)+z*Math.cos(rx);
    y=ny; z=nz;
    // Y rotation
    let nx = x*Math.cos(ry)+z*Math.sin(ry); nz = -x*Math.sin(ry)+z*Math.cos(ry);
    x=nx; z=nz;
    // Z rotation
    nx = x*Math.cos(rz)-y*Math.sin(rz); ny = x*Math.sin(rz)+y*Math.cos(rz);
    return [nx,ny,z];
  }

  const S = 36;
  const BASE_VERTS = [
    [-S,-S,-S],[ S,-S,-S],[ S, S,-S],[-S, S,-S],
    [-S,-S, S],[ S,-S, S],[ S, S, S],[-S, S, S]
  ];
  const FACES = [
    [0,1,2,3,0.7], [4,5,6,7,0.9], [0,1,5,4,0.5],
    [2,3,7,6,0.6], [0,3,7,4,0.4], [1,2,6,5,0.55]
  ];

  function drawCube(){
    ctx.clearRect(0,0,W,H);
    glowPhase += 0.04;
    const [r,g,b] = cubeColor;
    const verts = BASE_VERTS.map(v=>rotateVec(v,rotX,rotY,rotZ));
    const projected = verts.map(project);

    // Draw glow
    const gA = 0.12 + 0.06*Math.sin(glowPhase);
    const grad = ctx.createRadialGradient(CX,CY,0,CX,CY,55);
    grad.addColorStop(0,`rgba(${r},${g},${b},${gA})`);
    grad.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);

    // Sort faces by avg Z (painters algorithm)
    const sorted = FACES.map(([a,b2,c,d,bright])=>{
      const avgZ = (verts[a][2]+verts[b2][2]+verts[c][2]+verts[d][2])/4;
      return {a,b:b2,c,d,bright,avgZ};
    }).sort((x,y)=>x.avgZ-y.avgZ);

    for(const f of sorted){
      const pts = [projected[f.a],projected[f.b],projected[f.c],projected[f.d]];
      ctx.beginPath();
      ctx.moveTo(pts[0][0],pts[0][1]);
      pts.forEach(p=>ctx.lineTo(p[0],p[1]));
      ctx.closePath();
      const alpha = 0.18 + f.bright*0.22;
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${r},${g},${b},${0.4+f.bright*0.4})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Glass highlight
      ctx.beginPath();
      ctx.moveTo(pts[0][0],pts[0][1]);
      ctx.lineTo(pts[1][0],pts[1][1]);
      ctx.strokeStyle = `rgba(255,255,255,${0.08+f.bright*0.1})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    // Axis labels
    const axes = [[S*1.35,0,0,'X','#ff8080'],[0,S*1.35,0,'Y','#80ff80'],[0,0,S*1.35,'Z','#8080ff']];
    axes.forEach(([ax,ay,az,lbl,col])=>{
      const tv = rotateVec([ax,ay,az],rotX,rotY,rotZ);
      const tp = project(tv);
      ctx.fillStyle=col; ctx.font='bold 9px Outfit,sans-serif';
      ctx.fillText(lbl,tp[0]-3,tp[1]+3);
    });
  }

  function updateCubeColor(){
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    if(accent){
      const parts = accent.split(',').map(Number);
      if(parts.length===3) cubeColor = parts;
    }
  }

  canvas.addEventListener('mousedown',e=>{
    dragging=true; autoRotating=false;
    lastMX=e.clientX; lastMY=e.clientY;
    canvas.style.cursor='grabbing';
  });
  document.addEventListener('mousemove',e=>{
    if(!dragging) return;
    const dx=e.clientX-lastMX, dy=e.clientY-lastMY;
    rotY += dx*0.012; rotX += dy*0.012;
    lastMX=e.clientX; lastMY=e.clientY;
  });
  document.addEventListener('mouseup',()=>{
    if(dragging){ dragging=false; canvas.style.cursor='grab'; setTimeout(()=>autoRotating=true,2000); }
  });
  canvas.addEventListener('touchstart',e=>{
    dragging=true; autoRotating=false;
    const t=e.touches[0]; lastMX=t.clientX; lastMY=t.clientY; e.preventDefault();
  },{passive:false});
  canvas.addEventListener('touchmove',e=>{
    if(!dragging) return;
    const t=e.touches[0];
    rotY += (t.clientX-lastMX)*0.012; rotX += (t.clientY-lastMY)*0.012;
    lastMX=t.clientX; lastMY=t.clientY; e.preventDefault();
  },{passive:false});
  canvas.addEventListener('touchend',()=>{dragging=false; setTimeout(()=>autoRotating=true,2000);});

  // Update applyColorMode to also change cube color
  const _origApplyColorMode = applyColorMode;
  window.applyColorMode = function(mode){
    _origApplyColorMode(mode);
    updateCubeColor();
  };

  updateCubeColor();
  (function loop(){
    if(autoRotating){ rotY += 0.008; rotZ += 0.002; }
    updateCubeColor();
    drawCube();
    requestAnimationFrame(loop);
  })();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// AI BLOB â€” removed floating button, initAiBlobCanvas is a no-op
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function initAiBlobCanvas(){ /* floating blob button removed */ }
let aiPanelOpen=false;
function toggleAiPanel(){ /* no-op without blob button */ }

function sendAiBlobMsg(){
  const input=document.getElementById('ai-blob-input');
  const chatBox=document.getElementById('ai-blob-chat-box');
  const text=input.value.trim();
  if(!text) return;
  if(!getApiKey()){ addAiBlobMsg('ai','<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> No API key set â€” open Profile and paste your Groq key.'); return; }

  // Clear welcome if first message
  if(chatBox.children.length===1 && chatBox.firstElementChild.style.textAlign==='center') chatBox.innerHTML='';
  addAiBlobMsg('user',text);
  input.value='';
  playUiSound('tick');

  const typing=document.createElement('div');
  typing.className='msg ai'; typing.id='ai-blob-typing';
  typing.innerHTML=`<div class="msg-sender" style="font-size:10px;color:var(--text3);margin-bottom:4px">Nura Mind</div><div class="msg-bubble" style="max-width:90%"><div class="typing-indicator"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>`;
  chatBox.appendChild(typing);
  chatBox.scrollTop=chatBox.scrollHeight;

  const p=JSON.parse(localStorage.getItem('nura-user-profile')||'{}');
  fetch('https://api.groq.com/openai/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+getApiKey()},
    body:JSON.stringify({
      model:'llama-3.3-70b-versatile',max_tokens:600,
      messages:[
        {role:'system',content:`You are Nura Mind, a brief Socratic AI guide. NEVER write essays or solve math directly. Use a short analogous example to point the way. Max 3 paragraphs. Respond in the user's language.`},
        {role:'user',content:text}
      ]
    })
  }).then(r=>r.json()).then(data=>{
    const t2=document.getElementById('ai-blob-typing');
    if(t2) t2.remove();
    const reply=data.choices?.[0]?.message?.content||'Try rephrasing your question.';
    addAiBlobMsg('ai',reply);
    playUiSound('confirm');
  }).catch(e=>{
    const t2=document.getElementById('ai-blob-typing');
    if(t2) t2.remove();
    addAiBlobMsg('ai','Error: '+e.message);
  });
}

function addAiBlobMsg(role,text){
  const chatBox=document.getElementById('ai-blob-chat-box');
  const div=document.createElement('div');
  div.className='msg '+role;
  div.style.cssText='display:flex;flex-direction:column;gap:2px;'+(role==='user'?'align-items:flex-end':'align-items:flex-start');
  div.innerHTML=`<div style="font-size:10px;color:var(--text3);margin-bottom:3px">${role==='user'?'You':'Nura Mind'}</div><div class="msg-bubble" style="max-width:90%;font-size:12px;line-height:1.6">${text}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop=chatBox.scrollHeight;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// QUIZ ENGINE â€” AI powered, one-at-a-time
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let quizData=[], quizIdx=0, quizScore=0, quizAnswered=false;

async function generateQuiz(){
  const topic = document.getElementById('quiz-topic-input').value.trim();
  /* V9 Final: read from number input, validate â‰¤20 */
  const countEl = document.getElementById('quiz-count-input') || document.getElementById('quiz-count-select');
  const count = parseInt(countEl ? countEl.value : '10', 10) || 10;
  if(!topic){ playUiSound('tick'); document.getElementById('quiz-topic-input').focus(); return; }
  if(count > 20){ v9_showQuizCountErr(count); return; }
  if(!getApiKey()){ v9_showQuizCountErr(0,'Set your Groq API key in Profile first.'); return; }

  document.getElementById('quiz-area').style.display='none';
  document.getElementById('quiz-results-area').style.display='none';
  document.getElementById('quiz-loading').style.display='block';
  playUiSound('open');

  const systemPrompt=`You are a quiz generator. Generate exactly ${count} multiple-choice quiz questions about: ${topic}.

Return ONLY valid JSON array, no other text, no markdown:
[
  {
    "q": "Question text here?",
    "opts": ["Option A","Option B","Option C","Option D"],
    "ans": 0,
    "exp": "Brief explanation of the correct answer."
  }
]

The "ans" field is the index (0-3) of the correct option in "opts".
Make questions educational, varied in difficulty, and accurate.`;

  try{
    const res=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+getApiKey()},
      body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:2000,messages:[{role:'user',content:systemPrompt}]})
    });
    const data=await res.json();
    if(data.error) throw new Error(data.error.message);
    let raw=data.choices[0].message.content.trim();
    raw=raw.replace(/```json|```/g,'').trim();
    quizData=JSON.parse(raw);
    quizIdx=0; quizScore=0; quizAnswered=false;
    document.getElementById('quiz-loading').style.display='none';
    document.getElementById('quiz-area').style.display='block';
    document.getElementById('quiz-q-total').textContent=quizData.length;
    showQuizQuestion();
    playUiSound('confirm');
  }catch(e){
    document.getElementById('quiz-loading').style.display='none';
    document.getElementById('quiz-area').style.display='block';
    document.getElementById('quiz-question-text').textContent='Error generating quiz: '+e.message;
    document.getElementById('quiz-options').innerHTML='';
  }
}

function showQuizQuestion(){
  if(quizIdx>=quizData.length){ showQuizResults(); return; }
  const q=quizData[quizIdx];
  quizAnswered=false;
  document.getElementById('quiz-q-num').textContent=quizIdx+1;
  document.getElementById('quiz-score-display').textContent=quizScore+' / '+quizIdx;
  document.getElementById('quiz-progress-bar').style.width=(((quizIdx+1)/quizData.length)*100)+'%';
  document.getElementById('quiz-question-text').textContent=q.q;
  document.getElementById('quiz-feedback').style.display='none';
  document.getElementById('quiz-next-btn').style.display='none';
  const opts=document.getElementById('quiz-options');
  opts.innerHTML=q.opts.map((opt,i)=>`
    <button onclick="answerQuiz(${i})" style="width:100%;text-align:left;padding:12px 16px;border-radius:10px;border:1px solid var(--glass-border-soft);background:var(--glass-bg);color:var(--text);font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;transition:all .2s;display:flex;gap:10px;align-items:center;height:22px;border-radius:50%;border:1.5px solid var(--text3);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;flex-shrink:0">${['A','B','C','D'][i]}</span>
      ${opt}
    </button>`).join('');
}

function answerQuiz(chosen){
  if(quizAnswered) return;
  quizAnswered=true;
  const q=quizData[quizIdx];
  const correct=chosen===q.ans;
  if(correct) quizScore++;
  const opts=document.querySelectorAll('#quiz-options button');
  opts.forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.ans){ btn.style.background='rgba(16,185,129,0.15)'; btn.style.borderColor='#10b981'; btn.style.color='#10b981'; }
    else if(i===chosen&&!correct){ btn.style.background='rgba(239,68,68,0.15)'; btn.style.borderColor='#ef4444'; btn.style.color='#ef4444'; }
    else btn.style.opacity='0.4';
  });
  const fb=document.getElementById('quiz-feedback');
  fb.style.display='block';
  fb.style.background=correct?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.1)';
  fb.style.border='1px solid '+(correct?'#10b981':'#ef4444');
  fb.style.color=correct?'#10b981':'#ef4444';
  fb.innerHTML=(correct?'âœ“ Correct! ':'âœ— Incorrect â€” ')+q.exp;
  document.getElementById('quiz-next-btn').style.display='flex';
  document.getElementById('quiz-score-display').textContent=quizScore+' / '+(quizIdx+1);
  playUiSound(correct?'confirm':'close');
}

function nextQuizQuestion(){
  quizIdx++;
  if(quizIdx>=quizData.length){ showQuizResults(); }
  else { showQuizQuestion(); playUiSound('tick'); }
}

function showQuizResults(){
  document.getElementById('quiz-area').style.display='none';
  document.getElementById('quiz-results-area').style.display='block';
  const pct=Math.round((quizScore/quizData.length)*100);
  document.getElementById('quiz-final-score').textContent=quizScore+' / '+quizData.length;
  let msg='';
  if(pct>=90) msg='Outstanding! You nailed it! ðŸ”¥';
  else if(pct>=70) msg='Great job! Solid understanding.';
  else if(pct>=50) msg='Not bad â€” keep reviewing!';
  else msg='Keep studying â€” you\'ll get there!';
  document.getElementById('quiz-final-msg').textContent=msg+' ('+pct+'%)';
  const review=document.getElementById('quiz-review-list');
  review.innerHTML=quizData.map((q,i)=>{
    const passed=false; // we don't track per-q for simplicity
    return `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px 14px">
      <div style="font-size:11px;font-weight:600;margin-bottom:4px;color:var(--text)">${i+1}. ${q.q}</div>
      <div style="font-size:11px;color:var(--text2)">Answer: <span style="color:#10b981">${q.opts[q.ans]}</span></div>
    </div>`;
  }).join('');
  playUiSound('confirm');
}

function resetQuiz(){
  document.getElementById('quiz-results-area').style.display='none';
  document.getElementById('quiz-area').style.display='none';
  document.getElementById('quiz-topic-input').value='';
  document.getElementById('quiz-topic-input').focus();
  quizData=[]; quizIdx=0; quizScore=0;
  playUiSound('switch');
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// AUDIO PLAYER â€” Spotify-like with folders + file import
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
let musicLibrary=[]; // [{id,name,folder,url,blob}]
let musicFolders=[]; // [{id,name}]
let activeFolderId='all';
let currentTrackIdx=-1;
let musicPlaying=false;
window.musicPlaying=false; // exposed globally so other modules can read playback state
let musicShuffle=false;
let musicRepeat=0; // 0=none,1=all,2=one
let musicAudio=new Audio();
let musicVolume=0.7;
musicAudio.volume=musicVolume;

function loadMusicData(){
  try{ musicLibrary=JSON.parse(localStorage.getItem('nura-music-lib')||'[]'); }catch(e){ musicLibrary=[]; }
  try{ musicFolders=JSON.parse(localStorage.getItem('nura-music-folders')||'[]'); }catch(e){ musicFolders=[]; }
  if(musicFolders.length===0){
    musicFolders=[{id:'1',name:'My Beats'},{id:'2',name:'Study Vibes'},{id:'3',name:'Chill Out'}];
    saveMusicData();
  }
  // Always ensure Colourful Noise folder exists
  if(!musicFolders.find(f=>f.id==='_noise')){
    musicFolders.unshift({id:'_noise',name:'Colourful Noise',builtin:true});
    saveMusicData();
  }
  // Inject built-in noise tracks into library if not present
  const noiseBuiltins = [
    {id:'_white',name:'White Noise',folder:'_noise',builtin:true,noisetype:'white'},
    {id:'_pink', name:'Pink Noise', folder:'_noise',builtin:true,noisetype:'pink'},
    {id:'_brown',name:'Brown Noise',folder:'_noise',builtin:true,noisetype:'brown'}
  ];
  noiseBuiltins.forEach(n=>{ if(!musicLibrary.find(t=>t.id===n.id)) musicLibrary.unshift(n); });
}

function saveMusicData(){
  // Save metadata only to localStorage
  const meta=musicLibrary.map(t=>({id:t.id,name:t.name,folder:t.folder,coverDataUrl:t.coverDataUrl||null}));
  localStorage.setItem('nura-music-lib',JSON.stringify(meta));
  localStorage.setItem('nura-music-folders',JSON.stringify(musicFolders));
  // Also save blobs to IndexedDB for persistence across reloads
  saveMusicBlobsToIDB();
}

function openMusicIDB(){
  return new Promise((res,rej)=>{
    const req=indexedDB.open('NuraMusicDB',1);
    req.onupgradeneeded=e=>{ e.target.result.createObjectStore('blobs',{keyPath:'id'}); };
    req.onsuccess=e=>res(e.target.result);
    req.onerror=e=>rej(e);
  });
}

async function saveMusicBlobsToIDB(){
  try{
    const db=await openMusicIDB();
    const tx=db.transaction('blobs','readwrite');
    const store=tx.objectStore('blobs');
    musicLibrary.forEach(t=>{ if(t.blob) store.put({id:t.id,blob:t.blob}); });
  }catch(e){}
}

async function hydrateMusicLibraryFromIDB(){
  try{
    const db=await openMusicIDB();
    const tx=db.transaction('blobs','readonly');
    const store=tx.objectStore('blobs');
    const promises=musicLibrary.map(t=>new Promise(res=>{
      if(t.url){ res(); return; }
      const req=store.get(t.id);
      req.onsuccess=e=>{
        if(e.target.result&&e.target.result.blob){
          t.blob=e.target.result.blob;
          t.url=URL.createObjectURL(t.blob);
          extractCoverArt(t); // try to extract cover art
        }
        res();
      };
      req.onerror=()=>res();
    }));
    await Promise.all(promises);
    renderMusicTracklist();
    updateDashMusicWidget();
  }catch(e){}
}

function extractCoverArt(track){
  // Try to read ID3v2 cover art from the blob using basic parsing
  if(!track.blob||track.coverDataUrl) return;
  const reader=new FileReader();
  reader.onload=function(e){
    try{
      const buf=new Uint8Array(e.target.result);
      // Look for ID3 tag
      if(buf[0]===73&&buf[1]===68&&buf[2]===51){ // 'ID3'
        let i=10;
        while(i<Math.min(buf.length-10,200000)){
          const frameId=String.fromCharCode(buf[i],buf[i+1],buf[i+2],buf[i+3]);
          const size=(buf[i+4]<<24)|(buf[i+5]<<16)|(buf[i+6]<<8)|buf[i+7];
          if(size<=0||size>buf.length) break;
          if(frameId==='APIC'){
            let j=i+10;
            // skip encoding byte
            j++;
            // skip mime type (null terminated)
            while(j<buf.length&&buf[j]!==0) j++;
            j++; // null
            j++; // picture type
            // skip description (null terminated)
            while(j<buf.length&&buf[j]!==0) j++;
            j++; // null
            const imgData=buf.slice(j,i+10+size);
            const blob2=new Blob([imgData]);
            const url2=URL.createObjectURL(blob2);
            track.coverDataUrl=url2;
            // Update dash cover
            updateDashMusicWidget();
            break;
          }
          i+=10+size;
        }
      }
    }catch(err){}
  };
  reader.readAsArrayBuffer(track.blob.slice(0,300000));
}

function updateDashMusicWidget(){
  const coverEl=document.getElementById('dash-music-cover');
  if(currentTrackIdx>=0&&currentTrackIdx<musicLibrary.length){
    const t=musicLibrary[currentTrackIdx];
    const folder=musicFolders.find(f=>f.id===t.folder);
    const dashTitle=document.getElementById('dash-music-title');
    const dashSub=document.getElementById('dash-music-sub');
    if(dashTitle) dashTitle.textContent=t.name;
    if(dashSub) dashSub.textContent=folder?.name||'Now Playing';
    if(coverEl){
      if(t.coverDataUrl){
        coverEl.style.backgroundImage=`url('${t.coverDataUrl}')`;
        coverEl.innerHTML='';
      } else {
        coverEl.style.backgroundImage='';
        coverEl.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
      }
    }
  } else {
    const dashTitle=document.getElementById('dash-music-title');
    const dashSub=document.getElementById('dash-music-sub');
    if(dashTitle) dashTitle.textContent='No track loaded';
    if(dashSub) dashSub.textContent='Click Library to import tracks';
    if(coverEl){
      coverEl.style.backgroundImage='';
      coverEl.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    }
  }
  // Sync shuffle/repeat button colors
  const ds=document.getElementById('dash-shuffle-btn');
  if(ds) ds.style.color=musicShuffle?'var(--accent2)':'var(--text3)';
  const dr=document.getElementById('dash-repeat-btn');
  if(dr) dr.style.color=musicRepeat>0?'var(--accent2)':'var(--text3)';
}

function seekMusicDash(e){
  if(!musicAudio.duration) return;
  const rect=e.currentTarget.getBoundingClientRect();
  const pct=(e.clientX-rect.left)/rect.width;
  musicAudio.currentTime=musicAudio.duration*Math.max(0,Math.min(1,pct));
}

function renderMusicFolders(){
  const list=document.getElementById('music-folders-list');
  if(!list) return;
  const all=[{id:'all',name:'All Tracks',icon:'â™«'},...musicFolders.map(f=>({...f,icon:'â–¸'}))];
  list.innerHTML=all.map(f=>`
    <button onclick="setMusicFolder('${f.id}')" style="width:100%;text-align:left;display:flex;align-items:center;gap:7px;padding:7px 8px;border-radius:8px;border:none;background:${activeFolderId===f.id?'rgba(var(--accent-rgb),0.12)':'transparent'};color:${activeFolderId===f.id?'var(--accent2)':'var(--text2)'};font-family:'Outfit',sans-serif;font-size:12px;cursor:pointer;transition:all .2s" onmouseover="if('${activeFolderId}'!=='${f.id}')this.style.background='rgba(255,255,255,0.04)'" onmouseout="if('${activeFolderId}'!=='${f.id}')this.style.background='transparent'">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      ${f.name}
    </button>`).join('');
}

function setMusicFolder(id){
  activeFolderId=id;
  renderMusicFolders();
  renderMusicTracklist();
  playUiSound('switch');
}

function renderMusicTracklist(){
  const list=document.getElementById('music-tracklist');
  const countEl=document.getElementById('music-track-count');
  const titleEl=document.getElementById('music-folder-title');
  if(!list) return;
  const tracks=activeFolderId==='all'?musicLibrary:musicLibrary.filter(t=>t.folder===activeFolderId);
  const folder=musicFolders.find(f=>f.id===activeFolderId);
  if(titleEl) titleEl.textContent=activeFolderId==='all'?'All Tracks':(folder?.name||'Folder');
  if(countEl) countEl.textContent=tracks.length+' track'+(tracks.length!==1?'s':'');
  if(tracks.length===0){
    list.innerHTML=`<div style="padding:40px;text-align:center;color:var(--text3);font-size:12px;line-height:1.7">No tracks yet.<br>Click <b style="color:var(--text2)">Add Tracks</b> below to import audio files.</div>`;
    return;
  }
  list.innerHTML=tracks.map((t,i)=>{
    const globalIdx=musicLibrary.indexOf(t);
    const isPlaying=globalIdx===currentTrackIdx&&musicPlaying;
    return `<div onclick="playMusicTrack(${globalIdx})" style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:9px;cursor:pointer;transition:background .15s;background:${isPlaying?'rgba(var(--accent-rgb),0.08)':'transparent'}" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='${isPlaying?'rgba(var(--accent-rgb),0.08)':'transparent'}'">
      <div style="width:28px;height:28px;border-radius:6px;background:${isPlaying?'var(--accent-glow)':'var(--bg3)'};border:1px solid ${isPlaying?'var(--border-accent)':'var(--border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${isPlaying?'var(--accent2)':'var(--text3)'}">
        ${isPlaying?'<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>':'<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20"/></svg>'}
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:${isPlaying?600:400};color:${isPlaying?'var(--accent2)':'var(--text)'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.name}</div>
        <div style="font-size:10px;color:var(--text3)">${musicFolders.find(f=>f.id===t.folder)?.name||'Uncategorized'}</div>
      </div>
      <button onclick="event.stopPropagation();deleteMusicTrack('${t.id}')" style="background:none;border:none;color:var(--text3);cursor:pointer;padding:3px;opacity:1;transition:color .2s" onmouseover="this.style.color='var(--accent2)'" onmouseout="this.style.color='var(--text3)'">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`;
  }).join('');
}

function createMusicFolder(){
  /* V9 Final: Custom glass modal instead of browser prompt() */
  openAddFolderModal();
}

function openAddFolderModal(){
  const overlay = document.getElementById('nura-add-folder-modal');
  if(overlay){
    overlay.classList.add('show');
    const inp = document.getElementById('nura-add-folder-input');
    if(inp){ inp.value=''; setTimeout(()=>inp.focus(),80); }
    playUiSound && playUiSound('open');
  }
}

function confirmAddFolder(){
  const inp = document.getElementById('nura-add-folder-input');
  const name = inp ? inp.value.trim() : '';
  const errEl = document.getElementById('nura-add-folder-err');
  if(!name){
    if(errEl){ errEl.textContent='Please enter a folder name.'; errEl.style.display='block'; }
    inp && inp.focus();
    return;
  }
  musicFolders.push({id:Date.now().toString(), name});
  saveMusicData();
  renderMusicFolders();
  closeAddFolderModal();
  playUiSound && playUiSound('confirm');
}

function closeAddFolderModal(){
  const overlay = document.getElementById('nura-add-folder-modal');
  if(overlay) overlay.classList.remove('show');
  playUiSound && playUiSound('close');
}

function importMusicFiles(inp){
  const files=inp.files; if(!files.length) return;
  const defaultFolder=musicFolders[0]?.id||'1';
  Array.from(files).forEach(file=>{
    const url=URL.createObjectURL(file);
    const name=file.name.replace(/\.(mp3|wav|mp4|ogg|m4a|flac|aac)$/i,'');
    const track={id:Date.now().toString()+Math.random(),name,folder:activeFolderId==='all'?defaultFolder:activeFolderId,url,blob:file,coverDataUrl:null};
    musicLibrary.push(track);
    extractCoverArt(track);
  });
  saveMusicData();
  renderMusicTracklist();
  playUiSound('confirm');
  inp.value='';
}

function deleteMusicTrack(id){
  const idx=musicLibrary.findIndex(t=>t.id===id);
  if(idx===-1) return;
  if(idx===currentTrackIdx){
    musicAudio.pause();
    musicPlaying=false;
    currentTrackIdx=-1;
    updateMusicPlayIcons();
    updateNowPlaying();
  } else if (idx < currentTrackIdx) {
    currentTrackIdx--;
  }
  musicLibrary.splice(idx,1);
  saveMusicData();
  renderMusicTracklist();
}

function playMusicTrack(idx){
  if(idx<0||idx>=musicLibrary.length) return;
  const track=musicLibrary[idx];
  if(!track.url){ return; }
  currentTrackIdx=idx;
  musicAudio.pause();
  musicAudio.src=track.url;
  musicAudio.volume=musicVolume;
  musicAudio.play().catch(()=>{});
  musicPlaying=true;
  window.musicPlaying=true;
  updateMusicPlayIcons();
  updateNowPlaying();
  renderMusicTracklist();
  showMiniPlayer();
  playUiSound('tick');
}

function toggleMusicPlay(){
  if(musicLibrary.length===0) return;
  if(currentTrackIdx===-1){ playMusicTrack(0); return; }
  if(musicPlaying){ musicAudio.pause(); musicPlaying=false; window.musicPlaying=false; }
  else { musicAudio.play().catch(()=>{}); musicPlaying=true; window.musicPlaying=true; }
  updateMusicPlayIcons();
  playUiSound('tick');
}

function nextMusicTrack(){
  if(musicLibrary.length===0) return;
  let next;
  if(musicRepeat===2){ next=currentTrackIdx; }
  else if(musicShuffle){ next=Math.floor(Math.random()*musicLibrary.length); }
  else { next=(currentTrackIdx+1)%musicLibrary.length; }
  playMusicTrack(next);
}

function prevMusicTrack(){
  if(musicLibrary.length===0) return;
  if(musicAudio.currentTime>3){ musicAudio.currentTime=0; return; }
  let prev=Math.max(0,currentTrackIdx-1);
  playMusicTrack(prev);
}

/* V9 Final â€” Fisher-Yates shuffled queue */
let _v9ShuffleQueue = []; // holds Fisher-Yates pre-shuffled index queue

function v9_buildShuffleQueue(){
  /* Generate a Fisher-Yates shuffled order of all track indices */
  const arr = musicLibrary.map((_,i)=>i);
  for(let i = arr.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  /* Remove the currently playing track from the front to avoid immediate repeat */
  const curPos = arr.indexOf(currentTrackIdx);
  if(curPos > 0) arr.splice(curPos,1), arr.unshift(currentTrackIdx);
  _v9ShuffleQueue = arr;
}

function v9_fisherYatesNext(){
  /* Pop next from queue; rebuild when exhausted */
  if(_v9ShuffleQueue.length < 2) v9_buildShuffleQueue();
  /* Remove current track from front if it's there */
  if(_v9ShuffleQueue[0] === currentTrackIdx) _v9ShuffleQueue.shift();
  const next = _v9ShuffleQueue.shift();
  return (next !== undefined && next < musicLibrary.length) ? next : 0;
}

function toggleMusicShuffle(){
  musicShuffle = !musicShuffle;
  if(musicShuffle) v9_buildShuffleQueue(); /* pre-build queue on enable */
  /* Update all shuffle buttons */
  ['music-shuffle-btn','dash-shuffle-btn'].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn) btn.style.color = musicShuffle ? 'var(--accent2)' : 'var(--text3)';
  });
  playUiSound('tick');
}

function cycleMusicRepeat(){
  /* V9 Final: 0=off, 1=all, 2=one â€” updates all repeat UI elements */
  musicRepeat = (musicRepeat+1) % 3;
  const titles = ['Repeat: Off','Repeat All','Repeat One'];
  ['music-repeat-btn','dash-repeat-btn'].forEach(id=>{
    const btn = document.getElementById(id);
    if(!btn) return;
    btn.style.color = musicRepeat > 0 ? 'var(--accent2)' : 'var(--text3)';
    btn.title = titles[musicRepeat];
    /* Show/hide "1" badge on repeat-one mode */
    const badge = btn.querySelector('.repeat-one-badge');
    if(badge) badge.style.display = musicRepeat===2 ? 'flex' : 'none';
  });
  playUiSound('tick');
}

function setMusicVolume(v){
  musicVolume=parseFloat(v);
  musicAudio.volume=musicVolume;
}

function seekMusicTo(e){
  if(!musicAudio.duration) return;
  const track=e.currentTarget;
  const rect=track.getBoundingClientRect();
  const pct=(e.clientX-rect.left)/rect.width;
  musicAudio.currentTime=musicAudio.duration*Math.max(0,Math.min(1,pct));
}

function updateMusicPlayIcons(){
  const pauseSvg='<rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/>';
  const playSvg='<polygon points="6 4 20 12 6 20"/>';
  const icon=musicPlaying?pauseSvg:playSvg;
  ['music-play-icon','mini-play-icon','dash-mini-play-icon'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.innerHTML=icon;
  });
  const topBtn=document.getElementById('music-topbar-btn');
  if(topBtn){ topBtn.classList.toggle('is-playing',musicPlaying); }
}

function updateNowPlaying(){
  if(currentTrackIdx<0||currentTrackIdx>=musicLibrary.length) return;
  const t=musicLibrary[currentTrackIdx];
  const folder=musicFolders.find(f=>f.id===t.folder);
  ['music-now-playing-title','mini-track-title'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.textContent=t.name;
  });
  const folderEl=document.getElementById('music-now-playing-folder');
  if(folderEl) folderEl.textContent=folder?.name||'Library';
  updateDashMusicWidget();
}

function formatTime(s){ const m=Math.floor(s/60),sec=Math.floor(s%60); return m+':'+(sec<10?'0':'')+sec; }

musicAudio.addEventListener('timeupdate',()=>{
  if(!musicAudio.duration) return;
  const pct=(musicAudio.currentTime/musicAudio.duration)*100;
  ['music-progress-fill','mini-progress-fill','dash-mini-prog-fill'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.width=pct+'%';
  });
  const ct=document.getElementById('music-current-time');
  if(ct) ct.textContent=formatTime(musicAudio.currentTime);
  const dc=document.getElementById('dash-music-current');
  if(dc) dc.textContent=formatTime(musicAudio.currentTime);
});
musicAudio.addEventListener('loadedmetadata',()=>{
  const dur=document.getElementById('music-duration');
  if(dur) dur.textContent=formatTime(musicAudio.duration||0);
  const dd=document.getElementById('dash-music-dur');
  if(dd) dd.textContent=formatTime(musicAudio.duration||0);
});
/* V9 Final â€” Bulletproof ended handler with Fisher-Yates shuffle support */
musicAudio.addEventListener('ended', function onTrackEnded(){
  if(musicRepeat === 2){
    /* Repeat ONE: re-seek to start and play current track â€” never calls nextTrack() */
    musicAudio.currentTime = 0;
    musicAudio.play().catch(()=>{});
  } else if(musicRepeat === 1){
    /* Repeat ALL: advance with shuffle awareness */
    if(musicShuffle){
      const next = v9_fisherYatesNext();
      playMusicTrack(next);
    } else {
      playMusicTrack((currentTrackIdx + 1) % musicLibrary.length);
    }
  } else {
    /* No repeat */
    if(musicShuffle){
      const next = v9_fisherYatesNext();
      playMusicTrack(next);
    } else {
      const next = currentTrackIdx + 1;
      if(next < musicLibrary.length) playMusicTrack(next);
      else { musicPlaying = false; updateMusicPlayIcons(); }
    }
  }
});

function openMusicPlayer(){
  const overlay=document.getElementById('music-player-overlay');
  if(overlay){ overlay.style.display='flex'; renderMusicFolders(); renderMusicTracklist(); }
  const miniBar=document.getElementById('mini-music-bar');
  if(miniBar) miniBar.style.display='none';
  playUiSound('open');
}

function closeMusicPlayer(){
  document.getElementById('music-player-overlay').style.display='none';
  showMiniPlayer();
  playUiSound('close');
}

function killMusicPlayer(){
  document.getElementById('music-player-overlay').style.display='none';
  const miniBar=document.getElementById('mini-music-bar');
  if(miniBar) miniBar.style.display='none';
  musicAudio.pause(); musicPlaying=false;
  currentTrackIdx=-1;
  updateMusicPlayIcons();
  updateDashMusicWidget();
  playUiSound('close');
}

function showMiniPlayer(){
  if(musicLibrary.length>0&&currentTrackIdx>=0){
    const bar=document.getElementById('mini-music-bar');
    if(bar) bar.style.display='flex';
    updateNowPlaying();
  }
}

// Make music window draggable
window.addEventListener('DOMContentLoaded',()=>{
  const win=document.getElementById('music-player-window');
  const handle=document.getElementById('music-titlebar');
  if(win&&handle) makeDraggable(win,handle);
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// UI SOUNDS â€” Complete sound system
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
window.playUiSound = (function(){
  // Embedded audio â€” nav clicks, element clicks, NuraWatch alert
  const _sounds = {
    nav:   'data:audio/mp3;base64,SUQzBAAAAAAxOVRTU0UAAAANAAADTGF2ZjUzLjIxLjEAUFJJVgAAIRgAAFhNUAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NCA3OS4xNjIwNDUsIDIwMTgvMDEvMjMtMDY6MDU6NTIgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBETT0iaHR0cDovL25zLmFkb2JlLmNvbS94bXAvMS4wL0R5bmFtaWNNZWRpYS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0yMVQxNToyNi0wNDowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDYtMjFUMTU6MjYtMDQ6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2NiMmFhOTEtZGQ4NC1lMjQwLWI4NTAtMzAxNWNiMTE1NWQ3IgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdjYjJhYTkxLWRkODQtZTI0MC1iODUwLTMwMTVjYjExNTVkNyIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjFhODI3NmM3LTMxM2QtYzE0OC1hMmJlLTk0NTE3OGZkMDNkNCIKICAgZGM6Zm9ybWF0PSJhdWRpby9tcGVnIj4KICAgPHhtcERNOlRyYWNrcz4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGkKICAgICAgeG1wRE06dHJhY2tOYW1lPSJDdWVQb2ludCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkN1ZSIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iQ0QgVHJhY2sgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJUcmFjayIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iU3ViY2xpcCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkluT3V0IgogICAgICB4bXBETTpmcmFtZVJhdGU9ImY0NDEwMCIvPgogICAgPC9yZGY6QmFnPgogICA8L3htcERNOlRyYWNrcz4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWE4Mjc2YzctMzEzZC1jMTQ4LWEyYmUtOTQ1MTc4ZmQwM2Q0IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTIxVDE1OjI2LTA0OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDQyAyMDE4LjEgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2NiMmFhOTEtZGQ4NC1lMjQwLWI4NTAtMzAxNWNiMTE1NWQ3IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTIxVDE1OjI2LTA0OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDQyAyMDE4LjEgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFhODI3NmM3LTMxM2QtYzE0OC1hMmJlLTk0NTE3OGZkMDNkNCIKICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MWE4Mjc2YzctMzEzZC1jMTQ4LWEyYmUtOTQ1MTc4ZmQwM2Q0IgogICAgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjFhODI3NmM3LTMxM2QtYzE0OC1hMmJlLTk0NTE3OGZkMDNkNCIvPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uwQAAAB7AAS4AAAAgAAAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tASxAABWIgAAuf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwANKABLgAAACAAACXAAAAEKmLkbjehLQVAXI3G9CWj///////////////////////////////////////////////////////////////////////////////////////////////////////////////////92SSRtaAoBfYRDZqZQdlJGRwZnKgawMh1+aUEGlBhpqCYooGsJnHZiJgbYUZNiZkAaEKYAclyy9y4lFMM7H55Ribv3b8bRv//////yXTaQXV8uQCJR2SSRtaAoBfYRDZqZQdlJGRwZnKgawMh1+aUEGlBhpqCYooGsJnHZiJgbQUZNiZkAaEKYAclyy9y49FMN2PzyjE3fu35ejf//////kunkF1fLkBpQiKYSd2kjiRBgiSRiQtZtTVZ/b1prCX5leEBmgiRuwvhp/K5rgepETYWAgy99NckjLQ0yYEMIOTPT409aMmAYfRFMXARGFDwI2FNNIVTd1zAg4wcdMGDmshAGYAJBQQguLwXBUtn9zadjMGcv2pwa1lSLlH/MA91pDJqshO7biLs+mdWNrYo72byFmgrTmNE4yxhgCJgOQqR5l0I2gnIgjXGiPlzI8SJTsNWRcN7rC7UzKp2JUmslNbky2PYD9wc6w4WKv7VfhAlmdWHH/wDx5G2v////////////////////////////////9iE0NERo+wtAAFjBQ6V6ExtMAus5lLTm4TDC5CmJjSAntOLUJcWIflFgpEQDcEIDiziiHf1//iD+XGoJBTbv+21sjGIqHHHTR35QUBdAw0v0YSJJ6BhkXJZkXuSLBSS4U+jwkv/7sGCnAAdURsnru3rqOsJpr2MDORfhO0mt4e25pxtpNYwhb3T8yKgQN0u86DgOs7KgSaqXzXXctM5UyjTAXcf90Lso1ucldR+WqRqnc1nLahCHOTBllb1abx1kiMk5j9F8F8rVEcg6y4l+P0lwrydJ4Za6RJveR6olYZ5kDrgMPV0Y/mZImQc4xArldk/m+VTK2z5XR2+jnlkKYTUYMZ4q4uLMp3MEZsTKkj6mTG623JfVLYtLAHUHfsgEtu77W2tgOSXHfU1ha25ws1M962Ug4TcWsqwqifZf6sJkWoZJ6samJhl8NM6vQVK4rHq887L6gQC4cKgv918ccpPbpPNosOkKFgbCpB44tr4GH9sSagcihxZonUd1V2t1Y1ffG62i1pcFu/b/7bWyMTMBATIb0UEI0+F5NgLusuM0HAQVmDuCEOQALyuQMgJjy2mmZyXu7KZfO0teafGTX6OLUtb6tSNdu2tatVKbvMbd5I0yrrOZpAPkUjZkhg0RXLFRCiK3AQ9JNdEinZATwuEmpbiKSFC1v6rC2001NZrHxOMoc2vlxrrTrbZK+n////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAC4JI0utYS25qpspvcwZbx4AzS+fjBPDbBaj1nGCW/////////////////////////////////////////////8SNGd2h322tjA0KBU2HNDJIKJhMrSYFBAKBQJCJEGzEAdDhKBlFnB6UKsrFUmCAq9hiK1e2YjPbrfTX8bO8yMVREk/x2786iy/kdtaP2lvzUBKqmmb1M4zMSrfvY7c/fGra03JqMH4uv00aImrPEO722yMANZbQvB/D1sqUpbIGFS7bk9g+JprSRh70KDxtxqXmHapUNBWly9LtRblnJdbV203VdfVWSrf/9qKJAAGVBZU9MxohQp7SYwclWNew85MV22CooKfJSOMsyR3ZSElBQjDQNN/r/12PrZdrWEa5pGFACaJhAZ+tJgUhgyQyEOIRgoIGZSAVYYwv6+khzQYcW8n6P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAPSgrIW1h5KCDhSRRp7yUECCcmjOGEoI6E5bz8JJT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9mt2xtJygksaXMqcBGX/FsK9ZbiQkEHanBOplWpswWx1dEv1tEVtMUMxdF+qAr6aCA0gvRANpjTITKNGLrCUV0C7AqQ7uwKIAAAAqgxUIPpCntHfBzmezrkEbYBgCCdtGZdu/cVRtskYU8FDorNFnoBBKoF2gKKBF1TcwEWo4jz5p/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA/8CkijWDEqG6E5ND2JJQOwJx1tPMSAVQTjkZSYlP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Jk1tgHqCjMRjilNsJRkdMKa2gETof///////+3JE2QIA0z05wQaVtfT1E+A5AJhWVoBIgqZFPnf1NtNJEDj7mfSJAvxekeA00rhkgatU5JNEgAUsoO6zDmzw0QNUHeLI4AsH////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAD/oFxiNPSJowALjkYMgTAhgVGo0kQmg3AiMQ94gM////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0mmUgDqucGPaCnG6BxOVKijPo///////////////////////////////////////2kiSABQLvCkQaDhFZZYG5sdAEEAAZKAV9oz4Y8LLrGySAABYARWQDT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAP+wLHISsICE0AONQYQAEANAEWAAAAKAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////pEEAACAYMClX///////////////////////////////////////////////////////////////////////////////////////////kl///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    elem:  'data:audio/mp3;base64,SUQzBAAAAAAxRVRTU0UAAAANAAADTGF2ZjUzLjIxLjEAUFJJVgAAISQAAFhNUAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NCA3OS4xNjIwNDUsIDIwMTgvMDEvMjMtMDY6MDU6NTIgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBETT0iaHR0cDovL25zLmFkb2JlLmNvbS94bXAvMS4wL0R5bmFtaWNNZWRpYS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0yMVQxNToyNTozMy0wNDowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDYtMjFUMTU6MjU6MzMtMDQ6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZjQ1ZDA3MTItOGMxNC1lYTQ2LWIwN2ItNjdkN2JjZmUyMjgyIgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOmY0NWQwNzEyLThjMTQtZWE0Ni1iMDdiLTY3ZDdiY2ZlMjI4MiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjE5Zjk4YjA0LWI3Y2YtYWI0Yy04ZTFlLTIzNDE1N2UxYWFmZCIKICAgZGM6Zm9ybWF0PSJhdWRpby9tcGVnIj4KICAgPHhtcERNOlRyYWNrcz4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGkKICAgICAgeG1wRE06dHJhY2tOYW1lPSJDdWVQb2ludCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkN1ZSIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iQ0QgVHJhY2sgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJUcmFjayIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iU3ViY2xpcCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkluT3V0IgogICAgICB4bXBETTpmcmFtZVJhdGU9ImY0NDEwMCIvPgogICAgPC9yZGY6QmFnPgogICA8L3htcERNOlRyYWNrcz4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTlmOThiMDQtYjdjZi1hYjRjLThlMWUtMjM0MTU3ZTFhYWZkIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTIxVDE1OjI1OjMzLTA0OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDQyAyMDE4LjEgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjQ1ZDA3MTItOGMxNC1lYTQ2LWIwN2ItNjdkN2JjZmUyMjgyIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTIxVDE1OjI1OjMzLTA0OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDQyAyMDE4LjEgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5Zjk4YjA0LWI3Y2YtYWI0Yy04ZTFlLTIzNDE1N2UxYWFmZCIKICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTlmOThiMDQtYjdjZi1hYjRjLThlMWUtMjM0MTU3ZTFhYWZkIgogICAgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjE5Zjk4YjA0LWI3Y2YtYWI0Yy04ZTFlLTIzNDE1N2UxYWFmZCIvPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uwQAAABzQAS4AAAAgAAAlwAAABAPgBFoAAACgfACLQAAAF///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wQSAAB0f+AkEEgAAdH/gJtASxAABW2QAAQmk0SAAl0XoCpRCImaGDQSNbfykFkO9X////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAMEQdGIxgYqAAACXAAAAEVrQcbj2UriHmFZRGMGJX/////////////////////////////////////////////////////////////////////wm1NNr6lVBgDxhfgxmQcuUdIWrR53SoGoERAZeQ2xhJAuGI0I8Yc4QJQB8NACmaudLokntVcwRRpEFBp2IiNLVO9ywjuT1SMXrEP0z1rrjDiQ3HnIZxAlSwTrORyJE9QBtpgjFbYjAGBsy3TDftGjQOUJIt0gY3P4IMqDfnPfOEJ1a87nc//Bdv31MqFMX/k4dQAIHz8Mcf/kRE4jwN4j/zs4/cBlpwj/4608B28Bq47IFFmuDBTTcI+rYE8a3BDJ/zJnACd9k6IGfH0QANXd4iP/7ZJXjCiIVDGNZniAkQ0LAVBSyKFQOZkRMEBAsFh4WINBXS5ZbZMpQZBpnsKVWMawwz9Ytyd5kT/ryUqUxgOPSCWSufbNJWQLPnYdjPJmWv66SHQo1XF6EcsuJHyeheR9bWsZevtxn0HOq+nzSuqwYvrWLC3vGdbow0+LW+91x/mBulp76v9X3nGqQaxYuL697YnzL9ay83atpM1t59V+o1YV91rje94zrOJL7tvxfbeYuIqvXY//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////oAGru8RH+1skEOIEVHDZAzAVwNQn2YJnlx0llqs2eVSieGQeYEBWFvUZ/shzv/7sGCnAAkHY9P7WHtuXymaj2Hibc3Mp0WtYMtxfRIpvawZL8z9YWqPIsFjOtlV7dFT9njBNrOP/8YuhNjkU78m5/Zdnbfq/n//3+7v33P/1dO/6AnmYBl2+9tsiTCRorAaeYyidYKLFDHiVYhIQNAyQSBgYEAWkKhyYSlE4DkJOqfZJJn7qXkACzXBoIRE9yyI0uROWrTWDkg7HxN1DZf9HCyowuykT8wzo0KTp8RcAiQgACbhQ74c6//RlioiQG5EwsDmIiis8PG21sgE8VA5eEQlTiGQ4Dhbh223HjfSV/X1g59FhaJkUBXucqiEju2cb1AxzzSeJXLwcp2d7ibz60NaLw+VrfCtHhgth5nndgPnIc2dZyFoKca+Lzg3g3h1/ihAAUVmd4+2tkYj5YJNGMcBNbEPIjP7NMeaMjtMuXGmpi0pj4QjhigZf5c4xNNnxABsJW8CDETlqKbkQQN0uspAaeTtK2iwAKMBEDmL3jzgNzkcodFjTCJK/zuus2ZU7/QPB6tUaGOapR6IQ9LoxdphmElAxluJ6uWJIn8fpvMrMfp0p6irVKqeJ9gnCoCUEvOhD9r7A1QaN7E9bnseA1vlRDgMaHyXmUasT8KskFlfQW5v+ZHCnY3NwcoMJkp//fcHGt4puaMwsT6bf///////////////////////////////////////////////////////////////////////////7CIo7xET//tQAFgR0arALUHTg+MPXfDlTlZECCOEILqIeIeX0+4p1xHinsT1Vu3BJ7mnpqASGwtENTsMXKhoTjxKbp2IiEaF/T8n//uwYKcACBtS0ntYe2xVpcq/ZeNb0f1HTezhrbmTl2o9rCFuyz1EIDlQB5v/8CdRADVmiI22tkgCoQWVZ8ieDTGLHSNAKmDyCwRpMhhLMUJgc4u7NINkwAShr45VFAYG9jH2lTD/NdqRmzTWqeW0dM21jmojV53HCtS37nEkUVF53Uxel1gYAhjrIFNaJx1NelrUbVDUUi1TqR6Ts+YqSRpsZEtWxiYOplsutlupjiDorY1m6tSK0Fu2ujrLqaqiImrtMR/9rABToyv2XxMWaCQIemYq1t3y7CKY2JDcaK/r2tOM+izZ2SoZEHElqwTtsG+rYvzcxbfm+FUFwUA+ExZoe7EwoSwLCRl+r119Cg9GA2EWHhpVa7+vbwmJIu07izywQMQZf//dba2wxIxdmRh8cScFryCGn1TSSfDMwu40Gaoasw/0qTvZLObyz3j///N9V1ISU9G6rSb9FM24UQXxxzHKpPRzmPqybqPgVEc7odrYtjUWvsUnSB9D00f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwANdS/S6xhS3DiBqk1rLCeI/Os5jLRLcHuEp3GXsJf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+JLv/+tokAAMecADGTLBiIAa/ED1mcwFoMGMREXURidwPxYsZYQ2yEiP6prxY8Lpeqy36hFt/lg7iA7bLPOlBBYwNXcMA8obHIC0UTVA+yB4YiCuEIkRiGRQZG4zjxPU1rX79rgv/+96/r0QkulHW7ZnKKc387v9k1EsZkYW/FhbEB22SGAABZUx9IGFUWCukSR2cjYT8QgJvbdOaN2s2kRFZiHcALbXGGHCA9uxgTDWYFPHuIf7OQpogLho4pLM1Tx1q///7f/5u5py3qmrqy2KnqwrIdj3DqFv775uAjgymfUT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA5GL0z7JxLYHSEJvmXmJQkgizXsvElgfINnfYw8VP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////gSFpmHhwAACrXk6VI8GI4xi0e6dK4BDT3BGgUXVQEs1EQ7jbWyQNaETccKtS1gtSAgVOiYppY8Rbn73xtWzqms4+q/GM/9ftr/7F10BmMunabtT6BdCHKUlTPIyZMmEliZY+GT4J4JtVzIRA4AAADXgQvFrCUYEOLXijH4bYCR3cLnuj+qhFKmXgAww2lgiDM5QIeEWGfv88jBIABjSIUved93//wihexYUWeir1IH9ye6ktb21hpneRkP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADyoGzfsYMKgawNnPPwMVBqwbM+xkYqBig2Y5jKRU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+wFZmQAA4AAAAL8H7xoOUhwFpV6bFgoUOf6K6IXmIdwcaiVthYpZKdMeR7xNITBS1VhkAaDA00MPdlldDAh//4pkQvE5sk5M7ZV/W/69yvDECDTDAAAAAAVGRzA6pfhdYDkL/Zw/grAiqEUiYdwcba2RhcqDVCSUgvUOTUTdQkVZFTlPwqroaxyOIbaHLFOQYu1aotrZsZdbI/6tqfI////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAPdQbNey8wqBhA2b8bCRUF+B0trLxioFwDJjj8GEz//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////IE01DuAAACgAAo6QtQkhOLli1nIyA0n0cifa2gCBtICu/MTAFoK8fK+iCvZxEFNTSh//sH7PofacTl8jc4W9TFU1mHIT8oMTAC0QzMwAAADakoYa7JU5RZ8YAZMEP9QxOtgDYFQg/ycrpGKw+krYRXQxBdGEB0n7qv//xiDK48eWOmkEAxVYQ5L9yH6MwTDx1pqQca////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA+SBsnjGRioEoCZRGMiEwXoHSeM4GKgZwNlvJyIVP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6TrYBB8QxFGtTFAB9KQi2h5/rwesrAEFIhEm4vUS2A/Q6RajdbOBoGR3+3/+pUsLqINoJVN+u6Vbetq4qPOeoFnoYVhmAAVRAAAAJJLAYGqgbQZAUbwycT/tf6BgxJIgCDKGo1MGDEHQZuHIg9AmAT4qz/p///qpU+cLPa2rN1U7+7iT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAD8YEx+M4CJATANkkSyIVBagTHWxgIkBUAmPQ94RM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+FZwBhyiWAgpPJAWJgyf9KG6PpYEJJIJfWYagEGzIww2JVtKxjK39H9XIfqSRW6HWJqcge9TFbbXwsnT/55xFSkA0gkF4b0GcqAUKBmN7o0yd6C3/6kY0SSQP27k2IsxMIiBK5QJrvNf//xRu0WNcCKznW9NZ7l3Tpxf70pteUen/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAP/ATHWzgIkCDgmPQ/IRMDwBUYjGBiQD2CI5AsvAz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0bEiATnDgK+UgGBM0+85/1f/////////////////////lxEAAD7MvMDTKgLCeSNiUlko////tM7ehjVex0r0qVgkACCfMRSkRBi4D8rQsAZAAAH2OYBSH9X/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA/5BEYgDxAYP6CI5AHvAwEAERqACEBgHQAjUAAABP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4bhAIAgp1IEbBuuur////////////////////////////////////////////////////////////////////wCQAQBxxvWUAJABAGh/hMEkAAAYa////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAD/wAxqAAAAhOgAjkAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AkAAAav////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    alert: 'data:audio/mp3;base64,SUQzBAAAAAAxRVRTU0UAAAANAAADTGF2ZjUzLjIxLjEAUFJJVgAAISQAAFhNUAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NCA3OS4xNjIwNDUsIDIwMTgvMDEvMjMtMDY6MDU6NTIgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBETT0iaHR0cDovL25zLmFkb2JlLmNvbS94bXAvMS4wL0R5bmFtaWNNZWRpYS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0yMVQxNToyNjo1Ni0wNDowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDYtMjFUMTU6MjY6NTYtMDQ6MDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA5ZmZlY2UtMGFkZC0yZDQzLTkxMzUtODk4ZDYzYTRjNDAzIgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEwOWZmZWNlLTBhZGQtMmQ0My05MTM1LTg5OGQ2M2E0YzQwMyIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmFhY2FhYWY1LTA3ODktNjc0Zi05ZjJkLTMzN2ZlMWMzZjIwNyIKICAgZGM6Zm9ybWF0PSJhdWRpby9tcGVnIj4KICAgPHhtcERNOlRyYWNrcz4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGkKICAgICAgeG1wRE06dHJhY2tOYW1lPSJDdWVQb2ludCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkN1ZSIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iQ0QgVHJhY2sgTWFya2VycyIKICAgICAgeG1wRE06dHJhY2tUeXBlPSJUcmFjayIKICAgICAgeG1wRE06ZnJhbWVSYXRlPSJmNDQxMDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHhtcERNOnRyYWNrTmFtZT0iU3ViY2xpcCBNYXJrZXJzIgogICAgICB4bXBETTp0cmFja1R5cGU9IkluT3V0IgogICAgICB4bXBETTpmcmFtZVJhdGU9ImY0NDEwMCIvPgogICAgPC9yZGY6QmFnPgogICA8L3htcERNOlRyYWNrcz4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWFjYWFhZjUtMDc4OS02NzRmLTlmMmQtMzM3ZmUxYzNmMjA3IgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTIxVDE1OjI2OjU2LTA0OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDQyAyMDE4LjEgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTA5ZmZlY2UtMGFkZC0yZDQzLTkxMzUtODk4ZDYzYTRjNDAzIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTA2LTIxVDE1OjI2OjU2LTA0OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBdWRpdGlvbiBDQyAyMDE4LjEgKFdpbmRvd3MpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHhtcE1NOkRlcml2ZWRGcm9tCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFhY2FhYWY1LTA3ODktNjc0Zi05ZjJkLTMzN2ZlMWMzZjIwNyIKICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YWFjYWFhZjUtMDc4OS02NzRmLTlmMmQtMzM3ZmUxYzNmMjA3IgogICAgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmFhY2FhYWY1LTA3ODktNjc0Zi05ZjJkLTMzN2ZlMWMzZjIwNyIvPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uwQAAAB7AAS4AAAAgAAAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////tASxAACsRAAA+P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACCoACXAAAAECSBMWhKQiaEkCYtCUhE3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ykgSSBrBGHhSHQwKynR5wV1QMpIEkgawRh4Uh0MCsp0ecFdUDjjjsYScaRBTDH9BAJhhrCyGRMPMYqwaRg/BfGI4KcYyAfxhlhEhAQxgOinmlqy2bLaXpktgpmSFprIqaZCHAooQPt/Yww/r6OvDEMI8Jwll0iwKArWMHCQgPL/ioAY0OBwxJEdTHycz4MZGzEythNnITOmYyBVOXdTCSQ0MhTzS0MxgDUJpoSzFNByYjFARYBFQuMxoDQO4OjnHGTYmGGYaJvrkKRwLGQQLIGjGdxzUUOZsyhGYEGMQYzjkcTKGLsIoCMk0yWPRAEFGcAosigBCDMCTtLpsDX8YAw8XDjCDCGTVQXTnLjrYCA3HnlMHMf922vx5x7dprEhjcbn4Yo6SUSB937lc05ELweAu4lZKVztnQSGWeAm4CbCmHA9effR187TsRTdeH6CL1KSMTlP3Uoh/KklEsm5f3CN2qSksTblw/lDcXuRiWYbldu//7sGCnAAqTaMtr28tqUUUZjD8CShzNnU2N5w254CeqtPehtrTvgdHcElJolZqoU5b7qchZ7ISGrWme6FwopGxSmqG7lyeH7mOv7//rDn8/+RQAjK4QQrnOd//op7YcDOggPggcB8fD6gQeCBxsTjgQM20fqDGt+QydICJTk+6q1ltHeoKgyDSPyI7DWc7ctzzTgw4kURLEhAQCpSimrFX+1ztXKlpZmVO1GpfZay+zys/cWHXeU6U5WGd52oah9pqtphaiRavbTVXZpH+d6LYs5d69Ms5lMBO041xwmlRd2VKZZBi5mXQQuZlT3ui7s5ATDqKad5+rsZh2y3JxYTMJdMGjMlYLDsy/rqzTtONE5lwYvDsMyyGpdnSwzdqy3C1TfjjvH5q1njVwqy2qzwszelMEw64Jk8JyXdfxpbN3tXG5U1lnzdXH8sv3zeOP6y/fMccf1luzzXd6qtgqTUaIloqWxttpIei4FsJwLYT1LpI61GPQ3gHbBOThXi2OoGva2PFtSPissdkapbOn7BFY37HTUN8pwj55tlpKpv/ZWrEAHwwDYIRcocJzC5EcUEMaQNEIVHnihJRNrTjcwXZXIUc4o9lkLpVd/XV/////z3pcPrAh1IykhEFOeNyzSWI1okFQIAgjDpc/zvLApaDEcESzku0/1puI0ph2r/7v5VvlNme7hGqJ2of5nGblO/u8f/ceJIJdv0SRSWqyl6SZdqLxqcNi8XyCsoyLp4gQ7jEumpHFY1SdaJdQNC8YukDYkZ8iJOnjJdJ1JmJfRSbvvt/2X9TGQONFdisXiHAmyGeKKBqpbN2/////rMFooKHy//uwYE0ABOloUWN5o2xmScptYeVt1J2jSa3mjbFpp2m9iKm2M4YpdpNFKWQptIiZVsfYGqMbjrY7wEhPs4LOaQYMRulLpiOqIq9+2fC1jNrWtuDJNd7jcVPLSh//rxiucXlf+2VoiHVEh4qRRVyiYgHjtYPGGtmfK8PBRTlYyOhpSIb5Wvf//+hOMYO4v8mZU22TkjkzZCOgT7F1BCICQemWXgCoYwscDgbdFuonGLeSdhgp1tx6f1HL//lk9L6Y35m08ThVs8d9fb/1+b6nD+q23iQIZpH5ZT+WDZSVbJvZKYJXlIrndrKPsZqHgDInAwKQM4p1LUtA2IYblZBdR/9N/83M+7GAuIIgwN4kH2KGEZDIgWAgb1cC9kRuMqaoJKaiX3f////+RFpwvGAZBPKN4dEUxJGfZO2BieZFQOzL2Iz8OT2EdggsMHhYqMXMwy0nTRpkspVTF9GtZmT6Oiar+UAExSdiT//Nc01hkcc9WR84qb+3UkAnIBt6ecSzv////lBFnPOQKwW1QNt/CZ9anJG3hVlAQHGHhBhpCwZN9+wwURDMEDDBZAIkIHNE2HSBmxhXYMvEUcP8hVoDBZbTgspCqgvZI0J8BTwHjPGBHjpV61G30vWmaWdFRxlvOEk67IOti6TJeGXAATizRMroKU5ktQtSbO1Tvq0TavQfSMTRlpqUYh/AAC5gRYcgc0X4BOsBpqM0TLr+TKX////+V/Pkcb////////////////////////////////////////////////////////////////////////////+zNDoAo7WpgMIf81GWIILAky3/+7BgcoAGmWfR63SjbEFpyl9iR22SHZ9JrVKtuP4nKXT2nbYFhmwR12kXp71ZFQcJq5MusVlf39b+r6kQgkq8v+n/////+Egjf+rf////0G3oFk338Km1rckcmXr7IA4kFChUzCcxygcClvW+Igpg0BOwg8qG5oQUFIJLOP9EvnlcpF/1jno/6BuKEA6MINAK5mXCYf9/oN7LqUzJNqMiXNdXXOoj8DQNB+w2rJH2qeWDQ8ildep/60262ZZgX0zUVuBkMHDSJsRyRwcSBhxGgHE8XIV1H/n0G/////WVOsoEibKj7+APa1MBhP98XosQ+hjH8mUOhpwQZY3zgmb1XNT6/b1l7/5kA7DZqkf1//////oGjjf+q/////0M+XN////SH+0KnGqckcn+0UqgBYmBAJMGUyYiW1ZcAAoJRjZ2LFU2UKcAEPLyJVL6QvfpiNk1WO37etQ+wMMzJtBjcibfOP859b6Vlmu6i3Uu+6BicKgBI8SwvThnRqN2KZUOq7f/VVqW2yVIRiAF0IQa4l5GBjYDNIAXBDRNkXR62W3////6jXzopZ1f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAq3Z9JrVKNsPKlqfz2nbZCVn0Ws0o2w1xoqfMa1bv///////////hDuyCCO+yYEDf6nJueCbL6nrTXcBlDU31ifPVkw29SPnU//sFme0T///////gtNb/qv////9SesNf///o2/zBu1qbjbeux/YCREDRkABjaDoEHbkKCjPYtrTIqhj4GPREDQI5BaJbtlkmEbrMxylOvbqOj6AWgDiRl0eX+cPfVq7dGZrdlrLZ9lLekVEFoG4N4CaJB0VIJOpOWVstXU3X3v1udRRNUqSxQgC4tIumxSSBO4FzRZNv//////Uf6kBss8Q7oIND7OCwMTKU+D4DdS4cnvxHxWfmgAdTR0ah3N6ntrb/6YJCb60/////7f6vJJf0///yYf/sGbWuSNN/8Es0XWqQzA0D0cQIa+BVDIP2u1FqWagMMSo5uzlh09bDZQsxZL56uxzcxJoUiBtZIbCSZ0fQspH6Rr95cTQZR+g1a0qlrLa0XdbrTXWkHBkVPLtrRN0TE+6af//7bdCYDlgbQFcjCaL4xgGfAKoJ9Rv//////5z5Az////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+//YE2tbAYY+F3MhJeTNYlCQWz0ozV/MhG7+meS9/WYf+tQA//uwYKcACVNn0Ws0m2w4acpNPkdtk/WfP61Sjbkus+l9iJW3uFBeZ///////wur/8z/////lvjhe7bQF6yKNpN55v+zSlLOoqFx5UvlWww5sKSxZfLCmgbkYA0TLaJByQIwjLOms4T7oUFk67NTONmbF8FNAc88WBlRek4dMESaLhNkgmpRcOnDWqktlMmnWbNWmXkWqVRSOKZg5Uj16D6mr2qZqmdVf+nZlMgT5mTw4QUojQH4hhRDqgAyQLPSwO0oMZpMmmZpmbrf///8zdzhOqQdcQUK7Lu7wgkjta5Iw5UxktFNVqOD4qCd0cGlUMC+6CyqQzWZLKLe/6P/qKIQUo0Rg9//oIf//396XQgg9P83////+j/En///////dujAdVHeIhBRXfaWyOWngxF8wfFM0PaU4RgUypgQ+S7w5CMU+S+wxIBQt2IAJFg+RUMZCE3fkTx7JM8vcwqdDCwpAxDMbl0WPaE0wmKzIpBMhCgBChrDSGcRLGNu2/EVhi1YsY2rXP/C63AyOREkLe5yH13svfuH4vAcmXIpYABIzgfOx6zpQw6K4OIVjURdiaAeXsDSLgZ/I3jbqTEsqUk5vDCr9yWYWLFNHGGICrtG4DLLFr+UHN65TuxDKw8LlHP7rn7x///9fnz+67e7c08QCE4atSGWxQGIZeP68RqzX7rSufp5+5TtiTDjUsw5//////////+HMbbMAQBAYTfOOOxNtbCoCY2Cqbzlb77MKbauxwCSRnFFedtEBbijg0hs2dVotvjHO6Lwep+Sn8gMN87nq9HH/crJmv////+bBDHLOh6FCC+AHALiHPH5hiuL/+7BgpwAITmjSe7zbbHLtCl1h6m2bVaNJrO6tsbg0afT6NbY4AMF4AQNBUC8Yz//nn6nnj8GwBgAYAwAwNRFl///////////////znbooTQK456iUCXdXEm3HAY2m2KBoMq2lkhw82qzPGREQGKqDSTdFwGIXp5cwEFJQUQQ/zOotdHQVYRgcut5yh71+ocHCXbDNmr23BcKl3/+8INABfM81DVwj4+cNzEokSIEK6BgoOgYCHYGWjyApXg4kEgCIDCvDLlsxQNqL00XRb/zY0ELC4hITMkUyZIq+YIMtAxMBaQ8wIhENIrN7P1lAnT5SNC6eUbLzhHh0TGZiXCSE+CPhvk860+dQOl1E4FkwacVjq2//9I+iPwhEAkEAoPhyidWOSISiAIkguIxMfmQwTNg4kwIXZREDCBl/AXxN0u36ALEJbXcMfAGGTAagMISDlk+scRdMg+ADDAg2s2Mi6hTMzc7//YT+aJVLHCPEyPrZGtEfgAOByA4Dpr//+33UTRGS4YkiSqD///////////////7dSBLDiNWA+aLBM20oDbkDLaYmhxTRBDy+KGTOqIs6sQgYRCiRgUKBUqnBBArUBhSzqWqmhl+kcQcgy+8B2L86wUQAARgO9Eos+tijjKf7zb/+XNsiMEGRm1ng5osPOkFKBaGZDFyZFgCGgIrxIpInDP/Wr/+svVCeBmB9N6yORWndy8A5EBYcVEfmRv5HCtDZRr+tIkgsyaLNDg+AkWBsMQQ+0hvW2iUQtPDai0me///0UQSEA50kk9RDk4qHQzUSJX+mIAEmneTxUPSpS5WUW+HAmURlIEj9SPnW2P/7sGBrAAWwZtHrHKNuWoSKj2NtS5ORnUmtbo2xbLHptY0dsl2Y4o7QOFgatfby3MBcCNIAVDqSnydZcHIdJL53+kBQTfTM9J0aSzIXTIDcQVHHf/////////xU/UBf/tQTNtKAnJxojzPMIwKIJoxAVgskFncOCoYqiotgtMwI4PKNyICZPSZxivMEAgGHURldrk1K32Q+r2pRGO66onf7//+oZMlJ1OO7KA5yOmamReI0UMHDJQJxAJAjFV0f///+X2W37XrnAmaGQTU/rNuoyOIpsg32EpANA1oLRKwC4wAQORFJNSS7dbCIgPOl4u////WEIgFjS382/91BV/2qAu1W9Uya6pzEnIWaAnRqQSSj1ERGwPOXS9Ehz8y5dLXn9Co0TQoyPRZyx1NS/X///93////dQwJR9L/2/4+wKAh////////V////9/0T//////0Am4Db64Ay6ygJt6pr9Ox0x6NQzEluIY6LnIhCxblaCRl0c9Cz0WHOrLl0utIBCUDhD6Wr/MpelqAgNJXtaw/2wwj//VfCNiXlWOcwIePnUtpwh4pALJyGAPlASOF9BBND////kUNzH61Mq6pgAkECxQn2f1peUB/RLR5NvoFsXiKkjBEEIMLiltn/6huha6Nhv///rDPBAyP////////////////////////////////////////////////////////////////////g7ssCJK21oATf/cty9us67UuuAF84ImyU1O/gNCTgxAWBWcTeo/MR8cH1809FzuO84x/653/oaL///1HR0Ts685/7mnRmGv///////+////////uwYI2ABktkUWsao2xZ7HpvZ2ptk42RR6zujbFtMek8/bW2Q///////4xPH/+JM+txDbn/VdZ2lAgIaaVhEYbQ4qGCwEJxM5D7XDAwc9keRpeqh1HZqq541gCgEz6vljGGIhwNdu4Xcf98YT//jhVYQaGqJgS/MhguR9M4Yk6QonwLHyWAxJoFSBJmiCyh///9ac0JM0OGG/R6nRAeFBwU2R/+ZEwbmDLPP6ZkIIskszPgkFELGi//keFzgqlN///6gkKFGW+D4O7MwiSxbKAEH/hye1TzEQQ+h2gHhVPG9sBAimVFjPhoZdaWrWdWFAQJOVCQuKq2xiv/3bv/+X/+73///+RfzLmlo/1LUsP5B////////oP////////////5WbBv/iDNbKQ23/3fdhN8tgiU9wBAXGDMozlcJXBBKtMAcdgmEwqy60VjZKPDlMxHJ3LUoeBoN79b//g18v//3cgkAQY/ho2HttaSJdIsOaILDGgYN2BMiVmUspf///mykSKmL1W1oLY6mkWQalx2nFt9TcsHFJpzj+WXFSVn0RQIN4y0//rLAIABW////WHeKzYm/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xdvQDNtMgJb//2/TU9ZQYMNDEBx6iwLYjUA+yFmhZpSRIETJDgKAgLWhTyHpI7FJrK6z36In89r/+7BgpwAIsmRRaxqjbFMMei1ijWySTZFJ7G6NsUix6PUqKbaS/qTKlhQp////////1f///+j9aH//////yafZ4iHESV9biG5P5QzDKgUkeSb3tgPxUyCx8qnThwi5d0PKQ4KVLDVVwozPigmDi9u8MznamUeY/3WWv/68Hf/45WXSMCTHWxxJ0aL7OakVHUKFDBw+QhkgSMnF2S////RrIcVjtTc6jqXMwvyI3Qf9T8sE7Wrq5RLonQ8YnS0TQQBiLF9v/WRgjoaf///8M8HYvKjb/gK+2UAFPXYsFQXwjQPhDBwJe5VQI8GhYAwaKXBw4eTYW0eiAAmiBvILIJMrNnEf1T350LYp55/+pBCaFv///////+n////v9X//////+RjcBneHESV9diHHP/7OLOGhtZbsDDxwQG3lQmMzEBiioziNZ5QCk197Z6y8hNiY3ANbmpU3dmnMt9//xhP/+saZ3TmyygLb2Uhzlq3ZEjBjw6ApgOehfcuJpsn///+llEwQorQatqarJhgAFhRUehQ3NnomRaSOpLdAx5mgRWcrRE9DOK//UK+RL///8oBuhifn////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9v/7sGCnAApqZ1J7OqNsQeRqTT9RS5Dlj0msao2w3hGpNHzFLv/iVfbaAAHr58KC30cBKwpgsfk3Z0Lhhu+X5U2jNZyY1OoZB2BQx9retZt/nvrKAEccXof2dpgQv//////////Kjb/ovfXZBtz/+9vk6wamjLMhWo5VOPKlEIwPng4SDhTkxpQVr0VLCgaNR2bnsN1KVif9z3//qTd5rDOw+4PQkQOcsFMlb1LSSKg7xPhXAwC0EXMdhumgU////3WxQWrT3Wpb8yC2gyT66Wl8sMguykOuRJziqBFxlT3/7Ce0P///0g7wxD2GBt/yVvbaQAB2sOioIgGMvU0fGxXiAqyd6i4FuT/HnkErELYmi3SOWctZ7v1M31gnSp3/1GMSwegXbZA3WWkpJ/+sZuluQmXQEyFiwgeT6gOICMqbkgpwuC3x56KmEJoWCOxGs/3YiT0Z75r/+5Z/Wt5W2iG5hL8p8y4RR9S0i8XSDCdSeAMLApyLTrUWf+3//y+6b1NrdV6jAMeHY67+/qOtQszdaJUZS5iKeau3/3UQn///6hLBUfrJ//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcACwBnUGsao2w15GotD01LkFmdP6xqjbDVEah0PUEu////////////////////////G23JV1lhAAH0quoYCe1iz038ZUIjp3ASxkRYepWvQ7RjBlpc3evdvP1//eaACwQ22/61gbiYLdsQrpLCEk//W+Zyp6XeYkmKY0KqE0qWVChc4QJCUGFXGlqmzXY0qceiMohqrrn2oj/67+X0FnXfucqM9MZnZDSYuW/ukYlIdJHAUqANOi6q5j/0f/+1BkUlv03qqdAkhVPZba/rNT9jegzaCB1qJ5yAjnN/+sXxd////UKwIEQ9ZIC7bEq6CwAAD8rUA0A2sJDxGL0kNhYkeAqk0yekzlGfUbSJW6cp1+pD//SI4FYbDrV/2ePxLBdd0VdZaQm3//3Gn19NDyaplMQWJlSwi4CwgDzEQ0IXOYJkwZog1HhxpQQRekUyBfzm1akR1AYJ4MkapIlX7qOlAZ8jATbC5DqDO3///6mvVrfRW/dYX7FFU1Fc/NNdjiSmWeNjHrPESQZSKYngcZVf/2YUwtt///+TQ3v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwALsmPQ6xSjbDIkag0LDUuOqZE/qWaNsMERqHQtNS7/////////////////////////////////////////////////////wLdgFdJQAAB7KzlAY9E+UepkhYdwsNGhRW002Hrwwwe9E5m1zddf1P2x3gAIm///L42i23EKaSxBJLWmi9F2I8M4CeESOUJKkaYrcRo6BbUOy6qm6NDxOM4f/40vP3//9zetY/zN/TpfVDfzUXv6ZoT45AGBmAjGDJlxBMoK///+qyKataWp06kJ0REr/XvqsjUpTb7olpB3ePoqpf/nCqf////mBLdAt25KuksIAA9sg4Jw0EFBPZ0igYDXJmwRd1M1sB0Y4lS/39av6n+s8AHyHb/qiDi8t23QV1liCSX/vtymrzFekSHM0hmSkJfYfsPmRpeKrqOzW2sFCUF1ct85Kotvf///rv4frtimCPXOwwWv9F0TYnQMKDCn0ej1Epf///8y9XQTb1jkj32b+o4jUih/UbtvcmH//kal////SJb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAwwY9BrGaNsMcR6HRcNS40hj0Go0o2ws5HotBy1Lv//////////////////////////////////////////////////////////////////////////GA2QV0lCAAGY3iwDSVTpskum7hYGkZKFWz2MWnazWihEQlW/1L/u/VqAWz3/+sBXLqhbt0FdJYgkl6lLNEygILgDAMhAuCbMAmHDPBzA0krGo7idLwNAgg4xTfpFrWvqPovsssAY1ARB6CGh2UiUh0gVjgWil5djL///6fWtTs76VL1EMJLpOr+pDa36zJamsSpj//l1v///8lgLtkXtJQgAB/MhXpc+H4X2cj9qIzDZVi+0pzGSUoZrXO9X/6tIHQf//1hhI7AW65F3SWIJJdqkT61kcH6ivhVQvpUlJkMDJixqlhqUzSOycEopv/953/339/9zu+593g9IgT19Y30fUdKA+waTRjS4m6D////V1LSZ9X6FQ1Ot6/VWggy2R/zXTuddTf/pf///6yr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADIFj0Goao2wrRGoNCwpLjFGPO6nSjbDAEab8LKks////////////////////////////////////////////////////////////////////////////////////////gAbIu6CAgAD/YLQROCpDUmyBxmSvcoNJr87aqkBX/t44b3b//w3Lf/8kC2JJcirW40iSftUal0SIEkhDMERSMHWBREBpDYjcNPLR8hC2VQ+MOAKCXsr/P3bWXgCCBWRVb/TMBywMBJAlXHg3TQM2b9VD1f/W677fvcmi1Q/Q+v/6zOtFbGBk3//////rPADvMiCTPHDAAH9CibUh7Ju2RUAX/DAUcodpn9jVViKecrq5bzXZv+nUCqf//oGAbAZ3iRBIfX2xxr7M6JiOoMOEbIKkXQIjgD1YNjoDAoXCTwzJFiZCEORG3WpP/dfZSIDQMbyer/disCxQF0xIm6aBKr/zN/vUv/+//k2Vf93eplP/7pbWOJ///////Ot/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAM+WPM+lSjaCyEaZ8HLUsKgPMx5VKLoLmR5nwdNSz///////////////////////////////////////////////////////////////////////////////////////////////////////////+AA7wIG8AYMAAfwdPFILhFPEBU88TFCVQT/LfMkdGPU++///r9AQZ//84DAWgzODkBw9usjaX2mbgyCRMPOUyGAPIgcUgF2h7hPmhPmhfCy0YZ1HapD37qV8LKTdVf/SMR1AOhAWrFV8x/1IO+q23r1fX+vkqjqi1QZ+SVW7///JA4A7iKTFGDAAH+T5m+N7GaFDJxgigwkJfqlcp/YkOjpZrLf9//+sQdf/+cDsUHBWZnMDh7dW0kvUiq6RdJcCBwZEipSAodA3gYPiAsNHETouIgpFhQAqzq3fRR/a60fLANvGi1Mh+plHR+BOEGqjqDO3+pXp/7/9f+8ov/17V//v1Vsh//////51H////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAAzAY8v6dKNoLCRpjwdHSwu88zPlUougrxGmvBwpLP//////////////////////////////////////////////////////////////////////////////////////////////////AAdoMThwKEAAPyHOYfdbMvjEbCwY7g9Jpy6m6mdI7zULmuf///gsf//QIgwAPDygpD67ayN/UoRo41AiDZAYTIIT4N5AOgFC1oY8oLMkTga42b7JUeut/1h3V3Z61fZMWYBg7QEohEzRBMw/6a21spB109d1dBW+1O9EtmCpuq8VfScvvPP///wWAAd4MVmBsIAAP78JuCZHcoSq43jeEaVFbUO01Kh/Cbn//6ev9Rab//QF8NQHcGgxWX220jY0mr46EQQGDgjAshOwGlIuwRWHabEFJ48GEiQV9BFXstdvdQhAbLr9OtKzoAYEEC3QrspZY1fstqv97LUtSlrqbW3yg+74x9t4+gL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADYc8zPjzougqRHmPBy1LCUDzM+VSi6CiEaa8F7Us///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+DAwOIJD0UQAAf19ucns7DzhtSIrxXdTNy6h1l+f6/W9v/6x6//9YNI8VADA8oCQ922kbH/QZgOBCSGaL6A9AWrBhUY46oxMkRyyEV1b6vRsrXYUue/t6KiKgPYgiqlZalmSv+tv/tVUirtU6H1Fj/sq1YwgAODwYLMYYUAAf8syNTlDkB3h3HQE6tTKpxjI1Bw8/PRr//x+//8IE+AUAaEBHaCytJj/qKYrgIaBxhDygENgLoLgBwkkeNkUxLUf6v//FhP9f/UPsJSwsyZLs//qttr/1/1v/Sb//639N51nVWfRR////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwANzU3L+nKjaidkaY8HJ0sJCPMroNKLoJMRpbQMHSz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////gDMDGKw4FEAAH8/+vRR86uUnxQqWLKqtNdrLYnt/3///6iv//whBMAW2CagRxokf8EAFQgUOMbBgUHgAseDlSDF1I1cZ03Xb//90TguZD+31EPAWZgoLLiabL9W2h6tr57tarrPOptqz36qKFvRIrAAGZnsEDAAHK7VMak2OOOSWhq1zvb1rS+sP//Tb//eR//8RASAYlYdhdyh/qUEAiOwWMkYTYICQGgHh4g8ZIOeeQArL//7V71i9Wrf/4CwQXeWk1qdu7KapJ93Wrq+6ltS0ELXsxilYq3UGb5di3ijSX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA3HPEngVJroI+RpTANKSwmk0SOi0mtAj5FksBopLP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAKzLQyADuLxQdasiogJJqaoVRmms5Y00h1r////x9//4MDYMBxCRBNRtIc/yiQRBqNBYKXiZAqSAHPg2xAYHDMk8ikwtX//2t8ZxJrf/IsBBQLiNXWo6g1NdTTjK2VU/VXm7PGmgZXCKzdH+hzDKCwbYhLjiEAPX3Y+PBfIAA8mBySgeEQYX0E6x/Pf2//TkN//8MgANxGRsR1sMZ4lgbAtPDAhGnPHDwFak/hnrU1e//+qr/31OscZq2pv6llgIFAXuRU6RmkTjV03Rs+eLWiKkJqd/+qHWEk///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADlMlyWgaolAihGksAyJLCCyPIYDmaUB/EaQkChUo/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AAGTIwhAD/oZNuaGGT0EYcJCv1O5Y9gnP/////1Yj//8MMAEmhGorqj+vlccPU/VmiBk6BlhhJl1pblj2ve5//t/9XydfX1frMAawFsW4WDxFrJNBCV8ygdAzmWPUV+tPa6oUCDToIgAUmNU1NC+F8AOMBC0oZcwWrY////vS///QTDA23KY2BBG2x4c8AwHCQUVjMF8PgAHIhsQz5QOqyyuzf/+vRUJ9f/+iB2AXLVJTJT0kGUr3fZq1L9a1U9Sut1zBsh11I970i////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAOezzJaDRq4B+kaSwCJUsIVI8loOGpQHGRpFAaFSz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////hhhsSMIQArF2ZmB0J4GzZNhoROn0UpGP///+v//QJjgIBIbGA3G2x4T/mTKCidJNlSANK8Y8qBbWOuVc//////yK1d1/9EJOBa1LGjQM8pGSUSXBlKcdh5c5U4XMLNVuVrKBgAMRjP/j5JI3NB3AWtBvoxxipapS///////C2CADYjQV1By/+sSDJ5Z3mvDdyFLKqW1jr7l/////9XyYfWv6vMQni2nsAiFdbmMWylKpVy2awkeZ1WG/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA72I0hgOYJQHURpKwYiSwdQjx+AzalAXgakLALQmP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wGG2a2EHrvUsrJmAQ8B4GQDeSSNX1Hv//////gxwgEmYiK1KcHvUEMBmimRgNagZ3CiBvJWPPlBL//b/n63/r9YEKU5fNmnA60RDd5Q4RhcFZiMe13/XlwAEEYkEH4QDWcOhB2wQCE6l5HnXf//5MZXeUSUTmw/UDUYJ8WbAQBgXKCPhOJeRSak2r1V//5d//7hJQ9shbRKlshQtPUzRvb//tQoaV///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcADwIjx0g0alAYAaj4AVkmB0SNHYDRqUBukWPsCgko///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QQ7goH+GAnjyJjCRyIvm597v/93/9f+RBIIiZILKpyb/BCACgkyIeBQsBtCYqYt5on02///rqzle9X/HoK5xAuktMqlE3jk2JO1b/+lRwpnZhQAADUKKDGs6RRBCIAU5idRBxOpdTr///+n//ggQP1BJVPD/FnhdY+TIETwHVBjmifi6bI61////p//9QUAnRyNYMBtYzbyMnfYa1XfqCZ8RuvS1f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAPqSNHSDRqUBwEaPgGgkoFWI0bANGpQEeFo6AAYJD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5I36FB2+9ikVC+TAERIHDGDZIgn6v///5///BMCB0gQev4W3DSTMmAIgwOOIGyRRNBPX//vv///+GJIPusrqe3qZ//+US4yABWhAZyDdwkeA6RJvbWNX/5UAB6AMKwkUiKywEEwOhC8LabI9X/+/////CcJioYnS1JV9fu/RLKBP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA/8I8bAE1JQE4FI1AAZJATojR0AUOlATwVjoABgkP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAASQFWzhTs4BfMDV2btX+r///AE6QPMMdHs8bjMAMYSJGavV//////+eHJF++p7WTS45FY1+ic6cEAAakICbx1dLBi59uRcfb/5yff+sADpASVDHJFvQOhKBg8vkk3q////8z/9QPDLzxA4WY6oBruIXBqp59KmNbRfyH//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAD7Ujx0gROlASoUjoABkkBpCNH4DQ6UA/hSNQAGCQ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+ABcBITPe2GvC90tyCX/+j//5kABFxkiNSn+wZQG054QGBb8XS8v1t//b///+kDTSTBgeWmPdlQIUyKhiXnEArL/1FZC2g6sAAAsgY93QEqQCSxRPo//UAAQHEAf35/GoNpZMAn4HrGhaf////9P/qtDwq5FlbxXddqTPZFjbJqLf5KSQpf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BgpwAP+yNHWDI6UBZjSOQCgkkFBI0bYFCpQECFI1AAYJD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////gAAGIjvMgxaCLQXjVTdX///6g/////AAAUQBQYrBeZIEAMCXA2NUl////X1PZ//5Q0Ydvhv3X9nu6o3v/ytAAABhAwz+bHCHod++K/s/oAIQUJA+efQsfR5i+GLAA4n3+r/////t/gh6pfrGbueYVUiiqo6yhCx3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sGCnAA/7I8dYMxJQHwNI6wJiSAScjR1gyElAKoSjUABglf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+AAAYgSA1bBbYCb1mzK////pw3////////////////ggAOImuOf+TxdM0QaMBOyCPZvbV3dv9Pman/8E/Z7UoWZhuzlgAACyBc/7DhiYkAAABIkRWbeBo9B81Nf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKcAD/sKxqAASSo/ITjUAA8lQOQlGIAARKAghKNQABSV////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4AABZA+fgKMhEdj/////////////////////////////////////////////////////////////////////8AAAEAdQFkgAABADuAoFmP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7sECnAA/8AEuAAAAIToAJcAAAAQAAAS4AAAAgAAAlwAAABP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwQKcAD/wAS4AAAAhOgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFRBRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  };
  const _cache = {};
  function _getAudio(key){
    if(!_cache[key]){ _cache[key] = new Audio(_sounds[key]); _cache[key].volume = 0.35; }
    return _cache[key];
  }
  // Map sound types to files
  const _map = {
    switch:'nav', open:'nav', close:'nav', tick:'elem',
    confirm:'elem', blobAi:'elem', blobGame:'elem',
    nurawatch:'alert'
  };
  return function(type){
    try{
      const key = _map[type] || 'elem';
      const audio = _getAudio(key);
      audio.currentTime = 0;
      audio.play().catch(()=>{});
    }catch(e){}
  };
})();

// CSS animation for panel open
(function injectPanelAnimStyle(){
  const s=document.createElement('style');
  s.textContent=`
    @keyframes panelIn{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
    #ai-blob-panel{display:none;flex-direction:column;}
    .quiz-option-btn:hover{border-color:var(--border-accent)!important}
  `;
  document.head.appendChild(s);
})();

// Makesure nav function also calls playUiSound
const _origNav=nav;
window.nav=function(id,el){
  _origNav(id,el);
  playUiSound('switch');
};
