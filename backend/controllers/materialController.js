const Material = require("../models/Material");
const { cloudinary } = require("../config/cloudinary");
const { validationResult } = require("express-validator");

// @desc    Upload a new material
// @route   POST /api/materials/upload
// @access  Private/Admin/Volunteer
const uploadMaterial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const {
      title,
      subject,
      level,
      grade,
      fileType,
      description,
      summerSession,
    } = req.body;

    const material = await Material.create({
      title,
      subject,
      level,
      grade,
      fileUrl: req.file.path,
      publicId: req.file.filename,
      fileType,
      fileSize: req.file.size, // Store file size in bytes
      description,
      uploadedBy: req.user._id,
      summerSession,
    });

    const populatedMaterial = await Material.findById(material._id)
      .populate("uploadedBy", "name email")
      .populate("summerSession", "name year");

    res.status(201).json(populatedMaterial);
  } catch (error) {
    // Delete uploaded file if material creation fails
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all materials
// @route   GET /api/materials
// @access  Public
const getMaterials = async (req, res) => {
  try {
    const { level, subject, session } = req.query;
    const filter = {};

    if (level) filter.level = level;
    if (subject) filter.subject = subject;
    if (session) filter.summerSession = session;

    const materials = await Material.find(filter)
      .populate("uploadedBy", "name")
      .populate("summerSession", "name year")
      .sort({ createdAt: -1 });

    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single material
// @route   GET /api/materials/:id
// @access  Public
const getMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate("uploadedBy", "name email")
      .populate("summerSession", "name year");

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get materials by level
// @route   GET /api/materials/level/:level
// @access  Public
const getMaterialsByLevel = async (req, res) => {
  try {
    const materials = await Material.find({ level: req.params.level })
      .populate("uploadedBy", "name")
      .populate("summerSession", "name year")
      .sort({ createdAt: -1 });

    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Increment download count
// @route   PUT /api/materials/:id/download
// @access  Public
const incrementDownload = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    material.downloads += 1;
    await material.save();

    res.json({
      message: "Download count updated",
      downloads: material.downloads,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update material
// @route   PUT /api/materials/:id
// @access  Private/Admin/Volunteer
const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    const {
      title,
      subject,
      level,
      grade,
      fileType,
      description,
      summerSession,
    } = req.body;

    // Update fields
    material.title = title || material.title;
    material.subject = subject || material.subject;
    material.level = level || material.level;
    material.grade = grade || material.grade;
    material.fileType = fileType || material.fileType;
    material.description = description || material.description;
    material.summerSession = summerSession || material.summerSession;

    // If new file is uploaded, delete old one and update
    if (req.file) {
      // Delete old file from Cloudinary
      await cloudinary.uploader.destroy(material.publicId);
      // Update with new file
      material.fileUrl = req.file.path;
      material.publicId = req.file.filename;
      material.fileSize = req.file.size; // Update file size
    }

    await material.save();

    const updatedMaterial = await Material.findById(material._id)
      .populate("uploadedBy", "name email")
      .populate("summerSession", "name year");

    res.json(updatedMaterial);
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete material
// @route   DELETE /api/materials/:id
// @access  Private/Admin
const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(material.publicId);

    // Delete material from database
    await material.deleteOne();

    res.json({ message: "Material removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadMaterial,
  getMaterials,
  getMaterial,
  getMaterialsByLevel,
  incrementDownload,
  updateMaterial,
  deleteMaterial,
};
