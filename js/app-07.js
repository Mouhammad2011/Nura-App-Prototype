
window.nuraDialog = function({title='', body='', icon='info', confirmText='OK', cancelText=null, input=null}={}) {
  return new Promise(resolve => {
    const overlay = document.getElementById('nura-dialog-overlay');
    const iconEl  = document.getElementById('nura-dialog-icon');
    const titleEl = document.getElementById('nura-dialog-title');
    const bodyEl  = document.getElementById('nura-dialog-body');
    const inputEl = document.getElementById('nura-dialog-input');
    const btnsEl  = document.getElementById('nura-dialog-btns');
    if(!overlay){ resolve(null); return; }

    const icons = {
      danger: {bg:'rgba(255,80,80,.1)', border:'rgba(255,80,80,.25)', svg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff8080" stroke-width="1.8" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'},
      info:   {bg:'var(--accent-glow)', border:'var(--border-accent)', svg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'},
      edit:   {bg:'var(--accent-glow)', border:'var(--border-accent)', svg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="1.8" stroke-linecap="round"><path d="M17 3a2.8 2.8 0 0 1 4 4L7 21l-4 1 1-4Z"/></svg>'},
      cancel: {bg:'rgba(255,160,0,.1)', border:'rgba(255,160,0,.25)', svg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffa040" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'}
    };
    const ic = icons[icon] || icons.info;
    iconEl.style.cssText = `width:44px;height:44px;border-radius:var(--r);background:${ic.bg};border:1px solid ${ic.border};display:flex;align-items:center;justify-content:center;margin:0 auto 16px`;
    iconEl.innerHTML = ic.svg;
    titleEl.textContent = title;
    bodyEl.innerHTML = body;

    if(input !== null){
      inputEl.style.display = 'block';
      inputEl.value = input;
      setTimeout(()=>{ inputEl.focus(); inputEl.select(); }, 50);
    } else {
      inputEl.style.display = 'none';
      inputEl.value = '';
    }

    btnsEl.innerHTML = '';
    function close(val){ overlay.style.display = 'none'; resolve(val); }
    if(cancelText){
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = cancelText;
      cancelBtn.style.cssText = "flex:1;padding:10px;background:var(--bg3);border:1px solid var(--glass-border);color:var(--text2);font-family:'Outfit',sans-serif;font-size:13px;border-radius:var(--r);cursor:pointer";
      cancelBtn.onclick = () => close(null);
      btnsEl.appendChild(cancelBtn);
    }
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = confirmText;
    confirmBtn.style.cssText = icon === 'danger'
      ? "flex:1;padding:10px;background:rgba(255,80,80,.12);border:1px solid rgba(255,80,80,.3);color:#ff8080;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;border-radius:var(--r);cursor:pointer"
      : "flex:1;padding:10px;background:var(--accent-glow);border:1px solid var(--border-accent);color:var(--accent2);font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;border-radius:var(--r);cursor:pointer";
    confirmBtn.onclick = () => close(input !== null ? inputEl.value : true);
    btnsEl.appendChild(confirmBtn);

    overlay.style.display = 'flex';
    overlay.onclick = (e) => { if(e.target === overlay) close(null); };
    inputEl.onkeydown = (e) => { if(e.key === 'Enter') confirmBtn.click(); };
  });
};
