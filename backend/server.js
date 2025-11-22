import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/auth.js";
import paystackRoutes from "./routes/paystack.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// JWT Secret check - CRITICAL
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(' Uploads directory created');
}

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

// Serve static uploads
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paystackRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("CleanAlert backend running..."));

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});