(() => {
  const labels = { 'nura-results-tab': 'RESULTS', 'nura-chathist-tab': 'CHATS', 'nura-src-tab': 'SOURCES' };
  const place = () => {
    const bar = document.querySelector('.tutor-topbar');
    const tabs = Object.keys(labels).map(id => document.getElementById(id));
    if (!bar || tabs.some(tab => !tab)) return false;
    let menu = document.getElementById('nura-utility-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.id = 'nura-utility-menu';
      bar.append(menu);
    }
    tabs.forEach(tab => {
      tab.querySelectorAll('svg,.nura-utility-icon').forEach(icon => icon.remove());
      tab.textContent = labels[tab.id];
      if (!tab.dataset.topbarMenuBound) {
        tab.dataset.topbarMenuBound = 'true';
        tab.addEventListener('click', () => {
          const active = tab.id;
          if (active !== 'nura-chathist-tab') document.getElementById('nura-chathist-panel')?.classList.remove('open');
          if (active !== 'nura-src-tab') document.getElementById('nura-sources-panel')?.classList.remove('open');
          if (active !== 'nura-results-tab') document.getElementById('nura-results-panel')?.classList.remove('open');
        });
      }
      menu.append(tab);
    });
    const emptyRail = document.querySelector('.tutor-main > div[style*="position:absolute"]');
    if (emptyRail && !emptyRail.querySelector('button')) emptyRail.remove();
    return true;
  };
  const start = () => {
    let tries = 0;
    const timer = setInterval(() => { if (place() || ++tries > 50) clearInterval(timer); }, 80);
    place();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
