const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide material title"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Please provide subject"],
      trim: true,
    },
    level: {
      type: String,
      required: [true, "Please provide level"],
      enum: ["Elementary", "Secondary", "Preparatory"],
    },
    grade: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    fileType: {
      type: String,
      enum: ["PDF", "DOC", "PPT", "Image"],
    },
    fileSize: {
      type: Number, // Size in bytes
    },
    description: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summerSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SummerSession",
      required: true,
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
materialSchema.index({ level: 1 });
materialSchema.index({ subject: 1 });
materialSchema.index({ summerSession: 1 });

module.exports = mongoose.model("Material", materialSchema);
