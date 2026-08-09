(() => {
  const entries = () => JSON.parse(localStorage.getItem('nura-quiz-results') || '[]').slice().reverse();
  const addGraph = () => {
    const list = document.getElementById('nura-results-list');
    const values = entries();
    if (!list || !values.length || list.querySelector('#nura-results-chart')) return;
    const latest = values[0];
    const previous = values[1];
    const change = previous ? Number(latest.score) - Number(previous.score) : null;
    const graph = document.createElement('div');
    graph.id = 'nura-results-chart';
    values.slice(0, 8).reverse().forEach(entry => {
      const score = Math.max(0, Math.min(100, Number(entry.score) || 0));
      const bar = document.createElement('div');
      bar.className = 'nura-score-bar';
      bar.dataset.score = score;
      bar.style.height = `${Math.max(9, score)}%`;
      graph.append(bar);
    });
    const summary = document.createElement('div');
    summary.id = 'nura-results-summary';
    summary.innerHTML = `Latest score: <strong>${latest.score}%</strong>${change === null ? '' : ` | ${change >= 0 ? '+' : ''}${change}% versus your previous quiz`}`;
    list.prepend(summary);
    list.prepend(graph);
  };
  const show = () => {
    const button = document.getElementById('nura-results-tab');
    if (button) button.click();
    window.setTimeout(addGraph, 40);
    // NuraQuiz's older modal is superseded by the new score pop-up.
    window.setTimeout(() => document.getElementById('v10-results')?.classList.remove('show'), 80);
  };
  document.addEventListener('nuraquizcomplete', show);
  document.addEventListener('click', event => {
    if (event.target.closest('#nura-results-tab')) window.setTimeout(addGraph, 40);
  });
})();
