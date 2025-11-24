import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import {
  createReport,
  getReports,
  updateStatus,
  addDonation,
  deleteReport
} from "../controllers/reportController.js";
import { auth, adminAuth } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Multer setup
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
router.get("/", getReports); 

// Protected routes - require authentication
router.post("/", auth, upload.single("image"), createReport);

// Donation route (requires auth)
router.post("/:id/donate", auth, addDonation);

// Admin routes
router.put("/:id/status", adminAuth, updateStatus);

// Delete route
router.delete("/:id", adminAuth, deleteReport);

export default router;




// import express from "express";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import {
//   createReport,
//   getReports,
//   updateStatus,
//   addDonation,
//   deleteReport
// } from "../controllers/reportController.js";
// import { auth, adminAuth } from "../middleware/auth.js";

// const router = express.Router();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "cleanalert",
//     allowed_formats: ["jpg", "jpeg", "png"]
//   }
// });

// const upload = multer({ storage });

// // Public routes
// router.get("/", getReports); // Anyone can view reports

// // Protected routes - require authentication
// router.post("/", auth, upload.single("image"), createReport);

// // Donation route (requires auth)
// router.post("/:id/donate", auth, addDonation);

// // Admin routes
// router.put("/:id/status", adminAuth, updateStatus);

// // Delete route
// router.delete("/:id", adminAuth, deleteReport);

// export default router;



// CLOUD_NAME=your_cloud_name
// CLOUD_API_KEY=your_api_key
// CLOUD_API_SECRET=your_api_secret
