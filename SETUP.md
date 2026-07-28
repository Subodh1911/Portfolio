# Portfolio Setup Guide

## 1. Profile Photo

Add your photo as `subodh.jpg` in the project root (same folder as `index.html`).

Recommended: square image, at least 400×400px, JPG or WebP.

---

## 2. Update Your Email

Replace the placeholder email in these files if needed:

- `index.html` — contact section (`subodhgarg2285@gmail.com`)
- `script.js` — `CONFIG.RECIPIENT_EMAIL`
- `google-apps-script/Code.gs` — `RECIPIENT_EMAIL`

---

## 3. Contact Form (Google Apps Script)

The contact form sends messages to your Gmail inbox via a free Google Apps Script web app. No App Password is exposed in the frontend.

### Steps

1. Open [script.google.com](https://script.google.com) and create a **New project**.
2. Delete any default code and paste the contents of `google-apps-script/Code.gs`.
3. Set `RECIPIENT_EMAIL` at the top of the script to your Gmail address.
4. Click **Deploy** → **New deployment**.
5. Select type: **Web app**.
6. Configure:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy** and authorize the script when prompted.
8. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/.../exec`).
9. Paste it into `script.js`:

```javascript
const CONFIG = {
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ID/exec',
    RECIPIENT_EMAIL: 'your.email@gmail.com'
};
```

10. Re-deploy the Apps Script whenever you change `Code.gs` (Deploy → Manage deployments → Edit → New version).

### Test

1. Open `index.html` in a browser (or host the site).
2. Submit the contact form with test data.
3. Check your Gmail inbox for the message.

If the form shows "Form not configured yet", the Apps Script URL has not been set in `script.js`.

---

## 4. Deploy the Site

Static hosting options (no build step required):

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push repo, enable Pages on `main` branch |
| **Netlify** | Drag-and-drop the folder or connect the repo |
| **Vercel** | Import repo, no build command needed |

Ensure `subodh.jpg` is included in the deployed files.

---

## 5. Optional Tweaks

- **Pricing:** Edit "Starting from" amounts in the Services section of `index.html`.
- **Case studies:** Update text in the Work section as you complete new projects.
- **Testimonials / metrics:** Replace placeholder quotes and figures (hero metrics, case study results) with real client feedback when available.
- **Social links:** Replace `YOUR_HANDLE` in the footer LinkedIn and GitHub URLs with your real profiles.
- **Meta/OG tags:** Update `og:image` URL after deploying if you want social previews to use an absolute URL.
