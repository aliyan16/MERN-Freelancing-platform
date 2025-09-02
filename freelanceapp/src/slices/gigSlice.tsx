import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:5000/api'
})
export const fetchSellerGigs=createAsyncThunk('gigs/fetchSellerGigs',async(_,{rejectWithValue})=>{
    try{
        const res=await api.get('/gigs')
        return res.data as Gig[]
    }catch(e){
        return rejectWithValue(e.response?.data || 'failed to fetch gigs')
    }
})
interface Gig{
    _id:string;
    title:string;
    description:string;
    price:number;
    category:string;
    deliveryTime:string;
    image:string;
    impressions:number;
    clicks:number;
    orders:number;
    cancellations:number;
    imageUrl?:string;
}
interface GigSlice{
    list:Gig[];
    loading:boolean;
    error:string|null;
}

const initialState:GigSlice={
    list:[],
    loading:false,
    error:null
}

const gigSlice =createSlice({
    name:'gigs',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchSellerGigs.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(fetchSellerGigs.fulfilled,(state,action:PayloadAction<Gig[]>)=>{
                state.loading=false;
                state.list=action.payload;
            })
            .addCase(fetchSellerGigs.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload as string
            })
    }
})

export default gigSlice.reducer;