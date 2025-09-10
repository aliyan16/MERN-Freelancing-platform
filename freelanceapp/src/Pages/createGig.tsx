// src/Pages/CreateGig.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../appstore/store";

function CreateGig() {
  const navigate = useNavigate();
  const user=useSelector((state:RootState)=>state.auth.user)
  const [gigData, setGigData] = useState({
    sellerId: "",
    title: "",
    description: "",
    price: "",
    category: "",
    deliveryTime: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGigData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGigData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!user){
      alert("User not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("sellerId", user.id);
    formData.append("title", gigData.title);
    formData.append("description", gigData.description);
    formData.append("price", gigData.price);
    formData.append("category", gigData.category);
    formData.append("deliveryTime", gigData.deliveryTime);
    if (gigData.image) formData.append("image", gigData.image);

    try {
      await axios.post("http://localhost:5000/api/gigs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/gigs");
    } catch (err) {
      console.error("Error creating gig:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-6">
  <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8">
    {/* Header */}
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Create a New Gig</h2>
    <p className="text-gray-500 mb-6">Fill out the details below to publish your gig.</p>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Gig Title"
        value={gigData.title}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Gig Description"
        value={gigData.description}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price ($)"
        value={gigData.price}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      {/* Category */}
      <select
        name="category"
        value={gigData.category}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        required
      >
        <option value="">Select Category</option>
        <option value="web">Web Development</option>
        <option value="design">Graphic Design</option>
        <option value="writing">Writing</option>
      </select>

      {/* Delivery Time */}
      <input
        type="number"
        name="deliveryTime"
        placeholder="Delivery Time (Days)"
        value={gigData.deliveryTime}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center">
        <label className="block text-gray-500 mb-2">Upload Gig Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-gray-600"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition transform hover:scale-[1.02]"
      >
        🚀 Publish Gig
      </button>
    </form>
  </div>
</div>

  );
}

export default CreateGig;
