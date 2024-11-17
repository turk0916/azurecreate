import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import transactionRoutes from './routes/transactions.js';
import botRoutes from './routes/bots.js';
import { verifyToken, isAdmin } from './middleware/auth.js';

dotenv.config();

// MongoDB bağlantısı
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://zippy-fudge-c2e7d7.netlify.app',
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', verifyToken, isAdmin, adminRoutes);
app.use('/api/transactions', verifyToken, transactionRoutes);
app.use('/api/bots', verifyToken, botRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});