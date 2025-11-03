import React from "react";
import ReactDoM from 'react-dom/client'
import {Provider, useSelector} from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SignIn from "../Pages/login";
import Register from "../Pages/register";
import Onboarding from "../Pages/onboarding";
import PrivateRoute from "./privateRoutes";
import Dashboard from "../Pages/dashboard";
import Profile from "../Pages/profile";
import GigsPage from "../Pages/gig";
import CreateGig from "../Pages/createGig";
import Order from "../Pages/order";
import { RootState } from "../appstore/store";
import Header from "../components/header";
import OrderHistory from "../Pages/orderHistory";
import EditGigPage from "../Pages/editGig";
function Routing(){
    const token=useSelector((state:RootState)=>state.auth.token)
    const isAuthenticated=Boolean(token)
    return(
            <Routes>
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/onboarding" element={ <PrivateRoute><><Header/> <Onboarding /></></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><><Header/> <Dashboard/></></PrivateRoute>}/>
                <Route path="/gigs" element={<PrivateRoute><><Header/> <GigsPage /></></PrivateRoute>} />
                <Route path="/profile/:id" element={<PrivateRoute><><Header/> <Profile /></></PrivateRoute>} />
                <Route path="/create-gig" element={<PrivateRoute><><Header/> <CreateGig /></></PrivateRoute>} />
                <Route path="/gigs/:id" element={<PrivateRoute><><Header/> <Order /></></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><><Header/><OrderHistory/></></PrivateRoute>} />
                <Route path="/edit-gig/:id" element={<PrivateRoute><EditGigPage /></PrivateRoute>} />
            </Routes>
    )
}

export default Routing;