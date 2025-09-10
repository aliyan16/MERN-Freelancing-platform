import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { placeOrder } from "../slices/orderSlice";
import { AppDispatch,RootState } from "../appstore/store";
import {useSelector,useDispatch} from 'react-redux'

interface Gig {
  _id: string;
  sellerId:string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  deliveryTime: number;
}

function Order() {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const user=useSelector((state: RootState) => state.auth.user);
  const dispatch=useDispatch<AppDispatch>()


  const fetched = useRef(false);
  useEffect(() => {
    if(!fetched.current){
      const fetchGig = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/gigs/${id}`);
        setGig(res.data);
      } catch (e) {
        console.error("Error fetching gig:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
    fetched.current=true;
    }
    
  }, [id]);

  const handlePlaceOrder = async () => {
    if(!user || !gig) {
      alert("User or Gig information is missing.");
      return;
    }
    const action=await dispatch(placeOrder({buyerId:user.id,sellerId:gig.sellerId,gigId:gig._id,price:gig.price}))
    if(placeOrder.fulfilled.match(action)){
      alert("Order placed successfully!");
    } else if(placeOrder.rejected.match(action)){
      alert(`Failed to place order: ${action.payload || action.error.message}`);
    }
  };
    

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!gig) return <p className="text-center mt-10">Gig not found.</p>;
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        {gig.imageUrl && (
          <img
            src={gig.imageUrl}
            alt={gig.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{gig.title}</h2>
          <p className="text-gray-600">{gig.description}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-semibold text-green-600">
              ${gig.price}
            </span>
            <span className="text-sm text-gray-500">
              Delivery: {gig.deliveryTime} day(s)
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 text-lg transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
