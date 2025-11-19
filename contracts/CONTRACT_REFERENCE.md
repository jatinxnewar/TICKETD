# 🎫 TicketNFT Smart Contract - Quick Reference

## Contract Address
```
Hedera Testnet: [TO BE DEPLOYED]
Chain ID: 296
```

## Core Functions

### 1️⃣ Event Creation
```solidity
function createEvent(
    string memory name,
    uint256 totalTickets,
    uint256 price,          // in wei (1 HBAR = 10^18 wei)
    uint256 eventDate       // Unix timestamp
) external returns (uint256 eventId)
```

**Example (JavaScript/ethers.js):**
```javascript
const tx = await contract.createEvent(
    "Blockchain Summit 2025",
    1000,                               // 1000 tickets
    ethers.parseEther("50"),           // 50 HBAR per ticket
    Math.floor(Date.now() / 1000) + 86400 * 30  // 30 days from now
);
await tx.wait();
```

---

### 2️⃣ Ticket Minting
```solidity
function mintTicket(
    uint256 eventId,
    address to
) external payable returns (uint256 tokenId)
```

**Example:**
```javascript
const event = await contract.getEventInfo(1);
const price = event[3];  // Get ticket price

const tx = await contract.mintTicket(1, userAddress, {
    value: price  // Pay the ticket price
});
await tx.wait();
```

---

### 3️⃣ Ticket Resale

#### List for Resale
```solidity
function resellTicket(
    uint256 tokenId,
    uint256 price
) external
```

**Example:**
```javascript
// List ticket #5 for 75 HBAR
const tx = await contract.resellTicket(
    5,
    ethers.parseEther("75")
);
await tx.wait();
```

#### Buy Resale Ticket
```solidity
function buyResaleTicket(
    uint256 tokenId
) external payable
```

**Example:**
```javascript
const ticket = await contract.getTicketInfo(5);
const resalePrice = ticket[4];  // Get resale price

const tx = await contract.buyResaleTicket(5, {
    value: resalePrice  // Pay the resale price
});
await tx.wait();

// Platform fee (2.5%) goes to contract owner
// Remaining amount goes to seller
```

#### Cancel Resale
```solidity
function cancelResale(
    uint256 tokenId
) external
```

**Example:**
```javascript
const tx = await contract.cancelResale(5);
await tx.wait();
```

---

### 4️⃣ Ticket Validation
```solidity
function validateTicket(
    uint256 tokenId
) external
```

**Example:**
```javascript
// Mark ticket as used (can only be done once)
const tx = await contract.validateTicket(5);
await tx.wait();
```

**Access Control:**
- Ticket owner can validate
- Event organizer can validate

---

### 5️⃣ View Functions

#### Get Event Info
```solidity
function getEventInfo(uint256 eventId) external view returns (
    string memory name,
    uint256 totalTickets,
    uint256 soldTickets,
    uint256 price,
    uint256 eventDate,
    address organizer
)
```

#### Get Ticket Info
```solidity
function getTicketInfo(uint256 tokenId) external view returns (
    uint256 eventId,
    uint256 price,
    bool used,
    bool forSale,
    uint256 resalePrice
)
```

#### Get Event Tickets
```solidity
function getEventTickets(uint256 eventId) external view returns (uint256[] memory)
```

---

## Events Emitted

### EventCreated
```solidity
event EventCreated(
    uint256 indexed eventId,
    string name,
    address indexed organizer,
    uint256 totalTickets,
    uint256 price
);
```

### TicketMinted
```solidity
event TicketMinted(
    uint256 indexed tokenId,
    uint256 indexed eventId,
    address indexed owner,
    uint256 price
);
```

### TicketListedForResale
```solidity
event TicketListedForResale(
    uint256 indexed tokenId,
    address indexed seller,
    uint256 price
);
```

### ResaleCompleted
```solidity
event ResaleCompleted(
    uint256 indexed tokenId,
    address indexed seller,
    address indexed buyer,
    uint256 price
);
```

### ResaleCancelled
```solidity
event ResaleCancelled(
    uint256 indexed tokenId
);
```

### TicketValidated
```solidity
event TicketValidated(
    uint256 indexed tokenId,
    address indexed validator
);
```

---

## Contract ABI Location
After compilation, find the ABI at:
```
contracts/artifacts/contracts/TicketNFT.sol/TicketNFT.json
```

Use in frontend:
```javascript
import TicketNFTArtifact from '@/contracts/artifacts/contracts/TicketNFT.sol/TicketNFT.json';
const abi = TicketNFTArtifact.abi;
```

---

## Platform Fee
- **Fee Percentage**: 2.5% (250 basis points)
- **Applied to**: Resale transactions only
- **Recipient**: Contract owner
- **Calculation**: `fee = (resalePrice * 250) / 10000`

---

## Security Features

✅ **Ownable** - Only owner can change platform fees  
✅ **Reentrancy Protection** - Safe payment transfers  
✅ **Ticket Validation** - Once-use only  
✅ **Event Control** - Organizers can pause/cancel events  
✅ **ERC721 Standard** - Full NFT compatibility  

---

## Gas Estimates (Hedera Testnet)

| Function | Estimated Gas | Approx Cost (HBAR) |
|----------|---------------|---------------------|
| `createEvent` | ~150,000 | ~0.5 HBAR |
| `mintTicket` | ~180,000 | ~0.6 HBAR |
| `resellTicket` | ~50,000 | ~0.15 HBAR |
| `buyResaleTicket` | ~120,000 | ~0.4 HBAR |
| `validateTicket` | ~40,000 | ~0.12 HBAR |

*Actual costs may vary based on network conditions*

---

## Frontend Integration Example

```typescript
import { ethers } from 'ethers';
import TicketNFTArtifact from '@/contracts/artifacts/contracts/TicketNFT.sol/TicketNFT.json';

// Connect to contract
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    TicketNFTArtifact.abi,
    signer
);

// Create event
const tx = await contract.createEvent(
    "My Event",
    100,
    ethers.parseEther("10"),
    Date.now() / 1000 + 86400 * 7
);
const receipt = await tx.wait();
console.log("Event created:", receipt);

// Mint ticket
const mintTx = await contract.mintTicket(1, userAddress, {
    value: ethers.parseEther("10")
});
await mintTx.wait();
```

---

## Useful Links

- **Hedera Docs**: [docs.hedera.com](https://docs.hedera.com)
- **HashScan Explorer**: [hashscan.io/testnet](https://hashscan.io/testnet)
- **Hedera Portal**: [portal.hedera.com](https://portal.hedera.com)
- **OpenZeppelin ERC721**: [docs.openzeppelin.com/contracts/erc721](https://docs.openzeppelin.com/contracts/erc721)
