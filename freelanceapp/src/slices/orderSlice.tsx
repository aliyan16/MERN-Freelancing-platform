import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl='http://localhost:5000/api'

interface UserRef {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface GigRef {
  _id: string;
  title: string;
  price: number;
}

interface Order {
  _id: string;
  buyer: string | UserRef;   // can be just ID string or populated object
  seller: string | UserRef;  // same here
  gig: string | GigRef;      // same here
  price: number;
  status: 'in-progress' | 'completed' | 'canceled';
  createdAt: string;
}


interface OrderState{
    orders:Order[];
    currentOrder:Order|null;
    loading:boolean;
    error:string|null;
}

const initialState:OrderState={
    orders:[],
    currentOrder:null,
    loading:false,
    error:null
}

export const placeOrder=createAsyncThunk('orders/placeOrder',async(orderData:{buyerId:string,sellerId:string,gigId:string,price:number},{rejectWithValue})=>{
    try{
        const res=await axios.post(`${baseUrl}/orders`,{buyerId:orderData.buyerId,sellerId:orderData.sellerId,gigId:orderData.gigId,price:orderData.price})
        return res.data

    }catch(e){
        console.error('Failed to place order',e)
        return rejectWithValue(e.response?.data || "Failed to place order");
    }
})

export const fetchBuyerOrders=createAsyncThunk('orders/fetchBuyerOrders',async(buyerId:string)=>{
    try{
        const res=await axios.get(`${baseUrl}/orders/buyer/${buyerId}`)
        console.log('Fetch Buyer res: ',res.data)
        return res.data.orders || res.data
    }catch(e){
        console.error('Failed to fetch buyer orders',e)
    }
})

export const fetchSellerOrders=createAsyncThunk('orders/fetchSellerOrders',async(sellerId:string)=>{
    try{
        const res=await axios.get(`${baseUrl}/orders/seller/${sellerId}`)
        console.log('Fetch Seller res: ',res.data)

        return res.data.orders || res.data
    }catch(e){
        console.error('Failed to fetch seller orders',e)
    }
})

const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(placeOrder.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(placeOrder.fulfilled,(state,action)=>{
                state.loading=false;
                if(action.payload){
                    const order=action.payload.orders || action.payload
                    state.orders.push(order)
                }
            })
            .addCase(placeOrder.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message || 'Failed to place order'
            })
            // Fetch buyer orders
            .addCase(fetchBuyerOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBuyerOrders.fulfilled, (state, action) => {
                state.loading = false;

                state.orders = action.payload;
            })
            .addCase(fetchBuyerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch buyer orders";
            })

            // Fetch seller orders
            .addCase(fetchSellerOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSellerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchSellerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch seller orders";
            });
    },
});

export default orderSlice.reducer;
