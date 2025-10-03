require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());

// Load env
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const LOCALHOST_RPC = process.env.LOCALHOST_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// ✅ ethers v5 syntax for provider & wallet
const provider = new ethers.providers.JsonRpcProvider(LOCALHOST_RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Load contract ABI
const contractJson = require("./artifacts/contracts/CarbonCredits.sol/CarbonCredits.json");
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractJson.abi, wallet);

// Routes
app.post("/mint", async (req, res) => {
  try {
    const { to, amount } = req.body;
    const tx = await contract.mint(to, amount);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await contract.balanceOf(req.params.address);
    res.json({ address: req.params.address, balance: balance.toString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
