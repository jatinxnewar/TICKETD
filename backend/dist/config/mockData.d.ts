export declare const mockStore: {
    events: {
        _id: string;
        id: string;
        name: string;
        description: string;
        date: Date;
        venue: string;
        organizer: string;
        ticketTypes: {
            id: string;
            name: string;
            price: string;
            available: number;
            total: number;
        }[];
        category: string;
        image: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    tickets: {
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: Date;
        status: string;
        used: boolean;
        qrCode: string;
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
        listingDate: Date;
        expiryDate: Date;
    }[];
    notifications: ({
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId: string;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId?: undefined;
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
        timestamp: Date;
        type: string;
    }[];
};
export declare const mockDb: {
    getEvents: (query?: any) => Promise<{
        _id: string;
        id: string;
        name: string;
        description: string;
        date: Date;
        venue: string;
        organizer: string;
        ticketTypes: {
            id: string;
            name: string;
            price: string;
            available: number;
            total: number;
        }[];
        category: string;
        image: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getEventById: (id: string) => Promise<{
        _id: string;
        id: string;
        name: string;
        description: string;
        date: Date;
        venue: string;
        organizer: string;
        ticketTypes: {
            id: string;
            name: string;
            price: string;
            available: number;
            total: number;
        }[];
        category: string;
        image: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    createEvent: (data: any) => Promise<any>;
    updateEvent: (id: string, data: any) => Promise<{
        _id: string;
        id: string;
        name: string;
        description: string;
        date: Date;
        venue: string;
        organizer: string;
        ticketTypes: {
            id: string;
            name: string;
            price: string;
            available: number;
            total: number;
        }[];
        category: string;
        image: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }> | Promise<null>;
    getTickets: (query?: any) => Promise<{
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: Date;
        status: string;
        used: boolean;
        qrCode: string;
    }[]>;
    getTicketById: (id: string) => Promise<{
        _id: string;
        id: string;
        eventId: string;
        tokenId: string;
        owner: string;
        ticketType: string;
        price: string;
        purchaseDate: Date;
        status: string;
        used: boolean;
        qrCode: string;
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
        purchaseDate: Date;
        status: string;
        used: boolean;
        qrCode: string;
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
        listingDate: Date;
        expiryDate: Date;
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
        listingDate: Date;
        expiryDate: Date;
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
        listingDate: Date;
        expiryDate: Date;
    }>;
    getNotifications: (query?: any) => Promise<({
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId: string;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId?: undefined;
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
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId: string;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId?: undefined;
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
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId: string;
        };
    } | {
        _id: string;
        id: string;
        userId: string;
        type: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
        metadata: {
            eventId: string;
            ticketId?: undefined;
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
        timestamp: Date;
        type: string;
    }[]>;
    createTransfer: (data: any) => Promise<any>;
};
//# sourceMappingURL=mockData.d.ts.map