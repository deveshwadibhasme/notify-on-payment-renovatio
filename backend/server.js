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
    const message = `🙏 Dear ${name}, thank you for your generous donation of ₹${amount}. 
  Your support helps Renovation NGO continue its mission to create a better future! 🌍`;

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
            text: message,
        });
        console.log(`Notification should be sent to: ${name}`);
        return res.status(200).json({ success: true, message: "Notification Sent!" });
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Start Server
app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
