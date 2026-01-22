"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mockData_1 = require("../config/mockData");
const router = (0, express_1.Router)();
// GET /api/tickets - Get tickets
router.get('/', async (req, res, next) => {
    try {
        const { owner, eventId, status } = req.query;
        const tickets = await mockData_1.mockDb.getTickets({ owner, eventId, status });
        // Enrich with event data
        const enrichedTickets = await Promise.all(tickets.map(async (ticket) => {
            const event = await mockData_1.mockDb.getEventById(ticket.eventId);
            return { ...ticket, event };
        }));
        res.json({ success: true, tickets: enrichedTickets });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/tickets/:id - Get single ticket
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await mockData_1.mockDb.getTicketById(id);
        if (!ticket) {
            return res.status(404).json({ success: false, error: 'Ticket not found' });
        }
        const event = await mockData_1.mockDb.getEventById(ticket.eventId);
        res.json({ success: true, ticket: { ...ticket, event } });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/tickets - Purchase ticket
router.post('/', async (req, res, next) => {
    try {
        const { eventId, owner, ticketType, price } = req.body;
        const event = await mockData_1.mockDb.getEventById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        // Generate tokenId
        const tokenId = String(1000 + Math.floor(Math.random() * 9000));
        const txHash = '0x' + Math.random().toString(16).substr(2, 40);
        const ticket = await mockData_1.mockDb.createTicket({
            eventId,
            owner,
            ticketType,
            price,
            tokenId,
            transactionHash: txHash
        });
        // Create transfer record
        await mockData_1.mockDb.createTransfer({
            ticketId: ticket.id,
            tokenId,
            from: '0x0000000000000000000000000000000000000000',
            to: owner,
            txHash,
            type: 'purchase'
        });
        // Create notification
        await mockData_1.mockDb.createNotification({
            userId: owner,
            type: 'purchase',
            title: 'Ticket Purchased Successfully',
            message: `You successfully purchased a ${ticketType} ticket for ${event.title || event.name}`,
            metadata: { eventId, ticketId: ticket.id }
        });
        res.status(201).json({ success: true, ticket: { ...ticket, event } });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/tickets/:id/validate - Validate ticket
router.post('/:id/validate', async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await mockData_1.mockDb.getTicketById(id);
        if (!ticket) {
            return res.status(404).json({ success: false, error: 'Ticket not found' });
        }
        if (ticket.used) {
            return res.status(400).json({ success: false, error: 'Ticket already used' });
        }
        await mockData_1.mockDb.updateTicket(id, { used: true, status: 'used' });
        res.json({ success: true, message: 'Ticket validated successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=tickets.js.map