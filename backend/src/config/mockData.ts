// Mock data store for development without MongoDB
export const mockStore = {
  events: [
    {
      _id: '1',
      id: '1',
      title: 'Karan Aujla Live in Mumbai',
      name: 'Karan Aujla Live in Mumbai',
      description: "Experience the king of Punjabi rap live! Karan Aujla brings his electrifying performance to Mumbai. Get ready for non-stop hits including 'Tauba Tauba', 'Don't Worry', 'Admirin You', and more. Special guest appearances by top Punjabi artists!",
      date: '2026-03-15T19:00:00',
      time: '07:00 PM',
      venue: 'MMRDA Grounds, Bandra-Kurla Complex',
      location: 'Mumbai, Maharashtra',
      organizer: 'Priya Sharma Events',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
      maxAttendees: 25000,
      ticketTypes: [
        {
          name: 'General Standing',
          price: '3500',
          quantity: 15000,
          available: 12847
        },
        {
          name: 'Premium Seating',
          price: '8500',
          quantity: 5000,
          available: 3423
        },
        {
          name: 'VIP Meet & Greet',
          price: '25000',
          quantity: 500,
          available: 267
        }
      ],
      status: 'active',
      createdAt: '2026-01-01T00:00:00',
      updatedAt: '2026-01-20T00:00:00'
    },
    {
      _id: '2',
      id: '2',
      title: 'New Delhi World Book Fair 2026',
      name: 'New Delhi World Book Fair 2026',
      description: "Asia's largest book fair returns! Explore 1000+ publishers, attend author meet & greets, book launches, and literary workshops. Special focus on Indian literature, regional languages, and digital publishing. Meet renowned Indian and international authors.",
      date: '2026-02-20T10:00:00',
      time: '10:00 AM',
      venue: 'Pragati Maidan',
      location: 'New Delhi',
      organizer: 'Ankit Verma',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
      maxAttendees: 50000,
      ticketTypes: [
        {
          name: 'Single Day Pass',
          price: '500',
          quantity: 30000,
          available: 23542
        },
        {
          name: 'Full Week Pass',
          price: '2500',
          quantity: 10000,
          available: 7387
        },
        {
          name: 'Author Session Pass',
          price: '5000',
          quantity: 2000,
          available: 1654
        }
      ],
      status: 'active',
      createdAt: '2026-01-05T00:00:00',
      updatedAt: '2026-01-18T00:00:00'
    },
    {
      _id: '3',
      id: '3',
      title: 'Navratri Mahotsav - Garba Festival',
      name: 'Navratri Mahotsav - Garba Festival',
      description: 'Celebrate the grandest Navratri festival in Gujarat! 9 nights of traditional Garba and Dandiya Raas with live folk music, celebrity performances, and authentic Gujarati food stalls. Traditional attire encouraged. Special performances by Falguni Pathak, Atul Purohit, and other renowned Garba artists.',
      date: '2026-10-15T19:30:00',
      time: '07:30 PM',
      venue: 'United Way Grounds',
      location: 'Ahmedabad, Gujarat',
      organizer: 'Sneha Patel Cultural Trust',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1605979399824-0ff3e2456812?w=800',
      maxAttendees: 15000,
      ticketTypes: [
        {
          name: '9-Night Pass',
          price: '5000',
          quantity: 8000,
          available: 5234
        },
        {
          name: 'VIP Couple Pass',
          price: '15000',
          quantity: 2000,
          available: 1343
        },
        {
          name: 'Family Pack (4 people)',
          price: '18000',
          quantity: 1000,
          available: 687
        }
      ],
      status: 'active',
      createdAt: '2026-01-10T00:00:00',
      updatedAt: '2026-01-21T00:00:00'
    },
    {
      _id: '4',
      id: '4',
      title: 'India Tech Summit & Startup Expo',
      name: 'India Tech Summit & Startup Expo',
      description: "India's premier technology conference bringing together startups, investors, and tech enthusiasts. Network with 3000+ attendees, pitch sessions, workshops on AI/ML, blockchain, and fintech. Keynotes from top Indian tech CEOs and global innovators.",
      date: '2026-03-25T09:00:00',
      time: '09:00 AM',
      venue: 'Bangalore International Exhibition Centre',
      location: 'Bengaluru, Karnataka',
      organizer: 'Vikram Singh',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      maxAttendees: 5000,
      ticketTypes: [
        {
          name: 'Delegate Pass',
          price: '4500',
          quantity: 3000,
          available: 2376
        },
        {
          name: 'Startup Founder Pass',
          price: '12000',
          quantity: 1000,
          available: 812
        },
        {
          name: 'Investor VIP Pass',
          price: '25000',
          quantity: 500,
          available: 367
        }
      ],
      status: 'active',
      createdAt: '2026-01-08T00:00:00',
      updatedAt: '2026-01-19T00:00:00'
    },
    {
      _id: '5',
      id: '5',
      title: 'Sunburn Festival Goa',
      name: 'Sunburn Festival Goa',
      description: "Asia's biggest electronic music festival returns to Goa! 3 days of non-stop EDM with international and Indian DJs. Featuring Martin Garrix, Nucleya, KSHMR, and 50+ artists. Beach parties, sunset sessions, and unforgettable experiences.",
      date: '2026-12-28T16:00:00',
      time: '04:00 PM',
      venue: 'Vagator Beach',
      location: 'Goa',
      organizer: 'Arjun Mehta Productions',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
      maxAttendees: 30000,
      ticketTypes: [
        {
          name: '3-Day GA Pass',
          price: '8500',
          quantity: 20000,
          available: 15521
        },
        {
          name: 'VIP Lounge Access',
          price: '22000',
          quantity: 5000,
          available: 3654
        },
        {
          name: 'Backstage Pass',
          price: '45000',
          quantity: 500,
          available: 287
        }
      ],
      status: 'active',
      createdAt: '2026-01-12T00:00:00',
      updatedAt: '2026-01-20T00:00:00'
    },
    {
      _id: '6',
      id: '6',
      title: 'Lakme Fashion Week - Mumbai',
      name: 'Lakme Fashion Week - Mumbai',
      description: "India's most prestigious fashion event! Witness the latest collections from top Indian designers including Manish Malhotra, Sabyasachi, Anita Dongre, and emerging talents. Celebrity showstoppers, sustainable fashion showcase, and exclusive designer interactions.",
      date: '2026-04-18T18:00:00',
      time: '06:00 PM',
      venue: 'Jio World Convention Centre',
      location: 'Mumbai, Maharashtra',
      organizer: 'Kavya Reddy Fashion Events',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
      maxAttendees: 3000,
      ticketTypes: [
        {
          name: 'General Seating',
          price: '6500',
          quantity: 2000,
          available: 1689
        },
        {
          name: 'Front Row Premium',
          price: '18000',
          quantity: 500,
          available: 354
        },
        {
          name: 'Designer Meet Access',
          price: '35000',
          quantity: 200,
          available: 143
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
      price: '3500',
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
      price: '500',
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
      price: '5000',
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
      price: '8500',
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
      price: '9000',
      originalPrice: '8500',
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
      price: '5500',
      originalPrice: '5000',
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
      price: '4500',
      originalPrice: '4000',
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
      price: '3200',
      originalPrice: '3000',
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
      price: '6500',
      originalPrice: '6000',
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
export const mockDb = {
  // Events
  getEvents: (query: any = {}) => {
    let results = [...mockStore.events];
    
    if (query.status) {
      results = results.filter(e => e.status === query.status);
    }
    if (query.category) {
      results = results.filter(e => e.category === query.category);
    }
    
    return Promise.resolve(results);
  },
  
  getEventById: (id: string) => {
    const event = mockStore.events.find(e => e.id === id || e._id === id);
    return Promise.resolve(event);
  },
  
  createEvent: (data: any) => {
    const newEvent = {
      _id: String(mockStore.events.length + 1),
      id: String(mockStore.events.length + 1),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };
    mockStore.events.push(newEvent);
    return Promise.resolve(newEvent);
  },
  
  updateEvent: (id: string, data: any) => {
    const index = mockStore.events.findIndex(e => e.id === id || e._id === id);
    if (index !== -1) {
      mockStore.events[index] = {
        ...mockStore.events[index],
        ...data,
        updatedAt: new Date()
      };
      return Promise.resolve(mockStore.events[index]);
    }
    return Promise.resolve(null);
  },
  
  // Tickets
  getTickets: (query: any = {}) => {
    let results = [...mockStore.tickets];
    
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
  
  getTicketById: (id: string) => {
    const ticket = mockStore.tickets.find(t => t.id === id || t._id === id);
    return Promise.resolve(ticket);
  },
  
  createTicket: (data: any) => {
    const newTicket = {
      _id: `t${mockStore.tickets.length + 1}`,
      id: `t${mockStore.tickets.length + 1}`,
      ...data,
      purchaseDate: new Date(),
      status: 'active',
      used: false,
      qrCode: `QR-${data.tokenId}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };
    mockStore.tickets.push(newTicket);
    return Promise.resolve(newTicket);
  },
  
  updateTicket: (id: string, data: any) => {
    const index = mockStore.tickets.findIndex(t => t.id === id || t._id === id);
    if (index !== -1) {
      mockStore.tickets[index] = {
        ...mockStore.tickets[index],
        ...data
      };
      return Promise.resolve(mockStore.tickets[index]);
    }
    return Promise.resolve(null);
  },
  
  // Listings
  getListings: (query: any = {}) => {
    let results = [...mockStore.listings];
    
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
  
  getListingById: (id: string) => {
    const listing = mockStore.listings.find(l => l.id === id || l._id === id);
    return Promise.resolve(listing);
  },
  
  createListing: (data: any) => {
    const newListing = {
      _id: `l${mockStore.listings.length + 1}`,
      id: `l${mockStore.listings.length + 1}`,
      ...data,
      listingDate: new Date(),
      status: 'active'
    };
    mockStore.listings.push(newListing);
    return Promise.resolve(newListing);
  },
  
  updateListing: (id: string, data: any) => {
    const index = mockStore.listings.findIndex(l => l.id === id || l._id === id);
    if (index !== -1) {
      mockStore.listings[index] = {
        ...mockStore.listings[index],
        ...data
      };
      return Promise.resolve(mockStore.listings[index]);
    }
    return Promise.resolve(null);
  },
  
  // Notifications
  getNotifications: (query: any = {}) => {
    let results = [...mockStore.notifications];
    
    if (query.userId) {
      results = results.filter(n => n.userId.toLowerCase() === query.userId.toLowerCase());
    }
    if (query.read !== undefined) {
      results = results.filter(n => n.read === query.read);
    }
    
    return Promise.resolve(results.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  },
  
  getNotificationById: (id: string) => {
    const notification = mockStore.notifications.find(n => n.id === id || n._id === id);
    return Promise.resolve(notification);
  },
  
  createNotification: (data: any) => {
    const newNotification = {
      _id: `n${mockStore.notifications.length + 1}`,
      id: `n${mockStore.notifications.length + 1}`,
      ...data,
      createdAt: new Date(),
      read: false
    };
    mockStore.notifications.push(newNotification);
    return Promise.resolve(newNotification);
  },
  
  updateNotification: (id: string, data: any) => {
    const index = mockStore.notifications.findIndex(n => n.id === id || n._id === id);
    if (index !== -1) {
      mockStore.notifications[index] = {
        ...mockStore.notifications[index],
        ...data
      };
      return Promise.resolve(mockStore.notifications[index]);
    }
    return Promise.resolve(null);
  },
  
  deleteNotification: (id: string) => {
    const index = mockStore.notifications.findIndex(n => n.id === id || n._id === id);
    if (index !== -1) {
      mockStore.notifications.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },
  
  // Transfers
  getTransfers: (query: any = {}) => {
    let results = [...mockStore.transfers];
    
    if (query.ticketId) {
      results = results.filter(t => t.ticketId === query.ticketId);
    }
    if (query.from) {
      results = results.filter(t => t.from.toLowerCase() === query.from.toLowerCase());
    }
    if (query.to) {
      results = results.filter(t => t.to.toLowerCase() === query.to.toLowerCase());
    }
    
    return Promise.resolve(results.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  },
  
  createTransfer: (data: any) => {
    const newTransfer = {
      _id: `tr${mockStore.transfers.length + 1}`,
      id: `tr${mockStore.transfers.length + 1}`,
      ...data,
      timestamp: new Date()
    };
    mockStore.transfers.push(newTransfer);
    return Promise.resolve(newTransfer);
  }
};
