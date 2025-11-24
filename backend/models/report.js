import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { 
      url: { type: String },
      public_id: { type: String }
    }, 
    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
    // ADDED: User reference for authentication
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // ADDED: Donations array
    donations: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      amount: Number,
      message: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    totalDonations: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;