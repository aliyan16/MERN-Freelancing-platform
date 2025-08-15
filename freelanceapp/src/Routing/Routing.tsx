import React from "react";
import ReactDoM from 'react-dom/client'
import {Provider} from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SignIn from "../Pages/login";
import Register from "../Pages/register";
import Onboarding from "../Pages/onboarding";
import PrivateRoute from "./privateRoutes";
import Dashboard from "../Pages/dashboard";
import Profile from "../Pages/profile";
import GigsPage from "../Pages/gig";
import CreateGig from "../Pages/createGig";
function Routing(){
    return(
            <Routes>
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/onboarding" element={ <PrivateRoute><Onboarding /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/gigs" element={<PrivateRoute><GigsPage /></PrivateRoute>} />
                <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/create-gig" element={<PrivateRoute><CreateGig /></PrivateRoute>} />
            </Routes>
    )
}

export default Routing;