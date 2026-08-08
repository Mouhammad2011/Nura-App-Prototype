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

  // Use the key the user entered. The previous version always returned only an
  // unrelated Firestore config value, so Groq was never called with the new key.
  window.getApiKey = function () {
    const field = document.getElementById('api-key-input');
    return (field && field.value.trim()) || localStorage.getItem('nura-api-key') || window._nuraConfigKey || '';
  };
  window.saveApiKey = function () {
    const field = document.getElementById('api-key-input');
    const key = field && field.value.trim();
    if (!key) return dialog('Missing API key', 'Paste a Groq API key before saving.');
    localStorage.setItem('nura-api-key', key);
    dialog('Groq key saved', 'Your key is ready for Nura Mind. Try sending a message now.');
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
    const user = window._auth && _auth.currentUser;
    if (!user || !user.email) return dialog('No account email', 'Sign in with an email account before requesting a reset.');
    try {
      await _auth.sendPasswordResetEmail(user.email, { url: location.origin + location.pathname, handleCodeInApp: false });
      dialog('Reset email sent', `A password-reset link was sent to ${user.email}.`);
    } catch (error) { dialog('Could not send reset email', error.message || 'Check your Firebase Authentication configuration.'); }
  };

  window.sendVerificationEmail = async function () {
    const user = window._auth && _auth.currentUser;
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

  function addGroqKeyControl() {
    const profilePanel = document.getElementById('spanel-profile');
    if (!profilePanel || document.getElementById('nura-groq-key-control')) return;
    const row = document.createElement('div');
    row.id = 'nura-groq-key-control'; row.className = 's-row';
    row.innerHTML = '<label class="s-label">Groq API key</label><div style="display:flex;gap:8px;flex:1"><input class="modal-input" type="password" autocomplete="off" placeholder="gsk_..." style="min-width:0"/><button class="s-btn">Save key</button></div>';
    const field = row.querySelector('input');
    field.value = localStorage.getItem('nura-api-key') || '';
    row.querySelector('button').onclick = () => { document.getElementById('api-key-input').value = field.value; window.saveApiKey(); };
    profilePanel.appendChild(row);
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
    launch.className = 'nura-focus-launch'; launch.textContent = 'Focus timer';
    launch.onclick = () => overlay.classList.add('open');
    overlay.onclick = e => { if (e.target === overlay) overlay.classList.remove('open'); };
    topbar.prepend(launch);
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

  // The cropper stored `avatar`, while another profile renderer expected `pfp`.
  // Synchronise both names whenever a saved profile is rendered.
  function syncAvatar() {
    try {
      const p = JSON.parse(localStorage.getItem('nura-user-profile') || '{}');
      if (p.avatar && !p.pfp) { p.pfp = p.avatar; localStorage.setItem('nura-user-profile', JSON.stringify(p)); }
      if (p.pfp && !p.avatar) { p.avatar = p.pfp; localStorage.setItem('nura-user-profile', JSON.stringify(p)); }
    } catch (_) {}
  }

  const legacyCropSave = window.pfpSaveCrop;
  window.pfpSaveCrop = function () {
    if (typeof legacyCropSave === 'function') legacyCropSave.apply(this, arguments);
    syncAvatar();
    if (typeof window.renderUserProfile === 'function') window.renderUserProfile();
  };

  document.addEventListener('DOMContentLoaded', () => {
    syncAvatar(); applySavedPreferences(); addVerificationButton(); addGroqKeyControl(); installFocusPopup(); installDeviceGate();
  });
})();
