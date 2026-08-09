(() => {
  const apply = () => {
    const resultsTab = document.getElementById('nura-results-tab');
    if (!resultsTab) return;
    resultsTab.textContent = 'RESULTS';
    resultsTab.setAttribute('aria-label', 'Quiz results');
    resultsTab.setAttribute('title', 'Quiz results');
  };
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', apply)
    : apply();
})();
