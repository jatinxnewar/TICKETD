"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mockData_1 = require("../config/mockData");
const router = (0, express_1.Router)();
// GET /api/marketplace - Get marketplace listings
router.get('/', async (req, res, next) => {
    try {
        const { status, eventId } = req.query;
        const listings = await mockData_1.mockDb.getListings({ status: status || 'active', eventId });
        // Populate with event data
        const enrichedListings = await Promise.all(listings.map(async (listing) => {
            const event = await mockData_1.mockDb.getEventById(listing.eventId);
            const ticket = await mockData_1.mockDb.getTicketById(listing.ticketId);
            return { ...listing, event, ticket };
        }));
        res.json({ success: true, listings: enrichedListings });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/marketplace/:id - Get single listing
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await mockData_1.mockDb.getListingById(id);
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }
        const event = await mockData_1.mockDb.getEventById(listing.eventId);
        const ticket = await mockData_1.mockDb.getTicketById(listing.ticketId);
        res.json({ success: true, listing: { ...listing, event, ticket } });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/marketplace - Create listing
router.post('/', async (req, res, next) => {
    try {
        const listingData = req.body;
        const listing = await mockData_1.mockDb.createListing(listingData);
        await mockData_1.mockDb.updateTicket(listingData.ticketId, { status: 'listed' });
        res.status(201).json({ success: true, listing });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/marketplace/:id/purchase - Purchase a listing
router.post('/:id/purchase', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { buyer } = req.body;
        const listing = await mockData_1.mockDb.getListingById(id);
        if (!listing || listing.status !== 'active') {
            return res.status(400).json({ success: false, error: 'Listing not available' });
        }
        // Update listing status
        await mockData_1.mockDb.updateListing(id, { status: 'sold' });
        // Update ticket owner
        await mockData_1.mockDb.updateTicket(listing.ticketId, {
            owner: buyer,
            status: 'active'
        });
        // Create transfer record
        await mockData_1.mockDb.createTransfer({
            ticketId: listing.ticketId,
            tokenId: listing.tokenId,
            from: listing.seller,
            to: buyer,
            txHash: '0x' + Math.random().toString(16).substr(2, 40),
            type: 'resale'
        });
        // Create notification for seller
        await mockData_1.mockDb.createNotification({
            userId: listing.seller,
            type: 'ticket-sale',
            title: 'Ticket Sold!',
            message: `Your ${listing.ticketType} ticket for ${listing.eventTitle} sold for ${listing.price} ETH`
        });
        // Create notification for buyer
        await mockData_1.mockDb.createNotification({
            userId: buyer,
            type: 'purchase',
            title: 'Ticket Purchased',
            message: `You purchased a ${listing.ticketType} ticket for ${listing.eventTitle}`
        });
        res.json({ success: true, message: 'Purchase successful' });
    }
    catch (error) {
        next(error);
    }
});
// DELETE /api/marketplace/:id - Cancel listing
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await mockData_1.mockDb.getListingById(id);
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }
        await mockData_1.mockDb.updateListing(id, { status: 'cancelled' });
        await mockData_1.mockDb.updateTicket(listing.ticketId, { status: 'active' });
        res.json({ success: true, message: 'Listing cancelled' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=marketplace.js.map