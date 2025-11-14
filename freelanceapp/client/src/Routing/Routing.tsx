// import React from "react";
// import ReactDoM from 'react-dom/client'
// import { useSelector} from 'react-redux'
import { Routes,Route } from "react-router-dom";
import SignIn from "../Pages/login";
import Register from "../Pages/register";
import Onboarding from "../Pages/onboarding";
import PrivateRoute from "./privateRoutes";
import Dashboard from "../Pages/dashboard";
import Profile from "../Pages/profile";
import GigsPage from "../Pages/gig";
import CreateGig from "../Pages/createGig";
import Order from "../Pages/order";
// import { RootState } from "../appstore/store";
import Header from "../components/header";
import OrderHistory from "../Pages/orderHistory";
import EditGigPage from "../Pages/editGig";
import Footer from "../components/footer";
function Routing(){
    // const token=useSelector((state:RootState)=>state.auth.token)
    // const isAuthenticated=Boolean(token)
    return(
            <Routes>
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/" element={<><Header/> <Onboarding /><Footer/></>} />
                <Route path="/dashboard" element={<PrivateRoute><><Header/> <Dashboard/><Footer/></></PrivateRoute>}/>
                <Route path="/gigs" element={<PrivateRoute><><Header/> <GigsPage /><Footer/></></PrivateRoute>} />
                <Route path="/profile/:id" element={<PrivateRoute><><Header/> <Profile /><Footer/></></PrivateRoute>} />
                <Route path="/create-gig" element={<PrivateRoute><><Header/> <CreateGig /><Footer/></></PrivateRoute>} />
                <Route path="/gigs/:id" element={<PrivateRoute><><Header/> <Order /><Footer/></></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><><Header/><OrderHistory/><Footer/></></PrivateRoute>} />
                <Route path="/edit-gig/:id" element={<PrivateRoute><><Header/><EditGigPage /><Footer/></></PrivateRoute>} />
            </Routes>
    )
}

export default Routing;