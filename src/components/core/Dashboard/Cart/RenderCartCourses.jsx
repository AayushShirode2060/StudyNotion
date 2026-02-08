import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiNinjaStar } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from 'react-rating-stars-component'

const RenderCartCourses = () => {
    const {cart}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
  return (
    <div className='space-y-4 sm:space-y-6'>
      {
        cart.map((course,index)=>(
            <div key={index} className='bg-richblack-800 border border-richblack-700 rounded-lg p-4 sm:p-6 hover:border-richblack-500 transition duration-200'>
                {/* Mobile and Tablet Layout */}
                <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                    {/* Course Thumbnail */}
                    <div className='flex-shrink-0'>
                      <img 
                        src={course?.thumbnail} 
                        alt={course?.courseName}
                        className='w-full sm:w-40 md:w-48 h-40 sm:h-32 md:h-40  rounded'
                      />
                    </div>

                    {/* Course Details */}
                    <div className='flex-grow'>
                        <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white mb-2 line-clamp-2'>
                          {course?.courseName}
                        </h3>
                        
                        <p className='text-xs sm:text-sm text-richblack-300 mb-3'>
                          {course?.category?.name}
                        </p>

                        {/* Ratings Section */}
                        <div className='flex items-center gap-2 mb-4 flex-wrap'>
                            {/* <span className='text-sm font-medium text-richblack-200'>4.8</span> */}
                            <div className='flex gap-1'>
                              <ReactStars 
                                count={5}
                                size={18}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<GiNinjaStar/>}
                                fullIcon={<GiNinjaStar/>}
                              />
                            </div>
                            <span className='text-xs sm:text-sm text-richblack-400'>
                              {course?.ratingAndReviews?.length || 0} Ratings
                            </span>
                        </div>

                        {/* Price and Delete Button */}
                        <div className='flex items-center justify-between gap-4 mt-4 pt-4 border-t border-richblack-700'>
                          <p className='text-lg sm:text-xl md:text-2xl font-bold text-yellow-100'>
                            ₹{course?.price}
                          </p>
                          
                          <button 
                            onClick={()=>dispatch(removeFromCart(course._id))}
                            className='flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-richblack-700 hover:bg-richblack-600 text-pink-200 hover:text-pink-100 rounded transition duration-200 whitespace-nowrap'
                          >
                            <RiDeleteBin6Line className='text-base sm:text-lg'/>
                            <span className='hidden sm:inline'>Remove</span>
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
