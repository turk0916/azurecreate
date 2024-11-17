import express from 'express';
import TradingBot from '../models/TradingBot.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Yeni bot oluştur
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, strategy, config } = req.body;
    
    const bot = new TradingBot({
      userId: req.userId,
      name,
      strategy,
      config
    });

    await bot.save();
    res.status(201).json(bot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kullanıcının botlarını getir
router.get('/', verifyToken, async (req, res) => {
  try {
    const bots = await TradingBot.find({ userId: req.userId });
    res.json(bots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bot durumunu güncelle
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const bot = await TradingBot.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status },
      { new: true }
    );
    
    if (!bot) {
      return res.status(404).json({ message: 'Bot bulunamadı' });
    }
    
    res.json(bot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bot performansını güncelle
router.patch('/:id/performance', verifyToken, async (req, res) => {
  try {
    const { performance } = req.body;
    const bot = await TradingBot.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { performance },
      { new: true }
    );
    
    if (!bot) {
      return res.status(404).json({ message: 'Bot bulunamadı' });
    }
    
    res.json(bot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;