##  For Non-Profit Organization : renovatio india

# 📌 Payment Notification & Storage API

A full-stack **Node.js + Express + MongoDB** application that allows an NGO to:

✅ **Store payment details** (payer name, amount, mobile, email)  
✅ **Send notifications** via **SMS, WhatsApp, and Email**  
✅ **Retrieve all payment records**  

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Messaging Services:** Nodemailer (Email)  
- **Environment Variables:** dotenv  

---

## 📂 Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/payment-notifier.git
cd payment-notifier
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Create `.env` File
Create a `.env` file and add the following:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
```
🔹 Replace values with your **MongoDB Atlas URI, Twilio credentials, and Gmail credentials**  

---

## 🖥️ Running the Project

### Start the Backend
```sh
node server.js
```
_Server runs on `http://localhost:5000`_

---

## 📌 API Endpoints

### 1️⃣ Store Payment Details
**POST** `/send-notifications`  
✅ Stores payer information in MongoDB  
#### Request Body (JSON)
```json
{
  "name": "John Doe",
  "amount": 500,
  "mobile": "+919876543210",
  "email": "john@example.com"
}
```

### 2️⃣ Retrieve All Payments
**GET** `/payments`  
✅ Fetches all stored payment records  

---

## 📧 Contact
For any issues, feel free to open an **issue** or contact me. 🚀

