# Complete Ticket Flow Guide

This guide demonstrates the end-to-end ticket purchasing and reselling flow on the Ticket'D platform.

## 🎫 User Journey

### 1. Browse Events
Users can discover events on the homepage or events page.

### 2. View Event Details
Click on any event to see full details including:
- Event information (date, time, location)
- Available ticket types and prices
- Event agenda and speakers
- Organizer details

### 3. Connect Wallet
Before purchasing, users must connect their Web3 wallet (MetaMask).

**Flow:**
1. Click "Connect Wallet" button in header
2. MetaMask popup appears
3. User approves connection
4. Wallet address and balance displayed

### 4. Purchase Ticket

**Step-by-Step:**
1. On event detail page, select a ticket type
2. Click "Purchase Tickets" button
3. **Purchase Modal opens** showing:
   - Event and ticket details
   - Price breakdown (ticket + 2.5% platform fee)
   - Current wallet balance
   - Estimated balance after purchase
   
4. Click "Purchase for X ETH" button
5. **MetaMask confirmation** popup appears
6. Review gas fees and confirm transaction
7. **Processing state** shows:
   - Loading spinner
   - Transaction hash
   - Link to block explorer
   
8. **Success state** shows:
   - Green checkmark
   - Token ID of minted NFT
   - Transaction details
   - Auto-closes after 3 seconds

**What Happens Behind the Scenes:**
```typescript
// Smart contract call
const receipt = await mintTicket(
  eventId,        // Event identifier
  userAddress,    // Buyer's wallet
  ticketPrice     // Price in ETH
)

// Local storage update
localStorage.setItem("userTickets", JSON.stringify([
  ...existingTickets,
  {
    tokenId: "1234",
    eventId: "1",
    eventTitle: "Blockchain Summit",
    ticketType: "VIP",
    price: "0.1 ETH",
    purchaseDate: "2024-01-15T10:30:00Z",
    txHash: "0xabc123...",
    owner: "0xuser...",
    status: "active"
  }
]))
```

### 5. View My Tickets

Navigate to **Dashboard** to see all owned tickets.

**Features:**
- Real-time sync with connected wallet
- Filter by status (active, listed, used)
- View transaction details on block explorer
- QR code for ticket validation
- Resell option for active tickets

### 6. Resell Ticket

**Step-by-Step:**
1. Go to Dashboard → My Tickets
2. Click "Resell" button on any active ticket
3. **Resale Modal opens** showing:
   - Original ticket details
   - Price input field
   - Suggested price (90% of original)
   - Price breakdown (listing price - 2.5% fee)
   - Estimated earnings
   
4. Enter desired resale price
5. Click "List for Sale"
6. **MetaMask confirmation** for listing transaction
7. **Processing state** with transaction tracking
8. **Success** - ticket marked as "listed"

**Smart Contract Interaction:**
```typescript
// List ticket for resale
const receipt = await resellTicket(
  tokenId,      // NFT token ID
  resalePrice   // Resale price in ETH
)

// Update local state
ticket.status = "listed"
ticket.resalePrice = "0.09 ETH"
ticket.listedAt = Date.now()
```

### 7. Buy Resale Ticket (from Marketplace)

1. Browse marketplace for listed tickets
2. Click on listed ticket
3. Purchase flow similar to original purchase
4. **Ownership transferred** automatically on blockchain
5. **Notifications sent** to both buyer and seller

## 🔐 Web3 Integration Details

### Wallet Connection
```typescript
import { useWeb3 } from "@/components/web3-provider"

const { 
  account,          // Connected address
  balance,          // ETH balance
  chainId,          // Current network
  connectWallet,    // Connection function
  provider,         // ethers.js provider
  signer           // ethers.js signer
} = useWeb3()
```

### Smart Contract Calls

**Purchase Ticket:**
```typescript
import { useTicketNFT } from "@/lib/contracts"

const { mintTicket, isLoading, txHash } = useTicketNFT()

await mintTicket(
  eventId,
  buyerAddress,
  priceInEth
)
```

**Resell Ticket:**
```typescript
const { resellTicket } = useTicketNFT()

await resellTicket(
  tokenId,
  resalePriceInEth
)
```

### Transaction States

The platform tracks 4 transaction states:

1. **Pending** - Waiting for user confirmation in wallet
2. **Processing** - Transaction submitted, waiting for block confirmation
3. **Success** - Transaction confirmed on blockchain
4. **Error** - Transaction failed or rejected

### Transaction Status Component
```tsx
<TransactionStatus
  status="success"
  txHash="0xabc123..."
  chainId={1}
  confirmations={3}
  requiredConfirmations={2}
/>
```

## 💾 Data Storage

### Local Storage (Client-Side)
Used for quick access to user's tickets without blockchain queries:

```typescript
interface UserTicket {
  tokenId: string
  eventId: string
  eventTitle: string
  ticketType: string
  price: string
  purchaseDate: string
  txHash: string
  owner: string
  status: "active" | "listed" | "used"
  resalePrice?: string
  listedAt?: string
}

localStorage.setItem("userTickets", JSON.stringify(tickets))
```

