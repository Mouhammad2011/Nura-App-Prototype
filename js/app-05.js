
window.paperModalCb = null;
function showPaperModal(msg, isPrompt, defVal, cb){
  document.getElementById('paper-modal-overlay').style.display='flex';
  document.getElementById('paper-modal-msg').textContent=msg;
  const inputWrap = document.getElementById('paper-modal-input-wrap');
  const input = document.getElementById('paper-modal-input');
  const cancelBtn = document.getElementById('paper-modal-cancel');
  if(isPrompt){
    inputWrap.style.display='block';
    input.value=defVal||'';
    cancelBtn.style.display='block';
    setTimeout(()=>input.focus(), 100);
  } else {
    inputWrap.style.display='none';
    cancelBtn.style.display='none';
    document.getElementById('paper-modal-ok').focus();
  }
  window.paperModalCb = cb;
}
document.getElementById('paper-modal-ok').onclick = function(){
  document.getElementById('paper-modal-overlay').style.display='none';
  if(window.paperModalCb) window.paperModalCb(document.getElementById('paper-modal-input-wrap').style.display==='block' ? document.getElementById('paper-modal-input').value : true);
};
document.getElementById('paper-modal-cancel').onclick = function(){
  document.getElementById('paper-modal-overlay').style.display='none';
  if(window.paperModalCb) window.paperModalCb(null);
};
