const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerVolunteer,
  getVolunteers,
  getVolunteer,
  updateVolunteer,
  approveVolunteer,
} = require("../controllers/volunteerController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Validation rules
const volunteerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("university").trim().notEmpty().withMessage("University is required"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("subjects")
    .isArray({ min: 1 })
    .withMessage("At least one subject is required"),
];

router.post("/register", volunteerValidation, registerVolunteer);
router.get("/", protect, authorize("admin"), getVolunteers);
router.get("/:id", protect, getVolunteer);
router.put("/:id", protect, updateVolunteer);
router.put("/:id/approve", protect, authorize("admin"), approveVolunteer);

module.exports = router;
