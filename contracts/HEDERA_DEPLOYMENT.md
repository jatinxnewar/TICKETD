# 🚀 Hedera Testnet Deployment Guide

This guide will help you deploy the TicketNFT smart contract to Hedera testnet.

## 📋 Prerequisites

1. **Hedera Testnet Account** - Get free testnet HBAR
2. **Private Key** - Export from your Hedera wallet
3. **Node.js & npm** - Already installed ✅

---

## Step 1: Get Hedera Testnet Account

### Option A: Hedera Portal (Recommended)
1. Go to [https://portal.hedera.com/register](https://portal.hedera.com/register)
2. Create a free account
3. Complete verification
4. You'll receive **~1000 testnet HBAR** automatically
5. Go to **"Testnet Access"** section
6. Copy your:
   - Account ID (e.g., `0.0.1234567`)
   - Private Key (64 character hex string)

### Option B: HashPack Wallet
1. Install [HashPack browser extension](https://www.hashpack.app/)
2. Create new wallet
3. Switch to **Testnet** in settings
4. Get free testnet HBAR from faucet
5. Export private key from settings

### Option C: Hedera Faucet
1. Visit [https://portal.hedera.com/faucet](https://portal.hedera.com/faucet)
2. Enter your account ID
3. Receive 10,000 testnet HBAR

---

## Step 2: Configure Environment

1. Open `contracts/.env` file
2. Add your credentials:

```bash
# Your Hedera testnet private key (64 character hex, NO 0x prefix)
HEDERA_PRIVATE_KEY=your_64_character_private_key_here

# Your account ID (optional, for reference)
HEDERA_ACCOUNT_ID=0.0.1234567

# Network (already configured)
HEDERA_NETWORK=testnet
```

⚠️ **Important**: 
- Private key should be **64 characters** (32 bytes in hex)
- **NO `0x` prefix** - just the hex characters
- Keep this secret! Never commit to git (.env is in .gitignore)

---

## Step 3: Test Connection

Run this command to test your Hedera connection:

```bash
npm run test:connection
```

This will:
- ✅ Verify your private key format
- ✅ Check your account balance
- ✅ Test connection to Hedera testnet

---

## Step 4: Deploy Contract

Deploy to Hedera testnet:

```bash
npm run deploy:hedera
```

**Expected output:**
```
🚀 Deploying TicketNFT contract...
📍 Deploying with account: 0xYourAddress...
💰 Account balance: 995.5 HBAR
✅ TicketNFT deployed to: 0x1234567890abcdef...

📝 Deployment Info:
{
  "network": "hedera-testnet",
  "chainId": "296",
  "ticketNFT": "0x1234567890abcdef...",
  "deployer": "0xYourAddress...",
  "timestamp": "2025-11-19T..."
}
```

**Save the contract address!** You'll need it for the frontend.

---

## Step 5: Update Frontend

1. Open `frontend/.env.local`
2. Update the contract address:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
NEXT_PUBLIC_CHAIN_ID=296
NEXT_PUBLIC_NETWORK=hedera-testnet
NEXT_PUBLIC_RPC_URL=https://testnet.hashio.io/api
```

3. Restart your frontend:
```bash
npm run dev --workspace=frontend
```

---

## Step 6: Verify Deployment

### Check on Hedera Explorer
Visit: [https://hashscan.io/testnet](https://hashscan.io/testnet)
Search for your contract address

### Test Contract Functions

Run the test script:
```bash
npm run test:contract
```

This will:
- ✅ Create a test event
- ✅ Mint a test ticket
- ✅ List ticket for resale
- ✅ Verify all functions work

---

## 🎯 Contract Features

Your deployed contract supports:

### ✅ Event Creation
```solidity
createEvent(name, totalTickets, price, eventDate)
```

### ✅ Ticket Minting
```solidity
mintTicket(eventId, to) payable
```

### ✅ Ticket Resale
```solidity
resellTicket(tokenId, price)
buyResaleTicket(tokenId) payable
cancelResale(tokenId)
```

### ✅ Ticket Validation
```solidity
validateTicket(tokenId)
```

---

## 🔧 Troubleshooting

### "Insufficient funds" error
- Check balance: `npm run check:balance`
- Get more HBAR from faucet: [portal.hedera.com/faucet](https://portal.hedera.com/faucet)

### "Invalid private key" error
- Ensure key is **64 characters**
- Remove any `0x` prefix
- Check for extra spaces

### "Network timeout" error
- Check internet connection
- Hedera testnet may be slow (timeout set to 60s)
- Try again in a few minutes

### "Transaction failed" error
- Check Hedera network status: [status.hedera.com](https://status.hedera.com)
- Verify gas/HBAR balance
- Check transaction on HashScan

---

## 📚 Additional Resources

- **Hedera Docs**: [docs.hedera.com](https://docs.hedera.com)
- **Hedera Portal**: [portal.hedera.com](https://portal.hedera.com)
- **HashScan Explorer**: [hashscan.io/testnet](https://hashscan.io/testnet)
- **Hedera Discord**: [hedera.com/discord](https://hedera.com/discord)

---

## 🎉 Next Steps

After successful deployment:

1. ✅ Save contract address securely
2. ✅ Update frontend .env.local
3. ✅ Test creating events in UI
4. ✅ Test minting tickets
5. ✅ Test resale functionality
6. 🚀 Share with users!

---

## 💡 Tips

- **Testnet HBAR is free** - don't worry about running out
- **Deploy often** - testnet is for testing!
- **Check HashScan** - all transactions are public
- **Join Hedera Discord** - active community support

---

Need help? Check the troubleshooting section or reach out to Hedera community!
