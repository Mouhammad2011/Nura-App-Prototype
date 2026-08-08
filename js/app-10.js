
(function NuraV9Final(){
'use strict';

/* ═══════════════════════════════════════════════════════
   CALENDAR ENGINE
   - 10-year navigation (month + year arrows)
   - Daily goal storage in localStorage
   - Syncs with existing dailyGoalGraph data via week-bar dates
   - Mini-preview in Stats widget
   ═══════════════════════════════════════════════════════ */

/* Storage key */
const CAL_STORE = 'nura-v9-cal-goals'; // { 'YYYY-MM-DD': {goal,important} }
let _calGoals = {};
let _calDate  = new Date();           // currently viewed month
const _calYearRange = 10;             // ±10 years from today

/* Load persisted goals */
function calLoad(){
  try { _calGoals = JSON.parse(localStorage.getItem(CAL_STORE)||'{}'); }
  catch(e){ _calGoals = {}; }
}

/* Persist goals */
function calSave(){
  localStorage.setItem(CAL_STORE, JSON.stringify(_calGoals));
}

/* Exposed nav functions called from HTML */
window.calModal_navMonth = function(dir){
  _calDate = new Date(_calDate.getFullYear(), _calDate.getMonth()+dir, 1);
  calRender();
};

window.calModal_navYear = function(dir){
  const now = new Date();
  const newY = Math.max(now.getFullYear()-_calYearRange,
                Math.min(now.getFullYear()+_calYearRange,
                         _calDate.getFullYear()+dir));
  _calDate = new Date(newY, _calDate.getMonth(), 1);
  calRender();
};

window.calModal_jumpToday = function(){
  _calDate = new Date();
  calRender();
};

/* Open calendar modal */
window.openCalendarModal = function(){
  calLoad();
  const modal = document.getElementById('nura-calendar-modal');
  if(modal){
    modal.classList.add('show');
    calRender();
    playUiSound && playUiSound('open');
  }
};

/* Close calendar modal */
window.closeCalendarModal = function(){
  const modal = document.getElementById('nura-calendar-modal');
  if(modal) modal.classList.remove('show');
  calRenderMiniPreview();
  playUiSound && playUiSound('close');
};

/* Backdrop click closes modal */
document.addEventListener('DOMContentLoaded', function(){
  const m = document.getElementById('nura-calendar-modal');
  if(m) m.addEventListener('click', function(e){ if(e.target===this) closeCalendarModal(); });
  const d = document.getElementById('cal-day-goal-modal');
  if(d) d.addEventListener('click', function(e){ if(e.target===this) closeDayGoalModal(); });
});

/* Format a date key YYYY-MM-DD */
function fmtKey(y,m,d){
  return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
}

/* Render the full calendar grid */
function calRender(){
  const header = document.getElementById('cal-modal-header');
  const grid   = document.getElementById('cal-modal-grid');
  if(!grid) return;

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const yr = _calDate.getFullYear();
  const mo = _calDate.getMonth();
  if(header) header.textContent = MONTHS[mo] + ' ' + yr;

  const firstDay    = new Date(yr, mo, 1).getDay();
  const daysInMonth = new Date(yr, mo+1, 0).getDate();
  const prevDays    = new Date(yr, mo, 0).getDate();
  const today       = new Date();

  /* Build 42 cells (6 weeks × 7) */
  let cells = [];
  for(let i=firstDay-1; i>=0; i--) cells.push({d:prevDays-i, mo:mo-1, yr, other:true});
  for(let d=1; d<=daysInMonth; d++) cells.push({d, mo, yr, other:false});
  const rem = 42-cells.length;
  for(let i=1; i<=rem; i++) cells.push({d:i, mo:mo+1, yr, other:true});

  /* Check if any daily-goal graph day matches this cell (sync) */
  const studiedDates = getStudiedDates();

  grid.innerHTML = cells.map(c=>{
    const realMo  = ((c.mo%12)+12)%12;
    const realYr  = c.yr + Math.floor(c.mo/12);
    const key     = fmtKey(realYr, realMo, c.d);
    const isToday = !c.other
      && c.d===today.getDate() && mo===today.getMonth() && yr===today.getFullYear();
    const goal    = _calGoals[key];
    const hasGoal = !!(goal && goal.goal) || studiedDates.has(key);
    const isImp   = !!(goal && goal.important);

    const cls = [
      'cal-day-cell',
      c.other ? 'other-month' : '',
      isToday  ? 'today'      : '',
      hasGoal && !isImp ? 'has-goal' : '',
      isImp    ? 'important'  : '',
    ].filter(Boolean).join(' ');

    const dot = hasGoal
      ? `<div class="cal-day-dot ${isImp?'imp-dot':'goal-dot'}"></div>`
      : '';

    const tooltip = goal?.goal ? goal.goal.substring(0,40) : (isToday?'Today':'');

    return `<button class="${cls}" onclick="openDayGoal('${key}')" title="${tooltip}">${c.d}${dot}</button>`;
  }).join('');
}

/* Get set of YYYY-MM-DD strings where user has studied sessions (from week-bars data) */
function getStudiedDates(){
  /* We sync with the week-bar structure — bars that are non-zero height have study data */
  const set = new Set();
  const today = new Date();
  const bars = document.querySelectorAll('#week-bars .wbar');
  bars.forEach((bar, i)=>{
    const height = parseFloat(bar.style.height)||0;
    if(height > 5){
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      set.add(fmtKey(d.getFullYear(), d.getMonth(), d.getDate()));
    }
  });
  return set;
}

/* Mini preview — 7 coloured dots in the Stats widget */
function calRenderMiniPreview(){
  const preview = document.getElementById('cal-mini-preview');
  const widgetSub = document.getElementById('cal-widget-sub');
  const widgetMonth = document.getElementById('cal-widget-month');
  if(!preview) return;

  const today = new Date();
  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  if(widgetMonth) widgetMonth.textContent = MONTHS[today.getMonth()] + ' ' + today.getFullYear();

  /* Show 7 days of this week */
  const dots = [];
  for(let i=0; i<7; i++){
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + i);
    const key = fmtKey(d.getFullYear(), d.getMonth(), d.getDate());
    const isToday = i === today.getDay();
    const goal = _calGoals[key];
    const hasGoal = !!(goal && goal.goal);
    const isImp = !!(goal && goal.important);
    const cls = ['mini-dot',
      isToday  ? 'today'    : '',
      isImp    ? 'imp'      : (hasGoal ? 'has-goal' : '')
    ].filter(Boolean).join(' ');
    dots.push(`<div class="${cls}" title="${isToday?'Today':'Day '+d.getDate()}"></div>`);
  }
  preview.innerHTML = dots.join('');

  /* Count goals set this month */
  const thisMonth = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0');
  const goalCount = Object.keys(_calGoals).filter(k=>k.startsWith(thisMonth)).length;
  if(widgetSub) widgetSub.textContent = goalCount > 0
    ? `${goalCount} goal${goalCount>1?'s':''} set this month · Click to manage`
    : 'Click to open · Track goals & important days';
}

/* Open day goal editor */
let _calDayKey = '';
window.openDayGoal = function(key){
  _calDayKey = key;
  const modal = document.getElementById('cal-day-goal-modal');
  const dateEl = document.getElementById('cal-dg-date');
  const textEl = document.getElementById('cal-dg-text');
  const impEl  = document.getElementById('cal-dg-important');
  if(!modal) return;

  const parts = key.split('-');
  const d = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]));
  const opts = {weekday:'long',year:'numeric',month:'long',day:'numeric'};
  if(dateEl) dateEl.textContent = d.toLocaleDateString('en-US', opts);

  const existing = _calGoals[key] || {};
  if(textEl)  textEl.value = existing.goal || '';
  if(impEl)   impEl.checked = !!existing.important;

  modal.classList.add('show');
  setTimeout(()=> textEl && textEl.focus(), 80);
  playUiSound && playUiSound('open');
};

window.closeDayGoalModal = function(){
  document.getElementById('cal-day-goal-modal')?.classList.remove('show');
};

window.saveDayGoal = function(){
  const text = document.getElementById('cal-dg-text')?.value.trim() || '';
  const imp  = document.getElementById('cal-dg-important')?.checked || false;
  if(text || imp){
    _calGoals[_calDayKey] = { goal: text, important: imp };
  } else {
    delete _calGoals[_calDayKey];
  }
  calSave();
  closeDayGoalModal();
  calRender();
  calRenderMiniPreview();
  playUiSound && playUiSound('confirm');
};

window.clearDayGoal = function(){
  delete _calGoals[_calDayKey];
  calSave();
  closeDayGoalModal();
  calRender();
  calRenderMiniPreview();
  playUiSound && playUiSound('tick');
};

/* ═══════════════════════════════════════════════════════
   QUIZ ENGINE PATCHES
   - Custom count input validation (max 20)
   - 10 rotating error messages
   - No browser alert()
   ═══════════════════════════════════════════════════════ */
const QUIZ_ERR_MSGS = [
  "Sorry, we don't support geniuses yet — but we can take up to 20.",
  "20 is the limit. Even Einstein took it one question at a time.",
  "Easy there, professor. Max 20. That's already a lot.",
  "Ambition: respect. But Nura caps at 20. Quality over quantity.",
  "We checked — your brain can handle 20. That's the cap.",
  "The quiz council has spoken: 20 max. Final answer.",
  "Beyond 20? That's just showing off. We support up to 20.",
  "Nura AI is powerful, but draws the line at 20 questions.",
  "Loading infinite quiz... just kidding. Max is 20.",
  "If knowledge is power, 20 questions is already a superpower."
];
let _quizErrRot = 0;

window.v9_showQuizCountErr = function(count, customMsg){
  const el = document.getElementById('quiz-count-err');
  if(!el) return;
  el.textContent = customMsg || (count > 20
    ? QUIZ_ERR_MSGS[_quizErrRot++ % QUIZ_ERR_MSGS.length]
    : customMsg || 'Please enter a valid number.');
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(()=> el.classList.remove('show'), 4500);
};

window.v9_validateQuizCount = function(inp){
  const v = parseInt(inp.value, 10);
  const el = document.getElementById('quiz-count-err');
  if(v > 20){
    window.v9_showQuizCountErr(v);
    inp.value = 20;
    setTimeout(()=> el && el.classList.remove('show'), 4500);
  } else {
    el && el.classList.remove('show');
  }
};

/* ═══════════════════════════════════════════════════════
   AUDIO PLAYER EXTRAS
   - Close button for mini bar (injected at load)
   - Repeat badge injection in HTML repeat btn
   - Move mini bar into app flow
   ═══════════════════════════════════════════════════════ */
function v9f_setupMusicUI(){
  /* Move mini bar to end of #app-root so it's in flex column */
  const app = document.getElementById('app-root');
  const bar = document.getElementById('mini-music-bar');
  if(app && bar && bar.parentNode !== app) app.appendChild(bar);

  /* Inject X close button into mini bar */
  if(bar && !bar.querySelector('#v9f-mini-close')){
    const btn = document.createElement('button');
    btn.id = 'v9f-mini-close';
    btn.title = 'Close player';
    btn.style.cssText = 'background:none;border:none;color:var(--text3);cursor:pointer;padding:4px;display:flex;align-items:center;border-radius:5px;transition:color .2s;flex-shrink:0;margin-left:4px';
    btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    btn.onmouseover = ()=> btn.style.color='#ff8080';
    btn.onmouseout  = ()=> btn.style.color='var(--text3)';
    btn.onclick = ()=>{
      window.killMusicPlayer && window.killMusicPlayer();
      bar.style.display='none';
    };
    bar.appendChild(btn);
  }

  /* Inject repeat-one badge into the repeat button */
  ['music-repeat-btn','dash-repeat-btn'].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn && !btn.querySelector('.repeat-one-badge')){
      const badge = document.createElement('span');
      badge.className = 'repeat-one-badge';
      badge.textContent = '1';
      btn.style.position = 'relative';
      btn.appendChild(badge);
    }
  });
}

/* ═══════════════════════════════════════════════════════
   DYNAMIC TIME GREETING
   Injected into #dashboard .page-header
   ═══════════════════════════════════════════════════════ */
function v9f_checkGreeting(){
  const h = new Date().getHours();
  const msgs = {
    night:   "Midnight? You're dedicated. Let's work.",
    lateNight:"Last-minute fix? Hop in and finish it.",
    earlyBird:"Early bird grind — respect. Let's go.",
    morning: "Morning session activated. Sharp mind incoming.",
    midMorn: "Peak focus window. Make it count.",
    afterLunch:"Post-lunch? Power through — you've got this.",
    afternoon:"Afternoon flow — the grind never stops.",
    evening: "Evening session. Quiet hours = best hours.",
    night2:  "Night owl mode engaged. Focus up.",
  };
  let msg;
  if(h===0||h===1)         msg=msgs.night;
  else if(h>=2&&h<5)       msg=msgs.lateNight;
  else if(h>=5&&h<7)       msg=msgs.earlyBird;
  else if(h>=7&&h<10)      msg=msgs.morning;
  else if(h>=10&&h<12)     msg=msgs.midMorn;
  else if(h>=12&&h<14)     msg=msgs.afterLunch;
  else if(h>=14&&h<18)     msg=msgs.afternoon;
  else if(h>=18&&h<21)     msg=msgs.evening;
  else                     msg=msgs.night2;

  const ph = document.querySelector('#dashboard .page-header > div');
  if(ph && !document.getElementById('v9f-greeting')){
    const g = document.createElement('div');
    g.id = 'v9f-greeting';
    g.style.cssText = 'font-size:11px;color:var(--text3);font-style:italic;margin-top:4px;letter-spacing:.3px;';
    g.textContent = msg;
    ph.appendChild(g);
  }
}

/* ═══════════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', function(){
  calLoad();
  v9f_checkGreeting();

  /* Nura Mind gate removal */
  document.querySelectorAll('.nura-blob-gate').forEach(el=>el.remove());
  document.querySelectorAll('.nura-chat-hidden').forEach(el=>el.classList.remove('nura-chat-hidden'));

  /* Mini preview render once calendar data loaded */
  calRenderMiniPreview();
});

window.addEventListener('load', function(){
  v9f_setupMusicUI();
  /* Sync mini preview every 10s */
  setInterval(calRenderMiniPreview, 10000);
});

})(); // end IIFE
