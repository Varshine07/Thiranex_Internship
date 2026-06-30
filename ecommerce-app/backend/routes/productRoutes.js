const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const adminCheck = require("../middleware/adminMiddleware"); // ✅ only this
const upload = require("../middleware/upload");

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  protect,
  adminCheck,
  upload.single("image"),
  createProduct
);

// Admin Routes
router.post("/", protect, adminCheck, createProduct);
router.put("/:id", protect, adminCheck, updateProduct);
router.delete("/:id", protect, adminCheck, deleteProduct);

module.exports = router;