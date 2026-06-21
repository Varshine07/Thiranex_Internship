const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST contact message
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({
      message: "Message saved successfully!"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;