# Hedera Testnet Setup Guide

## Getting Started with Hedera

### 1. Create Hedera Testnet Account

1. Go to [Hedera Portal](https://portal.hedera.com/)
2. Sign up for a free account
3. Get your testnet credentials:
   - Account ID (format: 0.0.XXXXXX)
   - Private Key (DER encoded)

### 2. Configure Environment

Update `contracts/.env`:
```bash
HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_PRIVATE_KEY=your_private_key_here
HEDERA_NETWORK=testnet
```

### 3. Get Test HBAR

- Testnet HBAR is automatically provided with your testnet account
- You can get more from the [Hedera Testnet Faucet](https://portal.hedera.com/faucet)

### 4. Deploy Contracts

```bash
cd contracts
npm run deploy:hedera
```

### 5. Update Frontend Configuration

After deployment, copy the contract address and update `frontend/.env.local`:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYOUR_DEPLOYED_CONTRACT_ADDRESS
```

## Hedera Network Details

### Testnet
- **Chain ID**: 296
- **RPC URL**: https://testnet.hashio.io/api
- **Mirror Node**: https://testnet.mirrornode.hedera.com
- **Explorer**: https://hashscan.io/testnet

### Mainnet
- **Chain ID**: 295
- **RPC URL**: https://mainnet.hashio.io/api
- **Mirror Node**: https://mainnet-public.mirrornode.hedera.com
- **Explorer**: https://hashscan.io/mainnet

## Key Differences from Ethereum

1. **Account IDs**: Hedera uses account IDs (0.0.XXXX) instead of just addresses
2. **Gas Fees**: Paid in HBAR (much cheaper than Ethereum)
3. **Transaction Speed**: 3-5 second finality
4. **EVM Compatible**: Supports Solidity smart contracts

## Wallet Setup

### MetaMask Configuration

1. Open MetaMask
2. Click Networks → Add Network → Add Manually
3. Enter Hedera Testnet details:
   - **Network Name**: Hedera Testnet
   - **RPC URL**: https://testnet.hashio.io/api
   - **Chain ID**: 296
   - **Currency Symbol**: HBAR
   - **Block Explorer**: https://hashscan.io/testnet

## Smart Contract Deployment

Your `TicketNFT.sol` contract will work on Hedera with no changes needed!

```bash
# Compile contracts
npm run compile

# Deploy to Hedera Testnet
npm run deploy:hedera

# Test locally first
npm run deploy
```

## Troubleshooting

### "Insufficient account balance"
- Check your testnet HBAR balance at https://hashscan.io/testnet
- Get more from the faucet if needed

### "Connection timeout"
- Hedera RPC can be slower than Ethereum
- Increase timeout in hardhat.config.ts (already set to 60s)

### "Invalid account format"
- Ensure your private key is in the correct format
- Should be a hex string starting with 0x

## Resources

- [Hedera Documentation](https://docs.hedera.com/)
- [Hedera Portal](https://portal.hedera.com/)
- [HashScan Explorer](https://hashscan.io/)
- [Hedera JSON-RPC Relay Docs](https://docs.hedera.com/hedera/core-concepts/smart-contracts/json-rpc-relay)

## Next Steps

1. ✅ Deploy smart contract to Hedera testnet
2. ✅ Update frontend with contract address
3. ✅ Connect MetaMask to Hedera testnet
4. ✅ Test ticket minting
5. ✅ Test resale functionality
