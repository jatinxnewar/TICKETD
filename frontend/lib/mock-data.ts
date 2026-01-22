// Complete hardcoded data store for demo
import { Event, Ticket, MarketplaceListing } from './api'

// Initialize from localStorage or use defaults
const STORAGE_KEY = 'ticketd_demo_data'

interface DemoData {
  events: Event[]
  tickets: Ticket[]
  listings: MarketplaceListing[]
  userWallet: string
}

const DEFAULT_DATA: DemoData = {
  userWallet: 'Rajesh Kumar',
  events: [
    {
      _id: '1',
      title: 'Karan Aujla Live in Mumbai',
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
        { name: 'General Standing', price: '3500', quantity: 15000, available: 12847 },
        { name: 'Premium Seating', price: '8500', quantity: 5000, available: 3423 },
        { name: 'VIP Meet & Greet', price: '25000', quantity: 500, available: 267 }
      ],
      status: 'active',
      createdAt: '2026-01-01T00:00:00',
      updatedAt: '2026-01-20T00:00:00'
    },
    {
      _id: '2',
      title: 'New Delhi World Book Fair 2026',
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
        { name: 'Single Day Pass', price: '500', quantity: 30000, available: 23542 },
        { name: 'Full Week Pass', price: '2500', quantity: 10000, available: 7387 },
        { name: 'Author Session Pass', price: '5000', quantity: 2000, available: 1654 }
      ],
      status: 'active',
      createdAt: '2026-01-05T00:00:00',
      updatedAt: '2026-01-18T00:00:00'
    },
    {
      _id: '3',
      title: 'Navratri Mahotsav - Garba Festival',
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
        { name: '9-Night Pass', price: '5000', quantity: 8000, available: 5234 },
        { name: 'VIP Couple Pass', price: '15000', quantity: 2000, available: 1343 },
        { name: 'Family Pack (4 people)', price: '18000', quantity: 1000, available: 687 }
      ],
      status: 'active',
      createdAt: '2026-01-10T00:00:00',
      updatedAt: '2026-01-21T00:00:00'
    },
    {
      _id: '4',
      title: 'India Tech Summit & Startup Expo',
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
        { name: 'Delegate Pass', price: '4500', quantity: 3000, available: 2376 },
        { name: 'Startup Founder Pass', price: '12000', quantity: 1000, available: 812 },
        { name: 'Investor VIP Pass', price: '25000', quantity: 500, available: 367 }
      ],
      status: 'active',
      createdAt: '2026-01-08T00:00:00',
      updatedAt: '2026-01-19T00:00:00'
    },
    {
      _id: '5',
      title: 'Sunburn Festival Goa',
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
        { name: '3-Day GA Pass', price: '8500', quantity: 20000, available: 15521 },
        { name: 'VIP Lounge Access', price: '22000', quantity: 5000, available: 3654 },
        { name: 'Backstage Pass', price: '45000', quantity: 500, available: 287 }
      ],
      status: 'active',
      createdAt: '2026-01-12T00:00:00',
      updatedAt: '2026-01-20T00:00:00'
    },
    {
      _id: '6',
      title: 'Lakme Fashion Week - Mumbai',
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
        { name: 'General Seating', price: '6500', quantity: 2000, available: 1689 },
        { name: 'Front Row Premium', price: '18000', quantity: 500, available: 354 },
        { name: 'Designer Meet Access', price: '35000', quantity: 200, available: 143 }
      ],
      status: 'active',
      createdAt: '2026-01-15T00:00:00',
      updatedAt: '2026-01-21T00:00:00'
    },
    {
      _id: '7',
      title: 'Diljit Dosanjh - Dil-Luminati India Tour',
      description: 'Punjabi superstar Diljit Dosanjh brings his chart-topping hits to Delhi! Experience live performances of GOAT, Born to Shine, Lover, and more. Special Bhangra performances and surprise guest artists. A night of pure Punjabi energy!',
      date: '2026-05-10T19:00:00',
      time: '07:00 PM',
      venue: 'Jawaharlal Nehru Stadium',
      location: 'New Delhi',
      organizer: 'Rohan Kapoor Entertainment',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800',
      maxAttendees: 40000,
      ticketTypes: [
        { name: 'General Admission', price: '4500', quantity: 25000, available: 18234 },
        { name: 'Premium Zone', price: '9500', quantity: 10000, available: 6543 },
        { name: 'VIP Diamond Lounge', price: '28000', quantity: 1000, available: 456 }
      ],
      status: 'active',
      createdAt: '2026-01-16T00:00:00',
      updatedAt: '2026-01-22T00:00:00'
    },
    {
      _id: '8',
      title: 'NH7 Weekender - Pune Edition',
      description: "India's happiest music festival returns! Multi-genre celebration featuring indie rock, electronic, hip-hop, and folk artists from India and abroad. 50+ artists across 5 stages. Food trucks, art installations, and camping experiences.",
      date: '2026-11-05T14:00:00',
      time: '02:00 PM',
      venue: 'Mahalunge Bachat Gat Grounds',
      location: 'Pune, Maharashtra',
      organizer: 'Meera Nair Productions',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      maxAttendees: 20000,
      ticketTypes: [
        { name: '3-Day Pass', price: '7500', quantity: 12000, available: 8765 },
        { name: 'VIP Experience', price: '18000', quantity: 3000, available: 1987 },
        { name: 'Premium Camping + Pass', price: '32000', quantity: 1500, available: 543 }
      ],
      status: 'active',
      createdAt: '2026-01-17T00:00:00',
      updatedAt: '2026-01-22T00:00:00'
    },
    {
      _id: '9',
      title: 'Jaipur Literature Festival 2026',
      description: 'The greatest literary show on Earth! Meet 300+ authors, poets, and thinkers from around the world. Panel discussions, book launches, poetry readings, and cultural performances. Previous speakers include Amitav Ghosh, Shashi Tharoor, Margaret Atwood, and more.',
      date: '2026-01-25T09:00:00',
      time: '09:00 AM',
      venue: 'Diggi Palace',
      location: 'Jaipur, Rajasthan',
      organizer: 'Sanjay Malhotra Literary Foundation',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800',
      maxAttendees: 15000,
      ticketTypes: [
        { name: '5-Day Festival Pass', price: '3500', quantity: 8000, available: 5432 },
        { name: 'VIP Delegate Pass', price: '12000', quantity: 2000, available: 1234 },
        { name: 'Author Interaction Package', price: '22000', quantity: 500, available: 287 }
      ],
      status: 'active',
      createdAt: '2026-01-18T00:00:00',
      updatedAt: '2026-01-22T00:00:00'
    },
    {
      _id: '10',
      title: 'Comic Con India - Bangalore',
      description: "South India's biggest pop culture festival! Cosplay competitions, celebrity panels, gaming tournaments, artist alleys, and exclusive merchandise. Special guests from Marvel, DC, and Bollywood. Meet your favorite creators and artists!",
      date: '2026-06-20T10:00:00',
      time: '10:00 AM',
      venue: 'BIEC - Bangalore International Exhibition Centre',
      location: 'Bengaluru, Karnataka',
      organizer: 'Aditya Reddy Events',
      category: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=800',
      maxAttendees: 25000,
      ticketTypes: [
        { name: 'Single Day Pass', price: '1500', quantity: 15000, available: 11234 },
        { name: '3-Day SuperFan Pass', price: '4500', quantity: 7000, available: 4567 },
        { name: 'VIP Celebrity Meet', price: '15000', quantity: 1000, available: 678 }
      ],
      status: 'active',
      createdAt: '2026-01-19T00:00:00',
      updatedAt: '2026-01-22T00:00:00'
    },
    {
      _id: '11',
      title: 'Durga Puja Cultural Festival - Kolkata',
      description: "Experience the grandeur of Kolkata's biggest Durga Puja! Stunning pandal artworks, cultural performances, traditional Bengali food, and Dhunuchi dance. Special performances by renowned Bengali artists. Immerse yourself in Bengal's rich cultural heritage.",
      date: '2026-10-08T17:00:00',
      time: '05:00 PM',
      venue: 'Maidan - Central Park',
      location: 'Kolkata, West Bengal',
      organizer: 'Subhash Chatterjee Cultural Society',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1603893488883-e4a8c2f76c86?w=800',
      maxAttendees: 50000,
      ticketTypes: [
        { name: '4-Day Festival Pass', price: '2500', quantity: 30000, available: 24567 },
        { name: 'VIP Pandal Tour', price: '8500', quantity: 5000, available: 3456 },
        { name: 'Premium Cultural Package', price: '16000', quantity: 2000, available: 1234 }
      ],
      status: 'active',
      createdAt: '2026-01-20T00:00:00',
      updatedAt: '2026-01-22T00:00:00'
    },
    {
      _id: '12',
      title: 'India AI Summit 2026',
      description: 'Leading artificial intelligence and machine learning conference in India. Workshops on ChatGPT, Deep Learning, Computer Vision, and NLP. Network with AI researchers, startup founders, and tech leaders. Hands-on coding sessions and hackathons.',
      date: '2026-07-15T09:00:00',
      time: '09:00 AM',
      venue: 'Hyderabad International Convention Centre',
      location: 'Hyderabad, Telangana',
      organizer: 'Dr. Ramesh Patel Tech Ventures',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      maxAttendees: 8000,
      ticketTypes: [
        { name: 'Conference Pass', price: '5500', quantity: 5000, available: 3789 },
        { name: 'Workshop + Conference', price: '14000', quantity: 2000, available: 1456 },
        { name: 'Corporate VIP Package', price: '35000', quantity: 500, available: 267 }
      ],
      status: 'active',
      createdAt: '2026-01-21T00:00:00',
      updatedAt: '2026-01-23T00:00:00'
    }
  ],
  tickets: [
    {
      _id: 't1',
      eventId: '1',
      tokenId: '1001',
      owner: 'Rajesh Kumar',
      ticketType: 'General Standing',
      price: '3500',
      purchaseDate: '2026-01-10T14:30:00',
      status: 'active',
      used: false,
      transactionHash: 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase()
    },
    {
      _id: 't2',
      eventId: '2',
      tokenId: '1002',
      owner: 'Rajesh Kumar',
      ticketType: 'Single Day Pass',
      price: '500',
      purchaseDate: '2026-01-12T09:15:00',
      status: 'active',
      used: false,
      transactionHash: 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase()
    },
    {
      _id: 't3',
      eventId: '3',
      tokenId: '1003',
      owner: 'Rajesh Kumar',
      ticketType: '9-Night Pass',
      price: '5000',
      purchaseDate: '2026-01-15T16:45:00',
      status: 'active',
      used: false,
      transactionHash: 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase()
    },
    {
      _id: 't4',
      eventId: '5',
      tokenId: '1004',
      owner: 'Rajesh Kumar',
      ticketType: '3-Day GA Pass',
      price: '4500',
      purchaseDate: '2026-01-18T11:20:00',
      status: 'active',
      used: false,
      transactionHash: 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase()
    }
  ],
  listings: [
    {
      _id: 'l1',
      ticketId: 't5',
      eventId: '1',
      tokenId: '1005',
      seller: 'Amit Patel',
      price: '6000',
      originalPrice: '5000',
      status: 'active',
      listingDate: '2026-01-18T10:30:00',
      ticketType: 'Premium Seating',
      eventTitle: 'Karan Aujla Live in Mumbai',
      eventDate: '2026-03-15T19:00:00',
      eventImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800'
    },
    {
      _id: 'l2',
      ticketId: 't6',
      eventId: '5',
      tokenId: '1006',
      seller: 'Priya Sharma',
      price: '14000',
      originalPrice: '12000',
      status: 'active',
      listingDate: '2026-01-19T14:15:00',
      ticketType: 'VIP Lounge Access',
      eventTitle: 'Sunburn Festival Goa',
      eventDate: '2026-12-28T16:00:00',
      eventImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800'
    },
    {
      _id: 'l3',
      ticketId: 't7',
      eventId: '4',
      tokenId: '1007',
      seller: 'Neha Singh',
      price: '5500',
      originalPrice: '5000',
      status: 'active',
      listingDate: '2026-01-20T09:45:00',
      ticketType: 'Startup Founder Pass',
      eventTitle: 'India Tech Summit & Startup Expo',
      eventDate: '2026-03-25T09:00:00',
      eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    },
    {
      _id: 'l4',
      ticketId: 't8',
      eventId: '6',
      tokenId: '1008',
      seller: 'Ravi Gupta',
      price: '11000',
      originalPrice: '10000',
      status: 'active',
      listingDate: '2026-01-21T11:20:00',
      ticketType: 'Front Row Premium',
      eventTitle: 'Lakme Fashion Week - Mumbai',
      eventDate: '2026-04-18T18:00:00',
      eventImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800'
    },
    {
      _id: 'l5',
      ticketId: 't9',
      eventId: '3',
      tokenId: '1009',
      seller: 'Anjali Desai',
      price: '9000',
      originalPrice: '8000',
      status: 'active',
      listingDate: '2026-01-22T08:00:00',
      ticketType: 'VIP Couple Pass',
      eventTitle: 'Navratri Mahotsav - Garba Festival',
      eventDate: '2026-10-15T19:30:00',
      eventImage: 'https://images.unsplash.com/photo-1605979399824-0ff3e2456812?w=800'
    },
    {
      _id: 'l6',
      ticketId: 't10',
      eventId: '2',
      tokenId: '1010',
      seller: 'Karthik Iyer',
      price: '1700',
      originalPrice: '1500',
      status: 'active',
      listingDate: '2026-01-22T15:30:00',
      ticketType: 'Author Session Pass',
      eventTitle: 'New Delhi World Book Fair 2026',
      eventDate: '2026-02-20T10:00:00',
      eventImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800'
    }
  ]
}

