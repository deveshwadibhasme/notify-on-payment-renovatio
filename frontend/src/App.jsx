import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-to-database", formData);
      setFormData({ name: "", amount: "", mobile: "", email: "" });
    } catch (error) {
      alert("Error sending data.");
    }
    try {
      await axios.post("http://localhost:5000/send-notification", formData);
      setFormData({ name: "", amount: "", mobile: "", email: "" });
      alert("Notification Sent Successfully!");
    } catch (error) {
      alert("Error sending notification.");
    }
  };

  //   <div className="admin-portal">
  //   <h2 className="text-2xl font-bold mb-4 text-center">Admin Portal</h2>
  //   <table className="w-full border-collapse">
  //     <thead>
  //       <tr>
  //         <th className="border p-2 text-left">Name</th>
  //         <th className="border p-2 text-left">Amount</th>
  //         <th className="border p-2 text-left">Mobile</th>
  //         <th className="border p-2 text-left">Email</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {/* Fetch data from your database and display it here */}
  //     </tbody>
  //   </table>
  // </div>

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Renovatio NGO Donation
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-2 border rounded"
            name="name"
            placeholder="Donor Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            name="amount"
            type="number"
            placeholder="Donation Amount"
            onChange={handleChange}
            value={formData.amount}
            required
          />
          <input
            className="w-full p-2 mb-2 border rounded"
            name="mobile"
            type="tel"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={formData.mobile}
            required
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
