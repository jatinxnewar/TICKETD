# 🚀 Quick Start Guide - Complete Ticket Flow

This guide will get you up and running with the full ticket purchasing and reselling flow in minutes.

## ⚡ Prerequisites

- Node.js 18+ installed
- MetaMask browser extension
- Sepolia testnet ETH (get free from [Sepolia Faucet](https://sepoliafaucet.com/))

## 🎯 Steps to Test the Flow

### 1. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

### 2. Connect Your Wallet

1. Click **"Connect Wallet"** in the top right
2. MetaMask will pop up
3. Click **"Connect"** to approve
4. Your address and balance will appear

### 3. Browse & Purchase a Ticket

1. Click **"Events"** in navigation
2. Click on **any event** (e.g., "Blockchain Summit 2024")
3. Select a **ticket type** (General or VIP)
4. Click **"Purchase Tickets"** button
5. **Review the modal:**
   - Event details
   - Ticket price + 2.5% platform fee
   - Your balance before/after
6. Click **"Purchase for X ETH"**
7. **MetaMask confirmation:**
   - Review gas fee
   - Click "Confirm"
8. **Wait for confirmation:**
   - Loading spinner shows
   - Transaction hash appears
   - Click link to view on block explorer
9. **Success! 🎉**
   - Green checkmark
   - Token ID displayed
   - Modal auto-closes

### 4. View Your Tickets

1. Click **"Dashboard"** in navigation
2. Scroll to **"My NFT Tickets"** section
3. See your purchased ticket with:
   - Event image
   - Token ID badge
   - Active status
   - Original price
   - Purchase date
   - Transaction link

### 5. Resell Your Ticket

1. On your ticket card, click **"Resell"** button
2. **Resale Modal opens:**
   - Shows ticket details
   - Enter resale price (or use suggested)
   - See fee breakdown
   - View estimated earnings
3. Enter price (e.g., `0.09` for 0.09 ETH)
4. Click **"List for Sale"**
5. **MetaMask confirmation:**
   - Approve listing transaction
6. **Processing:**
   - Transaction tracking
   - Block explorer link
7. **Listed! 🎫**
   - Status changes to "listed"
   - Shows resale price
   - Visible on marketplace

### 6. View on Marketplace

1. Click **"Marketplace"** in navigation
2. Find your listed ticket
3. Other users can now purchase it!

## 🎨 What You'll See

### Purchase Modal
```
┌─────────────────────────────────────┐
│  Purchase Ticket                     │
├─────────────────────────────────────┤
│  Event: Blockchain Summit 2024      │
│  Ticket: VIP Pass                   │
│  Available: 25                      │
│                                      │
│  Ticket Price: 0.1000 ETH           │
│  Platform Fee: 0.0025 ETH           │
│  ─────────────────────────          │
│  Total:        0.1025 ETH           │
│                                      │
│  Your Balance: 1.5000 ETH           │
│  After:        1.3975 ETH           │
│                                      │
│  [Cancel] [Purchase for 0.1025 ETH] │
└─────────────────────────────────────┘
```

### Processing State
```
┌─────────────────────────────────────┐
│  Processing Transaction              │
├─────────────────────────────────────┤
│         🔄 Loading...                │
│                                      │
│  Waiting for confirmation...         │
│  Please confirm in your wallet       │
│                                      │
│  TX: 0xabc123...def456              │
│  [View on Explorer ↗]               │
└─────────────────────────────────────┘
```

### Success State
```
┌─────────────────────────────────────┐
│  Purchase Successful!                │
├─────────────────────────────────────┤
│         ✅ Success                   │
│                                      │
│  Your NFT ticket has been minted!   │
│  Token ID: #1234                    │
│                                      │
│  [View Transaction ↗]               │
│                                      │
│  [View My Tickets]                  │
└─────────────────────────────────────┘
```

### My Tickets Card
```
┌─────────────────────────────────────┐
│ [Event Image]                ⚡ active│
│                              #1234   │
├─────────────────────────────────────┤
│ Blockchain Summit 2024              │
│ [VIP Badge]                    [⋮]  │
│                                      │
│ 📅 Mar 15, 2024 at 18:00            │
│ 📍 San Francisco, CA                │
│ Purchased: Jan 15, 2024             │
│                                      │
│ 0.1 ETH              [QR] [Resell]  │
└─────────────────────────────────────┘
```

## 🔧 Mock Mode (Without Smart Contracts)

If smart contracts aren't deployed yet, the app will work in mock mode:

1. Purchase button simulates transaction
2. Fake TX hash generated
3. Ticket saved to localStorage
4. Full flow works without blockchain

To enable mock mode, the hooks automatically fall back when contracts aren't available.

## 📱 Testing on Mobile

1. Open MetaMask mobile app
2. Go to Browser tab
3. Navigate to your local IP:
   ```
   http://192.168.1.X:3000
   ```
4. Follow same flow
5. Approve transactions in-app

## 🐛 Troubleshooting

### "Connect Wallet" doesn't work
- ✅ Install MetaMask extension
- ✅ Unlock your wallet
- ✅ Refresh page

### "Insufficient Balance" error
- ✅ Get testnet ETH from faucet
- ✅ Switch to Sepolia network in MetaMask
- ✅ Wait for faucet transaction

### "Transaction Failed"
- ✅ Check gas settings (use default)
- ✅ Ensure enough ETH for gas
- ✅ Try again with higher gas limit

### Ticket doesn't appear in Dashboard
- ✅ Click "Refresh" button
- ✅ Check localStorage in DevTools
- ✅ Ensure wallet is connected
- ✅ Wait for transaction confirmation

### MongoDB errors in console
- ⚠️ These are expected if MongoDB not configured
- ✅ App works fine without MongoDB
- ✅ Uses localStorage for ticket storage

## 🎬 Demo Video Script

Record a quick demo:

1. **"Welcome! Let's buy and resell a ticket"**
2. *Connect wallet* → "First, connect MetaMask"
3. *Browse events* → "Find an event I like"
4. *Select ticket* → "Choose VIP pass"
5. *Purchase* → "Review and purchase"
6. *Confirm* → "Approve in MetaMask"
7. *Success* → "Ticket minted! Here's my token ID"
8. *Dashboard* → "View in my dashboard"
9. *Resell* → "Now let's list it for resale"
10. *List* → "Set price and confirm"
11. *Marketplace* → "Now it's on the marketplace!"

## 📚 Component Usage

### In Your Code

```tsx
import { TicketPurchaseModal } from "@/components/tickets/ticket-purchase-modal"

<TicketPurchaseModal
  open={showModal}
  onOpenChange={setShowModal}
  ticket={{
    id: "1",
    name: "VIP Pass",
    description: "Full access",
    price: "0.1 ETH",
    available: 50
  }}
  eventId="event-123"
  eventTitle="My Event"
  onSuccess={(txHash, tokenId) => {
    console.log("Purchased!", txHash, tokenId)
  }}
/>
```

```tsx
import { ResaleModal } from "@/components/tickets/resale-modal"

<ResaleModal
  open={showModal}
  onOpenChange={setShowModal}
  ticket={{
    tokenId: "#1234",
    eventTitle: "My Event",
    ticketType: "VIP",
    originalPrice: "0.1 ETH",
    eventDate: "2024-03-15"
  }}
  onSuccess={(txHash) => {
    console.log("Listed!", txHash)
  }}
/>
```

## 🔑 Key Files

- **Purchase Modal:** `components/tickets/ticket-purchase-modal.tsx`
- **Resale Modal:** `components/tickets/resale-modal.tsx`
- **My Tickets:** `components/dashboard/my-tickets.tsx`
- **Event Detail:** `components/events/event-detail.tsx`
- **Web3 Provider:** `components/web3-provider.tsx`
- **Contract Hooks:** `lib/contracts/index.ts`

## ✅ Checklist

Before going live:

- [ ] Smart contracts deployed
- [ ] Contract addresses updated in `lib/contracts/addresses.ts`
- [ ] MongoDB connection configured (optional)
- [ ] Environment variables set
- [ ] Testnet testing complete
- [ ] Mainnet deployment verified
- [ ] Gas optimization checked
- [ ] Security audit completed

## 🎉 You're Ready!

The complete flow is now live:
- ✅ Wallet connection
- ✅ Event browsing
- ✅ Ticket purchasing with Web3
- ✅ Transaction tracking
- ✅ My Tickets dashboard
- ✅ Resale functionality
- ✅ Marketplace integration

**Next:** Deploy smart contracts and update addresses to use real blockchain! 🚀

---

**Questions?** Check `TICKET_FLOW.md` for detailed documentation or `README.md` for full setup guide.
