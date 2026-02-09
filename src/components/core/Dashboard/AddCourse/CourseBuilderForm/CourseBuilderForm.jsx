import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import {GrAddCircle} from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux'

import {BiRightArrow} from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'
const CourseBuilderForm = () => {
  const {register,
    handleSubmit,
   setValue,
   formState:{errors}}=useForm();
   
   const dispatch=useDispatch()

   const goBack=()=>{
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
   }

   const {token}=useSelector((state)=>state.auth)
   const onSubmit=async (data)=>{
     let result;

     if(editSectionName){
      //we are editing the section name
      result=await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
        },token)
     }else{
      result=await createSection({
        sectionName:data.sectionName,
        courseId:course._id
      },token)
     }
     if(result){
      dispatch(setCourse(result))
      setEditSectionname(null)
      setValue("sectionName","")
     }
   }


   const gotoNext=()=>{
    if(course.courseContent.length===0){
      toast.error("Please add atleast one Section")
      return;
    }

    if(course.courseContent.some((section)=>section.subSection.length===0)){
      toast.error("Please add atleast one lecture in each section")
      return
    } 

    dispatch(setStep(3))
   }

   const cancelEdit=()=>{
    setEditSectionname(null);
    setValue("sectionName","")
   }

   const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName===sectionId){
      cancelEdit();
      return;
      
    }

    setEditSectionname(sectionId);
    setValue("sectionName",sectionName)
   }

   const [editSectionName,setEditSectionname]=useState(null);
   const {course}=useSelector((state)=>state.course)

  return (
    <div className='text-white bg-richblack-800 px-4 pt-2 rounded-lg'>
      <p className='text-3xl font-semibold py-2'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Section Name <sup className='text-pink-200'>*</sup> 
           </label>
            <input 
            id="sectionName"
            placeholder='Add Section'
            {...register("sectionName",{required:true})}
            className='w-full bg-richblack-700 text-richblack-200 px-8 py-3 rounded-lg mt-2'
            />
            {
              errors.sectionName &&(
                <span>Section Name is required</span>
              )
            }
        
        </div>
        <div className='mt-10 mb-2 flex w-full'>
          <IconBtn
          type="Submit"
          text={editSectionName?"Edit Section name":"Create Section"}
          outline={true}
          customClasses={'text-white border border-t-yellow-50     rounded-md px-5 py-2 flex flex-row-reverse gap-1'}
          >
            <GrAddCircle className='text-yellow-50 ' size={20}/>
          </IconBtn>
          {editSectionName && (
            <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline ml-10'>
              Cancel Edit
            </button>
          )}
          
          
        </div>
      </form>
      {
        course?.courseContent?.length>0 &&(
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
         
        )
      }

      <div className='flex justify-end gap-x-3'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center mb-2'>
          Back
        </button>
        <IconBtn text="Next" onclick={gotoNext} customClasses={"flex items-center mb-2"}>
          <BiRightArrow/>
        </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm
