export declare const mockStore: {
    events: {
        _id: string;
        id: string;
        title: string;
        name: string;
        description: string;
        date: string;
        time: string;
        venue: string;
        location: string;
        organizer: string;
        category: string;
        image: string;
        maxAttendees: number;
        ticketTypes: {
            name: string;
            price: string;
            quantity: number;
            available: number;
        }[];
        status: string;
        createdAt: string;
        updatedAt: string;
    }[];
    tickets: {
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: string;
        status: string;
        used: boolean;
        qrCode: string;
        transactionHash: string;
    }[];
    listings: {
        _id: string;
        id: string;
        ticketId: string;
        tokenId: string;
        eventId: string;
        seller: string;
        price: string;
        originalPrice: string;
        status: string;
        listingDate: string;
        expiryDate: string;
        ticketType: string;
        eventTitle: string;
        eventDate: string;
        eventImage: string;
    }[];
    notifications: ({
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId: string;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId?: undefined;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            listingId: string;
            ticketId: string;
            eventId?: undefined;
        };
    })[];
    transfers: {
        _id: string;
        id: string;
        ticketId: string;
        tokenId: string;
        from: string;
        to: string;
        txHash: string;
        timestamp: string;
        type: string;
    }[];
};
export declare const mockDb: {
    getEvents: (query?: any) => Promise<{
        _id: string;
        id: string;
        title: string;
        name: string;
        description: string;
        date: string;
        time: string;
        venue: string;
        location: string;
        organizer: string;
        category: string;
        image: string;
        maxAttendees: number;
        ticketTypes: {
            name: string;
            price: string;
            quantity: number;
            available: number;
        }[];
        status: string;
        createdAt: string;
        updatedAt: string;
    }[]>;
    getEventById: (id: string) => Promise<{
        _id: string;
        id: string;
        title: string;
        name: string;
        description: string;
        date: string;
        time: string;
        venue: string;
        location: string;
        organizer: string;
        category: string;
        image: string;
        maxAttendees: number;
        ticketTypes: {
            name: string;
            price: string;
            quantity: number;
            available: number;
        }[];
        status: string;
        createdAt: string;
        updatedAt: string;
    } | undefined>;
    createEvent: (data: any) => Promise<any>;
    updateEvent: (id: string, data: any) => Promise<{
        _id: string;
        id: string;
        title: string;
        name: string;
        description: string;
        date: string;
        time: string;
        venue: string;
        location: string;
        organizer: string;
        category: string;
        image: string;
        maxAttendees: number;
        ticketTypes: {
            name: string;
            price: string;
            quantity: number;
            available: number;
        }[];
        status: string;
        createdAt: string;
        updatedAt: string;
    }> | Promise<null>;
    getTickets: (query?: any) => Promise<{
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: string;
        status: string;
        used: boolean;
        qrCode: string;
        transactionHash: string;
    }[]>;
    getTicketById: (id: string) => Promise<{
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: string;
        status: string;
        used: boolean;
        qrCode: string;
        transactionHash: string;
    } | undefined>;
    createTicket: (data: any) => Promise<any>;
    updateTicket: (id: string, data: any) => Promise<null> | Promise<{
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: string;
        status: string;
        used: boolean;
        qrCode: string;
        transactionHash: string;
    }>;
    getListings: (query?: any) => Promise<{
        _id: string;
        id: string;
        ticketId: string;
        tokenId: string;
        eventId: string;
        seller: string;
        price: string;
        originalPrice: string;
        status: string;
        listingDate: string;
        expiryDate: string;
        ticketType: string;
        eventTitle: string;
        eventDate: string;
        eventImage: string;
    }[]>;
    getListingById: (id: string) => Promise<{
        _id: string;
        id: string;
        ticketId: string;
        tokenId: string;
        eventId: string;
        seller: string;
        price: string;
        originalPrice: string;
        status: string;
        listingDate: string;
        expiryDate: string;
        ticketType: string;
        eventTitle: string;
        eventDate: string;
        eventImage: string;
    } | undefined>;
    createListing: (data: any) => Promise<any>;
    updateListing: (id: string, data: any) => Promise<null> | Promise<{
        _id: string;
        id: string;
        ticketId: string;
        tokenId: string;
        eventId: string;
        seller: string;
        price: string;
        originalPrice: string;
        status: string;
        listingDate: string;
        expiryDate: string;
        ticketType: string;
        eventTitle: string;
        eventDate: string;
        eventImage: string;
    }>;
    getNotifications: (query?: any) => Promise<({
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId: string;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId?: undefined;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            listingId: string;
            ticketId: string;
            eventId?: undefined;
        };
    })[]>;
    getNotificationById: (id: string) => Promise<{
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId: string;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId?: undefined;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            listingId: string;
            ticketId: string;
            eventId?: undefined;
        };
    } | undefined>;
    createNotification: (data: any) => Promise<any>;
    updateNotification: (id: string, data: any) => Promise<null> | Promise<{
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId: string;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            eventId: string;
            ticketId?: undefined;
            listingId?: undefined;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: string;
        metadata: {
            listingId: string;
            ticketId: string;
            eventId?: undefined;
        };
    }>;
    deleteNotification: (id: string) => Promise<boolean>;
    getTransfers: (query?: any) => Promise<{
        _id: string;
        id: string;
        ticketId: string;
        tokenId: string;
        from: string;
        to: string;
        txHash: string;
        timestamp: string;
        type: string;
    }[]>;
    createTransfer: (data: any) => Promise<any>;
};
//# sourceMappingURL=mockData.d.ts.map