import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
import { FiPlus } from "react-icons/fi";
import CoursesTable from './InstructorCourses/CoursesTable'

const MyCourses = () => {
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const [courses,setCourses]=useState([]) 
    useEffect(()=>{
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setCourses(result)
            }
        }
        fetchCourses()
    },[token])
  return (
    <div className='text-white'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>My Course</h1>
        <IconBtn
        text={"Add Course"}
        onclick={()=>navigate("/dashboard/add-course")}
        customClasses={"flex items-center justify-between gap-1 bg-yellow-50 px-2 py-1 rounded-md text-richblack-900"}
        >
            <FiPlus />
        </IconBtn>
      </div>

      {
        courses && <CoursesTable courses={courses} setCourses={setCourses}/>     
     }
    </div>
  )
}

export default MyCourses
