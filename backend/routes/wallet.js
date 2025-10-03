const express = require('express');
const router = express.Router();

// Mock wallet endpoint - in prod you'd query on-chain via ethers
router.post('/connect', (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'address required' });
  res.json({ message: 'connected', address });
});

module.exports = router;
