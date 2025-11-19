import { ethers } from "hardhat";

async function main() {
  console.log("💰 Checking Account Balance...\n");

  const [signer] = await ethers.getSigners();
  const address = await signer.getAddress();
  const balance = await ethers.provider.getBalance(address);
  const balanceInHbar = ethers.formatEther(balance);

  console.log("👤 Account:", address);
  console.log("💵 Balance:", balanceInHbar, "HBAR");

  if (Number(balanceInHbar) < 10) {
    console.log("\n⚠️  Warning: Low balance for deployment!");
    console.log("   Recommended: At least 10 HBAR");
    console.log("   Current:", balanceInHbar, "HBAR");
    console.log("\n💡 Get free testnet HBAR:");
    console.log("   https://portal.hedera.com/faucet");
  } else if (Number(balanceInHbar) < 50) {
    console.log("\n✅ Balance sufficient for deployment");
    console.log("   Estimated cost: ~5-10 HBAR");
  } else {
    console.log("\n✅ Excellent balance!");
    console.log("   Ready for multiple deployments");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
