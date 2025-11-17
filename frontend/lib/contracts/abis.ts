export const TicketNFT_ABI = [
  // ERC721 Standard Functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function approve(address to, uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",

  // Custom Ticket Functions
  "function createEvent(string memory name, string memory symbol, uint256 totalTickets, uint256 price, uint256 eventDate) returns (uint256)",
  "function mintTicket(uint256 eventId, address to) payable returns (uint256)",
  "function batchMintTickets(uint256 eventId, address[] memory recipients) payable returns (uint256[])",
  "function getTicketInfo(uint256 tokenId) view returns (uint256 eventId, uint256 seatNumber, uint256 price, bool used, uint256 purchaseDate)",
  "function validateTicket(uint256 tokenId) returns (bool)",
  "function transferTicket(uint256 tokenId, address to) payable",
  "function resellTicket(uint256 tokenId, uint256 price)",
  "function cancelResale(uint256 tokenId)",
  "function buyResaleTicket(uint256 tokenId) payable",
  "function getResalePrice(uint256 tokenId) view returns (uint256)",
  "function isTicketForSale(uint256 tokenId) view returns (bool)",

  // Event Management
  "function getEventInfo(uint256 eventId) view returns (string memory name, uint256 totalTickets, uint256 soldTickets, uint256 price, uint256 eventDate, address organizer)",
  "function getEventTickets(uint256 eventId) view returns (uint256[])",
  "function getUserTickets(address user) view returns (uint256[])",
  "function pauseEvent(uint256 eventId)",
  "function unpauseEvent(uint256 eventId)",
  "function cancelEvent(uint256 eventId)",

  // Royalties and Fees
  "function setRoyaltyInfo(uint256 tokenId, address receiver, uint96 feeNumerator)",
  "function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address receiver, uint256 royaltyAmount)",
  "function setPlatformFee(uint256 feePercentage)",
  "function getPlatformFee() view returns (uint256)",
  "function withdrawFees()",

  // Events
  "event EventCreated(uint256 indexed eventId, string name, address indexed organizer, uint256 totalTickets, uint256 price, uint256 eventDate)",
  "event TicketMinted(uint256 indexed tokenId, uint256 indexed eventId, address indexed owner, uint256 price)",
  "event TicketTransferred(uint256 indexed tokenId, address indexed from, address indexed to, uint256 price)",
  "event TicketValidated(uint256 indexed tokenId, address indexed validator, uint256 timestamp)",
  "event TicketListedForResale(uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event ResaleCancelled(uint256 indexed tokenId)",
  "event ResaleCompleted(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
  "event EventPaused(uint256 indexed eventId)",
  "event EventUnpaused(uint256 indexed eventId)",
  "event EventCancelled(uint256 indexed eventId)",
] as const

export const Marketplace_ABI = [
  // Listing Management
  "function createListing(uint256 tokenId, uint256 price, uint256 duration) returns (uint256)",
  "function cancelListing(uint256 listingId)",
  "function buyListing(uint256 listingId) payable",
  "function updateListingPrice(uint256 listingId, uint256 newPrice)",

  // Auction Functions
  "function createAuction(uint256 tokenId, uint256 startPrice, uint256 minIncrement, uint256 duration) returns (uint256)",
  "function placeBid(uint256 auctionId) payable",
  "function finalizeAuction(uint256 auctionId)",
  "function cancelAuction(uint256 auctionId)",

  // View Functions
  "function getListing(uint256 listingId) view returns (address seller, uint256 tokenId, uint256 price, uint256 expiresAt, bool active)",
  "function getAuction(uint256 auctionId) view returns (address seller, uint256 tokenId, uint256 startPrice, uint256 highestBid, address highestBidder, uint256 endsAt, bool finalized)",
  "function getActiveListings() view returns (uint256[])",
  "function getActiveAuctions() view returns (uint256[])",
  "function getUserListings(address user) view returns (uint256[])",
  "function getUserBids(address user) view returns (uint256[])",

  // Events
  "event ListingCreated(uint256 indexed listingId, address indexed seller, uint256 indexed tokenId, uint256 price)",
  "event ListingCancelled(uint256 indexed listingId)",
  "event ListingSold(uint256 indexed listingId, address indexed buyer, uint256 price)",
  "event AuctionCreated(uint256 indexed auctionId, address indexed seller, uint256 indexed tokenId, uint256 startPrice)",
  "event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount)",
  "event AuctionFinalized(uint256 indexed auctionId, address indexed winner, uint256 finalPrice)",
] as const
