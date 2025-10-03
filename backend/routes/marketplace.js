const express = require('express');
const router = express.Router();

// Simple static marketplace items for demo
const items = [
  { id: "AB-SUN-819A", project: "Sundarbans Restoration", vintage: 2024, price: 16.75, unit: "USDC" },
  { id: "AB-AND-33C7", project: "Andaman Seagrass Project", vintage: 2024, price: 18.50, unit: "USDC" },
  { id: "AB-VEM-B204", project: "Vembanad Salt Marsh", vintage: 2025, price: 14.25, unit: "USDC" }
];

router.get('/', (req, res) => {
  res.json(items);
});

module.exports = router;
