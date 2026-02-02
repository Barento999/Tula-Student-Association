const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createDonation,
  getDonations,
  getDonation,
  getDonationsBySession,
  getDonationStats,
  updateDonation,
  deleteDonation,
} = require("../controllers/donationController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Validation rules
const donationValidation = [
  body("donorName").trim().notEmpty().withMessage("Donor name is required"),
  body("donationType")
    .isIn(["Money", "Books", "Materials", "Supplies", "Other"])
    .withMessage("Valid donation type is required"),
  body("amount").isFloat({ min: 0 }).withMessage("Valid amount is required"),
];

router.post("/", donationValidation, createDonation);
router.get("/", protect, authorize("admin"), getDonations);
router.get("/stats", protect, authorize("admin"), getDonationStats);
router.get(
  "/session/:sessionId",
  protect,
  authorize("admin"),
  getDonationsBySession,
);
router.get("/:id", protect, authorize("admin"), getDonation);
router.put("/:id", protect, authorize("admin"), updateDonation);
router.delete("/:id", protect, authorize("admin"), deleteDonation);

module.exports = router;
