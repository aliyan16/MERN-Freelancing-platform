import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../slices/authSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        signInData
      );
      dispatch(login(data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left Side Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12 space-y-4">
        <h1 className="text-4xl font-bold">Welcome Back to Workify</h1>
        <p className="text-lg text-blue-100 text-center px-6">
          Connect, collaborate, and grow your freelance business effortlessly.
        </p>
        {/* <img
          src="https://illustrations.popsy.co/violet/team-discussion.svg"
          alt="Workify Login"
          className="w-80 mt-6"
        /> */}
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8 md:p-12 shadow-2xl rounded-t-3xl md:rounded-none">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign In</h2>
        <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={signInData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={signInData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
