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
    da: {Settings:'Indstillinger', Profile:'Profil', Account:'Konto', Devices:'Enheder', Audio:'Lyd', UI:'Udseende', Preferences:'Præferencer', Security:'Sikkerhed', Language:'Sprog', Theme:'Tema', Notifications:'Notifikationer', 'Quiet Hours':'Stilletid', 'Display Name':'Visningsnavn', Age:'Alder', Subscription:'Abonnement', 'Manage Subscription':'Administrer abonnement', 'Hardware Sync':'Hardware-synkronisering', 'Master UI Volume':'Hovedlydstyrke', 'Audio Player Volume':'Afspillerlydstyrke', Soundscape:'Lydlandskab', 'Accent Colour':'Accentfarve', 'Stress Alert Threshold':'Stressalarmgrænse', 'Password Reset':'Nulstil adgangskode', Verification:'Bekræftelse', 'Last Login':'Seneste login', Close:'Luk', Dark:'Mørk', Light:'Lys', 'Sign Out':'Log ud', 'Login / Create Account':'Log ind / Opret konto', Calendar:'Kalender', Dashboard:'Oversigt', 'Nura AI':'Nura AI', 'Focus Timer':'Fokustimer', 'Verify later':'Bekræft senere', 'Verify now':'Bekræft nu', 'Keep me logged in on this device':'Hold mig logget ind på denne enhed'},
    de: {Settings:'Einstellungen', Profile:'Profil', Account:'Konto', Devices:'Geräte', Audio:'Audio', UI:'Oberfläche', Preferences:'Einstellungen', Security:'Sicherheit', Language:'Sprache', Theme:'Design', Notifications:'Benachrichtigungen', 'Quiet Hours':'Ruhezeiten', 'Display Name':'Anzeigename', Age:'Alter', Subscription:'Abonnement', 'Manage Subscription':'Abonnement verwalten', 'Hardware Sync':'Hardware-Synchronisierung', 'Master UI Volume':'Hauptlautstärke', 'Audio Player Volume':'Player-Lautstärke', Soundscape:'Klanglandschaft', 'Accent Colour':'Akzentfarbe', 'Stress Alert Threshold':'Stressalarm-Schwelle', 'Password Reset':'Passwort zurücksetzen', Verification:'Bestätigung', 'Last Login':'Letzte Anmeldung', Close:'Schließen', Dark:'Dunkel', Light:'Hell', 'Sign Out':'Abmelden', 'Login / Create Account':'Anmelden / Konto erstellen', Calendar:'Kalender', Dashboard:'Übersicht', 'Nura AI':'Nura AI', 'Focus Timer':'Fokus-Timer', 'Verify later':'Später bestätigen', 'Verify now':'Jetzt bestätigen', 'Keep me logged in on this device':'Auf diesem Gerät angemeldet bleiben'}
  };
  function applyLanguage(language) {
    const lang = ['da','en','de'].includes(language) ? language : 'da';
    const table = nuraTranslations[lang] || {};
    document.documentElement.lang = lang;
    document.querySelectorAll('body *:not(script):not(style):not(svg):not(path)').forEach(el => {
      if (el.children.length) return;
      const current = (el.dataset.nuraOriginal || el.textContent || '').trim();
      if (!current) return;
      if (!el.dataset.nuraOriginal) el.dataset.nuraOriginal = current;
      if (table[current]) el.textContent = table[current];
      else if (lang === 'en') el.textContent = current;
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
    body.innerHTML = '<div class="ft-main"><div class="ft-label" id="ft-label">FOCUS SESSION</div><div class="ft-time" id="ft-time">25:00</div><select class="ft-mode-select" aria-label="Focus timer mode" onchange="nuraSelectFocusPreset(this.value)"><option value="25|Focus Session">25 min · Focus Session</option><option value="50|Deep Work">50 min · Deep Work</option><option value="25|Focus Regain">25 min · Focus Regain</option><option value="10|Breather">10 min · Breather</option><option value="5|Calm Down">5 min · Calm Down</option></select></div><div class="ft-actions"><button class="ft-btn" id="ft-play-btn" onclick="toggleFocusTimer()">Start</button><button class="ft-skip" onclick="resetFocusTimer()" title="Reset timer"><span class="i-wrap" style="width:15px;height:15px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2-9.5L1 10"/></svg></span></button></div>';
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
      mark.textContent = 'NURA • EMAIL VERIFICATION REQUIRED';
    } else if (mark) mark.remove();
  }

  function showVerificationPrompt(user) {
    if (!user || user.emailVerified || document.getElementById('nura-verify-overlay')) return;
    const laterKey = 'nura-verify-later-at-' + user.uid;
    const laterAt = Number(localStorage.getItem(laterKey) || 0);
    if (laterAt && Date.now() - laterAt < 2 * 24 * 60 * 60 * 1000) return;
    const overlay = document.createElement('div'); overlay.id = 'nura-verify-overlay'; overlay.className = 'nura-verify-overlay';
    overlay.innerHTML = '<section class="nura-verify-card" role="dialog" aria-modal="true"><h2>Verify your email</h2><p>Until you verify, Nura runs in guest mode and does not save a profile to Firebase.</p><div class="nura-verify-actions"><button class="btn" id="nura-verify-later">Verify later</button><button class="btn primary" id="nura-verify-now">Verify now</button></div></section>';
    document.body.appendChild(overlay);
    overlay.querySelector('#nura-verify-later').onclick = () => { localStorage.setItem(laterKey, String(Date.now())); overlay.remove(); };
    overlay.querySelector('#nura-verify-now').onclick = async () => { try { await user.sendEmailVerification({url: location.origin + location.pathname, handleCodeInApp:false}); localStorage.setItem(laterKey, String(Date.now())); overlay.remove(); dialog('Verification email sent', 'Open the link in your inbox, then sign in again.'); } catch (e) { dialog('Could not send verification', e.message || 'Try again shortly.'); } };
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
    if (upgrade && !document.getElementById('ud-upgrade-logo')) { const logo=document.createElement('img'); logo.id='ud-upgrade-logo'; logo.className='upgrade-nura-logo'; logo.src='assets/nura-logo.png'; logo.alt=''; upgrade.replaceWith(logo); }
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
