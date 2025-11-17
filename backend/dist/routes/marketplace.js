"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mockData_1 = require("../config/mockData");
const router = (0, express_1.Router)();
// GET /api/marketplace - Get marketplace listings
router.get('/', async (req, res, next) => {
    try {
        const { status, eventId } = req.query;
        const listings = await mockData_1.mockDb.getListings({ status, eventId });
        // Populate with event data
        const enrichedListings = await Promise.all(listings.map(async (listing) => {
            const event = await mockData_1.mockDb.getEventById(listing.eventId);
            return { ...listing, event };
        }));
        res.json({ success: true, listings: enrichedListings });
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
exports.default = router;
//# sourceMappingURL=marketplace.js.map