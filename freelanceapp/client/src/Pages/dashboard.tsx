import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../appstore/store";
import { fetchAllGigs } from "../slices/gigSlice";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/dashboardComponents/dashboardHeader";
import SellerTips from "../components/dashboardComponents/sellerTips";
import BuyerFilters from "../components/dashboardComponents/buyerFilters";
import GigCard from "../components/dashboardComponents/gigCard";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.gigs);

  const [filteredGigs, setFilteredGigs] = useState<any[]>([]);
  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      dispatch(fetchAllGigs());
      fetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredGigs(list.filter((gig:any) => gig.status === "active"));
  }, [list]);

  const handleFilter = (category: string) => {
    if (!category) {
      setFilteredGigs(list.filter((gig:any) => gig.status === "active"));
    } else {
      setFilteredGigs(list.filter((gig:any) => gig.category === category && gig.status === "active"));
    }
  };

  const categories = Array.from(new Set(list.map((g:any) => g.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader name={user?.name} />

        {/* Seller Section */}
        {user?.role === "Seller" && (
          <>
            <div className="mt-8">
              <Link
                to="/gigs"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-emerald-700 transition"
              >
                🎭 View Your Gigs
              </Link>
            </div>
            <SellerTips />
          </>
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

            <BuyerFilters onFilter={handleFilter} categories={categories} />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {loading && <p className="text-gray-500">Loading gigs...</p>}
              {!loading &&
                filteredGigs.map((gig) => <GigCard key={gig._id} gig={gig} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
