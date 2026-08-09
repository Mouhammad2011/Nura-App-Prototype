/* Turn visible close controls into Mac-style red dots. */
(()=>{document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('button').forEach(b=>{const title=(b.title||'').toLowerCase(),text=(b.textContent||'').trim();if(title.includes('close')||title.includes('dismiss')||text==='×'||text==='✕'||text==='X')b.classList.add('mac-close')})})();})();
