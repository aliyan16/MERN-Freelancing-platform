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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">
        {user?.role === "Seller" ? "Your Orders" : "Your Purchase History"}
      </h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-4">
        {orders.length === 0 && !loading ? (
          <p className="text-gray-500">
            {user?.role === "Seller"
              ? "No orders yet."
              : "You haven’t purchased anything yet."}
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  Order Title: <span className="text-gray-600">{typeof order.gig==='string'?order.gig:order.gig.title}</span>
                </p>
                <p className="font-semibold">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </p>
                <p className="text-gray-700">Price: ${order.price}</p>
                <p
                  className={`text-sm ${
                    order.status === "completed"
                      ? "text-green-600"
                      : order.status === "in-progress"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {order.status}
                </p>
                <p className="text-gray-500 text-sm">
                  Order placed At: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                {user?.role === "Seller" ? (
                <p className="text-sm text-gray-600">
                    Buyer ID: {typeof order.buyer === "string" ? order.buyer : `${order.buyer.firstName} ${order.buyer.lastName}`}
                </p>
                ) : (
                <p className="text-sm text-gray-600">
                    Seller ID: {typeof order.seller === "string" ? order.seller : order.seller._id}
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
