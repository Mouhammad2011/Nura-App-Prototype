
(function(){
window.addEventListener('load',()=>{
  /* Remove small bottom-right blob if present */
  document.querySelectorAll('[id*="blob"],[class*="blob"]').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.width<120 && r.height<120 && r.right>window.innerWidth-200 && r.bottom>window.innerHeight-200){
      el.remove();
    }
  });

  /* Sync week/day labels to actual current day */
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today=new Date().getDay();
  document.querySelectorAll('.wday').forEach((d,i)=>{
    d.textContent=days[i];
    d.classList.toggle('today',i===today);
  });

  /* Daily Goal graph opens calendar */
  const dg=document.getElementById('week-bars')||document.getElementById('prog-fill');
  if(dg){
    dg.style.cursor='pointer';
    dg.onclick=()=>{
      let c=document.getElementById('calendar-popup');
      if(!c){
        c=document.createElement('div');
        c.id='calendar-popup';
        c.style='position:fixed;inset:15% 25%;background:#111;border:1px solid #666;z-index:99999;padding:20px;border-radius:16px;overflow:auto';
        const now=new Date();
        c.innerHTML='<h2>Calendar</h2><input type="date" value="'+now.toISOString().slice(0,10)+'"><br><br><button onclick="this.parentElement.remove()">Close</button>';
        document.body.appendChild(c);
      }
    };
  }

  /* Music button opens SoundScape area */
  const musicBtn=document.getElementById('music-player-btn') || document.querySelector('[title*="audio player"]');
  if(musicBtn){
    musicBtn.onclick=(e)=>{
      e.preventDefault();
      const s=document.querySelector('.soundscape-box');
      if(s){ s.scrollIntoView({behavior:'smooth',block:'center'}); }
    };
  }

});
})();
