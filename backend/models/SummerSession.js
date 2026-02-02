const mongoose = require("mongoose");

const summerSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a session name"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Please provide a year"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide a start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide an end date"],
    },
    status: {
      type: String,
      enum: ["Planned", "Active", "Completed"],
      default: "Planned",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
summerSessionSchema.index({ year: -1 });
summerSessionSchema.index({ status: 1 });

module.exports = mongoose.model("SummerSession", summerSessionSchema);
