(() => {
  /* ── Bug 1: "New Conversation" saved the SAME chat twice ────────────────────────
     startNewConversation() ran two separate save paths back to back:
       a) the legacy archiveCurrentChat() (still in the original function) — saved a
          session object with no msgCount field, which the panel renders as "0 msgs",
          i.e. it looked empty even though it held the real messages.
       b) the newer override further down the page — generates an AI title and saves
          a second, correctly-formed session (right msgCount) for the exact same chat.
     Neutralizing the legacy path leaves only the well-formed save, so each new
     conversation produces exactly one history entry instead of two. */
  window.archiveCurrentChat = function () {};

  /* ── Bug 2: deleted chats reappeared until a full page reload ───────────────────
     The save path above wrote a session to Firestore AND to localStorage, but gave
     the localStorage copy its own separate id (a fresh Date.now()) instead of the
     Firestore document id it was paired with. Deleting a chat only removed the
     Firestore doc and whichever localStorage entry happened to share that id — the
     mismatched local copy was untouched, so the next time the panel merged
     Firestore + localStorage results, that stale copy looked "new" and got added
     right back in. Only a full reload (fresh timing) ever cleared it for good.
     Fix: give both copies the same id when they're first saved, so delete removes
     both in one shot and the panel refresh (already wired up elsewhere) reflects it
     immediately. */
  const patchStartNewConversation = () => {
    const current = window.startNewConversation;
    if (typeof current !== 'function' || current._sessionIdSyncFix) return false;
    const patched = function () {
      const snapshot = (typeof chatHistory !== 'undefined' && chatHistory && chatHistory.length >= 2)
        ? chatHistory.slice()
        : null;
      current();
      if (!snapshot) return;
      (async () => {
        const firstUser = snapshot.find(m => m.role === 'user');
        const fallback = firstUser ? firstUser.content.substring(0, 45) : 'Chat';
        let title = fallback;
        if (typeof _generateChatTitle === 'function') {
          try { title = await _generateChatTitle(snapshot); } catch (e) {}
        }
        const sessionData = { title, messages: snapshot, msgCount: snapshot.length, ts: Date.now() };
        const user = typeof _auth !== 'undefined' ? _auth.currentUser : null;
        let sharedId = Date.now().toString();
        if (user) {
          try {
            const ref = await _db.collection('users').doc(user.uid).collection('chats').add(sessionData);
            sharedId = ref.id;
          } catch (e) { console.warn('Save failed', e); }
        }
        try {
          const local = JSON.parse(localStorage.getItem('nura-chat-sessions') || '[]');
          local.unshift({ ...sessionData, id: sharedId });
          localStorage.setItem('nura-chat-sessions', JSON.stringify(local.slice(0, 20)));
        } catch (e) {}
        window.loadChatHistoryPanel && window.loadChatHistoryPanel();
      })();
    };
    patched._sessionIdSyncFix = true;
    window.startNewConversation = patched;
    return true;
  };

  let tries = 0;
  const timer = setInterval(() => {
    if (patchStartNewConversation() || ++tries > 50) clearInterval(timer);
  }, 100);
  patchStartNewConversation();
})();
