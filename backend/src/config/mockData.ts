// Mock data store for development without MongoDB
export const mockStore = {
  events: [
    {
      _id: '1',
      id: '1',
      name: 'Blockchain Summit 2024',
      description: 'Annual blockchain technology conference featuring industry leaders and innovators.',
      date: new Date('2024-12-15T09:00:00'),
      venue: 'Tech Convention Center',
      organizer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      ticketTypes: [
        {
          id: 'general',
          name: 'General Admission',
          price: '0.1',
          available: 100,
          total: 150
        },
        {
          id: 'vip',
          name: 'VIP Pass',
          price: '0.5',
          available: 20,
          total: 50
        }
      ],
      category: 'Technology',
      image: '/placeholder.jpg',
      status: 'active',
      createdAt: new Date('2024-11-01'),
      updatedAt: new Date('2024-11-01')
    },
    {
      _id: '2',
      id: '2',
      name: 'NFT Art Exhibition',
      description: 'Explore the latest digital art from renowned NFT artists.',
      date: new Date('2024-12-20T18:00:00'),
      venue: 'Digital Art Gallery',
      organizer: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      ticketTypes: [
        {
          id: 'standard',
          name: 'Standard Entry',
          price: '0.05',
          available: 200,
          total: 200
        }
      ],
      category: 'Art',
      image: '/placeholder.jpg',
      status: 'active',
      createdAt: new Date('2024-11-05'),
      updatedAt: new Date('2024-11-05')
    },
    {
      _id: '3',
      id: '3',
      name: 'Web3 Music Festival',
      description: 'Experience live music performances with NFT ticket collectibles.',
      date: new Date('2024-12-25T20:00:00'),
      venue: 'Open Air Arena',
      organizer: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
      ticketTypes: [
        {
          id: 'early-bird',
          name: 'Early Bird',
          price: '0.15',
          available: 0,
          total: 100
        },
        {
          id: 'regular',
          name: 'Regular',
          price: '0.25',
          available: 150,
          total: 300
        },
        {
          id: 'backstage',
          name: 'Backstage Pass',
          price: '1.0',
          available: 10,
          total: 20
        }
      ],
      category: 'Music',
      image: '/placeholder.jpg',
      status: 'active',
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-10')
    }
  ],
  tickets: [
    {
      _id: 't1',
      id: 't1',
      eventId: '1',
      tokenId: '1001',
      owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      ticketType: 'general',
      price: '0.1',
      purchaseDate: new Date('2024-11-12'),
      status: 'active',
      used: false,
      qrCode: 'QR-1001-ABC123'
    },
    {
      _id: 't2',
      id: 't2',
      eventId: '2',
      tokenId: '1002',
      owner: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      ticketType: 'standard',
      price: '0.05',
      purchaseDate: new Date('2024-11-13'),
      status: 'active',
      used: false,
      qrCode: 'QR-1002-DEF456'
    }
  ],
  listings: [
    {
      _id: 'l1',
      id: 'l1',
      ticketId: 't1',
      tokenId: '1001',
      eventId: '1',
      seller: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      price: '0.12',
      originalPrice: '0.1',
      status: 'active',
      listingDate: new Date('2024-11-14'),
      expiryDate: new Date('2024-12-14')
    }
  ],
  notifications: [
    {
      _id: 'n1',
      id: 'n1',
      userId: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      type: 'purchase',
      title: 'Ticket Purchased',
      message: 'You successfully purchased a ticket for Blockchain Summit 2024',
      read: false,
      createdAt: new Date('2024-11-12'),
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
      message: 'Blockchain Summit 2024 is happening in 3 days!',
      read: false,
      createdAt: new Date('2024-11-12'),
      metadata: {
        eventId: '1'
      }
    }
  ],
  transfers: [
    {
      _id: 'tr1',
      id: 'tr1',
      ticketId: 't1',
      tokenId: '1001',
      from: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
      to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      txHash: '0xabc123def456...',
      timestamp: new Date('2024-11-12'),
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
    
    return Promise.resolve(results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
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
    
    return Promise.resolve(results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
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
