import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../appstore/store'
import { Link } from 'react-router-dom'

function dashboard() {
  const user=useSelector((state:RootState)=>state.auth.user)

  return (
    <>
    <div className='p-6 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold'>
        Dashboard
      </h1>
      <p className='mt-2 text-gray-600'>
        Welcome, {user?.name}
      </p>
      {user?.role==='seller' && (
        <div className='mt-6'>
          <Link to='/gigs' className='bg-green-600 text-white px-4 py-2 rounded-lg'>
            View Your Gigs
          </Link>

        </div>

      )}
      {user?.role==='buyer' && (
        <div className='mt-6'>
          <Link to='/orders' className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
            View Your Orders
          </Link>

        </div>
      )}
    </div>  
    </>
  )
}

export default dashboard