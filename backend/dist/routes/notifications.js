"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notification_1 = __importDefault(require("../models/Notification"));
const router = (0, express_1.Router)();
// GET /api/notifications - Get user notifications
router.get('/', async (req, res, next) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }
        const notifications = await Notification_1.default.find({ userId }).sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (error) {
        next(error);
    }
});
// GET /api/notifications/:id - Get single notification
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification_1.default.findById(id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
// PUT /api/notifications/:id - Mark notification as read
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const notification = await Notification_1.default.findByIdAndUpdate(id, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        res.json(notification);
    }
    catch (error) {
        next(error);
    }
});
// DELETE /api/notifications - Delete notification
router.delete('/', async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: 'id is required' });
        }
        await Notification_1.default.findByIdAndDelete(id);
        res.json({ message: 'Notification deleted' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=notifications.js.map