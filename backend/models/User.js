import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  balance: {
    type: Number,
    default: 0 // Demo bakiye 0'dan başlayacak
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tradingStats: {
    totalTrades: { type: Number, default: 0 },
    successfulTrades: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 }
  }
});

export default mongoose.model('User', userSchema);