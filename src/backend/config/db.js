// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('🔄 Attempting MongoDB connection...');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in environment variables');
    }

    // Check connection type
    if (process.env.MONGO_URI.startsWith('mongodb+srv://')) {
      console.log('⚠️ Using SRV connection - switch to direct connection if this fails');
    } else {
      console.log('✅ Using direct connection');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    console.log('\n🚀 IMMEDIATE FIX REQUIRED:');
    console.log('1. Go to MongoDB Atlas → Connect → Drivers');
    console.log('2. Select Node.js → 2.2.12 or later');
    console.log('3. Copy the DIRECT connection string (starts with mongodb://)');
    console.log('4. Replace MONGO_URI in your .env file');
    console.log('5. Restart the server');
    process.exit(1);
  }
};

export default connectDB;