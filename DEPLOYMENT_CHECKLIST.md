# 🎯 DEPLOYMENT CHECKLIST

Use this checklist to deploy your TicketNFT contract to Hedera testnet.

---

## ✅ Prerequisites (Already Done)

- [x] Contract fixed and compiled
- [x] Documentation created
- [x] Helper scripts ready
- [x] Git repository updated

---

## 🚀 Deployment Steps (Do This Now)

### Step 1: Get Hedera Account (2 minutes)

- [ ] Go to https://portal.hedera.com/register
- [ ] Create free account
- [ ] Complete email verification
- [ ] Navigate to "Testnet Access" tab
- [ ] **SAVE THESE VALUES:**
  ```
  Account ID: 0.0.__________ (example: 0.0.1234567)
  Private Key: ________________________________ (64 characters)
  ```
- [ ] Confirm you received ~1000 testnet HBAR

**Alternative:** Use HashPack wallet and export private key

---

### Step 2: Configure Environment (30 seconds)

- [ ] Open file: `contracts/.env`
- [ ] Add your private key (replace `your_private_key_here`):
  ```bash
  HEDERA_PRIVATE_KEY=abc123def456...  # 64 characters, NO 0x prefix
  ```
- [ ] Save the file
- [ ] **IMPORTANT:** Verify length is exactly 64 characters

---

### Step 3: Test Connection (30 seconds)

- [ ] Open terminal in `contracts` folder
- [ ] Run: `npm run test:connection`
- [ ] Expected output:
  ```
  ✅ Connected to network: hedera-testnet
  ✅ Balance: ~1000 HBAR
  ✅ All checks passed! Ready to deploy.
  ```
- [ ] If errors, check troubleshooting section below

---

### Step 4: Deploy Contract (1 minute)

- [ ] Run: `npm run deploy:hedera`
- [ ] Wait for deployment (takes ~30-60 seconds)
- [ ] **SAVE THIS CONTRACT ADDRESS:**
  ```
  ✅ TicketNFT deployed to: 0x____________________________
  ```
- [ ] Copy the full address (starts with 0x)

---

### Step 5: Update Frontend (1 minute)

- [ ] Open file: `frontend/.env.local`
- [ ] Update these values:
  ```bash
  NEXT_PUBLIC_CONTRACT_ADDRESS=0x____________________________
  NEXT_PUBLIC_CHAIN_ID=296
  NEXT_PUBLIC_NETWORK=hedera-testnet
  NEXT_PUBLIC_RPC_URL=https://testnet.hashio.io/api
  ```
- [ ] Save the file

---

### Step 6: Test Contract (1 minute)

- [ ] Run: `npm run test:contract <your_contract_address>`
- [ ] Expected output:
  ```
  ✅ Event created with ID: 1
  ✅ Ticket minted with ID: 1
  ✅ Ticket listed for resale
  ✅ Resale cancelled
  ✅ All tests passed!
  ```

---

### Step 7: Verify on Explorer (30 seconds)

- [ ] Visit: https://hashscan.io/testnet
- [ ] Search for your contract address
- [ ] Verify deployment shows:
  - [x] Contract created
  - [x] Creator address matches yours
  - [x] Transactions appear

---

## 🎉 Deployment Complete!

Your contract is now live on Hedera testnet. You can now:

- Create events in your frontend
- Mint tickets as NFTs
- List tickets for resale
- Transfer tickets between users
- Validate tickets for entry

---

## 🔧 Troubleshooting

### ❌ "Invalid private key" error

**Problem:** Private key format is wrong

**Solution:**
1. Check length is exactly 64 characters
2. Remove any `0x` prefix
3. Remove spaces or newlines
4. Re-export from Hedera Portal or HashPack

---

### ❌ "Insufficient funds" error

**Problem:** Not enough HBAR for deployment

**Solution:**
1. Check balance: `npm run check:balance`
2. Get more HBAR from faucet: https://portal.hedera.com/faucet
3. Wait 24 hours and request again if needed

---

### ❌ "Network timeout" error

**Problem:** Connection to Hedera testnet failed

**Solution:**
1. Check internet connection
2. Try again (testnet can be slow)
3. Check Hedera status: https://status.hedera.com
4. Wait a few minutes and retry

---

### ❌ "Transaction failed" error

**Problem:** Smart contract deployment failed

**Solution:**
1. Check gas/HBAR balance
2. Review transaction on HashScan
3. Check error message in terminal
4. Try deploying again (idempotent)

---

### ❌ Test connection shows low balance

**Problem:** Less than 10 HBAR available

**Solution:**
- Get more from faucet (link above)
- You need ~5-10 HBAR for deployment
- Testnet HBAR is free and unlimited

---

## 📝 Important Notes

### Private Key Security
- ✅ `.env` file is in `.gitignore` (safe)
- ❌ Never commit private keys to git
- ❌ Never share private keys publicly
- ✅ Use testnet keys only for testing

### Contract Address
- Save this address securely
- You'll need it for frontend integration
- You'll need it for verification
- Write it down or save in password manager

### Testnet vs Mainnet
- This is TESTNET - for testing only
- HBAR has no real value
- Deploy often and experiment
- When ready, use same process for mainnet

---

## 📚 Additional Resources

### Documentation
- **Quick Start**: `contracts/README_DEPLOYMENT.md`
- **Full Guide**: `contracts/HEDERA_DEPLOYMENT.md`
- **API Reference**: `contracts/CONTRACT_REFERENCE.md`

### Hedera Resources
- **Portal**: https://portal.hedera.com
- **Faucet**: https://portal.hedera.com/faucet
- **Explorer**: https://hashscan.io/testnet
- **Docs**: https://docs.hedera.com
- **Discord**: https://hedera.com/discord

### Commands Reference
```bash
# Check balance
npm run check:balance

# Test connection
npm run test:connection

# Deploy contract
npm run deploy:hedera

# Test deployed contract
npm run test:contract <address>

# Compile contract
npm run compile
```

---

## ✨ Post-Deployment Tasks

After successful deployment:

- [ ] Test event creation in frontend UI
- [ ] Test ticket minting flow
- [ ] Test resale functionality
- [ ] Test ticket validation
- [ ] Deploy backend to production (Railway/Vercel)
- [ ] Update production environment variables
- [ ] Share with test users
- [ ] Gather feedback
- [ ] Iterate and improve

---

## 🎯 Success Criteria

You'll know deployment succeeded when:

1. ✅ Contract address received from deployment
2. ✅ Contract visible on HashScan explorer
3. ✅ Test script completes successfully
4. ✅ Frontend can connect to contract
5. ✅ Can create test event in UI
6. ✅ Can mint test ticket

---

## 💡 Pro Tips

1. **Save Everything**: Contract addresses, transaction hashes, account IDs
2. **Test First**: Use testnet to experiment freely
3. **Document Changes**: Keep notes on what works
4. **Use HashScan**: Monitor all transactions
5. **Join Discord**: Hedera community is helpful
6. **Deploy Often**: Testnet is free, practice makes perfect

---

## 🆘 Need Help?

1. Check documentation in `contracts/` folder
2. Review error messages carefully
3. Search HashScan for transaction details
4. Check Hedera Discord community
5. Review this checklist again

---

**Ready? Let's deploy! 🚀**

Start with Step 1 above and work through each checkbox.
