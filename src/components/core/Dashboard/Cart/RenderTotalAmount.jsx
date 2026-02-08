import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI'
import ConfirmationModal from '../../../common/ConfirmationModal'

const RenderTotalAmount = () => {
    const {total,cart}=useSelector((state)=>state.cart)
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [confirmationModal,setConfirmationModal]=useState(null)

    const handleBuyCourse=()=>{
            const courses=cart.map((course)=>course._id)
            console.log("Bought these courses:",courses)
            //Todo:API integrate ->payment gateway tak leke jayegi
            if(token){
              buyCourse(token,courses,user,navigate,dispatch)
              return;
          }
  
          setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn2text:"Login",
            btn2text:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:setConfirmationModal(null)
          })
    }
    
  return (
    <div className='bg-richblack-800 border border-richblack-700 rounded-lg p-4 sm:p-6 md:p-8'>
      {/* Header */}
      <h2 className='text-lg sm:text-xl font-semibold text-richblack-100 mb-6 uppercase tracking-wide'>
        Order Summary
      </h2>

      {/* Divider */}
      <div className='border-t border-richblack-700 mb-6'></div>

      {/* Course Count */}
      <div className='flex justify-between items-center mb-4 text-richblack-300'>
        <p className='text-sm sm:text-base'>Courses ({cart.length})</p>
        <p className='text-sm sm:text-base font-medium'>₹{total}</p>
      </div>

      {/* Divider */}
      <div className='border-t border-richblack-700 my-6'></div>

      {/* Total Amount */}
      <div className='flex justify-between items-center mb-8'>
        <p className='text-base sm:text-lg font-semibold text-richblack-100'>
          Total Amount:
        </p>
        <p className='text-2xl sm:text-3xl font-bold text-yellow-100'>
          ₹{total}
        </p>
      </div>

      {/* Divider */}
      <div className='border-t border-richblack-700 mb-6'></div>

      {/* Buy Now Button */}
      <IconBtn 
        text="Buy Now" 
        onclick={handleBuyCourse} 
        customClasses={"w-full justify-center bg-yellow-50 text-richblack-900 font-semibold hover:bg-yellow-100 transition duration-200"}
      />

      {/* Additional Info */}
      <p className='text-xs sm:text-sm text-richblack-400 text-center mt-4'>
        Secure payment powered by Razorpay
      </p>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default RenderTotalAmount
