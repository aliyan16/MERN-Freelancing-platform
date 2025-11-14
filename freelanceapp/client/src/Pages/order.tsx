import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
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
  const [orderData,setOrderData]=useState({
    description:'',
    images:'',

  })


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

  const handleChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {name,value}=e.target
    setOrderData((prev)=>({...prev,[name]:value}))

  }

  const handlePlaceOrder = async () => {
    if(!user || !gig) {
      alert("User or Gig information is missing.");
      return;
    }
    const action=await dispatch(placeOrder({buyerId:user.id,sellerId:gig.sellerId,gigId:gig._id,orderReq:orderData.description,reqImg:orderData.images,price:gig.price}))
    if(placeOrder.fulfilled.match(action)){
      alert("Order placed successfully!");
    } else if(placeOrder.rejected.match(action)){
      alert(`Failed to place order: ${action.payload || action.error.message}`);
    }
  };
    

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!gig) return <p className="text-center mt-10">Gig not found.</p>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        
        {/* Gig Details */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
          {gig.imageUrl && (
            <img
              src={gig.imageUrl}
              alt={gig.title}
              className="w-full h-72 object-cover"
            />
          )}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                {gig.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{gig.description}</p>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="text-2xl font-bold text-emerald-600">
                ${gig.price}
              </span>
              <span className="text-sm font-medium text-gray-500">
                ⏳ {gig.deliveryTime} day(s) delivery
              </span>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Order Requirements</h3>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Describe your requirements
              </label>
              <textarea
                name="description"
                placeholder="Provide details for your order..."
                rows={6}
                value={orderData.description}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload files (optional)
              </label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl py-4 text-lg shadow-lg transition-all"
          >
            ✅ Confirm Order
          </button>
        </div>
      </div>
    </div>


  );
}

export default Order;
