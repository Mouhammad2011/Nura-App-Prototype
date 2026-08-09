
/* Close Add Folder modal on backdrop click */
document.getElementById('nura-add-folder-modal').addEventListener('click', function(e){
  if(e.target === this) closeAddFolderModal();
});
