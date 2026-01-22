"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockDb = exports.mockStore = void 0;
// Mock data store for development without MongoDB
exports.mockStore = {
    events: [
        {
            _id: '1',
            id: '1',
            title: 'Blockchain Summit 2026',
            name: 'Blockchain Summit 2026',
            description: 'Join industry leaders, developers, and innovators for the biggest blockchain conference of the year. Network with 5000+ attendees, attend 50+ workshops, and witness groundbreaking announcements.',
            date: '2026-03-15T09:00:00',
            time: '09:00 AM',
            venue: 'Tech Convention Center, Downtown',
            location: 'San Francisco, CA',
            organizer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
            maxAttendees: 5000,
            ticketTypes: [
                {
                    name: 'General Admission',
                    price: '0.1',
                    quantity: 3000,
                    available: 2847
                },
                {
                    name: 'VIP Pass',
                    price: '0.5',
                    quantity: 500,
                    available: 423
                },
                {
                    name: 'Early Bird',
                    price: '0.08',
                    quantity: 1000,
                    available: 0
                }
            ],
            status: 'active',
            createdAt: '2026-01-01T00:00:00',
            updatedAt: '2026-01-20T00:00:00'
        },
        {
            _id: '2',
            id: '2',
            title: 'NFT Art Exhibition 2026',
            name: 'NFT Art Exhibition 2026',
            description: 'Experience the future of digital art! Featuring works from 100+ renowned NFT artists. Live minting sessions, artist meet & greets, and exclusive NFT drops.',
            date: '2026-02-20T18:00:00',
            time: '06:00 PM',
            venue: 'Modern Digital Art Gallery',
            location: 'New York, NY',
            organizer: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
            category: 'Art',
            image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
            maxAttendees: 2000,
            ticketTypes: [
                {
                    name: 'Standard Entry',
                    price: '0.05',
                    quantity: 1500,
                    available: 1342
                },
                {
                    name: 'Collector Pass',
                    price: '0.15',
                    quantity: 500,
                    available: 387
                }
            ],
            status: 'active',
            createdAt: '2026-01-05T00:00:00',
            updatedAt: '2026-01-18T00:00:00'
        },
        {
            _id: '3',
            id: '3',
            title: 'Web3 Music Festival',
            name: 'Web3 Music Festival',
            description: 'The ultimate Web3 music experience! 3 days, 50+ artists, NFT ticket collectibles, and token-gated exclusive content. Headliners include top electronic and hip-hop artists.',
            date: '2026-04-10T20:00:00',
            time: '08:00 PM',
            venue: 'Open Air Arena',
            location: 'Miami, FL',
            organizer: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
            category: 'Music',
            image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
            maxAttendees: 10000,
            ticketTypes: [
                {
                    name: '3-Day Pass',
                    price: '0.25',
                    quantity: 7000,
                    available: 5234
                },
                {
                    name: 'VIP Experience',
                    price: '0.8',
                    quantity: 1000,
                    available: 743
                },
                {
                    name: 'Backstage Pass',
                    price: '1.5',
                    quantity: 100,
                    available: 67
                }
            ],
            status: 'active',
            createdAt: '2026-01-10T00:00:00',
            updatedAt: '2026-01-21T00:00:00'
        },
        {
            _id: '4',
            id: '4',
            title: 'DeFi Developer Conference',
            name: 'DeFi Developer Conference',
            description: 'Deep dive into DeFi protocols, smart contract security, and the future of decentralized finance. Workshops on Solidity, auditing, and protocol design.',
            date: '2026-03-25T10:00:00',
            time: '10:00 AM',
            venue: 'Silicon Valley Tech Hub',
            location: 'Palo Alto, CA',
            organizer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            category: 'Technology',
            image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
            maxAttendees: 1500,
            ticketTypes: [
                {
                    name: 'Developer Pass',
                    price: '0.12',
                    quantity: 1000,
                    available: 876
                },
                {
                    name: 'Workshop Bundle',
                    price: '0.3',
                    quantity: 500,
                    available: 412
                }
            ],
            status: 'active',
            createdAt: '2026-01-08T00:00:00',
            updatedAt: '2026-01-19T00:00:00'
        },
        {
            _id: '5',
            id: '5',
            title: 'Crypto Gaming Expo',
            name: 'Crypto Gaming Expo',
            description: 'The biggest play-to-earn and blockchain gaming event! Try upcoming games, meet developers, participate in tournaments, and win NFT prizes.',
            date: '2026-05-05T11:00:00',
            time: '11:00 AM',
            venue: 'Gaming Convention Center',
            location: 'Los Angeles, CA',
            organizer: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
            category: 'Gaming',
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
            maxAttendees: 8000,
            ticketTypes: [
                {
                    name: 'Gamer Pass',
                    price: '0.08',
                    quantity: 6000,
                    available: 4521
                },
                {
                    name: 'Tournament Entry',
                    price: '0.2',
                    quantity: 2000,
                    available: 1654
                }
            ],
            status: 'active',
            createdAt: '2026-01-12T00:00:00',
            updatedAt: '2026-01-20T00:00:00'
        },
        {
            _id: '6',
            id: '6',
            title: 'Metaverse Fashion Week',
            name: 'Metaverse Fashion Week',
            description: 'Where fashion meets the metaverse! Virtual runway shows, NFT wearables, and digital fashion design competitions. Be part of the future of fashion.',
            date: '2026-04-18T15:00:00',
            time: '03:00 PM',
            venue: 'Virtual Reality Plaza',
            location: 'Paris, France',
            organizer: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
            category: 'Fashion',
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
            maxAttendees: 3000,
            ticketTypes: [
                {
                    name: 'Standard Access',
                    price: '0.06',
                    quantity: 2000,
                    available: 1789
                },
                {
                    name: 'Designer Pass',
                    price: '0.18',
                    quantity: 1000,
                    available: 834
                }
            ],
            status: 'active',
            createdAt: '2026-01-15T00:00:00',
            updatedAt: '2026-01-21T00:00:00'
        }
    ],
    tickets: [
        {
            _id: 't1',
            id: 't1',
            eventId: '1',
            tokenId: '1001',
            owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            ticketType: 'General Admission',
            price: '0.1',
            purchaseDate: '2026-01-10T14:30:00',
            status: 'active',
            used: false,
            qrCode: 'QR-1001-ABC123',
            transactionHash: '0xabc123def456789...'
        },
        {
            _id: 't2',
            id: 't2',
            eventId: '2',
            tokenId: '1002',
            owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            ticketType: 'Standard Entry',
            price: '0.05',
            purchaseDate: '2026-01-12T09:15:00',
            status: 'active',
            used: false,
            qrCode: 'QR-1002-DEF456',
            transactionHash: '0xdef456abc789012...'
        },
        {
            _id: 't3',
            id: 't3',
            eventId: '3',
            tokenId: '1003',
            owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            ticketType: '3-Day Pass',
            price: '0.25',
            purchaseDate: '2026-01-15T16:45:00',
            status: 'active',
            used: false,
            qrCode: 'QR-1003-GHI789',
            transactionHash: '0xghi789jkl012345...'
        },
        {
            _id: 't4',
            id: 't4',
            eventId: '1',
            tokenId: '1004',
            owner: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
            ticketType: 'VIP Pass',
            price: '0.5',
            purchaseDate: '2026-01-08T11:20:00',
            status: 'active',
            used: false,
            qrCode: 'QR-1004-JKL012',
            transactionHash: '0xjkl012mno345678...'
        }
    ],
    listings: [
        {
            _id: 'l1',
            id: 'l1',
            ticketId: 't4',
            tokenId: '1004',
            eventId: '1',
            seller: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
            price: '0.55',
            originalPrice: '0.5',
            status: 'active',
            listingDate: '2026-01-18T10:30:00',
            expiryDate: '2026-03-14T23:59:59',
            ticketType: 'VIP Pass',
            eventTitle: 'Blockchain Summit 2026',
            eventDate: '2026-03-15T09:00:00',
            eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
        },
        {
            _id: 'l2',
            id: 'l2',
            ticketId: 't5',
            tokenId: '1005',
            eventId: '3',
            seller: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
            price: '0.28',
            originalPrice: '0.25',
            status: 'active',
            listingDate: '2026-01-19T14:15:00',
            expiryDate: '2026-04-09T23:59:59',
            ticketType: '3-Day Pass',
            eventTitle: 'Web3 Music Festival',
            eventDate: '2026-04-10T20:00:00',
            eventImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800'
        },
        {
            _id: 'l3',
            id: 'l3',
            ticketId: 't6',
            tokenId: '1006',
            eventId: '5',
            seller: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            price: '0.22',
            originalPrice: '0.2',
            status: 'active',
            listingDate: '2026-01-20T09:45:00',
            expiryDate: '2026-05-04T23:59:59',
            ticketType: 'Tournament Entry',
            eventTitle: 'Crypto Gaming Expo',
            eventDate: '2026-05-05T11:00:00',
            eventImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'
        },
        {
            _id: 'l4',
            id: 'l4',
            ticketId: 't7',
            tokenId: '1007',
            eventId: '2',
            seller: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
            price: '0.16',
            originalPrice: '0.15',
            status: 'active',
            listingDate: '2026-01-21T11:20:00',
            expiryDate: '2026-02-19T23:59:59',
            ticketType: 'Collector Pass',
            eventTitle: 'NFT Art Exhibition 2026',
            eventDate: '2026-02-20T18:00:00',
            eventImage: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800'
        },
        {
            _id: 'l5',
            id: 'l5',
            ticketId: 't8',
            tokenId: '1008',
            eventId: '4',
            seller: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
            price: '0.32',
            originalPrice: '0.3',
            status: 'active',
            listingDate: '2026-01-22T08:00:00',
            expiryDate: '2026-03-24T23:59:59',
            ticketType: 'Workshop Bundle',
            eventTitle: 'DeFi Developer Conference',
            eventDate: '2026-03-25T10:00:00',
            eventImage: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800'
        }
    ],
    notifications: [
        {
            _id: 'n1',
            id: 'n1',
            userId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            type: 'purchase',
            title: 'Ticket Purchased Successfully',
            message: 'You successfully purchased a General Admission ticket for Blockchain Summit 2026',
            read: false,
            createdAt: '2026-01-10T14:30:00',
            metadata: {
                eventId: '1',
                ticketId: 't1'
            }
        },
        {
            _id: 'n2',
            id: 'n2',
            userId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            type: 'reminder',
            title: 'Event Reminder',
            message: 'Blockchain Summit 2026 is happening in 53 days!',
            read: false,
            createdAt: '2026-01-21T09:00:00',
            metadata: {
                eventId: '1'
            }
        },
        {
            _id: 'n3',
            id: 'n3',
            userId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            type: 'ticket-sale',
            title: 'Your Listing is Live',
            message: 'Your Tournament Entry ticket for Crypto Gaming Expo is now listed for 0.22 ETH',
            read: true,
            createdAt: '2026-01-20T09:45:00',
            metadata: {
                listingId: 'l3',
                ticketId: 't6'
            }
        }
    ],
    transfers: [
        {
            _id: 'tr1',
            id: 'tr1',
            ticketId: 't1',
            tokenId: '1001',
            from: '0x0000000000000000000000000000000000000000',
            to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            txHash: '0xabc123def456789012345678901234567890abcd',
            timestamp: '2026-01-10T14:30:00',
            type: 'purchase'
        },
        {
            _id: 'tr2',
            id: 'tr2',
            ticketId: 't2',
            tokenId: '1002',
            from: '0x0000000000000000000000000000000000000000',
            to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            txHash: '0xdef456abc789012345678901234567890abcdef',
            timestamp: '2026-01-12T09:15:00',
            type: 'purchase'
        }
    ]
};
// Helper functions for mock data operations
exports.mockDb = {
    // Events
    getEvents: (query = {}) => {
        let results = [...exports.mockStore.events];
        if (query.status) {
            results = results.filter(e => e.status === query.status);
        }
        if (query.category) {
            results = results.filter(e => e.category === query.category);
        }
        return Promise.resolve(results);
    },
    getEventById: (id) => {
        const event = exports.mockStore.events.find(e => e.id === id || e._id === id);
        return Promise.resolve(event);
    },
    createEvent: (data) => {
        const newEvent = {
            _id: String(exports.mockStore.events.length + 1),
            id: String(exports.mockStore.events.length + 1),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'active'
        };
        exports.mockStore.events.push(newEvent);
        return Promise.resolve(newEvent);
    },
    updateEvent: (id, data) => {
        const index = exports.mockStore.events.findIndex(e => e.id === id || e._id === id);
        if (index !== -1) {
            exports.mockStore.events[index] = {
                ...exports.mockStore.events[index],
                ...data,
                updatedAt: new Date()
            };
            return Promise.resolve(exports.mockStore.events[index]);
        }
        return Promise.resolve(null);
    },
    // Tickets
    getTickets: (query = {}) => {
        let results = [...exports.mockStore.tickets];
        if (query.owner) {
            results = results.filter(t => t.owner.toLowerCase() === query.owner.toLowerCase());
        }
        if (query.eventId) {
            results = results.filter(t => t.eventId === query.eventId);
        }
        if (query.status) {
            results = results.filter(t => t.status === query.status);
        }
        return Promise.resolve(results);
    },
    getTicketById: (id) => {
        const ticket = exports.mockStore.tickets.find(t => t.id === id || t._id === id);
        return Promise.resolve(ticket);
    },
    createTicket: (data) => {
        const newTicket = {
            _id: `t${exports.mockStore.tickets.length + 1}`,
            id: `t${exports.mockStore.tickets.length + 1}`,
            ...data,
            purchaseDate: new Date(),
            status: 'active',
            used: false,
            qrCode: `QR-${data.tokenId}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
        };
        exports.mockStore.tickets.push(newTicket);
        return Promise.resolve(newTicket);
    },
    updateTicket: (id, data) => {
        const index = exports.mockStore.tickets.findIndex(t => t.id === id || t._id === id);
        if (index !== -1) {
            exports.mockStore.tickets[index] = {
                ...exports.mockStore.tickets[index],
                ...data
            };
            return Promise.resolve(exports.mockStore.tickets[index]);
        }
        return Promise.resolve(null);
    },
    // Listings
    getListings: (query = {}) => {
        let results = [...exports.mockStore.listings];
        if (query.status) {
            results = results.filter(l => l.status === query.status);
        }
        if (query.eventId) {
            results = results.filter(l => l.eventId === query.eventId);
        }
        if (query.seller) {
            results = results.filter(l => l.seller.toLowerCase() === query.seller.toLowerCase());
        }
        return Promise.resolve(results);
    },
    getListingById: (id) => {
        const listing = exports.mockStore.listings.find(l => l.id === id || l._id === id);
        return Promise.resolve(listing);
    },
    createListing: (data) => {
        const newListing = {
            _id: `l${exports.mockStore.listings.length + 1}`,
            id: `l${exports.mockStore.listings.length + 1}`,
            ...data,
            listingDate: new Date(),
            status: 'active'
        };
        exports.mockStore.listings.push(newListing);
        return Promise.resolve(newListing);
    },
    updateListing: (id, data) => {
        const index = exports.mockStore.listings.findIndex(l => l.id === id || l._id === id);
        if (index !== -1) {
            exports.mockStore.listings[index] = {
                ...exports.mockStore.listings[index],
                ...data
            };
            return Promise.resolve(exports.mockStore.listings[index]);
        }
        return Promise.resolve(null);
    },
    // Notifications
    getNotifications: (query = {}) => {
        let results = [...exports.mockStore.notifications];
        if (query.userId) {
            results = results.filter(n => n.userId.toLowerCase() === query.userId.toLowerCase());
        }
        if (query.read !== undefined) {
            results = results.filter(n => n.read === query.read);
        }
        return Promise.resolve(results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    },
    getNotificationById: (id) => {
        const notification = exports.mockStore.notifications.find(n => n.id === id || n._id === id);
        return Promise.resolve(notification);
    },
    createNotification: (data) => {
        const newNotification = {
            _id: `n${exports.mockStore.notifications.length + 1}`,
            id: `n${exports.mockStore.notifications.length + 1}`,
            ...data,
            createdAt: new Date(),
            read: false
        };
        exports.mockStore.notifications.push(newNotification);
        return Promise.resolve(newNotification);
    },
    updateNotification: (id, data) => {
        const index = exports.mockStore.notifications.findIndex(n => n.id === id || n._id === id);
        if (index !== -1) {
            exports.mockStore.notifications[index] = {
                ...exports.mockStore.notifications[index],
                ...data
            };
            return Promise.resolve(exports.mockStore.notifications[index]);
        }
        return Promise.resolve(null);
    },
    deleteNotification: (id) => {
        const index = exports.mockStore.notifications.findIndex(n => n.id === id || n._id === id);
        if (index !== -1) {
            exports.mockStore.notifications.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    },
    // Transfers
    getTransfers: (query = {}) => {
        let results = [...exports.mockStore.transfers];
        if (query.ticketId) {
            results = results.filter(t => t.ticketId === query.ticketId);
        }
        if (query.from) {
            results = results.filter(t => t.from.toLowerCase() === query.from.toLowerCase());
        }
        if (query.to) {
            results = results.filter(t => t.to.toLowerCase() === query.to.toLowerCase());
        }
        return Promise.resolve(results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    },
    createTransfer: (data) => {
        const newTransfer = {
            _id: `tr${exports.mockStore.transfers.length + 1}`,
            id: `tr${exports.mockStore.transfers.length + 1}`,
            ...data,
            timestamp: new Date()
        };
        exports.mockStore.transfers.push(newTransfer);
        return Promise.resolve(newTransfer);
    }
};
//# sourceMappingURL=mockData.js.map