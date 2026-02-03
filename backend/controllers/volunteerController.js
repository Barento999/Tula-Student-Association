const User = require("../models/User");
const VolunteerProfile = require("../models/VolunteerProfile");
const { validationResult } = require("express-validator");

// @desc    Register a new volunteer
// @route   POST /api/volunteers/register
// @access  Public
const registerVolunteer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      firstName,
      middleName,
      lastName,
      phone,
      gender,
      university,
      department,
      subjects,
      availability,
      preferredLevel,
      summerSession,
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: "volunteer",
    });

    // Create volunteer profile
    const volunteerProfile = await VolunteerProfile.create({
      userId: user._id,
      firstName,
      middleName,
      lastName,
      phone,
      gender,
      university,
      department,
      subjects,
      availability,
      preferredLevel,
      summerSession,
    });

    // Generate token
    const generateToken = require("../utils/generateToken");
    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
      profile: volunteerProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Private/Admin
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await VolunteerProfile.find()
      .populate("userId", "name email")
      .populate("summerSession", "name year")
      .sort({ createdAt: -1 });

    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single volunteer
// @route   GET /api/volunteers/:id
// @access  Private
const getVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerProfile.findById(req.params.id)
      .populate("userId", "name email")
      .populate("summerSession", "name year");

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update volunteer profile
// @route   PUT /api/volunteers/:id
// @access  Private
const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerProfile.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Check if user owns this profile or is admin
    if (
      volunteer.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this profile" });
    }

    const updatedVolunteer = await VolunteerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("userId", "name email");

    res.json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve volunteer
// @route   PUT /api/volunteers/:id/approve
// @access  Private/Admin
const approveVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerProfile.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    volunteer.isApproved = true;
    await volunteer.save();

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current volunteer's profile
// @route   GET /api/volunteers/me
// @access  Private (Volunteer)
const getMyProfile = async (req, res) => {
  try {
    const volunteer = await VolunteerProfile.findOne({
      userId: req.user._id,
    }).populate("userId", "name email");

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer profile not found" });
    }

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete volunteer profile
// @route   DELETE /api/volunteers/:id
// @access  Private/Admin
const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await VolunteerProfile.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Delete the volunteer profile
    await VolunteerProfile.findByIdAndDelete(req.params.id);

    // Optionally delete the associated user account
    await User.findByIdAndDelete(volunteer.userId);

    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerVolunteer,
  getVolunteers,
  getVolunteer,
  updateVolunteer,
  approveVolunteer,
  getMyProfile,
  deleteVolunteer,
};
