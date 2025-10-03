require("@nomicfoundation/hardhat-toolbox");

// You can add other plugins here if needed
// e.g., require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {}, // Local Hardhat network
    // Uncomment and configure for Sepolia later
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    //   accounts: ["0x5FbDB2315678afecb367f032d93F642f64180aa3"],
    // },
  },
};
