# Migration Guide - Unified Create Flow & Web3 Integration

This document outlines all changes made to consolidate duplicate functionality and integrate Web3 libraries.

## 🔄 Changes Summary

### 1. Unified Creation Flow ✅

**Problem**: Separate `/create-event` and `/create-listing` pages with duplicate wizard logic.

**Solution**: Created unified `/create` page with tabbed interface.

**Files Created**:
- `app/create/page.tsx` - New unified creation page with tabs

**Files Deprecated** (can be deleted):
- `app/create-event/page.tsx` - Now redirects to `/create?tab=event`
- `app/create-listing/page.tsx` - Now redirects to `/create?tab=listing`

**Navigation Updated**:
- `components/layout/header.tsx` - Changed from "Create Event" + "Create Listing" to single "Create" button

**Migration Steps**:
1. Users will automatically see tabs on `/create` page
2. Old URLs still work (pages exist but can be removed)
3. Update any hardcoded links to use `/create` instead

---

### 2. Web3 Integration with ethers.js v6 ✅

**Problem**: Basic `window.ethereum` usage without type safety or modern APIs.

**Solution**: Full ethers.js v6 integration with TypeScript support.

#### Dependencies Added
```json
{
  "ethers": "^6.9.0",
  "web3": "^4.3.0"
}
```

#### Files Created/Modified

**Enhanced Web3Provider**:
- `components/web3-provider.tsx` - Upgraded to use ethers.js `BrowserProvider`

**New Features Added**:
- `provider` - ethers.js BrowserProvider instance
- `signer` - JsonRpcSigner for transactions
- `balance` - Formatted ETH balance
- `chainId` - Current network ID
- `switchNetwork()` - Network switching function
- Auto-reconnect on page refresh
- Event listeners for account/network changes

**Example Usage**:
```typescript
const { provider, signer, account, chainId } = useWeb3()

// Read blockchain data
const blockNumber = await provider.getBlockNumber()

// Sign transactions
const tx = await signer.sendTransaction({
  to: "0x...",
  value: parseEther("0.1")
})
```

---

### 3. Smart Contract Interaction Layer ✅

**Files Created**:

#### `hooks/useContract.ts`
Generic hook for contract interaction:
```typescript
const contract = useContract(address, ABI)
const result = await contract.myFunction()
```

#### `hooks/useTransaction.ts`
Transaction state management:
```typescript
const { execute, isLoading, isSuccess, txHash } = useTransaction()

await execute(async () => {
  return await contract.myFunction()
})
```

#### `lib/web3-utils.ts`
Utility functions:
- `formatWeiToEther()` - Convert Wei to ETH
- `parseEtherToWei()` - Convert ETH to Wei
- `shortenAddress()` - Format addresses for display
- `getExplorerUrl()` - Generate block explorer links
- `getNetworkName()` - Get network name from chain ID
- `isValidAddress()` - Validate Ethereum addresses
- And more...

---

### 4. Smart Contract Configuration ✅

**Files Created**:

#### `lib/contracts/abis.ts`
Smart contract ABIs for:
- **TicketNFT**: Full ERC-721 ticket NFT contract
  - Event creation, minting, transfers
  - Resale marketplace integration
  - Ticket validation
  - Royalty support
  
- **Marketplace**: Secondary marketplace contract
  - Fixed-price listings
  - Auction support
  - Bid management

#### `lib/contracts/addresses.ts`
Contract deployment addresses per network:
```typescript
export const CONTRACTS = {
  11155111: { // Sepolia
    ticketNFT: "0x...",
    marketplace: "0x..."
  },
  137: { // Polygon
    ticketNFT: "0x...",
    marketplace: "0x..."
  }
}
```

**⚠️ TODO**: Deploy contracts and update addresses in this file.

#### `lib/contracts/index.ts`
High-level contract interaction hooks:
- `useTicketNFT()` - TicketNFT contract interactions
- `useMarketplace()` - Marketplace contract interactions

**Example Usage**:
```typescript
function CreateEvent() {
  const { createEvent, isLoading, txHash } = useTicketNFT()
  
  const handleCreate = async () => {
    await createEvent("Event Name", "SYMBOL", 100, "0.1", timestamp)
    console.log("Transaction:", txHash)
  }
}
```

---

## 🎯 Breaking Changes

### For Developers

1. **Web3Provider Context API Changed**:
   ```typescript
   // OLD
   const { account, connectWallet } = useWeb3()
   
   // NEW (backward compatible, but more available)
   const { 
     account,           // Same
     connectWallet,     // Same
     provider,          // NEW - ethers.js provider
     signer,           // NEW - ethers.js signer
     chainId,          // NEW - current chain ID
     balance,          // NEW - formatted balance
     switchNetwork     // NEW - network switching
   } = useWeb3()
   ```

2. **Navigation Links**:
   ```typescript
   // OLD
   <Link href="/create-event">Create Event</Link>
   <Link href="/create-listing">List Ticket</Link>
   
   // NEW
   <Link href="/create">Create</Link>
   ```

### For Users

✅ **No breaking changes** - All old URLs still work, navigation is cleaner.

---

## 📝 Usage Examples

### Creating an Event with Smart Contract

