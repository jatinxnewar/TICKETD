import { Router } from 'express';
import { mockDb } from '../config/mockData';

const router = Router();

// GET /api/marketplace - Get marketplace listings
router.get('/', async (req, res, next) => {
  try {
    const { status, eventId } = req.query;
    const listings = await mockDb.getListings({ status, eventId });
    
    // Populate with event data
    const enrichedListings = await Promise.all(
      listings.map(async (listing) => {
        const event = await mockDb.getEventById(listing.eventId);
        return { ...listing, event };
      })
    );
    
    res.json({ success: true, listings: enrichedListings });
  } catch (error) {
    next(error);
  }
});

// POST /api/marketplace - Create listing
router.post('/', async (req, res, next) => {
  try {
    const listingData = req.body;
    const listing = await mockDb.createListing(listingData);
    await mockDb.updateTicket(listingData.ticketId, { status: 'listed' });
    res.status(201).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
});

export default router;
