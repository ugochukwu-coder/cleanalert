import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/user.js';

async function createAdminUser() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cleanalert.com' });
    
    if (existingAdmin) {
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@cleanalert.com',
      password: 'admin123', // You should change this!
      role: 'admin'
    });

    await adminUser.save();

  } catch (error) {
    // Error will be thrown and caught by the calling environment
  } finally {
    await mongoose.disconnect();
  }
}

// Run the script
createAdminUser();