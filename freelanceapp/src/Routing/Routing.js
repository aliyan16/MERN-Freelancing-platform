import React from "react";
import ReactDoM from 'react-dom/client'
import {Provider} from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SignIn from "../Pages/login";
import Register from "../Pages/register";
import Onboarding from "../Pages/onboarding";


function Routing(){
    return(
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
    )
}

export default Routing;