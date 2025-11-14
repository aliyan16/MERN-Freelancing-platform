import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../appstore/store";
import { fetchSellerGigs, updateGig } from "../slices/gigSlice";

function EditGigPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const sellerId=useSelector((state:RootState)=>state.auth.user?.id)
  const { list } = useSelector((state: RootState) => state.gigs);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    deliveryTime: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchSellerGigs(sellerId!));
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    const gig = list.find((g) => g._id === id);
    if (gig) {
      setFormData({
        title: gig.title || "",
        description: gig.description || "",
        price: gig.price?.toString() || "",
        deliveryTime: gig.deliveryTime || "",
        image: null,
      });
    }
  }, [list, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateGig({ id: id!, data: formData }));
    navigate("/gigs");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">✏️ Edit Gig</h2>

        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            rows={5}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div>
            <label className="block text-gray-700 mb-1">Delivery</label>
            <input
              type="text"
              name="delivery"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-700"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/gigs")}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGigPage;
