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
    formData.append("sellerId", user._id);
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Gig</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          value={gigData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Gig Description"
          value={gigData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={gigData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="category"
          value={gigData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="web">Web Development</option>
          <option value="design">Graphic Design</option>
          <option value="writing">Writing</option>
        </select>

        <input
          type="number"
          name="deliveryTime"
          placeholder="Delivery Time (Days)"
          value={gigData.deliveryTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Publish Gig
        </button>
      </form>
    </div>
  );
}

export default CreateGig;
