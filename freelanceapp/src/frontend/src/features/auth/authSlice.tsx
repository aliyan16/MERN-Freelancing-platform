import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api,{setAuthToken} from '../../services/api'

interface AuthState{
    token:string|null;
    user:any|null;
    status:string
}
const initialState:AuthState={token:null,user:null,status:'idle'}
export const login=createAsyncThunk('auth/login',async(payload:{email:string;password:string})=>{
    const res=await api.post('/auth/login',payload)
    return res.data
})

const slice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state){state.token=null;state.user=null;setAuthToken(null)},
        setCredentials(state,action){state.token=action.payload.token;state.user=action.payload.user;setAuthToken(action.payload.token)}


    },
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            state.token=action.payload.token,
            state.user=action.payload.user,
            setAuthToken(action.payload.token)
        })
    }
})
export const {logout,setCredentials}=slice.actions
export default slice.reducer
