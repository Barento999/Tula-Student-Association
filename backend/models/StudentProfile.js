const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: String,
      required: [true, "Please provide school name"],
      trim: true,
    },
    gradeLevel: {
      type: String,
      required: [true, "Please provide grade level"],
      enum: ["Elementary", "Secondary", "Preparatory"],
    },
    grade: {
      type: String,
      trim: true,
    },
    subjectInterests: {
      type: [String],
      required: [true, "Please provide at least one subject interest"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one subject interest is required",
      },
    },
    guardianName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create unique index for userId and regular index for gradeLevel
studentProfileSchema.index({ userId: 1 }, { unique: true });
studentProfileSchema.index({ gradeLevel: 1 });

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
