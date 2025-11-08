import express from "express";
import User from "../models/user.js";
import { auth, adminAuth } from "../middleware/auth.js";

const router = express.Router();

// Create admin user (protected - only existing admins can create new admins)
router.post("/create-admin", adminAuth, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email or username already exists" 
      });
    }

    // Create admin user
    const adminUser = new User({
      username,
      email,
      password,
      role: "admin"
    });

    await adminUser.save();

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: adminUser._id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users (admin only)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role (admin only)
router.put("/users/:id/role", adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;