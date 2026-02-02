const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide activity title"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please provide activity category"],
      enum: ["Teaching", "Donation", "Community", "Workshop", "Event"],
    },
    level: {
      type: String,
      enum: ["Elementary", "Secondary", "Preparatory", "All"],
    },
    subject: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Please provide activity date"],
    },
    duration: {
      type: Number,
      comment: "Duration in hours",
    },
    participants: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    summerSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SummerSession",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
activitySchema.index({ summerSession: 1 });
activitySchema.index({ category: 1 });
activitySchema.index({ date: -1 });

module.exports = mongoose.model("Activity", activitySchema);
