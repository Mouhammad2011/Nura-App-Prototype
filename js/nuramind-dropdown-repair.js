(() => {
  // The panels already know how to open/close themselves (nura-ui.js). This script no longer
  // re-binds their click handlers (that caused a race where a second click-handler could
  // instantly reopen a panel the app had just closed). It only keeps the "slide down under
  // the topbar" position variable correct, and cleans up mojibake characters that show up in
  // dynamically-rendered text (the encoded "\u00b7" and "\u00d7" bytes render as garbled symbols).
  const panelIds = ['nura-chathist-panel', 'nura-sources-panel', 'nura-results-panel'];
  const position = () => {
    const bar = document.querySelector('.tutor-topbar');
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    document.documentElement.style.setProperty('--nura-utility-top', `${Math.round(rect.bottom - 2)}px`);
  };
  const fixMojibake = root => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(textNode => {
      if (/Â·|Ã—|â—|â€¢/.test(textNode.nodeValue)) {
        textNode.nodeValue = textNode.nodeValue
          .replace(/Â·/g, '\u00b7')
          .replace(/Ã—/g, '\u00d7')
          .replace(/â—/g, '\u25cf')
          .replace(/â€¢/g, '\u2022');
      }
    });
  };
  const observer = new MutationObserver(mutations => {
    let reposition = false;
    mutations.forEach(m => {
      if (m.type === 'attributes' && panelIds.includes(m.target.id) && m.target.classList?.contains('open')) {
        reposition = true;
        fixMojibake(m.target);
      }
      if (m.type === 'childList') {
        const host = m.target.closest?.('#nura-results-panel, #v10-results, #nura-chathist-panel, #nura-sources-panel') || m.target;
        fixMojibake(host);
      }
    });
    if (reposition) position();
    enforceResultsWidth();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true, childList: true });
  window.addEventListener('resize', position);
  const start = () => { position(); fixMojibake(document.body); enforceResultsWidth(); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();

  // Belt-and-suspenders: an inline style set with "important" outranks *every* stylesheet rule,
  // no matter its selector or load order, so this is a guaranteed fix if any CSS file still has
  // a mismatched width rule for the legacy results card hiding somewhere.
  function enforceResultsWidth() {
    const legacyCard = document.querySelector('.v10-results-card');
    if (legacyCard) {
      legacyCard.style.setProperty('width', 'min(900px, calc(100vw - 32px))', 'important');
      legacyCard.style.setProperty('max-width', 'none', 'important');
    }
  }
})();
