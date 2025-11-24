import Report from "../models/report.js";
import cloudinary from "../config/cloudinary.js";

// Create new report - UPDATED with Cloudinary
export const createReport = async (req, res) => {
  try {
    const { title, location, description } = req.body;

    const report = new Report({
      title,
      location,
      description,
      // Cloudinary provides URL and public_id
      image: req.file ? {
        url: req.file.path,
        public_id: req.file.filename
      } : null,
      createdBy: req.user ? req.user.id : null,
    });

    await report.save();
    
    // Populate user info in response
    await report.populate("createdBy", "username");
    
    res.status(201).json(report);
  } catch (err) {
    // If there was a file uploaded but report creation failed, delete from Cloudinary
    if (req.file && req.file.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cloudinaryErr) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryErr);
      }
    }
    res.status(400).json({ message: err.message });
  }
};

// Get all reports - UPDATED to include user info
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update report status (for admin) - KEPT EXACTLY THE SAME
export const updateStatus = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.status = req.body.status || report.status;
    await report.save();

    res.json({ message: "Status updated", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADDED: Add donation to report
export const addDonation = async (req, res) => {
  try {
    const { amount, message } = req.body;
    
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.donations.push({
      userId: req.user.id,
      amount,
      message
    });

    report.totalDonations += amount;
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete report - UPDATED to delete from Cloudinary
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Delete image from Cloudinary if exists
    if (report.image && report.image.public_id) {
      try {
        await cloudinary.uploader.destroy(report.image.public_id);
        console.log(`Deleted image from Cloudinary: ${report.image.public_id}`);
      } catch (cloudinaryErr) {
        console.error('Error deleting image from Cloudinary:', cloudinaryErr);
        // Continue with report deletion even if image deletion fails
      }
    }

    // Delete the report from database
    await Report.findByIdAndDelete(id);

    res.json({ 
      message: "Report deleted successfully",
      deletedReport: report 
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: error.message });
  }
};