import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🔍 Testing Hedera Testnet Connection...\n");

  // Check environment variables
  const privateKey = process.env.HEDERA_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("❌ Error: HEDERA_PRIVATE_KEY not found in .env file");
    console.log("\n📝 Please add your private key to contracts/.env:");
    console.log("   HEDERA_PRIVATE_KEY=your_64_character_key_here");
    console.log("\n💡 Get testnet account at: https://portal.hedera.com/register");
    process.exit(1);
  }

  if (privateKey.length !== 64) {
    console.error(`❌ Error: Invalid private key length (${privateKey.length} chars, expected 64)`);
    console.log("\n📝 Private key should be:");
    console.log("   - 64 hexadecimal characters");
    console.log("   - NO '0x' prefix");
    console.log("   - Example: abc123def456... (64 chars total)");
    process.exit(1);
  }

  try {
    // Get network info
    const network = await ethers.provider.getNetwork();
    console.log("✅ Connected to network:", network.name);
    console.log("📍 Chain ID:", network.chainId.toString());

    // Get account info
    const [signer] = await ethers.getSigners();
    const address = await signer.getAddress();
    const balance = await ethers.provider.getBalance(address);
    const balanceInHbar = ethers.formatEther(balance);

    console.log("\n👤 Account Information:");
    console.log("   Address:", address);
    console.log("   Balance:", balanceInHbar, "HBAR");

    // Check if balance is sufficient
    if (Number(balanceInHbar) < 10) {
      console.log("\n⚠️  Warning: Low balance!");
      console.log("   You need at least 10 HBAR for deployment");
      console.log("   Get free testnet HBAR from: https://portal.hedera.com/faucet");
    } else {
      console.log("\n✅ Balance sufficient for deployment!");
    }

    // Test RPC connection
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("\n🔗 RPC Connection:");
    console.log("   Latest block:", blockNumber);
    console.log("   RPC URL: https://testnet.hashio.io/api");

    console.log("\n✅ All checks passed! Ready to deploy.");
    console.log("\n🚀 Next step: npm run deploy:hedera");
    
  } catch (error: any) {
    console.error("\n❌ Connection failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("   1. Check your internet connection");
    console.log("   2. Verify private key is correct");
    console.log("   3. Ensure Hedera testnet is online: https://status.hedera.com");
    console.log("   4. Try again in a few minutes");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
