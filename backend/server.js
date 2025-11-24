import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/auth.js";
import paystackRoutes from "./routes/paystack.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();


// Debug: List all loaded environment variables
console.log('📋 Loaded environment variables:');
console.log('- MONGO_URI:', process.env.MONGO_URI ? '✅ Loaded' : '❌ Missing');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Missing');
console.log('- CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing');
console.log('- CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : '❌ Missing');
console.log('- CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : '❌ Missing');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// JWT Secret check - CRITICAL
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

// Cloudinary config check
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error(" Cloudinary environment variables are missing");
  process.exit(1);
}

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL]
    : [
        'http://localhost:3000',
        'http://192.168.173.160:3000',
        'http://127.0.0.1:3000'
      ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Remove the local uploads directory setup and static serving
// app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paystackRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("CleanAlert backend running..."));

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});