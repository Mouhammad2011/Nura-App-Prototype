// Call Groq only from a trusted server / Firebase Cloud Function.
// The browser sends authenticated requests to /api/nuramind instead.
export const nuraMindPolicy = {
  model: 'llama-3.3-70b-versatile',
  system: 'You are NuraMind, a concise study and focus companion. Do not present health telemetry as medical advice.',
  modes: ['chat', 'search', 'deep-search', 'quiz', 'library-categorization']
};
