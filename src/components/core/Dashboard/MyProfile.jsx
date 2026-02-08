import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();

    // Force re-render when user data changes
    useEffect(() => {
      console.log("MyProfile - Current user data:", user)
    }, [user])
  return (
    <div className='text-white '>
      <h1 className="text-richblack-5 font-medium text-2xl sm:text-3xl p-2 sm:p-4">
        My Profile
      </h1>
      <div className="flex flex-col gap-4 px-2 sm:px-4 lg:px-6 py-2">
        {/* Section1 */}
        <div className="bg-richblack-800 w-full px-3 sm:px-5 py-3 flex flex-col sm:flex-row items-center justify-between rounded-md border border-richblack-700 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-6">
              <img 
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className='aspect-square w-16 sm:w-[78px] rounded-full object-cover' />
              <div className="text-center sm:text-left">
                  <p className="text-richblack-5 font-semibold text-base sm:text-lg">{user?.firstName +" "+user?.lastName}</p>
                  <p className='text-sm sm:text-md text-richblack-300 break-all sm:break-normal'>{user?.email}</p>
              </div>
          </div>
          <IconBtn
          text="Edit"
          onclick={()=>{
              navigate("/dashboard/settings")
          }}
          children={<FaRegEdit/>}
          customClasses={"bg-yellow-50 font-large text-richblack-900 px-3 sm:px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto"}
          />
          
        </div>

        {/* section2 */}
        <div className="bg-richblack-800 flex flex-col justify-around gap-4 sm:gap-6 w-full rounded-md border border-richblack-700 px-3 sm:px-5 py-3">
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
            <p className="text-richblack-5 font-semibold text-base sm:text-lg">About</p>
            <IconBtn
              text="Edit"
              onclick={()=>{
                navigate("/dashboard/settings")
            }}
            children={<FaRegEdit/>}
            customClasses={"bg-yellow-50 font-large text-richblack-900 px-3 sm:px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto"}
            />
          </div>
          <p className="text-richblack-300 text-sm sm:text-base">{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
        </div>

        <div className="bg-richblack-800 flex flex-col w-full rounded-md border border-richblack-700 px-3 sm:px-5 py-3">
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4'>
            <p className="text-richblack-5 font-semibold text-base sm:text-lg">Personal Details</p>
            <IconBtn
            text="Edit"
            onclick={()=>{
              navigate("/dashboard/settings")
          }}
          children={<FaRegEdit/>}
          customClasses={"bg-yellow-50 font-large text-richblack-900 px-3 sm:px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto"}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            
              <div>
                <p className='text-richblack-600 text-sm sm:text-md mb-1'>First Name</p>
                <p className='text-richblack-5 text-sm sm:text-md break-words'>{user?.firstName}</p>
              </div>
               <div>
              <p className='text-richblack-600 text-sm sm:text-md mb-1'>Last Name</p>
              <p className='text-richblack-5 text-sm sm:text-md break-words'>{user?.lastName}</p>
               </div>
          

            
                <div>
                  <p className='text-richblack-600 text-sm sm:text-md mb-1'>Email</p>
                  <p className='text-richblack-5 text-sm sm:text-md break-all'>{user?.email}</p>
                </div>
            
              <div>
                <p className='text-richblack-600 text-sm sm:text-md mb-1'>Phone Number</p>
                <p className='text-richblack-5 text-sm sm:text-md break-words'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
              </div>

           

            

              <div>
                <p className='text-richblack-600 text-sm sm:text-md mb-1'>Gender</p>
                <p className='text-richblack-5 text-sm sm:text-md break-words'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
              </div>
              <div>
                <p className='text-richblack-600 text-sm sm:text-md mb-1'>Date of Birth</p>
                <p className='text-richblack-5 text-sm sm:text-md break-words'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
              </div>
          
          </div>
        </div>

      </div>

    </div>
  )
}

export default MyProfile
