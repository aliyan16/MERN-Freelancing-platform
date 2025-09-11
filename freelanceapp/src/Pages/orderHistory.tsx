// src/pages/OrderHistory.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../appstore/store";
import { fetchBuyerOrders, fetchSellerOrders } from "../slices/orderSlice";

function OrderHistory() {
  const user=useSelector((state:RootState)=>state.auth.user)
  const { orders=[], loading, error } = useSelector(
    (state: RootState) => state.orders
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user){
        console.log('No user available in order history page')
        return
    };

    if (user?.role === "Seller") {
      dispatch(fetchSellerOrders(user.id));
    } else if (user?.role === "Buyer") {
      dispatch(fetchBuyerOrders(user.id));
    }
  }, [dispatch, user?.id, user?.role]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 rounded-2xl shadow-lg mt-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
            {user?.role === "Seller" ? "Your Orders" : "Your Purchase History"}
        </h2>

        {loading && <p className="text-gray-600 animate-pulse">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-6">
            {orders.length === 0 && !loading ? (
            <p className="text-gray-500 italic text-center">
                {user?.role === "Seller"
                ? "You don’t have any orders yet."
                : "You haven’t purchased anything yet."}
            </p>
            ) : (
            orders.map((order) => (
                <div
                key={order._id}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex justify-between items-start"
                >
                    <div>
                        <p className="text-lg font-semibold text-gray-900">
                        Order Title:{" "}
                        <span className="text-gray-600 font-normal">
                            {typeof order.gig === "string"
                            ? order.gig
                            : order.gig?.title}
                        </span>
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Order ID:</span>{" "}
                        {order._id}
                        </p>
                        <p className="text-gray-700 mt-1">
                        <span className="font-medium">Price:</span> ${order.price}
                        </p>
                        <p
                        className={`mt-1 text-sm font-medium ${
                            order.status === "completed"
                            ? "text-green-600"
                            : order.status === "in-progress"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                        >
                        Status: {order.status}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                        Placed: {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                        Requirements: {order.requirements}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                        Image: {order.image?order.image:'No Image uploaded'}
                        </p>
                    </div>
                    <div className="text-right">
                        {user?.role === "Seller" ? (
                        <p className="text-sm text-gray-600">
                            Buyer:{" "}
                            {typeof order.buyer === "string"
                            ? order.buyer
                            : `${order.buyer?.firstName} ${order.buyer?.lastName}`}
                        </p>
                        ) : (
                        <p className="text-sm text-gray-600">
                            Seller ID:{" "}
                            {typeof order.seller === "string"
                            ? order.seller
                            : order.seller?._id}
                        </p>

                        )}
                    </div>
                </div>
            ))
            )}
        </div>
    </div>

  );
}

export default OrderHistory;
