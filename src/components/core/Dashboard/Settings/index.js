import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from "../../../common/IconBtn"
import { FaRegEdit } from "react-icons/fa";
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import ChangeProfilePicture from './ChangeProfilePicture';

const Settings = () => {
  const {user}=useSelector((state)=>state.profile)
  const navigate=useNavigate()
  return (
    <div>
      <h1 className="text-richblack-5 font-medium text-2xl sm:text-3xl p-2 sm:p-4">
       Edit Profile
      </h1>

       {/* Section1 */}
       {/* <div className="bg-richblack-800 w-full px-3 sm:px-5 py-3 flex flex-col sm:flex-row items-center justify-between rounded-md border border-richblack-700 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-6">
              <img 
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className='aspect-square w-16 sm:w-[78px] rounded-full object-cover' />
              <div className="text-center sm:text-left">
                  <p className="text-richblack-5  text-base sm:text-lg">Change Profile Picture</p>
                  <div className="flex justify-between gap-2">
                   <IconBtn 
                   text="Change"
                   customClasses={"bg-yellow-50 font-large text-richblack-900 px-3 sm:px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto"}/>
                   <IconBtn 
                   text="Remove"
                   customClasses={"bg-richblack-700 font-large text-richblack-50 px-3 sm:px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto"}/>
                  </div>
              </div>
          </div>
      
          
        </div> */}
        <ChangeProfilePicture/>

        {/* Section2 */}
        <EditProfile/> 

        {/* Section3      */}
        <UpdatePassword/>

        {/* Section4      */}
        <DeleteAccount/>
    </div>
  )
}

export default Settings
