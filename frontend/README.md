# TrustSeal Frontend MVP

Static HTML/JS you can host on GitHub Pages, Vercel static, Netlify, Manus, or open from file://.

## Configure
Edit `config.js`:
```
window.TS_CONFIG = {
  STRIPE_PK: "pk_test_XXXX",
  BACKEND_BASE: "https://your-backend-host"
};
```

## Run locally
Open `index.html` in a browser. Some browsers block file:// fetch; use a tiny static server:

```
npx serve frontend
# or
python -m http.server -d frontend 5173
```

Then open http://localhost:5173.

## Flow
1. Upload file
2. Email
3. Pick service
4. Hash + Pay
5. Confirm Stripe
6. Poll for VeChain tx
