import React from 'react'
import { Link } from "react-router-dom";

function Onboarding() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">GigHub</h1>
      <p className="mt-2 text-gray-600">Your freelance marketplace</p>
      <nav className="mt-4 flex gap-4">
        <Link to="/gigs" className="text-blue-500">Explore Gigs</Link>
        <Link to="/auth/login" className="text-blue-500">Login</Link>
        <Link to="/auth/register" className="text-blue-500">Register</Link>
        <Link to="/onboarding" className="text-blue-500">onboarding</Link>
      </nav>
    </div>
  )
}

export default Onboarding