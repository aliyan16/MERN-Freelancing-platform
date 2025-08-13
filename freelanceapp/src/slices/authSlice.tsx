import {createSlice,PayloadAction} from '@reduxjs/toolkit'

type User={
    id:string;
    name:string;
    role:string;
}
interface AuthState {
    user?:User;
    token?:string;
}
const initialState:AuthState = {}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<{user:User;token:string}>){
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        logout(state){
            state.user=undefined
            state.token=undefined

        }
    }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer