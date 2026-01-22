// API service - using mock data for demo
import { mockStore } from './mock-data'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  organizer: string;
  contractAddress?: string;
  maxAttendees: number;
  ticketTypes: Array<{
    name: string;
    price: string;
    quantity: number;
    available: number;
  }>;
  status: 'draft' | 'active' | 'sold-out' | 'ended' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  _id: string;
  eventId: string;
  tokenId: string;
  owner: string;
  ticketType: string;
  price: string;
  purchaseDate: string;
  isUsed?: boolean;
  used?: boolean;
  status?: 'active' | 'listed' | 'used';
  transactionHash: string;
  event?: Event;
}

export interface MarketplaceListing {
  _id: string;
  ticketId: string;
  eventId: string;
  tokenId?: string;
  seller: string;
  price: string;
  originalPrice: string;
  status: 'active' | 'sold' | 'cancelled';
  listingDate: string;
  listedAt?: string;
  ticketType?: string;
  eventTitle?: string;
  eventDate?: string;
  eventImage?: string;
  event?: Event;
  ticket?: Ticket;
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'ticket-purchase' | 'ticket-sale' | 'event-reminder' | 'price-alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Events API
export const eventsApi = {
  async getAll(params?: { status?: string; category?: string }): Promise<Event[]> {
    return mockStore.getEvents()
  },

  async getById(id: string): Promise<Event> {
    const event = await mockStore.getEventById(id)
    if (!event) throw new Error('Event not found')
    return event
  },

  async create(eventData: Partial<Event>): Promise<Event> {
    throw new Error('Not implemented in demo')
  },

  async update(id: string, eventData: Partial<Event>): Promise<Event> {
    throw new Error('Not implemented in demo')
  },
};

// Tickets API
export const ticketsApi = {
  async getAll(params?: { owner?: string; eventId?: string }): Promise<Ticket[]> {
    return mockStore.getTickets(params?.owner)
  },

  async getUserTickets(owner: string): Promise<Ticket[]> {
    return mockStore.getTickets(owner)
  },

  async getById(id: string): Promise<Ticket> {
    const tickets = await mockStore.getTickets()
    const ticket = tickets.find(t => t._id === id)
    if (!ticket) throw new Error('Ticket not found')
    return ticket
  },

  async purchase(purchaseData: { eventId: string; owner: string; ticketType: string; price: string }): Promise<Ticket> {
    return mockStore.purchaseTicket(purchaseData.eventId, purchaseData.ticketType, purchaseData.price)
  },

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    throw new Error('Not implemented in demo')
  },
};

// Marketplace API
export const marketplaceApi = {
  async getAll(params?: { status?: string; eventId?: string }): Promise<MarketplaceListing[]> {
    return mockStore.getListings()
  },

  async getById(id: string): Promise<MarketplaceListing> {
    const listings = await mockStore.getListings()
    const listing = listings.find(l => l._id === id)
    if (!listing) throw new Error('Listing not found')
    return listing
  },

  async create(listingData: any): Promise<MarketplaceListing> {
    return mockStore.createListing(listingData.ticketId, listingData.price)
  },

  async purchase(listingId: string, buyer: string): Promise<any> {
    return mockStore.purchaseListing(listingId)
  },

  async updateStatus(id: string, status: 'active' | 'sold' | 'cancelled'): Promise<MarketplaceListing> {
    throw new Error('Not implemented in demo')
  },
};

// Notifications API
export const notificationsApi = {
  async getAll(userId?: string): Promise<Notification[]> {
    return Promise.resolve([])
  },

  async markAsRead(id: string): Promise<Notification> {
    throw new Error('Not implemented in demo')
  },

  async markAllAsRead(userId: string): Promise<void> {
    throw new Error('Not implemented in demo')
  },
};