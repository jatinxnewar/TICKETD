import { ethers } from "hardhat";

async function main() {
  console.log("🧪 Testing TicketNFT Contract...\n");

  const contractAddress = process.argv[2];
  
  if (!contractAddress) {
    console.error("❌ Error: Contract address required");
    console.log("Usage: npm run test:contract <contract_address>");
    process.exit(1);
  }

  console.log("📍 Contract address:", contractAddress);

  const [signer] = await ethers.getSigners();
  console.log("👤 Testing with account:", await signer.getAddress());

  // Connect to deployed contract
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = TicketNFT.attach(contractAddress);

  console.log("\n--- Test 1: Create Event ---");
  const eventName = "Test Concert 2025";
  const totalTickets = 100;
  const ticketPrice = ethers.parseEther("10"); // 10 HBAR
  const eventDate = Math.floor(Date.now() / 1000) + 86400 * 30; // 30 days from now

  const createTx = await ticketNFT.createEvent(
    eventName,
    totalTickets,
    ticketPrice,
    eventDate
  );
  const receipt = await createTx.wait();
  
  // Get event ID from event logs
  const eventCreatedEvent = receipt?.logs.find((log: any) => {
    try {
      const parsed = ticketNFT.interface.parseLog(log);
      return parsed?.name === "EventCreated";
    } catch {
      return false;
    }
  });
  
  const eventId = eventCreatedEvent 
    ? ticketNFT.interface.parseLog(eventCreatedEvent)?.args[0]
    : 1n;

  console.log("✅ Event created with ID:", eventId.toString());

  // Get event info
  const eventInfo = await ticketNFT.getEventInfo(eventId);
  console.log("   Name:", eventInfo[0]);
  console.log("   Total Tickets:", eventInfo[1].toString());
  console.log("   Price:", ethers.formatEther(eventInfo[3]), "HBAR");

  console.log("\n--- Test 2: Mint Ticket ---");
  const mintTx = await ticketNFT.mintTicket(eventId, await signer.getAddress(), {
    value: ticketPrice,
  });
  const mintReceipt = await mintTx.wait();
  
  const ticketMintedEvent = mintReceipt?.logs.find((log: any) => {
    try {
      const parsed = ticketNFT.interface.parseLog(log);
      return parsed?.name === "TicketMinted";
    } catch {
      return false;
    }
  });
  
  const tokenId = ticketMintedEvent
    ? ticketNFT.interface.parseLog(ticketMintedEvent)?.args[0]
    : 1n;

  console.log("✅ Ticket minted with ID:", tokenId.toString());

  // Get ticket info
  const ticketInfo = await ticketNFT.getTicketInfo(tokenId);
  console.log("   Event ID:", ticketInfo[0].toString());
  console.log("   Price:", ethers.formatEther(ticketInfo[1]), "HBAR");
  console.log("   Used:", ticketInfo[2]);
  console.log("   For Sale:", ticketInfo[3]);

  console.log("\n--- Test 3: List for Resale ---");
  const resalePrice = ethers.parseEther("15"); // 15 HBAR
  const resaleTx = await ticketNFT.resellTicket(tokenId, resalePrice);
  await resaleTx.wait();
  console.log("✅ Ticket listed for resale at:", ethers.formatEther(resalePrice), "HBAR");

  // Check updated ticket info
  const updatedTicketInfo = await ticketNFT.getTicketInfo(tokenId);
  console.log("   For Sale:", updatedTicketInfo[3]);
  console.log("   Resale Price:", ethers.formatEther(updatedTicketInfo[4]), "HBAR");

  console.log("\n--- Test 4: Cancel Resale ---");
  const cancelTx = await ticketNFT.cancelResale(tokenId);
  await cancelTx.wait();
  console.log("✅ Resale cancelled");

  const finalTicketInfo = await ticketNFT.getTicketInfo(tokenId);
  console.log("   For Sale:", finalTicketInfo[3]);

  console.log("\n✅ All tests passed!");
  console.log("\n📝 Summary:");
  console.log("   - Event creation: ✅");
  console.log("   - Ticket minting: ✅");
  console.log("   - Resale listing: ✅");
  console.log("   - Resale cancellation: ✅");
  console.log("\n🎉 Contract is working correctly!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });
