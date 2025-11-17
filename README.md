# Ticket'D Platform - Monorepo Structure

A decentralized event ticketing platform built with Next.js, Express, MongoDB, and Ethereum smart contracts. This platform enables event organizers to create NFT-based tickets and allows users to securely buy, sell, and transfer tickets on the blockchain.

## � Project Structure

This project is organized as a **monorepo** with three main packages:

```
ticketd-platform/
├── frontend/          # Next.js frontend application (Port 3000)
├── backend/           # Express API server (Port 5000)
├── contracts/         # Hardhat smart contracts
├── package.json       # Root package.json (workspace config)
└── README.md          # This file
```

### 📦 Packages Overview

**Frontend** (`/frontend`)  
Next.js 14 application with Web3 integration, Tailwind CSS, and Radix UI components.

**Backend** (`/backend`)  
Express.js REST API with MongoDB for managing events, tickets, marketplace, and notifications.

**Contracts** (`/contracts`)  
Solidity smart contracts with Hardhat for NFT ticket minting, transfers, and marketplace.

## 🚀 Features

### Core Functionality
- **Event Creation**: Create events with multiple ticket types and pricing
- **NFT Tickets**: Blockchain-based tickets as ERC-721 tokens
- **Ticket Purchase**: Buy tickets with cryptocurrency (ETH/MATIC)
- **Marketplace**: Resell tickets with automated royalties
- **Ownership Transfer**: Transfer tickets to other users
- **Ticket Validation**: QR code-based entry validation
- **Real-time Notifications**: Get notified about purchases, transfers, and sales
- **Wallet Integration**: MetaMask and Web3 wallet support via ethers.js v6
- **Multi-Chain Support**: Ethereum (Sepolia), Polygon (Mumbai/Mainnet)

### Technical Features
- **Monorepo Structure**: npm workspaces for managing multiple packages
- **Type Safety**: TypeScript across all packages
- **Server-side Rendering**: Next.js 14 App Router with React 18
- **REST API**: Express.js backend with comprehensive error handling
- **Database**: MongoDB with Mongoose ODM
- **Smart Contracts**: Solidity 0.8.20 with OpenZeppelin
- **Testing**: Hardhat for contract testing
- **Responsive UI**: Tailwind CSS and Radix UI components
- **Dark/Light Theme**: Built-in theme support

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **MetaMask** browser extension
- **Testnet ETH** (for development)

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ticketd-platform
```

### 2. Install All Dependencies

```bash
npm install
```

This installs dependencies for root and all three workspaces (frontend, backend, contracts).

### 3. Set Up Environment Variables

Copy the example files and fill in your values:

**Backend** (`backend/.env`):
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and other settings
```

**Frontend** (`frontend/.env.local`):
```bash
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your API URL and contract addresses
```

**Contracts** (`contracts/.env`):
```bash
cp contracts/.env.example contracts/.env
# Edit contracts/.env with your wallet private key and RPC URLs
```

### 4. Start Development Servers

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### 5. Open Your Browser

Navigate to http://localhost:3000 and start using the platform!

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[MIGRATION.md](./MIGRATION.md)** - Migration guide for the new structure
- **[TICKET_FLOW.md](./TICKET_FLOW.md)** - Complete ticket purchase/resale flow documentation

## 🏗️ Architecture

### Monorepo Structure

```
ticketd-platform/
├── frontend/                    # Next.js Application
│   ├── app/                     # App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── events/             # Event browsing
│   │   ├── dashboard/          # User dashboard
│   │   ├── marketplace/        # Ticket marketplace
│   │   └── create-event/       # Event creation
│   ├── components/              # React components
│   │   ├── wallet/             # Wallet connection
│   │   ├── events/             # Event components
│   │   ├── dashboard/          # Dashboard components
│   │   └── ui/                 # UI primitives (Radix UI)
│   ├── lib/                     # Utilities
│   │   ├── contracts/          # Web3 contract interactions
│   │   └── utils.ts            # Helper functions
│   └── package.json            # Frontend dependencies
│
├── backend/                     # Express.js API Server
│   ├── src/
│   │   ├── index.ts            # Server entry point
│   │   ├── routes/             # API route handlers
│   │   │   ├── events.ts       # Event endpoints
│   │   │   ├── tickets.ts      # Ticket endpoints
│   │   │   ├── marketplace.ts  # Marketplace endpoints
│   │   │   ├── notifications.ts # Notification endpoints
│   │   │   ├── transfers.ts    # Transfer tracking
│   │   │   └── webhooks.ts     # Webhook handlers
│   │   ├── models/             # MongoDB models
│   │   │   ├── Event.ts        # Event schema
│   │   │   ├── Ticket.ts       # Ticket schema
│   │   │   ├── Listing.ts      # Marketplace listing schema
│   │   │   ├── Transfer.ts     # Transfer history schema
│   │   │   └── Notification.ts # Notification schema
│   │   ├── middleware/         # Express middleware
│   │   │   └── errorHandler.ts # Error handling
│   │   └── config/
│   │       └── database.ts     # MongoDB connection
│   └── package.json            # Backend dependencies
│
├── contracts/                   # Hardhat Smart Contracts
│   ├── contracts/
│   │   └── TicketNFT.sol       # Main NFT contract
│   ├── scripts/
│   │   └── deploy.ts           # Deployment script
│   ├── test/                   # Contract tests
│   ├── hardhat.config.ts       # Hardhat configuration
│   └── package.json            # Contract dependencies
│
└── package.json                # Root workspace config
```

### Data Flow

```
┌─────────────┐      HTTP/REST      ┌─────────────┐
│             │◄───────────────────►│             │
│  Frontend   │                     │   Backend   │
│  (Next.js)  │                     │  (Express)  │
│             │                     │             │
└──────┬──────┘                     └──────┬──────┘
       │                                   │
       │ Web3/ethers.js                   │ Mongoose
       │                                   │
       ▼                                   ▼
┌──────────────┐                    ┌─────────────┐
│  Blockchain  │                    │   MongoDB   │
│  (TicketNFT) │                    │  Database   │
└──────────────┘                    └─────────────┘
```

## 🔧 Available Scripts

### Root Level Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend and backend in dev mode |
| `npm run build` | Build all packages |
| `npm test` | Run all tests |

### Workspace-Specific Scripts

**Frontend:**
```bash
npm run dev --workspace=frontend        # Start Next.js dev server
npm run build --workspace=frontend      # Build for production
npm run start --workspace=frontend      # Start production server
```

**Backend:**
```bash
npm run dev --workspace=backend         # Start Express dev server
npm run build --workspace=backend       # Compile TypeScript
npm run start --workspace=backend       # Start production server
```

**Contracts:**
```bash
npm run compile --workspace=contracts   # Compile Solidity contracts
npm run test --workspace=contracts      # Run contract tests
npm run deploy --workspace=contracts    # Deploy to local network
```

## 🌐 API Endpoints

Base URL: `http://localhost:5000/api`

### Events
- `GET /events` - List all events
- `GET /events/:id` - Get event details
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

### Tickets
- `GET /tickets` - Get user's tickets
- `POST /tickets` - Purchase ticket (after blockchain mint)
- `GET /tickets/:id` - Get ticket details
- `POST /tickets/validate` - Validate ticket for entry

### Marketplace
- `GET /marketplace` - List all marketplace listings
- `GET /marketplace/:id` - Get listing details
- `POST /marketplace` - Create listing (after blockchain approval)
- `PUT /marketplace/:id` - Update listing
- `DELETE /marketplace/:id` - Remove listing

### Notifications
- `GET /notifications` - Get user notifications
- `GET /notifications/:id` - Get single notification
- `PUT /notifications/:id` - Mark notification as read
- `DELETE /notifications/:id` - Delete notification

### Transfers
- `GET /transfers` - Get transfer history
- `POST /transfers` - Record ticket transfer

### Webhooks
- `POST /webhook/transfer` - Handle transfer events
- `POST /webhook/notify` - Handle notification events

## 🔐 Smart Contract Functions

### TicketNFT.sol

**Event Management:**
- `createEvent(name, date, venue, metadata)` - Create new event
- `getEvent(eventId)` - Get event details

**Ticket Operations:**
- `mintTicket(eventId, ticketType, quantity)` - Purchase tickets
- `validateTicket(tokenId)` - Mark ticket as used

**Marketplace:**
- `resellTicket(tokenId, price)` - List ticket for resale
- `buyResaleTicket(tokenId)` - Purchase from marketplace
- `cancelResale(tokenId)` - Remove from marketplace

**Transfers:**
- `transferFrom(from, to, tokenId)` - Transfer ticket ownership

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### Contract Testing
```bash
cd contracts
npx hardhat test
```

### Test Coverage
```bash
cd contracts
npx hardhat coverage
```

## 🚢 Deployment

### Frontend Deployment (Vercel)

```bash
cd frontend
vercel deploy
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_CONTRACT_ADDRESS`

### Backend Deployment (Railway/Heroku)

```bash
cd backend
# Deploy to Railway
railway up

# Or deploy to Heroku
git push heroku main
```

Set environment variables:
- `MONGODB_URI`
- `PORT`
- `FRONTEND_URL`
- `NODE_ENV=production`

### Contract Deployment

**Testnet (Sepolia):**
```bash
cd contracts
npm run deploy -- --network sepolia
```

**Mainnet (Polygon):**
```bash
cd contracts
npm run deploy -- --network polygon
```

After deployment:
1. Copy contract address
2. Update `frontend/lib/contracts/addresses.ts`
3. Verify contract on Etherscan/Polygonscan

## 🛡️ Security Considerations

1. **Never commit `.env` files** - Use `.env.example` as templates
2. **Secure private keys** - Never share or commit private keys
3. **Audit smart contracts** - Get contracts audited before mainnet
4. **Rate limiting** - Implement on backend API
5. **Input validation** - Validate all user inputs
6. **CORS configuration** - Whitelist frontend URL only
7. **HTTPS in production** - Always use HTTPS
8. **Database security** - Use MongoDB authentication

## 📊 Technology Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **ethers.js v6** - Blockchain interaction
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database
- **TypeScript** - Type safety
- **CORS** - Cross-origin requests
- **Helmet** - Security headers
- **Morgan** - Request logging
- **Joi** - Validation

### Smart Contracts
- **Solidity 0.8.20** - Contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Security libraries
- **ethers.js** - Contract deployment
- **TypeChain** - Contract type generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Hardhat for excellent development tools
- Radix UI for accessible component primitives
- Vercel for Next.js framework

---

**Built with ❤️ by the Ticket'D Team**

For detailed documentation, see:
- [Quick Start Guide](./QUICKSTART.md)
- [Migration Guide](./MIGRATION.md)
- [Ticket Flow Documentation](./TICKET_FLOW.md)
├── events/            # Event display components
├── marketplace/       # Marketplace components
├── wallet/            # Web3 wallet components
└── ui/                # Reusable UI components

lib/
├── contracts/         # Smart contract ABIs and addresses
├── models/           # MongoDB models
├── utils.ts          # Utility functions
└── web3-utils.ts     # Web3-specific utilities

hooks/
├── useContract.ts      # Smart contract interaction hook
├── useTransaction.ts   # Transaction management hook
└── use-toast.ts       # Toast notification hook
```

### Backend API Routes

#### Events
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get event details

#### Marketplace
- `GET /api/marketplace` - Fetch marketplace listings
- `POST /api/marketplace` - Create listing

#### Notifications
- `GET /api/notifications?userId=<id>` - Get user notifications
- `PUT /api/notifications/[id]` - Mark notification as read
- `DELETE /api/notifications?id=<id>` - Delete notification

#### Transfers
- `POST /api/transfers` - Record ticket transfer

#### Webhooks
- `POST /api/webhook/transfer` - Webhook for ownership transfers
- `POST /api/webhook/notify` - Webhook for custom notifications

## 🔐 Smart Contracts

### TicketNFT Contract
Main contract for ticket NFT management.

**Key Functions:**
- `createEvent()` - Create a new event
- `mintTicket()` - Mint ticket NFT for an event
- `transferTicket()` - Transfer ticket to another address
- `resellTicket()` - List ticket for resale
- `validateTicket()` - Validate and mark ticket as used

### Marketplace Contract
Secondary marketplace for ticket trading.

**Key Functions:**
- `createListing()` - Create fixed-price listing
- `buyListing()` - Purchase listed ticket
- `createAuction()` - Create auction listing
- `placeBid()` - Place bid on auction

### Deployment
1. Deploy contracts to your chosen network(s)
2. Update contract addresses in `lib/contracts/addresses.ts`
3. Verify contracts on block explorer (Etherscan, Polygonscan, etc.)

Example:
```typescript
export const CONTRACTS: Record<number, ContractAddresses> = {
  11155111: { // Sepolia
    ticketNFT: "0xYourDeployedTicketNFTAddress",
    marketplace: "0xYourDeployedMarketplaceAddress",
  },
}
```

## 🌐 Web3 Integration

### Using the Web3Provider

The `useWeb3()` hook provides wallet functionality:

```typescript
import { useWeb3 } from "@/components/web3-provider"

function MyComponent() {
  const { 
    account,           // Connected wallet address
    isConnected,       // Connection status
    connectWallet,     // Connect function
    disconnectWallet,  // Disconnect function
    balance,          // ETH balance
    chainId,          // Current chain ID
    provider,         // ethers.js BrowserProvider
    signer,           // ethers.js Signer
    switchNetwork     // Network switching function
  } = useWeb3()
  
  return (
    <button onClick={connectWallet}>
      {isConnected ? account : "Connect Wallet"}
    </button>
  )
}
```

### Using Contract Hooks

Interact with smart contracts using pre-built hooks:

```typescript
import { useTicketNFT } from "@/lib/contracts"

function CreateEventComponent() {
  const { 
    createEvent, 
    isLoading, 
    isSuccess, 
    txHash 
  } = useTicketNFT()
  
  const handleCreate = async () => {
    try {
      await createEvent(
        "My Event",      // name
        "EVNT",         // symbol
        100,            // total tickets
        "0.1",          // price in ETH
        Date.now() / 1000  // event timestamp
      )
      console.log("Event created! TX:", txHash)
    } catch (error) {
      console.error("Failed:", error)
    }
  }
  
  return (
    <button onClick={handleCreate} disabled={isLoading}>
      {isLoading ? "Creating..." : "Create Event"}
    </button>
  )
}
```

### Custom Contract Interactions

For advanced usage:

```typescript
import { useContract } from "@/hooks/useContract"
import { useTransaction } from "@/hooks/useTransaction"
import { MY_CONTRACT_ABI } from "@/lib/contracts/abis"

function AdvancedComponent() {
  const contract = useContract("0xContractAddress", MY_CONTRACT_ABI)
  const { execute, isLoading } = useTransaction()
  
  const customFunction = async () => {
    await execute(async () => {
      return await contract.myCustomFunction(param1, param2)
    })
  }
}
```

## 🎨 UI Customization

### Theme Configuration
Edit `tailwind.config.ts` to customize colors, spacing, and other design tokens.

### Component Library
This project uses [shadcn/ui](https://ui.shadcn.com/) components. Add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
2. **Import project in Vercel**
3. **Set environment variables**:
   - `MONGODB_URI` - Your MongoDB connection string
   - Add any RPC URLs as needed
4. **Deploy**

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXT_PUBLIC_ETHEREUM_RPC` | Ethereum RPC URL | No |
| `NEXT_PUBLIC_SEPOLIA_RPC` | Sepolia RPC URL | No |
| `NEXT_PUBLIC_POLYGON_RPC` | Polygon RPC URL | No |

## 🤝 API Integration

### Webhook Example: Ownership Transfer

When a ticket is transferred on the blockchain, notify your backend:

```bash
curl -X POST https://your-domain.com/api/webhook/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "listingId": "listing-123",
    "fromUserId": "user-abc",
    "toUserId": "user-xyz",
    "price": 150,
    "transferMethod": "blockchain",
    "metadata": {
      "txHash": "0x123...",
      "blockNumber": 12345678
    }
  }'
```

### Notification API Example

Fetch user notifications:

```bash
curl https://your-domain.com/api/notifications?userId=user-123
```

Response:
```json
[
  {
    "_id": "notif-1",
    "userId": "user-123",
    "title": "Ticket Transferred",
    "message": "Your ticket for Event XYZ has been transferred to buyer",
    "read": false,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

## 🛣️ Roadmap

- [ ] Deploy smart contracts to mainnet
- [ ] Add support for more wallet providers (WalletConnect, Coinbase Wallet)
- [ ] Implement QR code ticket validation
- [ ] Add email notifications
- [ ] Mobile app (React Native)
- [ ] Layer 2 integration (Optimism, Arbitrum)
- [ ] IPFS metadata storage
- [ ] Advanced analytics dashboard

## 🐛 Troubleshooting

### Build Errors

**Error: "Cannot find module 'ethers'"**
- Run `npm install` to install dependencies

**Error: "MONGODB_URI not defined"**
- Add `MONGODB_URI` to `.env.local` or Vercel environment variables

### Wallet Connection Issues

**MetaMask not detected**
- Ensure MetaMask extension is installed and unlocked
- Check browser console for errors

**Wrong network**
- Use the network switcher in the wallet component
- Ensure contract addresses are configured for your network

### Transaction Failures

**Error: "Insufficient funds"**
- Ensure wallet has enough ETH for gas fees
- For testnets, get free ETH from faucets

**Error: "User rejected transaction"**
- User cancelled the transaction in MetaMask
- Retry the operation

## 📄 License

MIT License - feel free to use this project for your own applications.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- ethers.js for Web3 integration
- shadcn/ui for beautiful components
- MongoDB for database solutions

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the API examples above

---

**Built with ❤️ using Next.js, ethers.js, and MongoDB**
