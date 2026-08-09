(() => {
  const start = () => {
    const video = document.getElementById('nura-desert-video');
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      video.classList.add('nura-video-ready');
    };
    const warmUp = () => {
      if (typeof video.requestVideoFrameCallback !== 'function') {
        window.setTimeout(reveal, 220);
        return;
      }
      let frames = 0;
      const next = () => {
        video.requestVideoFrameCallback(() => {
          frames += 1;
          if (frames >= 3) reveal();
          else next();
        });
      };
      next();
    };
    video.addEventListener('playing', warmUp, { once: true });
    video.play().catch(() => {
      video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
    });
    if (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) warmUp();
    window.setTimeout(reveal, 1800); // Never leave the fallback visible if a browser skips callbacks.
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
