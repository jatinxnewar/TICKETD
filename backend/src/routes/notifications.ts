import { Router } from 'express';
import Notification from '../models/Notification';

const router = Router();

// GET /api/notifications - Get user notifications
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

// GET /api/notifications/:id - Get single notification
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
    next(error);
  }
});

// PUT /api/notifications/:id - Mark notification as read
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
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

    await Notification.findByIdAndDelete(id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
