const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");
const { validationResult } = require("express-validator");

// @desc    Register a new student
// @route   POST /api/students/register
// @access  Public
const registerStudent = async (req, res) => {
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
      school,
      gradeLevel,
      grade,
      subjectInterests,
      guardianName,
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
      role: "student",
    });

    // Create student profile
    const studentProfile = await StudentProfile.create({
      userId: user._id,
      firstName,
      middleName,
      lastName,
      phone,
      gender,
      school,
      gradeLevel,
      grade,
      subjectInterests,
      guardianName,
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
      profile: studentProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudent = async (req, res) => {
  try {
    const student = await StudentProfile.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = async (req, res) => {
  try {
    const student = await StudentProfile.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if user owns this profile or is admin
    if (
      student.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this profile" });
    }

    const updatedStudent = await StudentProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("userId", "name email");

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current student's profile
// @route   GET /api/students/me
// @access  Private (Student)
const getMyProfile = async (req, res) => {
  try {
    const student = await StudentProfile.findOne({
      userId: req.user._id,
    }).populate("userId", "name email");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete student profile
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  try {
    const student = await StudentProfile.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete the student profile
    await StudentProfile.findByIdAndDelete(req.params.id);

    // Optionally delete the associated user account
    await User.findByIdAndDelete(student.userId);

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerStudent,
  getStudents,
  getStudent,
  updateStudent,
  getMyProfile,
  deleteStudent,
};
