const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: [true, "Please provide donor name"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    donationType: {
      type: String,
      required: [true, "Please provide donation type"],
      enum: ["Money", "Books", "Materials", "Supplies", "Other"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
      min: 0,
    },
    purpose: {
      type: String,
      enum: [
        "General Support",
        "Learning Materials",
        "School Supplies",
        "Scholarships",
        "Infrastructure",
      ],
      default: "General Support",
    },
    description: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    summerSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SummerSession",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
donationSchema.index({ summerSession: 1 });
donationSchema.index({ date: -1 });
donationSchema.index({ donationType: 1 });

module.exports = mongoose.model("Donation", donationSchema);
