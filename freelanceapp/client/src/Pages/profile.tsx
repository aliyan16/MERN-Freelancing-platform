import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
  
declare const process: { env?: { REACT_APP_BACKEND_URL?: string } } | undefined;

function Profile() {
    const {id}=useParams()
    const [profile,setProfile]=useState<any>(null)

    useEffect(()=>{
        const fetchProfile=async()=>{
            const {data}=await axios.get(`${process?.env?.REACT_APP_BACKEND_URL}/api/users/${id}`)
            setProfile(data)
        }
        fetchProfile()
    },[id])
    if(!profile) return <div className='p-6'>Loading...</div>
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex gap-6">
        <img
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt={profile.name}
          className="w-32 h-32 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.bio}</p>
          <p className="mt-2">⭐ {profile.rating || "New"} ({profile.reviewCount || 0} reviews)</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-6">Gigs by {profile.name}</h3>
      <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {profile.gigs.map((gig: any) => (
          <div key={gig._id} className="border rounded-lg p-4 shadow">
            <img
              src={gig.image || "https://via.placeholder.com/300"}
              alt={gig.title}
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <h3 className="font-semibold">{gig.title}</h3>
            <p className="text-sm text-gray-500">${gig.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile