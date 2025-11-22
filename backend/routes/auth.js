import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: "User with this email or username already exists" 
      });
    }

    // Create user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token - INCLUDE ROLE
    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username,  // Add these
        email: user.email,        // fields
        role: user.role           // ← THIS IS CRITICAL
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token - INCLUDE ROLE
    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username,  // Add these
        email: user.email,        // fields  
        role: user.role           // ← THIS IS CRITICAL
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user - FIX TYPO
router.get("/me", auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role  // ← Fix: was `user.role`, should be `req.user.role`
    }
  });
});


export default router;