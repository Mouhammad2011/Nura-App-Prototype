(() => {
  if (!matchMedia('(pointer: fine)').matches) return;
  const cursor = document.createElement('div');
  cursor.id = 'nura-hover-cursor';
  document.body.append(cursor);
  const clickable = 'button,a,input,textarea,select,[role="button"],[onclick],.sidebar-btn,.nura-utility-tab';
  const textEntry = 'input[type="text"],input[type="email"],input[type="password"],input[type="search"],input[type="number"],input[type="tel"],input[type="url"],input:not([type]),textarea,[contenteditable="true"]';
  const setPosition = event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('ready');
    const target = event.target;
    const isText = Boolean(target.closest?.(textEntry));
    cursor.classList.toggle('text-mode', isText);
    cursor.classList.toggle('hover', !isText && Boolean(target.closest?.(clickable)));
  };
  document.addEventListener('pointermove', setPosition, { passive: true });
  document.addEventListener('pointerdown', () => cursor.classList.add('pressed'), { passive: true });
  document.addEventListener('pointerup', () => cursor.classList.remove('pressed'), { passive: true });
  // Only hide when the pointer actually leaves the window, so the cursor stays consistent everywhere else.
  document.addEventListener('pointerleave', () => cursor.classList.remove('ready', 'hover', 'text-mode', 'pressed'));
  document.addEventListener('pointerenter', () => cursor.classList.add('ready'));
})();
