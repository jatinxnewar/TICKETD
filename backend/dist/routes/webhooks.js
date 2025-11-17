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
// POST /api/webhook/transfer - Handle ownership transfer webhook
router.post('/transfer', async (req, res, next) => {
    try {
        const { listingId, fromUserId, toUserId, price, transferMethod, metadata } = req.body;
        // Validate required fields
        if (!listingId || !fromUserId || !toUserId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Create transfer record
        const transfer = await Transfer_1.default.create({
            listingId,
            fromUserId,
            toUserId,
            price: price || 0,
            transferMethod: transferMethod || 'blockchain',
            transferDate: new Date(),
            metadata: metadata || {}
        });
        // Update listing ownership
        await Listing_1.default.findByIdAndUpdate(listingId, {
            userId: toUserId,
            status: 'sold'
        });
        // Create notifications
        await Notification_1.default.create([
            {
                userId: fromUserId,
                title: 'OWNERSHIP TRANSFERRED',
                message: `Your ticket has been transferred to another user`,
                metadata: {
                    transferId: transfer._id,
                    type: 'transfer_out',
                    ...metadata
                }
            },
            {
                userId: toUserId,
                title: 'OWNERSHIP RECEIVED',
                message: `You have received a ticket`,
                metadata: {
                    transferId: transfer._id,
                    type: 'transfer_in',
                    ...metadata
                }
            }
        ]);
        res.status(201).json({
            success: true,
            transfer,
            message: 'Transfer processed successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/webhook/notify - Generic notification webhook
router.post('/notify', async (req, res, next) => {
    try {
        const { userId, title, message, metadata } = req.body;
        if (!userId || !title || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const notification = await Notification_1.default.create({
            userId,
            title,
            message,
            metadata: metadata || {}
        });
        res.status(201).json({
            success: true,
            notification
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=webhooks.js.map