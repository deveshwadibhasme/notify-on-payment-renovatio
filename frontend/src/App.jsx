import { useState } from "react";
import axios from "axios";
import PaymentList from "./components/PaymentList";
import Login from "./components/Login";
import useToaster from "./hooks/toaster";


function App() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    mobile: "",
    email: "",
  });
  const [display, setDisplay] = useState(true);
  const [correctCredentials, setCorrectCredentials] = useState(false);

  const {addToast,ToastContainer} = useToaster()

  const BackendURI = import.meta.env.VITE_API_BackendURI;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BackendURI}/add-to-database`, formData);
      setFormData({ name: "", amount: "", mobile: "", email: "" });
    } catch (error) {
      alert("Error sending data.");
    }
    try {
      await axios.post(`${BackendURI}/send-notification`, formData);
      setFormData({ name: "", amount: "", mobile: "", email: "" });
      addToast('Notification Sent Successfully!')
    } catch (error) {
      alert("Error sending notification.");
    }
  };

  const handleDisplay = () => {
    setDisplay(!display);
    addToast(display ? 'Donation Details' : 'Donation Form')
  };

  return (
    <>
      {
        correctCredentials ? 
        <>
          {display ?
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
              <div
                onClick={handleDisplay}
                className="mx-auto bg-green-400 w-28 font-bold text-center mt-3 rounded-full p-1 cursor-pointer"
                >
                Display Data
              </div>
              <div
                onClick={()=>{
                  setCorrectCredentials(false)
                  localStorage.clear()
                  addToast('Logged Out Successfully!')
                }}
                className="mx-auto bg-red-400 w-28 font-bold text-center mt-3 rounded-full p-1 cursor-pointer"
                >
               Log Out
              </div>
            </div>
          </div>
          :
          <PaymentList handleDisplay={handleDisplay} />}
        </> 
        :
        <Login addToast={addToast } setCorrectCredentials={setCorrectCredentials}/>
      }
      <ToastContainer/>
    </>
  );
}

export default App;
