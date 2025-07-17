import { Router } from 'express';
const router = Router();
router.post('/', (_req, res) => {
  res.status(501).json({ error: 'PayPal not implemented in MVP' });
});
export default router;
