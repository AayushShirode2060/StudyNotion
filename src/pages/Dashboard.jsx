import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { HiOutlineMenu, HiX } from 'react-icons/hi'

const Dashboard = () => {
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoading}=useSelector((state)=>state.profile)

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    if(profileLoading ||authLoading){
      return (
        <div className='mt-10'>
          Loading....
        </div>
      )
    }

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)]'>
      {/* Desktop sidebar */}
      <div className='hidden md:flex'>
        <Sidebar />
      </div>

      {/* Main content + mobile header */}
      <div className='flex flex-col w-full'>
        {/* Mobile header with menu button */}
        <div className='flex items-center justify-between md:hidden bg-richblack-900 px-4 py-3 border-b border-richblack-700'>
          <button onClick={() => setMobileSidebarOpen(true)} aria-label='Open menu' className='text-white'>
            <HiOutlineMenu className='text-2xl' />
          </button>
          <div className='text-white font-semibold'>Dashboard</div>
          <div />
        </div>

        <div className='h-[calc(100vh-3.5rem)] w-full overflow-auto'>
          <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className='fixed inset-0 z-50 md:hidden'>
          <div className='absolute inset-0 bg-black/50' onClick={() => setMobileSidebarOpen(false)} />
          <div className='absolute left-0 top-0 bottom-0 w-64 max-w-[80%] bg-richblack-800 shadow-lg'>
            <div className='flex items-center justify-end p-3'>
              <button onClick={() => setMobileSidebarOpen(false)} className='text-white'>
                <HiX className='text-2xl' />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
