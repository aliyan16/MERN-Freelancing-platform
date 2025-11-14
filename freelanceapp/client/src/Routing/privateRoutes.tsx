import { useSelector } from "react-redux";
import { RootState } from "../appstore/store";
import { Navigate } from "react-router-dom";
import { JSX } from "react";


function PrivateRoute({children}:{children: JSX.Element}){
    const token=useSelector((state:RootState)=>state.auth.token)
    return token?children:<Navigate to='/auth/login' />
}
export default PrivateRoute