const SummerSession = require("../models/SummerSession");
const { validationResult } = require("express-validator");

// @desc    Create a new summer session
// @route   POST /api/sessions
// @access  Private/Admin
const createSession = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, year, startDate, endDate, status, description } = req.body;

    // Check if session already exists for the year
    const existingSession = await SummerSession.findOne({ year });
    if (existingSession) {
      return res
        .status(400)
        .json({ message: "Session already exists for this year" });
    }

    const session = await SummerSession.create({
      name,
      year,
      startDate,
      endDate,
      status,
      description,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all summer sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = async (req, res) => {
  try {
    const sessions = await SummerSession.find().sort({ year: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single summer session
// @route   GET /api/sessions/:id
// @access  Public
const getSession = async (req, res) => {
  try {
    const session = await SummerSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update summer session
// @route   PUT /api/sessions/:id
// @access  Private/Admin
const updateSession = async (req, res) => {
  try {
    const session = await SummerSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const updatedSession = await SummerSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete summer session
// @route   DELETE /api/sessions/:id
// @access  Private/Admin
const deleteSession = async (req, res) => {
  try {
    const session = await SummerSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await session.deleteOne();
    res.json({ message: "Session removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
};
