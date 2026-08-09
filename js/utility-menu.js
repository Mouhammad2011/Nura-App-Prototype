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
    resultsPanel.innerHTML = '<div class="nura-utility-panel-head"><strong>Quiz results</strong><button class="nura-utility-close" aria-label="Close results">×</button></div><div id="nura-results-list"></div>';
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
        ? entries.map(entry => `<div class="nura-result-row"><strong>${entry.topic || 'Quiz'}</strong><br>${entry.score ?? 0}% · ${new Date(entry.at || Date.now()).toLocaleDateString()}</div>`).join('')
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
    position();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', install) : install();
})();
