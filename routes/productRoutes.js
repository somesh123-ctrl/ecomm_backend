// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("../config/uploadConfig");
const cloudinary = require("../config/cloudinaryConfig");
const adminMiddleware = require("../middlewares/adminMiddleware");
const ProductModel = require("../Model/Product_Model");

// Route to add a new product with image
router.post("/add", adminMiddleware, multer.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new product with the image URL
    const newProduct = new ProductModel({
      ...req.body,
      image: result.secure_url,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
