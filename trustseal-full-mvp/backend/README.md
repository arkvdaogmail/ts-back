# TrustSeal Backend MVP

Minimal but complete Express + TypeScript service:
- Create pending record (hash/email/service_type) in Supabase
- Create Stripe PaymentIntent (test mode)
- On `payment_intent.succeeded` webhook: write notarization tx to VeChain testnet (data payload w/ hash)
- Update Supabase w/ tx + timestamp
- Send receipt email via SendGrid
- Lookup endpoint returns VeChain explorer link

## Quick Start

```bash
git clone <this-repo>
cd trustseal-backend
cp .env.example .env   # fill values
npm install
npm run dev            # tsx watch
# in another shell:
stripe listen --forward-to localhost:4000/webhooks/stripe
```

Then open your frontend (CodePen) & point BACKEND_BASE to your tunnel or deployment URL.

See .env.example for required vars.
