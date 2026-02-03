const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerStudent,
  getStudents,
  getStudent,
  updateStudent,
  getMyProfile,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Validation rules
const studentValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("school").trim().notEmpty().withMessage("School is required"),
  body("gradeLevel")
    .isIn(["Elementary", "Secondary", "Preparatory"])
    .withMessage("Valid grade level is required"),
  body("subjectInterests")
    .isArray({ min: 1 })
    .withMessage("At least one subject interest is required"),
];

router.post("/register", studentValidation, registerStudent);
router.get("/me", protect, getMyProfile);
router.get("/", protect, authorize("admin"), getStudents);
router.get("/:id", protect, getStudent);
router.put("/:id", protect, updateStudent);

module.exports = router;
