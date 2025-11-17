import { Router } from 'express';
import Transfer from '../models/Transfer';
import Listing from '../models/Listing';
import Notification from '../models/Notification';

const router = Router();

// POST /api/transfers - Create transfer record
router.post('/', async (req, res, next) => {
  try {
    const { listingId, fromUserId, toUserId, price, transferMethod, metadata } = req.body;

    // Create transfer record
    const transfer = await Transfer.create({
      listingId,
      fromUserId,
      toUserId,
      price,
      transferMethod,
      transferDate: new Date(),
      metadata
    });

    // Update listing owner
    await Listing.findByIdAndUpdate(listingId, { userId: toUserId });

    // Create notifications for both parties
    await Notification.create([
      {
        userId: fromUserId,
        title: 'Ticket Sold',
        message: `Your ticket has been sold for ${price}`,
        metadata: { transferId: transfer._id, type: 'sale' }
      },
      {
        userId: toUserId,
        title: 'Ticket Purchased',
        message: `You have successfully purchased a ticket`,
        metadata: { transferId: transfer._id, type: 'purchase' }
      }
    ]);

    res.status(201).json(transfer);
  } catch (error) {
    next(error);
  }
});

export default router;
