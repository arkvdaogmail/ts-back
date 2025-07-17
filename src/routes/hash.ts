import { Router } from 'express';
import { createPendingRecord } from '../services/db';
import type { ServiceType } from '../types';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { hash, email, service_type } = req.body as { hash: string; email: string; service_type: ServiceType };
    if (!hash || !email) return res.status(400).json({ error: 'hash & email required' });
    const rec = await createPendingRecord({ public_hash: hash, email, service_type });
    res.json({ record_id: rec.id, public_hash: rec.public_hash });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
