import express from 'express';
import Trade from '../models/Trade.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's trades
router.get('/', verifyToken, async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('botId', 'name strategy');
    
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trade statistics
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const stats = await Trade.aggregate([
      { $match: { userId: req.userId } },
      { $group: {
        _id: null,
        totalTrades: { $sum: 1 },
        totalProfit: { $sum: '$profit' },
        avgProfit: { $avg: '$profit' },
        winningTrades: {
          $sum: { $cond: [{ $gt: ['$profit', 0] }, 1, 0] }
        }
      }}
    ]);

    res.json(stats[0] || {
      totalTrades: 0,
      totalProfit: 0,
      avgProfit: 0,
      winningTrades: 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trade history by bot
router.get('/bot/:botId', verifyToken, async (req, res) => {
  try {
    const trades = await Trade.find({
      userId: req.userId,
      botId: req.params.botId
    }).sort({ createdAt: -1 });
    
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;