 import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'
import { FiShoppingCart } from 'react-icons/fi'
 
 export default function Cart (){
    const {total,totalItems}=useSelector((state)=>state.cart)
   return (
     <div className='text-white min-h-screen bg-richblack-900'>
       {/* Header Section */}
       <div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12 border-b border-richblack-700'>
         <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>Your Cart</h1> 
         <p className='text-sm sm:text-base text-richblack-300'>{totalItems} Course{totalItems !== 1 ? 's' : ''} in Cart</p>
       </div>

       {total > 0 
        ? (
          <div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
              {/* Courses List - Takes 2 columns on lg screens */}
              <div className='lg:col-span-2'>
                <RenderCartCourses/>
              </div>
              
              {/* Checkout Section - Takes 1 column on lg screens */}
              <div className='lg:col-span-1'>
                <div className='sticky top-6'>
                  <RenderTotalAmount/>
                </div>
              </div>
            </div>
          </div>
        )
        : (
          <div className='px-4 py-12 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center min-h-[400px]'>
            <FiShoppingCart className='text-6xl sm:text-7xl text-richblack-400 mb-4' />
            <p className='text-lg sm:text-xl text-richblack-300 font-semibold'>Your cart is empty</p>
            <p className='text-sm sm:text-base text-richblack-400 mt-2'>Add courses to get started</p>
          </div>
        )}
     </div>
   )
 }
 
 
 