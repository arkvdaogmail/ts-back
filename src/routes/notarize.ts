import { Router } from "express";
import multer from "multer";
import crypto from "crypto";

const router = Router();
const upload = multer();

// POST /api/notarize/upload - Upload a file and get SHA-256 hash
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const hash = crypto.createHash("sha256").update(req.file.buffer).digest("hex");
  res.json({ hash });
});

// POST /api/notarize/commit - Mock: commit the hash to blockchain & return info
router.post("/commit", async (req, res) => {
  const { hash } = req.body;
  if (!hash) return res.status(400).json({ error: "No hash provided" });
  // TODO: Integrate with VeChain here!
  // Mock response:
  const txHash = "0x" + crypto.randomBytes(32).toString("hex");
  const explorerUrl = `https://explore.vechain.org/transactions/${txHash}`;
  res.json({
    notarized: true,
    txHash,
    explorerUrl,
  });
});

export default router;
