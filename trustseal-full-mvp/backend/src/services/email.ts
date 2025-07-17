import sgMail from '@sendgrid/mail';
import { ENV } from '../env';

sgMail.setApiKey(ENV.sendgridKey);

export async function sendReceiptEmail(opts: {
  to: string;
  service_type: string;
  public_hash: string;
  tx_hash: string;
  block_time_iso: string;
}) {
  const txUrl = `https://explorer.vechain.org/transactions/${opts.tx_hash}`;
  const html = `
  <h2>Your TrustSeal Proof</h2>
  <p><strong>Service:</strong> ${opts.service_type}</p>
  <p><strong>Hash:</strong> ${opts.public_hash}</p>
  <p><strong>Transaction:</strong> <a href="${txUrl}">${opts.tx_hash}</a></p>
  <p><strong>Timestamp:</strong> ${opts.block_time_iso}</p>
  <p>Share this email or copy the link above as your public proof.</p>`;
  await sgMail.send({ to: opts.to, from: ENV.sendgridFrom, subject: 'TrustSeal Proof Created', html });
}
