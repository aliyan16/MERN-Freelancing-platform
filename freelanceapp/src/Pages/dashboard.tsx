import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../appstore/store'
import { Link } from 'react-router-dom'
import { fetchSellerGigs } from '../slices/gigSlice'

function Dashboard() {
  const user=useSelector((state:RootState)=>state.auth.user)
  const dispatch=useDispatch<AppDispatch>()
  const {list,loading}=useSelector((state:RootState)=>state.gigs)
  useEffect(()=>{dispatch(fetchSellerGigs() as any)},[dispatch])

  return (
    <>
    <div className='p-6 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold'>
        Dashboard
      </h1>
      <p className='mt-2 text-gray-600'>
        Welcome, {user?.name}
      </p>
      {user?.role==='Seller' && (
        <div className='mt-6'>
          <Link to='/gigs' className='bg-green-600 text-white px-4 py-2 rounded-lg'>
            View Your Gigs
          </Link>

        </div>

      )}
      {user?.role==='Buyer' && (
        <>
        <div className='mt-6'>
          <Link to='/orders' className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
            View Your Orders
          </Link>

        </div>
        <div className='mt-6'>
          {list.map(gig=>(
            <div key={gig._id} className='border-b py-4'>
              <h3 className='text-lg font-semibold'>{gig.title}</h3>
              <p className='text-gray-600'>{gig.price}</p>
            </div>
          ))}
        </div>
        </>
      )}
    </div>  
    </>
  )
}

export default Dashboard