import React, { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../appstore/store";
import { Link } from "react-router-dom";
import { fetchAllGigs } from "../slices/gigSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state: RootState) => state.gigs);

  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchAllGigs());
      fetched.current = true;
    }
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
  <div className="max-w-7xl mx-auto">
    {/* Header */}
    <h1 className="text-4xl font-extrabold text-gray-900">Dashboard</h1>
    <p className="mt-2 text-lg text-gray-600">
      Welcome back, <span className="font-semibold text-emerald-600">{user?.name}</span> 👋
    </p>

    {/* Seller Section */}
    {user?.role === "Seller" && (
      <div className="mt-8">
        <Link
          to="/gigs"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-emerald-700 transition"
        >
          🎭 View Your Gigs
        </Link>
      </div>
    )}

    {/* Buyer Section */}
    {user?.role === "Buyer" && (
      <>
        <div className="mt-8">
          <Link
            to="/orders"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-blue-700 transition"
          >
            🛒 View Your Purchases
          </Link>
        </div>

        {/* Gigs Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading && <p className="text-gray-500">Loading gigs...</p>}
          {!loading &&
            list.filter(gig=>gig.status==='active').map((gig) => (
              <div
                key={gig._id}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* Image */}
                <img
                  src={gig.imageUrl || "https://via.placeholder.com/300x200"}
                  alt={gig.title}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                    {gig.title}
                  </h3>
                  <div className=" justify-between text-sm text-gray-600">
                    <p><span className="font-semibold">Description:</span> <br/> <span>{gig.description || "No description available"}</span></p>
                    <p><span className="font-semibold">Delivery:</span> <br/> <span>{gig.deliveryTime || 0} days</span></p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-emerald-600 font-extrabold text-lg">
                      ${gig.price}
                    </p>
                    <div className="ml-auto">
                      <button
                        onClick={() => navigate(`/gigs/${gig._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    )}
  </div>
</div>

  );
}

export default Dashboard;
