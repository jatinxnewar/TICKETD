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
        res.json({ success: true, tickets });
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
        res.json({ success: true, ticket });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/tickets - Purchase ticket
router.post('/', async (req, res, next) => {
    try {
        const ticketData = req.body;
        const ticket = await mockData_1.mockDb.createTicket(ticketData);
        // Create notification
        await mockData_1.mockDb.createNotification({
            userId: ticketData.owner,
            type: 'purchase',
            title: 'Ticket Purchased',
            message: `You successfully purchased a ticket`,
            metadata: { eventId: ticketData.eventId, ticketId: ticket.id }
        });
        res.status(201).json({ success: true, ticket });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=tickets.js.map