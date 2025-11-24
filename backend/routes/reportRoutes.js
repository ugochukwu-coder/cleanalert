import express from "express";
import {
  createReport,
  getReports,
  updateStatus,
  addDonation,
  deleteReport
} from "../controllers/reportController.js";
import { auth, adminAuth } from "../middleware/auth.js";
import upload from "../middleware/upload.js"; // Import the new Cloudinary upload middleware

const router = express.Router();

// Public routes
router.get("/", getReports); 

// Protected routes - require authentication
router.post("/", auth, upload.single("image"), createReport); // Uses Cloudinary now

// Donation route (requires auth)
router.post("/:id/donate", auth, addDonation);

// Admin routes
router.put("/:id/status", adminAuth, updateStatus);

// Delete route
router.delete("/:id", adminAuth, deleteReport);

export default router;