import 'dotenv/config';

function req(k: string): string {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env: ${k}`);
  return v;
}

export const ENV = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT ?? 4000),
  origin: process.env.ORIGIN ?? '*',
  priceCents: Number(process.env.PRICE_CENTS ?? 199),

  supabaseUrl: req('SUPABASE_URL'),
  supabaseServiceKey: req('SUPABASE_SERVICE_KEY'),
  supabaseTable: process.env.SUPABASE_TABLE ?? 'records',

  stripeSecret: req('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: req('STRIPE_WEBHOOK_SECRET'),
  stripeProductId: process.env.STRIPE_PRODUCT_ID ?? '',

  veNode: process.env.VECHAIN_NODE_URL ?? 'https://testnet.vechain.org',
  vePk: req('VECHAIN_PRIVATE_KEY'),
  veFrom: req('VECHAIN_FROM_ADDRESS'),
  veGas: Number(process.env.VECHAIN_GAS ?? 21000),
  veGasPrice: Number(process.env.VECHAIN_GAS_PRICE ?? 1000000000),

  sendgridKey: req('SENDGRID_API_KEY'),
  sendgridFrom: req('SENDGRID_FROM'),
};
