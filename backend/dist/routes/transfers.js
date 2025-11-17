"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Transfer_1 = __importDefault(require("../models/Transfer"));
const Listing_1 = __importDefault(require("../models/Listing"));
const Notification_1 = __importDefault(require("../models/Notification"));
const router = (0, express_1.Router)();
// POST /api/transfers - Create transfer record
router.post('/', async (req, res, next) => {
    try {
        const { listingId, fromUserId, toUserId, price, transferMethod, metadata } = req.body;
        // Create transfer record
        const transfer = await Transfer_1.default.create({
            listingId,
            fromUserId,
            toUserId,
            price,
            transferMethod,
            transferDate: new Date(),
            metadata
        });
        // Update listing owner
        await Listing_1.default.findByIdAndUpdate(listingId, { userId: toUserId });
        // Create notifications for both parties
        await Notification_1.default.create([
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
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=transfers.js.map