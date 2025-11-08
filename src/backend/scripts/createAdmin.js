import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/user.js';

async function createAdminUser() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cleanalert.com' });
    
    if (existingAdmin) {
      console.log(' Admin user already exists:', existingAdmin.email);
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
    console.log(' Admin user created successfully!');
    console.log('Email: admin@cleanalert.com');
    console.log('Password: admin123');
    console.log(' Please change the password after first login!');

  } catch (error) {
    console.error(' Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log(' Database connection closed');
  }
}

// Run the script
createAdminUser();