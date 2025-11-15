import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// declare const process: { env?: { REACT_APP_BACKEND_URL?: string } } | undefined;


const api=axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,

})
interface GigsResponse{
    gigs:Gig[];
    pagination:{
        total:number;
        page:number;
        limit:number;
        totalPages:number;
    }
}
export const fetchAllGigs=createAsyncThunk('gigs/fetchAllGigs',async(_,{rejectWithValue})=>{
    try{
        const res=await api.get('/gigs?page=1&limit=10')
        return res.data as GigsResponse
    }catch(e:any){
        return rejectWithValue(e.response?.data || 'failed to fetch gigs')
    }
})
export const fetchSellerGigs=createAsyncThunk('gigs/fetchSellerGigs',async(sellerId:string,{rejectWithValue})=>{
    try{
        const res=await api.get(`/gigs/seller/${sellerId}`)
        return res.data as Gig[]
    }catch(e:any){
        return rejectWithValue(e.response?.data || 'failed to fetch seller gigs')
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
export const updateGig = createAsyncThunk(
  "gigs/updateGig",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }

      const response = await api.put(`/gigs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to update gig");
    }
  }
);



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
    status:"active" | "paused" | "pending" | "draft" | "denied";
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
            .addCase(fetchAllGigs.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(fetchAllGigs.fulfilled,(state,action:PayloadAction<GigsResponse>)=>{
                state.loading=false;
                state.list=action.payload.gigs;
            })
            .addCase(fetchAllGigs.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload as string
            })
            .addCase(deleteGig.fulfilled, (state, action) => {
                state.list = state.list.filter(g => g._id !== action.payload);
            })
            .addCase(pauseGig.fulfilled, (state, action) => {
                const idx = state.list.findIndex(g => g._id === action.payload._id);
                if (idx !== -1) state.list[idx] = action.payload;
            })
            .addCase(updateGig.fulfilled, (state, action) => {
                const idx = state.list.findIndex(g => g._id === action.payload._id);
                if (idx !== -1) state.list[idx] = action.payload;
            });

    }
})

export default gigSlice.reducer;