import { Request, Response } from 'express';
import { stripe } from '../services/stripe';
import { ENV } from '../env';
import { getRecordByStripePI, finalizeRecord } from '../services/db';
import { writeHashToVeChain } from '../services/vechain';
import { sendReceiptEmail } from '../services/email';

export async function stripeWebhookHandler(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent((req as any).rawBody, sig, ENV.stripeWebhookSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as any;
    const public_hash = pi.metadata?.public_hash;
    if (public_hash) {
      const rec = await getRecordByStripePI(pi.id);
      if (rec && !rec.tx_hash) {
        const { txid, blockTime } = await writeHashToVeChain(public_hash);
        await finalizeRecord(public_hash, txid, blockTime);
        if (rec.email) {
          await sendReceiptEmail({
            to: rec.email,
            service_type: rec.service_type,
            public_hash: rec.public_hash,
            tx_hash: txid,
            block_time_iso: blockTime,
          });
        }
      }
    }
  }
  res.json({ received: true });
}
