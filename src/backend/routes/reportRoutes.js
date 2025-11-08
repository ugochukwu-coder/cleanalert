import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import {
  createReport,
  getReports,
  updateStatus,
  addDonation,
} from "../controllers/reportController.js";
import { auth, adminAuth } from "../middleware/auth.js"; // FIXED: Changed from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer setup - use absolute path (KEPT EXACTLY THE SAME)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadsDir = path.join(__dirname, '../uploads');
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Public routes
router.get("/", getReports); // Anyone can view reports

// Protected routes - require authentication
router.post("/", auth, upload.single("image"), (req, res, next) => {
  console.log("=== POST /api/reports REQUEST RECEIVED ===");
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);
  console.log("User:", req.user?.username);
  console.log("===========================================");
  next();
}, createReport);

// ADDED: Donation route (requires auth)
router.post("/:id/donate", auth, addDonation);

// Admin routes
router.put("/:id/status", adminAuth, updateStatus);

export default router;