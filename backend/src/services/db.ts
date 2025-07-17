import { createClient } from '@supabase/supabase-js';
import { ENV } from '../env';
import type { PendingRecordIn, RecordRow } from '../types';

const supabase = createClient(ENV.supabaseUrl, ENV.supabaseServiceKey, {
  auth: { persistSession: false },
});

export async function createPendingRecord(input: PendingRecordIn): Promise<RecordRow> {
  const { data, error } = await supabase
    .from<RecordRow>(ENV.supabaseTable)
    .insert({
      email: input.email,
      service_type: input.service_type,
      public_hash: input.public_hash,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data!;
}

export async function attachStripePI(public_hash: string, stripe_pi_id: string) {
  const { error } = await supabase
    .from<RecordRow>(ENV.supabaseTable)
    .update({ stripe_pi_id })
    .eq('public_hash', public_hash);
  if (error) throw error;
}

export async function finalizeRecord(public_hash: string, tx_hash: string, block_time_iso: string) {
  const { error } = await supabase
    .from<RecordRow>(ENV.supabaseTable)
    .update({ tx_hash, block_time: block_time_iso })
    .eq('public_hash', public_hash);
  if (error) throw error;
}

export async function getRecordByHash(public_hash: string): Promise<RecordRow | null> {
  const { data, error } = await supabase
    .from<RecordRow>(ENV.supabaseTable)
    .select('*')
    .eq('public_hash', public_hash)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function getRecordByStripePI(pi: string): Promise<RecordRow | null> {
  const { data, error } = await supabase
    .from<RecordRow>(ENV.supabaseTable)
    .select('*')
    .eq('stripe_pi_id', pi)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}
