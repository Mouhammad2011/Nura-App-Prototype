(() => {
  const MAX_ENTRIES = 3;

  const install = () => {
    const canvas = document.getElementById('cube-3d-canvas');
    const healthText = document.getElementById('nura-health-text');
    if (!canvas || document.getElementById('nura-watch-feed')) return Boolean(canvas);

    // Rename the panel title so it reads correctly now that the cube is gone.
    const panel = canvas.closest('.panel');
    const title = panel?.querySelector('.panel-title');
    if (title && /cube light engine/i.test(title.textContent)) title.textContent = 'Nura Watch — Live Feed';

    const feed = document.createElement('div');
    feed.id = 'nura-watch-feed';
    feed.className = 'nura-watch-feed';
    feed.innerHTML = '<div class="nwf-head"><span class="nwf-dot"></span>Live · Nura Watch</div><div class="nwf-list" id="nura-watch-feed-list"></div>';
    canvas.insertAdjacentElement('afterend', feed);

    const list = feed.querySelector('#nura-watch-feed-list');
    const addEntry = message => {
      if (!message) return;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const entry = document.createElement('div');
      entry.className = 'nwf-entry';
      entry.innerHTML = `<span class="nwf-time">${time}</span><span class="nwf-msg"></span>`;
      entry.querySelector('.nwf-msg').textContent = message;
      list.prepend(entry);
      while (list.children.length > MAX_ENTRIES) list.lastElementChild.remove();
    };

    if (healthText?.textContent) addEntry(healthText.textContent);
    let lastSeen = healthText?.textContent || '';
    if (healthText) {
      new MutationObserver(() => {
        const current = healthText.textContent;
        if (current && current !== lastSeen) {
          lastSeen = current;
          addEntry(current);
        }
      }).observe(healthText, { childList: true, characterData: true, subtree: true });
    }
    return true;
  };

  const start = () => {
    let tries = 0;
    const timer = setInterval(() => { if (install() || ++tries > 60) clearInterval(timer); }, 100);
    install();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
