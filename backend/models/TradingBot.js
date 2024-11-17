import mongoose from 'mongoose';

const tradingBotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  strategy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    default: 'inactive'
  },
  config: {
    initialCapital: Number,
    maxRiskPerTrade: Number,
    tradingPair: String,
    stopLoss: Number,
    takeProfit: Number,
    maxPositions: Number
  },
  performance: {
    totalTrades: { type: Number, default: 0 },
    successfulTrades: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TradingBot', tradingBotSchema);