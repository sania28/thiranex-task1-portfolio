const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Email notification setup (uses Gmail SMTP with app password)
const EMAIL_USER = (process.env.EMAIL_USER || "").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || "").trim();
const EMAIL_TO = (process.env.EMAIL_TO || EMAIL_USER || "").trim();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

async function sendNotificationEmail({ name, email, message }) {
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.warn("Email notification skipped: EMAIL_USER, EMAIL_PASS, or EMAIL_TO not set in .env");
    return;
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: EMAIL_TO,
    subject: `New Portfolio Message from ${name}`,
    text: `You received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Sania Mujtaba Portfolio`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #3b82f6; border-radius: 10px;">
        <h2 style="color: #3b82f6; margin-bottom: 20px;">📩 New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="white-space: pre-wrap; color: #333;">${message}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #888; font-size: 12px;">Sent via Sania Mujtaba Portfolio</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent to ${EMAIL_TO}`);
  } catch (error) {
    console.error("Failed to send email notification:", error.message);
  }
}

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

    // Send email notification (non-blocking - won't fail the request if email fails)
    sendNotificationEmail({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      contact
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message."
    });
  }
});

module.exports = router;