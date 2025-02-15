require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// database connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schema
const PaymentSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    mobile: String,
    email: String,
    date: { type: Date, default: Date.now }
});
const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

module.exports = Payment;

app.post('/add-to-database', async (req, res) => {
    try {
        const { name, amount, mobile, email } = req.body;
        const newPayment = new Payment({ name, amount, mobile, email });

        await newPayment.save();

        return res.status(201).json({ success: true, message: "Payment recorded!", data: newPayment });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

// Notification API
app.post("/send-notification", async (req, res) => {
    // Mail notification
    const { name, amount, mobile, email } = req.body;
    const message = `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; background: #ffffff; margin: 0 auto; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #2c3e50;">🙏 Dear ${name},</h2>
    <p style="color: #555; font-size: 16px;">Thank you for your generous donation of <strong style="color: #27ae60;">₹${amount}</strong>.</p>
    <p style="color: #555; font-size: 16px;">Your support helps <strong>Renovation NGO</strong> continue its mission to create a better future! 🌍</p>
    <p style="color: #777; font-size: 14px; margin-top: 20px;">With gratitude, <br><strong>Renovation NGO Team</strong></p>
  </div>
</body>`;

    try {
        // Email Setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Renovation NGO - Donation Received",
            html: message,
        });
        console.log(`Notification should be sent to: ${name}`);
        return res.status(200).json({ success: true, message: "Notification Sent!" });
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Start Server
app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