### Blockchain (Source of Truth)
All ownership and transfers recorded on-chain:
- NFT minting
- Ownership transfers
- Listing prices
- Royalty payments

### MongoDB (Optional Backend)
For enhanced features:
- Event metadata
- User profiles
- Notifications
- Transaction history

## 🎨 UI Components

### TicketPurchaseModal
**Location:** `components/tickets/ticket-purchase-modal.tsx`

**Features:**
- Wallet connection prompt
- Price breakdown display
- Balance validation
- Real-time transaction tracking
- Success/error handling
- Block explorer links

### ResaleModal
**Location:** `components/tickets/resale-modal.tsx`

**Features:**
- Price input with validation
- Suggested pricing
- Fee calculation
- Profit estimation
- High-price warnings
- Transaction tracking

### MyTickets Component
**Location:** `components/dashboard/my-tickets.tsx`

**Features:**
- Auto-load from connected wallet
- Real-time sync
- Status badges (active/listed/used)
- QR code display
- Resale functionality
- Transaction links

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER BROWSES EVENTS                                      │
│    └─> Homepage or /events                                   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. VIEW EVENT DETAILS                                       │
│    └─> /events/[id]                                         │
│    └─> See ticket types, prices, availability              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. CONNECT WALLET                                           │
│    └─> Click "Connect Wallet"                              │
│    └─> MetaMask popup                                      │
│    └─> Approve connection                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. SELECT TICKET & CLICK PURCHASE                           │
│    └─> TicketPurchaseModal opens                           │
│    └─> Review price + fees                                 │
│    └─> Check balance                                       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. CONFIRM IN METAMASK                                      │
│    └─> Review gas fees                                     │
│    └─> Approve transaction                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. BLOCKCHAIN PROCESSING                                    │
│    └─> Transaction submitted                               │
│    └─> Show TX hash                                        │
│    └─> Link to block explorer                              │
│    └─> Wait for confirmations                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. NFT MINTED                                               │
│    └─> Success notification                                │
│    └─> Token ID assigned                                   │
│    └─> Saved to localStorage                               │
│    └─> Wallet now owns NFT                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. VIEW IN DASHBOARD                                        │
│    └─> Navigate to /dashboard                              │
│    └─> See ticket in "My Tickets"                          │
│    └─> Status: "active"                                    │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. RESELL TICKET (OPTIONAL)                                 │
│    └─> Click "Resell" button                               │
│    └─> ResaleModal opens                                   │
│    └─> Enter resale price                                  │
│    └─> Confirm in MetaMask                                 │
│    └─> Status changes to "listed"                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. TICKET ON MARKETPLACE                                   │
│     └─> Visible at /marketplace                            │
│     └─> Other users can purchase                           │
│     └─> Auto-transfer on sale                              │
│     └─> Seller receives payment                            │
└─────────────────────────────────────────────────────────────┘
```

## 🧪 Testing the Flow

### Prerequisites
1. MetaMask installed
2. Test ETH on Sepolia/Mumbai testnet
3. Smart contracts deployed (or use mock mode)

### Test Scenario
```bash
# 1. Get testnet ETH
Visit Sepolia faucet: https://sepoliafaucet.com/

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Follow the flow:
1. Click "Connect Wallet"
2. Go to Events → Select any event
3. Choose ticket type
4. Click "Purchase Tickets"
5. Confirm in MetaMask (use low gas for testing)
6. Wait for confirmation
7. Navigate to Dashboard
8. Verify ticket appears
9. Click "Resell"
10. Set price and confirm
11. Check marketplace for listing
```

## 📱 Mobile Experience

All components are fully responsive:
- Touch-friendly buttons
- Mobile-optimized modals
- Wallet connection via mobile browsers
- MetaMask mobile app integration

## 🚨 Error Handling

### Common Scenarios

**Insufficient Balance:**
- Modal shows warning
- Purchase button disabled
- Clear message to user

**Transaction Rejected:**
- Error state displayed
- "Try Again" button
- Error message from wallet

**Network Issues:**
- Retry functionality
- Network switch prompt
- Clear error messages

**Contract Not Deployed:**
- Graceful fallback
- Mock data mode (optional)
- Admin notification

## 🔒 Security Features

1. **Wallet Validation** - Address verification before transactions
2. **Balance Checks** - Prevent insufficient fund transactions
3. **Price Limits** - Max resale price (150% of original)
4. **Transaction Tracking** - All operations logged
5. **Ownership Verification** - Only owner can resell
6. **Immutable Records** - Blockchain-verified history

## 📊 Analytics & Tracking

Track user actions:
- Wallet connections
- Event views
- Purchase attempts
- Successful transactions
- Resale listings
- Average prices
- Popular events

## 🎯 Next Steps

1. Deploy smart contracts to testnet
2. Update contract addresses in `lib/contracts/addresses.ts`
3. Test complete flow with real blockchain
4. Add email notifications
5. Implement QR code validation
6. Add social features (share, reviews)
7. Mobile app development

---

**For developers:** See `MIGRATION.md` for implementation details and code examples.

**For users:** The entire process is seamless - connect wallet, buy ticket, done! 🎉
