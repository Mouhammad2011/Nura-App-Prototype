(() => {
  const start = () => {
    const video = document.getElementById('nura-desert-video');
    if (!video) return;
    const reveal = () => video.classList.add('nura-video-ready');
    video.addEventListener('canplay', () => { video.play().then(reveal).catch(() => {}); }, { once:true });
    video.addEventListener('playing', reveal, { once:true });
    video.addEventListener('error', () => video.classList.remove('nura-video-ready'));
    video.load();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
