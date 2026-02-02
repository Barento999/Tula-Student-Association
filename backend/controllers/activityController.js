const Activity = require("../models/Activity");
const { validationResult } = require("express-validator");

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private/Admin/Volunteer
const createActivity = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      category,
      level,
      subject,
      date,
      duration,
      participants,
      description,
      summerSession,
    } = req.body;

    const activity = await Activity.create({
      title,
      category,
      level,
      subject,
      date,
      duration,
      participants,
      description,
      summerSession,
      createdBy: req.user._id,
    });

    const populatedActivity = await Activity.findById(activity._id)
      .populate("summerSession", "name year")
      .populate("createdBy", "name email");

    res.status(201).json(populatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
const getActivities = async (req, res) => {
  try {
    const { category, level, session } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (session) filter.summerSession = session;

    const activities = await Activity.find(filter)
      .populate("summerSession", "name year")
      .populate("createdBy", "name")
      .sort({ date: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate("summerSession", "name year")
      .populate("createdBy", "name email");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activities by session
// @route   GET /api/activities/session/:sessionId
// @access  Public
const getActivitiesBySession = async (req, res) => {
  try {
    const activities = await Activity.find({
      summerSession: req.params.sessionId,
    })
      .populate("summerSession", "name year")
      .populate("createdBy", "name")
      .sort({ date: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private/Admin
const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    )
      .populate("summerSession", "name year")
      .populate("createdBy", "name");

    res.json(updatedActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private/Admin
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    await activity.deleteOne();
    res.json({ message: "Activity removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  getActivitiesBySession,
  updateActivity,
  deleteActivity,
};
