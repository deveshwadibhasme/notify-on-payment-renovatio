import React, { useState } from "react";

const Login = ({ addToast, setCorrectCredentials }) => {

  const credentials = {
    email: import.meta.env.VITE_API_Email,
    password:  import.meta.env.VITE_API_Password,
  };

  const [credential, setCredential] = useState({
    email: '',
    password: ''
  })

  if(localStorage.getItem('user-email')===credentials.email && 
  localStorage.getItem('user-password')===credentials.password){
    setCorrectCredentials(true);
    addToast("Log In Successfully");
    } else {
     setCorrectCredentials(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(credentials.email === credential.email && credentials.password === credential.password){
      localStorage.setItem('user-email',credential.email)
      localStorage.setItem('user-password',credential.password)
      setCorrectCredentials(true);
      addToast("Log In Successfully");
    } else {
      addToast("Invalid Credentials");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center h-full shadow-xl p-10 bg-white rounded-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e)=>setCredential(preState =>({...preState,email:e.target.value}) )}
          />
        </div>
        <div className="mb-6 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e)=>setCredential(preState =>({...preState,password:e.target.value}) )}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </div>
      <p className="mt-3 -mb-4 text-[12px] font-mono">Contact Mohit Deotare for Credentials Details</p>
      </form>
    </div>
  );
};

export default Login;
