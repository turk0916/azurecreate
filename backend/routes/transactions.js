import express from 'express';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Para yatırma talebi oluştur
router.post('/deposit', verifyToken, async (req, res) => {
  try {
    const { amount, method, details } = req.body;
    
    const transaction = new Transaction({
      userId: req.userId,
      type: 'deposit',
      amount,
      method,
      details
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Para çekme talebi oluştur
router.post('/withdraw', verifyToken, async (req, res) => {
  try {
    const { amount, method, details } = req.body;
    
    const user = await User.findById(req.userId);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Yetersiz bakiye' });
    }

    const transaction = new Transaction({
      userId: req.userId,
      type: 'withdraw',
      amount,
      method,
      details
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kullanıcının işlem geçmişini getir
router.get('/history', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;