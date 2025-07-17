import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ENV } from './env';
import { stripeWebhookHandler } from './jobs/finalizeTx';

import hashRoute from './routes/hash';
import payStripeRoute from './routes/payStripe';
import payPaypalRoute from './routes/payPaypal';
import vechainRoute from './routes/vechain';
import lookupRoute from './routes/lookup';

export function createApp() {
  const app = express();
  app.use(cors({ origin: ENV.origin, credentials: false }));
  app.use(morgan('dev'));
  // Stripe webhook BEFORE json
  app.post('/webhooks/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhookHandler);
  app.use(express.json());
  app.use('/api/hash', hashRoute);
  app.use('/api/pay', payStripeRoute); // /create-intent
  app.use('/api/paypal', payPaypalRoute);
  app.use('/api/vechain', vechainRoute); // /write
  app.use('/api/lookup', lookupRoute);
  app.get('/health', (_req, res)=>res.json({ok:true}));
  return app;
}
