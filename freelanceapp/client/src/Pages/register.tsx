import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

declare const process: { env?: { REACT_APP_BACKEND_URL?: string } } | undefined;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [RegisterData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process?.env?.REACT_APP_BACKEND_URL}/api/auth/register`,
        RegisterData
      );
      dispatch(login(data));
      navigate("/dashboard");
    } catch (e) {
      console.error("Error while registering user: ", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 bg-blue-600 text-white flex-col justify-center items-center p-12 space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Workify</h1>
        <p className="text-lg text-blue-100 text-center px-6">
          Join our global freelance marketplace and start earning or hiring today.
        </p>
        <img
          src="https://illustrations.popsy.co/violet/freelancer.svg"
          alt="Freelancer Illustration"
          className="w-80 mt-6"
        />
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8 md:p-12 shadow-2xl rounded-t-3xl md:rounded-none">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
        <form className="space-y-4 w-full max-w-md" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={RegisterData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={RegisterData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={RegisterData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={RegisterData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="gender"
            value={RegisterData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            name="dob"
            value={RegisterData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={RegisterData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option>Seller</option>
            <option>Buyer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
