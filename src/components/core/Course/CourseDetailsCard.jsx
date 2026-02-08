import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'
import { FiShare2 } from 'react-icons/fi'
import { BiCheckCircle } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { IoRocketSharp } from 'react-icons/io5'

function CourseDetailsCard ({course,setConfirmationModal,handleBuyCourse}) {
  const {thumbnail:ThumbnailImage,price:CurrentPrice,}=course
  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
    const handleShare=()=>{
        copy(window.location.href)
        toast.success("Link copied to clipboard")

    }
  const goToCourse = () => {
    const courseId = course?._id
    const firstSectionId = course?.courseContent?.[0]?._id
    const firstSubSectionId = course?.courseContent?.[0]?.subSection?.[0]?._id

    if (courseId && firstSectionId && firstSubSectionId) {
      navigate(`/view-course/${courseId}/section/${firstSectionId}/sub-section/${firstSubSectionId}`)
      return
    }
    
    navigate('/dashboard/enrolled-courses')
  }
  const handleAddToCart=()=>{
    if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an instructor you cant buy a course")
        return
    }
    if(token){
        dispatch(addToCart(course))
        return
    }
    setConfirmationModal({
        text1:"you are not logged in",
        text2:"Please login to add to cart",
        btn1Text:"login",
        btn2Text:"cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setConfirmationModal(null)
    })
  }

    return (
    <div className='w-full  bg-richblack-800 py-6 px-4 rounded-xl border-2 border-richblack-700'>
      {/* Course Image */}
      <img 
        src={ThumbnailImage} 
        alt="Course Thumbnail"
        className='w-full h-auto max-h-[300px] min-h-[180px] object-cover rounded-lg shadow-md ' 
      />

      {/* Price Section */}
      <div className='mt-6 mb-6'>
        <p className='text-3xl md:text-4xl font-bold text-white'>
          Rs. {CurrentPrice}
        </p>
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-y-3 mb-8'>
        <button
          className='w-full px-6 py-3 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition duration-200 ease-in-out transform hover:scale-105'
          onClick={
              user && course?.studentsEnrolled.includes(user?._id)
              ? goToCourse
              : handleBuyCourse
          }
        >
          {
              user && course?.studentsEnrolled.includes(user?._id) ?"Go to course":"Buy Now"
          }
        </button>

        {
            ( !course?.studentsEnrolled.includes(user?._id) ) &&(
                <button 
                  onClick={handleAddToCart}  
                  className='w-full px-6 py-3 bg-richblack-700 text-yellow-50 font-semibold rounded-lg hover:bg-richblack-600 transition duration-200 ease-in-out border border-yellow-50'
                >
                    Add to cart
                </button>
            )
        }
      </div>

      {/* Course Benefits Section */}
      <div className='border-t border-richblack-500 pt-6 mb-6'>
        <p className='text-lg font-semibold text-richblack-5 mb-2'>
          30 Day Money-Back Guarantee
        </p>
        
        {/* <p className='text-lg font-semibold text-richblack-5 mb-4'>
          This Course includes:
        </p> */}

        {/* Instructions List */}
        <div className='flex flex-col gap-y-3'>
          {
              course?.instructions?.map((item,index)=>(
                  <p key={index} className='flex items-center gap-3 text-richblack-200'>
                      <BiCheckCircle className='flex-shrink-0 text-green-400 text-xl' />
                      <span className='text-sm md:text-base'>{item}</span>
                  </p>
              ))
          }
        </div>
      </div>

      {/* Share Section */}
      <div className='border-t border-richblack-500 pt-6'>
        <button 
          onClick={handleShare}
          className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-richblack-700 text-yellow-50 font-semibold rounded-lg hover:bg-richblack-600 transition duration-200 ease-in-out'
        >
          <FiShare2 className='text-lg' />
          Share
        </button>
      </div>
    </div>
    
  )
}

export default CourseDetailsCard
