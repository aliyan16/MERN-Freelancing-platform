import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const fetchSellerGigs=createAsyncThunk('gigs/fetchSeller',async()=>{
    const {data}=await axios.get('http://localhost:5000/api/gigs/seller')
    return data
})

const gigSlice=createSlice({
    name:'gigs',
    initialState:{list:[],loading:false},
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchSellerGigs.pending,(state)=>{state.loading=true})
            .addCase(fetchSellerGigs.fulfilled,(state,action)=>{
                state.loading=false;
                state.list=action.payload
            })
            .addCase(fetchSellerGigs.rejected,(state)=>{state.loading=false})
    }
})

export default gigSlice.reducer
export {fetchSellerGigs}