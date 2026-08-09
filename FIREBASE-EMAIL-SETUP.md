# Firebase email setup for Nura

## Password reset and standard verification

1. In the Firebase Console, open your project, then **Authentication → Sign-in method** and enable **Email/Password**.
2. In **Authentication → Settings → Authorized domains**, add every domain that will host Nura (for example `your-site.web.app` and your custom domain). `localhost` is already suitable for local testing.
3. In **Authentication → Templates**, customise **Password reset** and **Email address verification**. Firebase sends these emails; the app now calls `sendPasswordResetEmail` and `sendEmailVerification`.
4. Deploy Nura on HTTPS. Do not test email links by opening `index.html` directly from the disk: Firebase action links need an authorized web domain.
5. Configure your app's Firebase Web configuration in `js/app-01.js`; do not expose a service-account key in the browser.

Firebase's built-in flow verifies by a secure link, not a five-digit code. It is the simplest and safest choice for a first release.

Use the included `email-templates/nura-email.html` as the visual reference for your Firebase template branding. Replace the URL with a publicly hosted logo URL; email clients cannot load a file from your computer. Set up both Firebase templates in one visit to the console, then Firebase handles password reset and verification automatically.

## Custom branded emails and five-digit codes

For an email with your own design and a five-digit code, add a server-side component. A browser-only app cannot securely create, email, or validate codes.

- Use **Firebase Cloud Functions** (or Cloud Run) to generate a random five-digit code, store only a hashed code and expiry in Firestore, and send the email.
- Use a transactional email service such as **Resend**, **Postmark**, or **SendGrid** from the Cloud Function. This is what gives you fully custom HTML email designs and reliable delivery.
- Create a second callable function that accepts the code, enforces rate limits and expiry (for example, 10 minutes), marks the user as verified, and deletes the code.
- Keep email-provider API keys in Firebase/Google Cloud secret storage, never in `index.html` or browser JavaScript.

## Important data/security note

Firebase Authentication necessarily stores an account's email/password credential when the user registers; you cannot send verification email before Firebase knows an email address. To avoid creating an application profile for unverified users, only write to Firestore after `user.emailVerified === true` (or use Firestore rules that reject unverified writes). Passwords themselves are never written to Firestore.

For a production app, do not call Groq directly from the browser with a shared API key. Put Groq behind a Cloud Function so users cannot extract or misuse the key.
