# 🦊 Adding Hedera Testnet to MetaMask

Your contract is deployed at: **`0xb897e663baE872470ED388616b5DF0C229A80bA0`**

Follow these steps to add Hedera Testnet to your MetaMask wallet.

---

## Method 1: Add Automatically (Easiest)

1. **Connect your wallet** in the app
2. Click **"Switch Network"** button when prompted
3. MetaMask will open and ask to add the network
4. Click **"Approve"** and then **"Switch Network"**

✅ Done! You're now on Hedera Testnet.

---

## Method 2: Add Manually

### Step-by-Step Instructions:

1. **Open MetaMask** browser extension

2. Click the **network dropdown** at the top (currently shows "Ethereum Mainnet")

3. Click **"Add Network"** or **"Add a network manually"**

4. Fill in the following details:

   ```
   Network Name: Hedera Testnet
   New RPC URL: https://testnet.hashio.io/api
   Chain ID: 296
   Currency Symbol: HBAR
   Block Explorer URL: https://hashscan.io/testnet
   ```

5. Click **"Save"**

6. Click **"Switch to Hedera Testnet"**

✅ You're now connected to Hedera Testnet!

---

## Method 3: One-Click Add (Desktop)

Visit this URL while MetaMask is installed:

```
https://testnet.hashio.io/api
```

Or use the Chainlist website:
1. Go to: https://chainlist.org/
2. Search for "Hedera Testnet"
3. Click "Add to MetaMask"

---

## Get Testnet HBAR

After adding the network, you need testnet HBAR to interact with the contract:

### Option 1: Hedera Faucet
1. Visit: https://portal.hedera.com/faucet
2. Connect your wallet or enter your address
3. Request testnet HBAR (free)
4. Wait 30 seconds for confirmation

### Option 2: Hedera Portal
1. Visit: https://portal.hedera.com/register
2. Create free account
3. Get 1000 testnet HBAR automatically
4. Send to your MetaMask address

---

## Verify Connection

After adding the network and getting HBAR:

1. ✅ MetaMask shows "Hedera Testnet" at the top
2. ✅ You see your HBAR balance (e.g., "10 HBAR")
3. ✅ Your wallet address starts with "0x..."
4. ✅ The app shows "✓ Hedera Testnet" badge

---

## Network Details Reference

| Setting | Value |
|---------|-------|
| **Network Name** | Hedera Testnet |
| **RPC URL** | https://testnet.hashio.io/api |
| **Chain ID** | 296 (0x128 in hex) |
| **Currency Symbol** | HBAR |
| **Decimals** | 18 |
| **Block Explorer** | https://hashscan.io/testnet |

---

## Hedera Mainnet (For Future)

When ready to deploy to production:

```
Network Name: Hedera Mainnet
RPC URL: https://mainnet.hashio.io/api
Chain ID: 295
Currency Symbol: HBAR
Block Explorer: https://hashscan.io/mainnet
```

⚠️ **Mainnet HBAR has real value** - test thoroughly on testnet first!

---

## Troubleshooting

### ❌ "Chain ID not recognized"
- Make sure you entered exactly: **296**
- Don't add "0x" prefix in MetaMask UI
- Try decimal: 296, not hex: 0x128

### ❌ "RPC URL not working"
- Copy exact URL: https://testnet.hashio.io/api
- Make sure there's no space at the end
- Check your internet connection
- Try again in a few minutes

### ❌ "Can't see my balance"
- Make sure you're on Hedera Testnet
- Get testnet HBAR from faucet (see above)
- Refresh MetaMask
- Check address on HashScan: https://hashscan.io/testnet

### ❌ "Transaction failed"
- Make sure you have enough HBAR for gas
- Check you're on the correct network (296)
- Try increasing gas limit
- Check transaction on HashScan

---

## Contract Information

**TicketNFT Contract Address:**
```
0xb897e663baE872470ED388616b5DF0C229A80bA0
```

**Deployer Address:**
```
0x41B8F2EFA0b3Fd3293686ee4BEd9A46dC647f5Fb
```

**Hedera Account ID:**
```
0.0.6945737
```

**View on HashScan:**
```
https://hashscan.io/testnet/contract/0xb897e663baE872470ED388616b5DF0C229A80bA0
```

---

## Next Steps

After adding Hedera Testnet:

1. ✅ Get testnet HBAR from faucet
2. ✅ Connect wallet in the app
3. ✅ Verify you see "Hedera Testnet" badge
4. ✅ Create a test event
5. ✅ Mint a test ticket
6. ✅ Test resale functionality
7. ✅ Validate ticket works

---

## Resources

- **Hedera Docs**: https://docs.hedera.com
- **Hedera Portal**: https://portal.hedera.com
- **HashScan Explorer**: https://hashscan.io/testnet
- **Hedera Discord**: https://hedera.com/discord
- **MetaMask Help**: https://support.metamask.io

---

Need help? Check the contract on HashScan or join Hedera Discord! 🚀
