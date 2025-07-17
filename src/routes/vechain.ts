import { Router } from 'express';
import { writeHashToVeChain } from '../services/vechain';
import { finalizeRecord, getRecordByHash } from '../services/db';
import { sendReceiptEmail } from '../services/email';

const router = Router();

router.post('/write', async (req, res) => {
  try {
    const { hash } = req.body as { hash: string };
    if (!hash) return res.status(400).json({ error: 'hash required' });
    const rec = await getRecordByHash(hash);
    if (!rec) return res.status(404).json({ error: 'hash not found' });

    const { txid, blockTime } = await writeHashToVeChain(hash);
    await finalizeRecord(hash, txid, blockTime);

    if (rec.email) {
      await sendReceiptEmail({
        to: rec.email,
        service_type: rec.service_type,
        public_hash: rec.public_hash,
        tx_hash: txid,
        block_time_iso: blockTime,
      });
    }
    res.json({ tx_hash: txid, block_time: blockTime });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
