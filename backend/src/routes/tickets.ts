import { Router } from 'express';
import { mockDb } from '../config/mockData';

const router = Router();

// GET /api/tickets - Get tickets
router.get('/', async (req, res, next) => {
  try {
    const { owner, eventId, status } = req.query;
    const tickets = await mockDb.getTickets({ owner, eventId, status });
    res.json({ success: true, tickets });
  } catch (error) {
    next(error);
  }
});

// GET /api/tickets/:id - Get single ticket
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await mockDb.getTicketById(id);
    
    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }
    
    res.json({ success: true, ticket });
  } catch (error) {
    next(error);
  }
});

// POST /api/tickets - Purchase ticket
router.post('/', async (req, res, next) => {
  try {
    const ticketData = req.body;
    const ticket = await mockDb.createTicket(ticketData);
    
    // Create notification
    await mockDb.createNotification({
      userId: ticketData.owner,
      type: 'purchase',
      title: 'Ticket Purchased',
      message: `You successfully purchased a ticket`,
      metadata: { eventId: ticketData.eventId, ticketId: ticket.id }
    });
    
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    next(error);
  }
});

export default router;
