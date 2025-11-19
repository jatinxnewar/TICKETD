import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // Hedera Testnet (Primary)
    hedera: {
      url: "https://testnet.hashio.io/api",
      accounts: process.env.HEDERA_PRIVATE_KEY && process.env.HEDERA_PRIVATE_KEY.length === 64 
        ? [process.env.HEDERA_PRIVATE_KEY] 
        : [],
      chainId: 296,
      timeout: 60000,
    },
    // Hedera Mainnet
    hederaMainnet: {
      url: "https://mainnet.hashio.io/api",
      accounts: process.env.HEDERA_PRIVATE_KEY && process.env.HEDERA_PRIVATE_KEY.length === 64
        ? [process.env.HEDERA_PRIVATE_KEY] 
        : [],
      chainId: 295,
    },
    // Keep Ethereum networks for compatibility
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "https://rpc-mumbai.maticvigil.com/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80001,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 137,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
