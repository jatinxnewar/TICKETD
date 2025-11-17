// API service for backend communication
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
  isUsed: boolean;
  transactionHash: string;
}

export interface MarketplaceListing {
  _id: string;
  ticketId: string;
  eventId: string;
  seller: string;
  price: string;
  originalPrice: string;
  status: 'active' | 'sold' | 'cancelled';
  listedAt: string;
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
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    
    const url = `${API_BASE_URL}/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.events || [];
  },

  async getById(id: string): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.event;
  },

  async create(eventData: Partial<Event>): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.event;
  },

  async update(id: string, eventData: Partial<Event>): Promise<Event> {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.event;
  },
};

// Tickets API
export const ticketsApi = {
  async getAll(params?: { owner?: string; eventId?: string }): Promise<Ticket[]> {
    const queryParams = new URLSearchParams();
    if (params?.owner) queryParams.append('owner', params.owner);
    if (params?.eventId) queryParams.append('eventId', params.eventId);
    
    const url = `${API_BASE_URL}/tickets${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tickets: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.tickets || [];
  },

  async getById(id: string): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ticket: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.ticket;
  },

  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create ticket: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.ticket;
  },
};

// Marketplace API
export const marketplaceApi = {
  async getAll(params?: { status?: string; eventId?: string }): Promise<MarketplaceListing[]> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.eventId) queryParams.append('eventId', params.eventId);
    
    const url = `${API_BASE_URL}/marketplace${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch marketplace listings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.listings || [];
  },

  async getById(id: string): Promise<MarketplaceListing> {
    const response = await fetch(`${API_BASE_URL}/marketplace/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.listing;
  },

  async create(listingData: Partial<MarketplaceListing>): Promise<MarketplaceListing> {
    const response = await fetch(`${API_BASE_URL}/marketplace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create listing: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.listing;
  },

  async updateStatus(id: string, status: 'active' | 'sold' | 'cancelled'): Promise<MarketplaceListing> {
    const response = await fetch(`${API_BASE_URL}/marketplace/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update listing: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.listing;
  },
};

// Notifications API
export const notificationsApi = {
  async getAll(userId: string): Promise<Notification[]> {
    const response = await fetch(`${API_BASE_URL}/notifications?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.notifications || [];
  },

  async markAsRead(id: string): Promise<Notification> {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PATCH',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.notification;
  },
};
