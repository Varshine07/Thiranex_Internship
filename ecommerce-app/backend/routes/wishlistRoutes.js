const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, addToWishlist);
router.get("/", auth, getWishlist);
router.delete("/:id", auth, removeWishlist);

module.exports = router;