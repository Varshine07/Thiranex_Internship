const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminCheck = require("../middleware/adminMiddleware");

// User Routes
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// Admin Routes
router.get("/admin", protect, adminCheck, getAllOrders);
router.put("/admin/:id", protect, adminCheck, updateOrderStatus);

module.exports = router;