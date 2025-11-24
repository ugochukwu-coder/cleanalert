import Report from "../models/report.js";

// Create new report - UPDATED with user authentication
export const createReport = async (req, res) => {
  try {
    const { title, location, description } = req.body;

    const report = new Report({
      title,
      location,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : "", 
      // ADDED: Link report to user
      createdBy: req.user ? req.user.id : null,
    });

    await report.save();
    
    // Populate user info in response
    await report.populate("createdBy", "username");
    
    res.status(201).json(report);
  } catch (err) {
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

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ 
      message: "Report deleted successfully",
      deletedReport: report 
    });
  } catch (error) {
    console.error(" Error deleting report:", error);
    res.status(500).json({ message: error.message });
  }
};