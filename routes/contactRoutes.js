const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required."
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message
    });

    res.status(201).json({
      message: "Message sent successfully!",
      contact
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      message: "Failed to send message."
    });
  }
});

module.exports = router;