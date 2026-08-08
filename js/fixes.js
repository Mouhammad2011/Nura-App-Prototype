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
    const laterAt = Number(localStorage.getItem('nura-verify-later-at') || 0);
    if (laterAt && Date.now() - laterAt < 2 * 24 * 60 * 60 * 1000) return;
    const overlay = document.createElement('div'); overlay.id = 'nura-verify-overlay'; overlay.className = 'nura-verify-overlay';
    overlay.innerHTML = '<section class="nura-verify-card" role="dialog" aria-modal="true"><h2>Verify your email</h2><p>Until you verify, Nura runs in guest mode and does not save a profile to Firebase.</p><div class="nura-verify-actions"><button class="btn" id="nura-verify-later">Verify later</button><button class="btn primary" id="nura-verify-now">Verify now</button></div></section>';
    document.body.appendChild(overlay);
    overlay.querySelector('#nura-verify-later').onclick = () => { localStorage.setItem('nura-verify-later-at', String(Date.now())); overlay.remove(); };
    overlay.querySelector('#nura-verify-now').onclick = async () => { try { await user.sendEmailVerification({url: location.origin + location.pathname, handleCodeInApp:false}); localStorage.setItem('nura-verify-later-at', String(Date.now())); overlay.remove(); dialog('Verification email sent', 'Open the link in your inbox, then sign in again.'); } catch (e) { dialog('Could not send verification', e.message || 'Try again shortly.'); } };
  }

  const legacyCropSave = window.pfpSaveCrop;
  window.pfpSaveCrop = function () {
    if (typeof legacyCropSave === 'function') legacyCropSave.apply(this, arguments);
    syncAvatar();
    if (typeof window.renderUserProfile === 'function') window.renderUserProfile();
  };

  document.addEventListener('DOMContentLoaded', () => {
    syncAvatar(); applySavedPreferences(); addVerificationButton(); installFocusPopup(); simplifyFocusTimer(); installDeviceGate();
    if (typeof _auth !== 'undefined') _auth.onAuthStateChanged(user => { setVerificationState(user); showVerificationPrompt(user); });
  });
})();
