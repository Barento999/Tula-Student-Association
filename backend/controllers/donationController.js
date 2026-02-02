const Donation = require("../models/Donation");
const { validationResult } = require("express-validator");

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const donation = await Donation.create(req.body);

    const populatedDonation = await Donation.findById(donation._id).populate(
      "summerSession",
      "name year",
    );

    res.status(201).json(populatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = async (req, res) => {
  try {
    const { type, session } = req.query;
    const filter = {};

    if (type) filter.donationType = type;
    if (session) filter.summerSession = session;

    const donations = await Donation.find(filter)
      .populate("summerSession", "name year")
      .sort({ date: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single donation
// @route   GET /api/donations/:id
// @access  Private/Admin
const getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "summerSession",
      "name year",
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donations by session
// @route   GET /api/donations/session/:sessionId
// @access  Private/Admin
const getDonationsBySession = async (req, res) => {
  try {
    const donations = await Donation.find({
      summerSession: req.params.sessionId,
    })
      .populate("summerSession", "name year")
      .sort({ date: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donation statistics
// @route   GET /api/donations/stats
// @access  Private/Admin
const getDonationStats = async (req, res) => {
  try {
    const { session } = req.query;
    const filter = session ? { summerSession: session } : {};

    const stats = await Donation.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$donationType",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalDonations = await Donation.countDocuments(filter);
    const totalAmount = await Donation.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      stats,
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update donation
// @route   PUT /api/donations/:id
// @access  Private/Admin
const updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("summerSession", "name year");

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private/Admin
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    await donation.deleteOne();
    res.json({ message: "Donation removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonation,
  getDonationsBySession,
  getDonationStats,
  updateDonation,
  deleteDonation,
};
