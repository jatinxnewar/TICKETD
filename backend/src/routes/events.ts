import { Router } from 'express';
import { mockDb } from '../config/mockData';

const router = Router();

// GET /api/events - Get all events
router.get('/', async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const events = await mockDb.getEvents({ status, category });
    res.json({ success: true, events });
  } catch (error) {
    next(error);
  }
});

// GET /api/events/:id - Get single event
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await mockDb.getEventById(id);
    
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
});

// POST /api/events - Create new event
router.post('/', async (req, res, next) => {
  try {
    const eventData = req.body;
    const event = await mockDb.createEvent(eventData);
    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
});

export default router;
