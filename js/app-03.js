
// V9: Activation gate removed â€” Nura Mind opens directly
window.addEventListener('DOMContentLoaded',()=>{
  // Remove gate if it somehow gets created
  setTimeout(()=>{
    document.querySelectorAll('.nura-blob-gate').forEach(el=>el.remove());
    document.querySelectorAll('.nura-chat-hidden').forEach(el=>{
      el.classList.remove('nura-chat-hidden');
    });
  }, 100);
});