class MockDataStore {
  private data: DemoData

  constructor() {
    this.data = this.loadData()
  }

  private loadData(): DemoData {
    if (typeof window === 'undefined') return DEFAULT_DATA
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return DEFAULT_DATA
      }
    }
    return DEFAULT_DATA
  }

  private saveData() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data))
    }
  }

  // Events
  getEvents() {
    return Promise.resolve([...this.data.events])
  }

  getEventById(id: string) {
    const event = this.data.events.find(e => e._id === id)
    return Promise.resolve(event)
  }

  // Tickets
  getTickets(owner?: string) {
    let tickets = [...this.data.tickets]
    if (owner) {
      tickets = tickets.filter(t => t.owner.toLowerCase() === owner.toLowerCase())
    }
    // Enrich with event data
    const enriched = tickets.map(ticket => ({
      ...ticket,
      event: this.data.events.find(e => e._id === ticket.eventId)
    }))
    return Promise.resolve(enriched)
  }

  purchaseTicket(eventId: string, ticketType: string, price: string) {
    const tokenId = String(1000 + Math.floor(Math.random() * 9000))
    const newTicket: Ticket = {
      _id: `t${Date.now()}`,
      eventId,
      tokenId,
      owner: this.data.userWallet,
      ticketType,
      price,
      purchaseDate: new Date().toISOString(),
      status: 'active',
      used: false,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40)
    }
    
    this.data.tickets.push(newTicket)
    
    // Update event availability
    const event = this.data.events.find(e => e._id === eventId)
    if (event) {
      const ticketTypeObj = event.ticketTypes.find(t => t.name === ticketType)
      if (ticketTypeObj && ticketTypeObj.available > 0) {
        ticketTypeObj.available--
      }
    }
    
    this.saveData()
    
    return Promise.resolve({
      ...newTicket,
      event: this.data.events.find(e => e._id === eventId)
    })
  }

  // Marketplace
  getListings() {
    const listings = this.data.listings.filter(l => l.status === 'active')
    // Enrich with event data
    const enriched = listings.map(listing => ({
      ...listing,
      event: this.data.events.find(e => e._id === listing.eventId)
    }))
    return Promise.resolve(enriched)
  }

  purchaseListing(listingId: string) {
    const listing = this.data.listings.find(l => l._id === listingId)
    if (!listing) {
      return Promise.reject(new Error('Listing not found'))
    }

    // Create new ticket for buyer
    const newTicket: Ticket = {
      _id: `t${Date.now()}`,
      eventId: listing.eventId,
      tokenId: listing.tokenId || String(1000 + Math.floor(Math.random() * 9000)),
      owner: this.data.userWallet,
      ticketType: listing.ticketType || 'General',
      price: listing.price,
      purchaseDate: new Date().toISOString(),
      status: 'active',
      used: false,
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40)
    }

    this.data.tickets.push(newTicket)
    
    // Mark listing as sold
    listing.status = 'sold'
    
    this.saveData()
    return Promise.resolve(newTicket)
  }

  createListing(ticketId: string, price: string) {
    const ticket = this.data.tickets.find(t => t._id === ticketId)
    if (!ticket) {
      return Promise.reject(new Error('Ticket not found'))
    }

    const event = this.data.events.find(e => e._id === ticket.eventId)
    
    const newListing: MarketplaceListing = {
      _id: `l${Date.now()}`,
      ticketId,
      eventId: ticket.eventId,
      tokenId: ticket.tokenId,
      seller: this.data.userWallet,
      price,
      originalPrice: ticket.price,
      status: 'active',
      listingDate: new Date().toISOString(),
      ticketType: ticket.ticketType,
      eventTitle: event?.title,
      eventDate: event?.date,
      eventImage: event?.image
    }

    this.data.listings.push(newListing)
    
    // Update ticket status
    ticket.status = 'listed'
    
    this.saveData()
    return Promise.resolve(newListing)
  }

  reset() {
    this.data = DEFAULT_DATA
    this.saveData()
  }
}

export const mockStore = new MockDataStore()
