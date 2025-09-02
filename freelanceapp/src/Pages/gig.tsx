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
    dispatch(fetchSellerGigs());
  }, [dispatch]);

  if (loading) return <div className="p-6">Loading gigs...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gigs</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/create-gig")}
        >
          Create a New Gig
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-4 text-gray-600 font-medium">
        <button className="pb-2 border-b-2 border-green-500 text-green-600">
          Active ({list.length})
        </button>
        <button className="pb-2">Pending Approval</button>
        <button className="pb-2">Requires Modification</button>
        <button className="pb-2">Draft</button>
        <button className="pb-2">Denied</button>
        <button className="pb-2">Paused</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Gig</th>
              <th className="p-3">Impressions</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Cancellations</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((gig) => (
              <tr key={gig._id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <input type="checkbox" />
                  <img
                    src={gig.imageUrl || "https://via.placeholder.com/80"}
                    alt={gig.title}
                    className="w-20 h-12 rounded object-cover"
                  />
                  <span>{gig.title}</span>
                </td>
                <td className="p-3">{gig.impressions || 0}</td>
                <td className="p-3">{gig.clicks || 0}</td>
                <td className="p-3">{gig.orders || 0}</td>
                <td className="p-3">{gig.cancellations ? `${gig.cancellations}%` : "0%"}</td>
                <td className="p-3">
                  <button className="px-2 py-1 border rounded">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GigsPage;
