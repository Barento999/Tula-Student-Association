const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Validation rules
const sessionValidation = [
  body("name").trim().notEmpty().withMessage("Session name is required"),
  body("year").isInt({ min: 2000 }).withMessage("Valid year is required"),
  body("startDate").isISO8601().withMessage("Valid start date is required"),
  body("endDate").isISO8601().withMessage("Valid end date is required"),
];

router
  .route("/")
  .get(getSessions)
  .post(protect, authorize("admin"), sessionValidation, createSession);

router
  .route("/:id")
  .get(getSession)
  .put(protect, authorize("admin"), updateSession)
  .delete(protect, authorize("admin"), deleteSession);

module.exports = router;
