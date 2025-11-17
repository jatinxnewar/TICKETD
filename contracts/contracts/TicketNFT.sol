// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TicketNFT
 * @dev NFT-based ticketing system with resale functionality
 */
contract TicketNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    uint256 private _eventIdCounter;
    
    struct Event {
        string name;
        uint256 totalTickets;
        uint256 soldTickets;
        uint256 price;
        uint256 eventDate;
        address organizer;
        bool paused;
        bool cancelled;
    }
    
    struct Ticket {
        uint256 eventId;
        uint256 price;
        bool used;
        bool forSale;
        uint256 resalePrice;
    }
    
    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => uint256[]) public eventTickets;
    
    uint256 public platformFeePercentage = 250; // 2.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    event EventCreated(uint256 indexed eventId, string name, address indexed organizer, uint256 totalTickets, uint256 price);
    event TicketMinted(uint256 indexed tokenId, uint256 indexed eventId, address indexed owner, uint256 price);
    event TicketListedForResale(uint256 indexed tokenId, address indexed seller, uint256 price);
    event ResaleCancelled(uint256 indexed tokenId);
    event ResaleCompleted(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event TicketValidated(uint256 indexed tokenId, address indexed validator);
    
    constructor() ERC721("TicketD", "TKT") Ownable(msg.sender) {
        _tokenIdCounter = 0;
        _eventIdCounter = 0;
    }
    
    /**
     * @dev Create a new event
     */
    function createEvent(
        string memory name,
        uint256 totalTickets,
        uint256 price,
        uint256 eventDate
    ) external returns (uint256) {
        _eventIdCounter++;
        uint256 newEventId = _eventIdCounter;
        
        events[newEventId] = Event({
            name: name,
            totalTickets: totalTickets,
            soldTickets: 0,
            price: price,
            eventDate: eventDate,
            organizer: msg.sender,
            paused: false,
            cancelled: false
        });
        
        emit EventCreated(newEventId, name, msg.sender, totalTickets, price);
        return newEventId;
    }
    
    /**
     * @dev Mint a ticket for an event
     */
    function mintTicket(uint256 eventId, address to) external payable returns (uint256) {
        Event storage evt = events[eventId];
        require(!evt.paused, "Event is paused");
        require(!evt.cancelled, "Event is cancelled");
        require(evt.soldTickets < evt.totalTickets, "Sold out");
        require(msg.value >= evt.price, "Insufficient payment");
        
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        _safeMint(to, newTokenId);
        
        tickets[newTokenId] = Ticket({
            eventId: eventId,
            price: evt.price,
            used: false,
            forSale: false,
            resalePrice: 0
        });
        
        eventTickets[eventId].push(newTokenId);
        evt.soldTickets++;
        
        // Transfer payment to organizer
        payable(evt.organizer).transfer(msg.value);
        
        emit TicketMinted(newTokenId, eventId, to, evt.price);
        return newTokenId;
    }
    
    /**
     * @dev List ticket for resale
     */
    function resellTicket(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");
        require(!tickets[tokenId].used, "Ticket already used");
        
        tickets[tokenId].forSale = true;
        tickets[tokenId].resalePrice = price;
        
        emit TicketListedForResale(tokenId, msg.sender, price);
    }
    
    /**
     * @dev Cancel resale listing
     */
    function cancelResale(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");
        
        tickets[tokenId].forSale = false;
        tickets[tokenId].resalePrice = 0;
        
        emit ResaleCancelled(tokenId);
    }
    
    /**
     * @dev Buy a resale ticket
     */
    function buyResaleTicket(uint256 tokenId) external payable {
        Ticket storage ticket = tickets[tokenId];
        require(ticket.forSale, "Ticket not for sale");
        require(msg.value >= ticket.resalePrice, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        uint256 platformFee = (ticket.resalePrice * platformFeePercentage) / FEE_DENOMINATOR;
        uint256 sellerAmount = ticket.resalePrice - platformFee;
        
        // Transfer ticket
        _transfer(seller, msg.sender, tokenId);
        
        // Update ticket state
        ticket.forSale = false;
        ticket.resalePrice = 0;
        
        // Transfer payments
        payable(seller).transfer(sellerAmount);
        payable(owner()).transfer(platformFee);
        
        emit ResaleCompleted(tokenId, seller, msg.sender, ticket.resalePrice);
    }
    
    /**
     * @dev Validate and use ticket
     */
    function validateTicket(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender || events[tickets[tokenId].eventId].organizer == msg.sender, "Not authorized");
        require(!tickets[tokenId].used, "Ticket already used");
        
        tickets[tokenId].used = true;
        emit TicketValidated(tokenId, msg.sender);
    }
    
    /**
     * @dev Get event info
     */
    function getEventInfo(uint256 eventId) external view returns (
        string memory name,
        uint256 totalTickets,
        uint256 soldTickets,
        uint256 price,
        uint256 eventDate,
        address organizer
    ) {
        Event memory evt = events[eventId];
        return (evt.name, evt.totalTickets, evt.soldTickets, evt.price, evt.eventDate, evt.organizer);
    }
    
    /**
     * @dev Get ticket info
     */
    function getTicketInfo(uint256 tokenId) external view returns (
        uint256 eventId,
        uint256 price,
        bool used,
        bool forSale,
        uint256 resalePrice
    ) {
        Ticket memory ticket = tickets[tokenId];
        return (ticket.eventId, ticket.price, ticket.used, ticket.forSale, ticket.resalePrice);
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
