import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectToDatabase = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

export default connectToDatabase;
