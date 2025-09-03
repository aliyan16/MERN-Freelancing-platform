import React, { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../appstore/store";
import { Link } from "react-router-dom";
import { fetchSellerGigs } from "../slices/gigSlice";

function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.gigs);

  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchSellerGigs());
      fetched.current = true;
    }
  }, [dispatch]);


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome, {user?.name}</p>

      {user?.role === "Seller" && (
        <div className="mt-6">
          <Link
            to="/gigs"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            View Your Gigs
          </Link>
        </div>
      )}

      {user?.role === "Buyer" && (
        <>
          <div className="mt-6">
            <Link
              to="/orders"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View Your Orders
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading && <p>Loading gigs...</p>}
            {!loading &&
              list.map((gig) => (
                <div
                  key={gig._id}
                  className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
                >
                  <img
                    src={gig.imageUrl || "https://via.placeholder.com/300x200"}
                    alt={gig.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate">
                      {gig.title}
                    </h3>
                    <p className="text-green-600 font-bold text-lg">
                      ${gig.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
