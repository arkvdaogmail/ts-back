import { Router } from 'express';
import { getRecordByHash } from '../services/db';

const router = Router();

router.get('/:hash', async (req, res) => {
  try {
    const { hash } = req.params;
    const rec = await getRecordByHash(hash);
    if (!rec || !rec.tx_hash) return res.status(404).json({ error: 'Not found' });
    res.json({
      tx_link: `https://explorer.vechain.org/transactions/${rec.tx_hash}`,
      block_time: rec.block_time,
      service_type: rec.service_type,
      email: rec.email ?? null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
