import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerGigs, pauseGig, deleteGig } from "../slices/gigSlice";
import { RootState, AppDispatch } from "../appstore/store";
import { useNavigate } from "react-router-dom";

function GigsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const sellerId = useSelector((state: RootState) => state.auth.user?.id);
  const { list, loading } = useSelector((state: RootState) => state.gigs);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "pending" | "draft" | "paused" | "denied"
  >("active");

  useEffect(() => {
    
    if (sellerId) {
      dispatch(fetchSellerGigs(sellerId));
    }
  }, [dispatch]);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".gig-menu")) setOpenMenu(null);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleToggleMenu = (gigId: string) => {
    setOpenMenu(openMenu === gigId ? null : gigId);
  };

  const handleEdit = (gigId: string) => navigate(`/edit-gig/${gigId}`);
  const handlePause = (gigId: string) => {
    dispatch(pauseGig(gigId));
    setOpenMenu(null);
  };
  const handleDelete = (gigId: string) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      dispatch(deleteGig(gigId));
      setOpenMenu(null);
    }
  };

  const getCount = (status: string) =>
    list.filter((gig:any) => gig.status === status).length;

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
          {["active", "pending", "draft", "paused", "denied"].map((status) => (
            <button
              key={status}
              className={`${
                selectedStatus === status
                  ? "text-emerald-600 border-b-2 border-emerald-600 pb-2"
                  : "hover:text-emerald-600"
              }`}
              onClick={() =>
                setSelectedStatus(
                  status as "active" | "pending" | "draft" | "paused" | "denied"
                )
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {getCount(status)})
            </button>
          ))}
        </div>

        {/* Gig Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {list
            .filter((gig:any) => gig.status === selectedStatus)
            .map((gig:any) => (
              <div
                key={gig._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 relative"
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
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {gig.description}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600">
                    <p>
                      Price: <span className="font-semibold">${gig.price || 0}</span>
                    </p>
                    <p>
                      Delivery:{" "}
                      <span className="font-semibold">{gig.deliveryTime || 0} days</span>
                    </p>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <p>
                      Orders: <span className="font-semibold">{gig.orders || 0}</span>
                    </p>
                    <p className="text-red-500">
                      Cancellations: {gig.cancellations || 0}%
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="relative flex justify-end gig-menu">
                    <button
                      onClick={() => handleToggleMenu(gig._id)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-900 transition"
                    >
                      ⋮
                    </button>

                    {openMenu === gig._id && (
                      <div className="absolute top-8 right-0 w-36 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                        <button
                          onClick={() => handleEdit(gig._id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handlePause(gig._id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {gig.status === "paused" ? "▶️ Active" : "⏸ Pause"}
                        </button>
                        <button
                          onClick={() => handleDelete(gig._id)}
                          className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
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
