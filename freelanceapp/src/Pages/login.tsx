import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate=useNavigate()
  const [signInData,setSignInData]=useState({
    email:'',
    password:''
  })

  const handleChange=async()=>{
    
  }

  const handleSubmit=async()=>{
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={signInData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={signInData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            onClick={()=>navigate('/register')}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Or Create Account
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
