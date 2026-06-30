const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ➕ ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: req.user.id,
        product: productId,
        quantity,
      });
    }

    let cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    // Remove invalid products
    cart = cart.filter((item) => item.product);

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📦 GET CART
const getCart = async (req, res) => {
  try {
    let cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    // Remove invalid products
    cart = cart.filter((item) => item.product);

    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      count: cart.length,
      totalPrice,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ✏️ UPDATE CART
const updateCart = async (req, res) => {
  try {
    const { productId, type } = req.body;

    const cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (type === "inc") {
      cartItem.quantity += 1;
    } else if (type === "dec") {
      cartItem.quantity -= 1;
    }

    if (cartItem.quantity <= 0) {
      await cartItem.deleteOne();
    } else {
      await cartItem.save();
    }

    let cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    // Remove invalid products
    cart = cart.filter((item) => item.product);

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ❌ REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    let cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    // Remove invalid products
    cart = cart.filter((item) => item.product);

    res.status(200).json({
      success: true,
      message: "Product removed",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};