import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TradingBot',
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true
  },
  entryPrice: {
    type: Number,
    required: true
  },
  exitPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'CLOSED'],
    default: 'OPEN'
  },
  profit: {
    type: Number,
    default: 0
  },
  stopLoss: {
    type: Number,
    required: true
  },
  takeProfit: {
    type: Number,
    required: true
  },
  openedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
tradeSchema.index({ userId: 1, status: 1 });
tradeSchema.index({ botId: 1, status: 1 });
tradeSchema.index({ symbol: 1, status: 1 });

export default mongoose.model('Trade', tradeSchema);