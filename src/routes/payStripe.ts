import { Router } from 'express';
import type { ServiceType } from '../types';
import { createPaymentIntent } from '../services/stripe';
import { attachStripePI } from '../services/db';

const router = Router();

router.post('/create-intent', async (req, res) => {
  try {
    const { hash, email, service_type } = req.body as { hash: string; email: string; service_type: ServiceType };
    if (!hash || !email) return res.status(400).json({ error: 'hash & email required' });
    const pi = await createPaymentIntent({ public_hash: hash, email, service_type });
    await attachStripePI(hash, pi.id);
    res.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
