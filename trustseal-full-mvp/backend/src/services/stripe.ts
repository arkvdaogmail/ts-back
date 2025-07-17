import Stripe from 'stripe';
import { ENV } from '../env';
import type { PendingRecordIn } from '../types';

export const stripe = new Stripe(ENV.stripeSecret, { apiVersion: '2024-06-20' as any });

export async function createPaymentIntent(rec: PendingRecordIn) {
  const pi = await stripe.paymentIntents.create({
    amount: ENV.priceCents,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: {
      public_hash: rec.public_hash,
      email: rec.email,
      service_type: rec.service_type,
    },
  });
  return pi;
}
