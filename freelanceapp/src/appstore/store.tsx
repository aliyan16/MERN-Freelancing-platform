import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import gigReducer from '../slices/gigSlice'
import orderReducer from '../slices/orderSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        gigs:gigReducer,
        orders:orderReducer
    }
})

export type RootState=ReturnType< typeof store.getState>
export type AppDispatch=typeof store.dispatch