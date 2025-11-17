import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying TicketNFT contract...");

  const [deployer] = await ethers.getSigners();
  console.log("📍 Deploying with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  // Deploy TicketNFT
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();
  await ticketNFT.waitForDeployment();

  const ticketNFTAddress = await ticketNFT.getAddress();
  console.log("✅ TicketNFT deployed to:", ticketNFTAddress);

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    ticketNFT: ticketNFTAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\n📝 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n⚠️  Don't forget to:");
  console.log("1. Update contract addresses in frontend/lib/contracts/addresses.ts");
  console.log("2. Verify contract on block explorer if on testnet/mainnet");
  console.log(`   npx hardhat verify --network <network> ${ticketNFTAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
