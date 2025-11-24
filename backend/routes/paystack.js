import express from "express";
import { auth } from "../middleware/auth.js";
import Report from "../models/report.js";

const router = express.Router();

// Process donation payment
router.post("/donate", auth, async (req, res) => {
  try {
    const { reportId, amount, message } = req.body;

    // Here i will integrate with Paystack API
    // For now, i'll simulate successful payment

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Add donation to report
    report.donations.push({
      userId: req.user.id,
      amount,
      message
    });

    report.totalDonations += amount;
    await report.save();

    res.json({ 
      success: true, 
      message: "Donation successful",
      donation: {
        amount,
        message,
        reportTitle: report.title
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;