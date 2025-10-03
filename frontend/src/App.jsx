import { useState } from "react";
import axios from "axios";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [mintTo, setMintTo] = useState("");
  const [mintAmount, setMintAmount] = useState("");

  const getBalance = async () => {
    const res = await axios.get(`http://localhost:5000/balance/${address}`);
    setBalance(res.data.balance);
  };

  const mintTokens = async () => {
    const res = await axios.post("http://localhost:5000/mint", {
      to: mintTo,
      amount: mintAmount,
    });
    alert("Minted! Tx: " + res.data.txHash);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Carbon Credit DApp 🌱</h1>

      <div>
        <h2>Check Balance</h2>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address"
        />
        <button onClick={getBalance}>Get Balance</button>
        {balance !== null && <p>Balance: {balance}</p>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Mint Tokens</h2>
        <input
          value={mintTo}
          onChange={(e) => setMintTo(e.target.value)}
          placeholder="Recipient address"
        />
        <input
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={mintTokens}>Mint</button>
      </div>
    </div>
  );
}

export default App;
