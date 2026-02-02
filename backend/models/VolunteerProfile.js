const mongoose = require("mongoose");

const volunteerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    university: {
      type: String,
      required: [true, "Please provide university name"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Please provide department"],
      trim: true,
    },
    subjects: {
      type: [String],
      required: [true, "Please provide at least one subject"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one subject is required",
      },
    },
    availability: {
      type: String,
      trim: true,
    },
    preferredLevel: {
      type: String,
      enum: ["Elementary", "Secondary", "Preparatory", "Any"],
      default: "Any",
    },
    summerSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SummerSession",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create unique index for userId and regular index for summerSession
volunteerProfileSchema.index({ userId: 1 }, { unique: true });
volunteerProfileSchema.index({ summerSession: 1 });

module.exports = mongoose.model("VolunteerProfile", volunteerProfileSchema);
