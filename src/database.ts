import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectToDatabase = async () => {
  try {
    const dbUri = process.env.MONGODB_URI; // Assuming you have this in your .env file
    if (!dbUri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectToDatabase;
