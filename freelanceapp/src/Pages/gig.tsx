import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerGigs } from "../slices/gigSlice";
import { RootState, AppDispatch } from "../appstore/store";
import { useNavigate } from "react-router-dom";

function GigsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state: RootState) => state.gigs);

  useEffect(() => {
  const loadGigs = async () => {
    const result = await dispatch(fetchSellerGigs());
    console.log("Fetched gigs:", result);
  };
  loadGigs();
}, [dispatch]);


  if (loading) return <div className="p-6">Loading gigs...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-10">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Manage Gigs</h2>
      <button
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition"
        onClick={() => navigate("/create-gig")}
      >
        ➕ Create New Gig
      </button>
    </div>

    {/* Tabs */}
    <div className="flex gap-8 border-b pb-3 mb-6 text-gray-600 font-medium text-lg">
      <button className="text-emerald-600 border-b-2 border-emerald-600 pb-2">
        Active ({list.length})
      </button>
      <button className="hover:text-emerald-600">Pending</button>
      <button className="hover:text-emerald-600">Draft</button>
      <button className="hover:text-emerald-600">Paused</button>
      <button className="hover:text-emerald-600">Denied</button>
    </div>

    {/* Gig Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {list.map((gig) => (
        <div
          key={gig._id}
          className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden"
        >
          {/* Image */}
          <img
            src={gig.imageUrl || "https://via.placeholder.com/300x200"}
            alt={gig.title}
            className="w-full h-40 object-cover"
          />

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {gig.title}
            </h3>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Orders: <span className="font-semibold">{gig.orders || 0}</span></p>
              <p className="text-red-500">Cancellations: {gig.cancellations ? `${gig.cancellations}%` : "0%"}</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button className="px-3 py-1 text-gray-600 hover:text-gray-900 transition">
                ⋮
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default GigsPage;
