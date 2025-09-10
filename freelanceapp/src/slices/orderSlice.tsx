import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl='http://localhost:5000/api'

interface Order{
    _id:string;
    buyerId:string;
    sellerId:string;
    gigId:string;
    price:number;
    status:'in-progress' | 'completed' | 'canceled';
    createdAt:string;
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

export const placeOrder=createAsyncThunk('orders/placeOrder',async(orderDate:{buyerId:string,sellerId:string,gigId:string,price:number})=>{
    try{
        const res=await axios.post(`${baseUrl}/orders`,orderDate)
        return res.data

    }catch(e){
        console.error('Failed to place order',e)
    }
})

export const fetchBuyerOrders=createAsyncThunk('orders/fetchBuyerOrders',async(buyerId:string)=>{
    try{
        const res=await axios.get(`${baseUrl}/orders/buyer/${buyerId}`)
        return res.data
    }catch(e){
        console.error('Failed to fetch buyer orders',e)
    }
})

export const fetchSellerOrders=createAsyncThunk('orders/fetchSellerOrders',async(sellerId:string)=>{
    try{
        const res=await axios.get(`${baseUrl}/orders/seller/${sellerId}`)
        return res.data
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
                    state.orders.push(action.payload)
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
