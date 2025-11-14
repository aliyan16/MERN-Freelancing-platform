import React from "react";
import { useNavigate } from "react-router-dom";

interface GigCardProps {
  gig: any;
}

const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  const navigate = useNavigate();

  return (
    <div
      key={gig._id}
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
    >
      <img
        src={gig.imageUrl || "https://via.placeholder.com/300x200"}
        alt={gig.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{gig.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{gig.description || "No description"}</p>
        <p className="text-sm text-gray-600 mb-3">
          ⏱ Delivery: <span className="font-semibold">{gig.deliveryTime} days</span>
        </p>
        <div className="flex items-center justify-between">
          <p className="text-emerald-600 font-extrabold text-lg">${gig.price}</p>
          <button
            onClick={() => navigate(`/gigs/${gig._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
