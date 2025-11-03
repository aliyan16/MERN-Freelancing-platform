import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:5000/api'
})
export const fetchSellerGigs=createAsyncThunk('gigs/fetchSellerGigs',async(_,{rejectWithValue})=>{
    try{
        const res=await api.get('/gigs')
        return res.data as Gig[]
    }catch(e:any){
        return rejectWithValue(e.response?.data || 'failed to fetch gigs')
    }
})
export const deleteGig=createAsyncThunk('gigs/deleteGig',async(id:string,{rejectWithValue})=>{
    try{
        await api.delete(`/gigs/${id}`)
        return id
    }catch(e:any){
        return rejectWithValue(e.response?.data || 'failed to delete gig')
    }
})
export const pauseGig=createAsyncThunk('gigs/pauseGig',async(id:string,{rejectWithValue})=>{
    try{
        const res=await api.patch(`/gigs/${id}/pause`)
        return res.data
    }catch(e:any){
        return rejectWithValue(e.response?.data || 'failed to pause gig')
    }
})
export const updateGig=createAsyncThunk('gigs/updateGig',async({id,data}:{id:string;data:Partial<Gig>},{rejectWithValue})=>{
    try{
        const res=await api.put(`/gigs/${id}`,data)
        return res.data
    }catch(e:any){
        return rejectWithValue(e.response?.data || 'failed to update gig')
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