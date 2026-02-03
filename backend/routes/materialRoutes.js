const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  uploadMaterial,
  getMaterials,
  getMaterial,
  getMaterialsByLevel,
  incrementDownload,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Validation rules
const materialValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("level")
    .isIn(["Elementary", "Secondary", "Preparatory"])
    .withMessage("Valid level is required"),
  body("summerSession").notEmpty().withMessage("Summer session is required"),
];

router.post(
  "/upload",
  protect,
  authorize("admin", "volunteer"),
  upload.single("file"),
  materialValidation,
  uploadMaterial,
);
router.get("/", getMaterials);
router.get("/level/:level", getMaterialsByLevel);
router.get("/:id", getMaterial);
router.put(
  "/:id",
  protect,
  authorize("admin", "volunteer"),
  upload.single("file"),
  updateMaterial,
);
router.put("/:id/download", incrementDownload);
router.delete("/:id", protect, authorize("admin"), deleteMaterial);

module.exports = router;
