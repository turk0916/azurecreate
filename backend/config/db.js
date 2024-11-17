import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 2000,
      retryWrites: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      connectTimeoutMS: 30000
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB bağlantı hatası: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB bağlantısı kesildi. Yeniden bağlanılıyor...');
      setTimeout(connectDB, 5000);
    });

  } catch (error) {
    console.error(`MongoDB Bağlantı Hatası: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;