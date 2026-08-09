(() => {
  let pending;
  const readManagedKey = async () => {
    if (pending) return pending;
    pending = (async () => {
      try {
        const db = typeof _db !== 'undefined' ? _db : window.firebase?.firestore?.();
        if (!db) return false;
        const snapshot = await db.collection('config').doc('app').get();
        if (!snapshot.exists) return false;
        const values = snapshot.data() || {};
        const normalized = Object.fromEntries(Object.entries(values).map(([name, value]) => [name.toLowerCase().replace(/[\s_-]/g, ''), value]));
        const key = values['groq Api'] || values['groq API'] || values.groqApi || values.groqAPI || values.groqKey || values.groq_api || values['groq api'] || values.groq || normalized.groqapi || normalized.groqkey || normalized.groq;
        if (!key || typeof key !== 'string') return false;
        window._nuraConfigKey = key.trim();
        return Boolean(window._nuraConfigKey);
      } catch (error) {
        console.warn('Nura managed AI key could not be read from config/app.', error);
        return false;
      } finally {
        pending = null;
      }
    })();
    return pending;
  };

  window._fetchConfigKey = readManagedKey;
  window.getApiKey = () => window._nuraConfigKey || '';
  const start = () => {
    let attempts = 0;
    const retry = async () => {
      if (await readManagedKey() || ++attempts >= 50) clearInterval(timer);
    };
    const timer = setInterval(retry, 150);
    retry();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
