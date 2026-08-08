
  // â”€â”€ Firebase init â”€â”€
  const _fbConfig = {
    apiKey:            "AIzaSyDaIi_A6IYFkowDq-YYcJFGK-eFxbtx0Ds",
    authDomain:        "nura-c0a40.firebaseapp.com",
    projectId:         "nura-c0a40",
    storageBucket:     "nura-c0a40.firebasestorage.app",
    messagingSenderId: "527486660710",
    appId:             "1:527486660710:web:90a2acfe973b19e08d7da7"
  };
  firebase.initializeApp(_fbConfig);
  const _auth = firebase.auth();
  const _db   = firebase.firestore();

  // â”€â”€ Save user doc to Firestore â”€â”€
  async function _fbSaveProfile(uid, data){
    try{ await _db.collection('users').doc(uid).set(data, {merge:true}); }catch(e){ console.warn('Firestore write failed',e); }
  }

  // â”€â”€ Load user doc from Firestore â”€â”€
  async function _fbLoadProfile(uid){
    try{
      const snap = await _db.collection('users').doc(uid).get();
      return snap.exists ? snap.data() : {};
    }catch(e){ console.warn('Firestore read failed',e); return {}; }
  }

  // â”€â”€ Listen for auth state changes â”€â”€
  _auth.onAuthStateChanged(async function(user){
    if(user && !user.isAnonymous){
      // Signed-in real user â€” load their Firestore profile
      const remote = await _fbLoadProfile(user.uid);
      const merged = Object.assign({
        name:  user.displayName || 'Student',
        email: user.email || '',
        avatar: user.photoURL || '',
        uid:   user.uid
      }, remote);
      localStorage.setItem('nura-user-profile', JSON.stringify(merged));
      localStorage.removeItem('nura-signed-out');
      if(typeof hideSignOutGate === 'function') hideSignOutGate();
      if(typeof renderUserProfile === 'function') renderUserProfile();
      // Restore API key from Firestore into the input
      if(remote.groqKey && document.getElementById('api-key-input')){
        document.getElementById('api-key-input').value = remote.groqKey;
      }
    }
  });
  