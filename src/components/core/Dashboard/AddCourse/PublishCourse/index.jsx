import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

export default function  PublishCourse  ()  {
    const {register,handleSubmit,setValue,getValues}=useForm()
    const dispatch=useDispatch()
    const {token}=useSelector((state)=>state.auth)
    const {course}=useSelector((state)=>state.course)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
      if(course?.status===COURSE_STATUS.PUBLISHED){
        setValue("public",true)
      }
    },[course?.status, setValue])
    const goToCourses=()=>{
        dispatch(resetCourseState())
        // navigate('/dashboard/my-courses')
    }

    const handleCoursePublish=async()=>{

        if((course?.status===COURSE_STATUS.PUBLISHED && getValues("public")) || (course?.status===COURSE_STATUS.DRAFT && !getValues("public"))){
            //no form updation
            //no need to make api call
            goToCourses()
            return
        }
        //if form is updated
        const formData=new FormData();
        formData.append("courseId",course._id)
        const courseStatus=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT
        formData.append("status",courseStatus)

        setLoading(true)
        const result=await editCourseDetails(formData,token)

        if(result){
            goToCourses()
        }

        setLoading(false)
    }
    const onSubmit=()=>{

        handleCoursePublish()
    }

    const goBack=()=>{
        dispatch(setStep(2))
        dispatch(setEditCourse(true))
    }

  return (
    <div className='rounded-md border-[1px] p-6 bg-richblack-700 '>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)} action="">
            <div>
                <label htmlFor="public">
                <input 
                type="checkbox" 
                id='public'
                {...register("public")} 
                className='rounded h-4 w-4'/>
                <span className='ml-3'>Make this Course as Public</span>
                </label>
            </div>

            <div className='flex  justify-end gap-x-3'>
                <button 
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex items-center rounded-md bg-richblack-300 px-6 py-2 text-richblack-900 text-sm sm:text-base'>
                    Back
                </button>
                <IconBtn type={'submit'} disabled={loading} text="save changes" customClasses={'bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto'} />
            </div>
        </form>
    </div>
  )
}

