const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createActivity,
  getActivities,
  getActivity,
  getActivitiesBySession,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// Validation rules
const activityValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category")
    .isIn(["Teaching", "Donation", "Community", "Workshop", "Event"])
    .withMessage("Valid category is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("summerSession").notEmpty().withMessage("Summer session is required"),
];

router
  .route("/")
  .get(getActivities)
  .post(
    protect,
    authorize("admin", "volunteer"),
    activityValidation,
    createActivity,
  );

router.get("/session/:sessionId", getActivitiesBySession);

router
  .route("/:id")
  .get(getActivity)
  .put(protect, authorize("admin"), updateActivity)
  .delete(protect, authorize("admin"), deleteActivity);

module.exports = router;