```typescript
"use client"

import { useTicketNFT } from "@/lib/contracts"
import { useState } from "react"

export function CreateEventForm() {
  const { createEvent, isLoading, isSuccess, error } = useTicketNFT()
  const [eventData, setEventData] = useState({
    name: "",
    symbol: "",
    totalTickets: 100,
    price: "0.1",
    eventDate: Date.now() / 1000
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const receipt = await createEvent(
        eventData.name,
        eventData.symbol,
        eventData.totalTickets,
        eventData.price,
        eventData.eventDate
      )
      
      console.log("Event created! Receipt:", receipt)
    } catch (err) {
      console.error("Failed to create event:", err)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Event"}
      </button>
      {isSuccess && <p>Event created successfully!</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}
```

### Buying a Ticket

```typescript
import { useTicketNFT } from "@/lib/contracts"
import { parseEther } from "ethers"

export function BuyTicketButton({ eventId, price }: Props) {
  const { mintTicket, isLoading } = useTicketNFT()
  const { account } = useWeb3()
  
  const handleBuy = async () => {
    if (!account) {
      alert("Please connect wallet")
      return
    }
    
    try {
      await mintTicket(eventId, account, price)
      alert("Ticket purchased!")
    } catch (err) {
      alert("Purchase failed")
    }
  }
  
  return (
    <button onClick={handleBuy} disabled={isLoading}>
      {isLoading ? "Processing..." : `Buy for ${price} ETH`}
    </button>
  )
}
```

### Displaying Wallet Info

```typescript
import { useWeb3 } from "@/components/web3-provider"
import { shortenAddress, getNetworkName } from "@/lib/web3-utils"

export function WalletInfo() {
  const { account, balance, chainId, isConnected } = useWeb3()
  
  if (!isConnected) {
    return <p>Not connected</p>
  }
  
  return (
    <div>
      <p>Address: {shortenAddress(account!)}</p>
      <p>Balance: {balance} ETH</p>
      <p>Network: {getNetworkName(chainId!)}</p>
    </div>
  )
}
```

---

## 🚀 Next Steps

### 1. Deploy Smart Contracts

Deploy TicketNFT and Marketplace contracts to your chosen networks:

```bash
# Example using Hardhat
npx hardhat run scripts/deploy.js --network sepolia
```

Update addresses in `lib/contracts/addresses.ts`:
```typescript
export const CONTRACTS = {
  11155111: {
    ticketNFT: "0xYourTicketNFTAddress",
    marketplace: "0xYourMarketplaceAddress"
  }
}
```

### 2. Test Wallet Connection

1. Open app: `npm run dev`
2. Click "Connect Wallet"
3. Approve connection in MetaMask
4. Verify balance and network display correctly

### 3. Test Create Flow

1. Navigate to `/create`
2. Toggle between "New Event" and "Resell Ticket" tabs
3. Verify both wizards work correctly
4. Check that old URLs (`/create-event`, `/create-listing`) still work

### 4. Test Contract Interactions

Once contracts are deployed:

1. Create test event
2. Mint test ticket
3. List ticket for resale
4. Transfer ticket
5. Verify transactions on block explorer

### 5. Optional Cleanup

Remove deprecated pages (optional - they don't affect functionality):
```bash
rm app/create-event/page.tsx
rm app/create-listing/page.tsx
```

Or keep them as redirects:
```typescript
// app/create-event/page.tsx
import { redirect } from "next/navigation"

export default function CreateEventPage() {
  redirect("/create?tab=event")
}
```

---

## 🐛 Troubleshooting

### "Module not found: ethers"
**Solution**: Run `npm install` (already done)

### "Cannot read property 'ethereum' of undefined"
**Solution**: Ensure you're using the app in a browser with MetaMask installed

### Contract functions return undefined
**Solution**: 
1. Check contract is deployed to current network
2. Verify addresses in `lib/contracts/addresses.ts`
3. Check network is supported in `CONTRACTS` object

### Transaction fails with "insufficient funds"
**Solution**:
1. Get testnet ETH from faucet (for testnets)
2. Ensure wallet has enough ETH for gas + transaction value

### Wrong network error
**Solution**: Use `switchNetwork()` function or manually switch in MetaMask

---

## 📊 File Structure Changes

### New Files
```
app/create/page.tsx                    # Unified creation page
hooks/useContract.ts                   # Contract interaction hook
hooks/useTransaction.ts                # Transaction management
lib/web3-utils.ts                      # Web3 utilities
lib/contracts/abis.ts                  # Smart contract ABIs
lib/contracts/addresses.ts             # Deployment addresses
lib/contracts/index.ts                 # Contract interaction hooks
README.md                              # Updated documentation
MIGRATION.md                           # This file
```

### Modified Files
```
components/web3-provider.tsx           # Enhanced with ethers.js
components/layout/header.tsx           # Updated navigation
package.json                           # Added ethers + web3
```

### Deprecated (Optional to Remove)
```
app/create-event/page.tsx             # Replaced by /create
app/create-listing/page.tsx           # Replaced by /create
```

---

## ✅ Verification Checklist

- [x] Dependencies installed (`npm install`)
- [x] Build successful (`npm run build`)
- [x] No TypeScript errors
- [x] No linting errors
- [x] Create page loads with tabs
- [x] Navigation updated
- [x] Web3Provider enhanced
- [x] Contract hooks created
- [x] Utilities available
- [ ] Smart contracts deployed (TODO)
- [ ] Contract addresses updated (TODO)
- [ ] End-to-end testing (TODO after contract deployment)

---

## 📞 Support

If you encounter issues:
1. Check this migration guide
2. Review the main README.md
3. Check console for error messages
4. Verify MetaMask is installed and unlocked
5. Ensure you're on a supported network

**Happy coding! 🎉**
