import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import RequirementFields from './RequirementFields';
import Upload from '../Upload';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from "../../../../common/IconBtn"
import { COURSE_STATUS } from '../../../../../utils/constants';
import toast from 'react-hot-toast';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit ,
        setValue,
        getValues,
        formState:{errors},
    }=useForm();

    const dispatch=useDispatch()
    const {token}=useSelector((state)=>state.auth)
    const {course,editCourse}=useSelector((state)=>state.course)
    const [loading,setLoading]=useState(false);
    const [courseCategories,setCourseCategories]=useState([])

    // Fetch categories on mount
    useEffect(()=>{
        const getCategories=async()=>{
            setLoading(true);
            const categories=await fetchCourseCategories()
            console.log("This are course categories",categories)
            if(Array.isArray(categories) && categories.length>0){
                setCourseCategories(categories)
            }
            setLoading(false)
        }
        getCategories();
    },[])

    // Prefill form values if editing a course
    useEffect(()=>{
        if(editCourse && course){
            setValue("courseTitle",course.courseName)
            setValue("courseShortDesc",course.courseDescription)
            setValue("coursePrice",course.price)
            setValue("courseTags",course.tag)
            setValue("courseBenefits",course.whatYouWillLearn)
            setValue("courseCategory",course.category)
            setValue("courseRequirements",course.instructions)
            setValue("courseImage",course.thumbnail)
        }
    },[editCourse, course, setValue])
 
    const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.courseName ||
            // currentValues.courseTags.toString()!==course.tag.toString() ||
            currentValues.courseBenefits !==course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.courseCategories._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() 
            )
            return true;
        else 
            return false;
    }

    const onSubmit=async(data)=>{
       if(editCourse){
        if(isFormUpdated){
        const currentValues=getValues()
        const formData=new FormData()

        formData.append("courseId",course._id)
        if(currentValues.courseTitle !== course.courseName){
            formData.append("courseName",data.courseTitle)
        }
        if(currentValues.courseShortDesc !== course.courseDescription){
            formData.append("courseDescription",data.courseShortDesc)
        }
        if(currentValues.coursePrice !== course.price){
            formData.append("price",data.coursePrice)
        }
        if(currentValues.Benefits !== course.whatYouWillLearn){
            formData.append("whatYouWillLearn",data.courseBenefits)
        }
        if(currentValues.courseCategory._id !== course.category._id){
            formData.append("category",data.courseCategory)
        }
        if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
            formData.append("instructions",JSON.stringify(data.courseRequirements))
        }
        if(currentValues.courseImage !== course.thumbnail){
            formData.append("thumbnailImage",data.courseImage)
        }

        setLoading(true)
        console.log("before add course API call")
        const result=await editCourseDetails(formData,token)
        
        
       
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result))
        }
        setLoading(false)

        console.log('printing Form Data',formData)
        console.log("Printing result",result)
        }else{
            toast.error("No changes made so far" )
          }
          return
        
       }

       //create a new course
       const formData=new FormData();
       formData.append("courseName",data.courseTitle)
       formData.append("courseDescription",data.courseShortDesc)
       formData.append("price",data.coursePrice)
       formData.append("whatYouWillLearn",data.courseBenefits)
       formData.append("category",data.courseCategory)
       formData.append("instuctions", JSON.stringify(data.courseRequirements))
       formData.append("status",COURSE_STATUS.DRAFT)
       formData.append("thumbnailImage",data.courseImage)

       setLoading(true)

       const result=await addCourseDetails(formData,token)
       if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))
       }

       setLoading(false)



    }

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >
        <div className=''>
            <label className=''>Course Title <sup className='text-pink-200'>*</sup></label>
            <input id="courseTitle" 
            placeholder='Enter Course Title'
            {...register("courseTitle",{required:true})}
            className='w-full bg-richblack-700 text-richblack-200 px-8 py-3 mx-2 my-1 rounded-lg'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is required</span>
                )
            }
        </div>
        <div>
            <label htmlFor='courseShortDesc'>Course Short Description <sup className='text-pink-200'>*</sup></label>
            <textarea
           
            id="courseShortDesc"
            placeholder='Enter Description'
            {...register("courseShortDesc",{required:true})}
            className='min-h-[140px] w-full bg-richblack-700 text-richblack-200 px-8 py-3 mx-2 my-1 rounded-lg'/>
            {errors.courseShortDesc && (<span>
                Course Description is required
            </span>)}
           
        </div>
        <div className="relative">
            <label htmlFor='coursePrice'>Course Price <sup className='text-pink-200'>*</sup></label>
            <input
           
            id="coursePrice"
            placeholder='Enter Course Price'
            {...register("coursePrice",{
                required:true,
                valueAsNumber:true,
            
            })}
            className='w-full bg-richblack-700 text-richblack-200 px-8 py-3 mx-2 my-1 rounded-lg'/>
            <HiOutlineCurrencyRupee className="absolute top-1/2 left-4 text-richblack-400"/>
            {errors.coursePrice && (<span>
                Course Price is required
            </span>)}
           
        </div>
        <div>
            <label htmlFor='courseCategory' >Course Category <sup className='text-pink-200'>*</sup></label>
            <select
            name="" 
             id="courseCategory"
             defaultValue=""
             {...register("courseCategory",{required:true})}
             className='bg-richblack-700 p-2 rounded-md'
             >
               <option value="" disabled className='bg-richblack-700 text-richblack-200'>Choose a Category</option>
               {
                   !loading && courseCategories.map((category)=> (
                       <option value={category?._id} className='bg-richblack-700 text-richblack-200' key={category?._id}>
                           {category?.name}
                       </option>
                   ))
               }
             </select>
             {
                errors.courseCategory &&(
                    <span>
                        Course Category is required
                    </span>
                )
             }
        </div>

        {/* create a custom component for handling tags input  */}
        {/* <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        /> */}

        {/* create a component for uploading and showing preview of media */}
            
            <Upload 
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                errors={errors}
                setValue={setValue}
            />

            {/* Beenefits of  the course */}
            <div>
                <label htmlFor='coursebenefits'>Benefits of the course <sup className='text-pink-200'>*</sup></label>
                <textarea 
               
                id="coursebenefits"
                placeholder='Enter Benefits'
                {...register("courseBenefits",{required:true})}
                className='min-h-[130px] w-full bg-richblack-700 text-richblack-200 px-8 py-3 mx-2 my-1 rounded-lg'
                />
                {
                    errors.courseBenefits &&(
                        <span>
                            Benefits of the course are required
                        </span>
                    )
                }
            </div>
            <RequirementFields
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            />

            <div>
                {
                    editCourse && (
                        <button
                        onClick={()=>dispatch(setStep(2))}
                        className='flex items-center gap-x-2 bg-richblack-300'
                        >
                            Continue Without Saving
                        </button>
                    )
                }
                <IconBtn
                
                text={!editCourse ?"Next":"Save Changes"}
                type="submit"
                customClasses={"bg-yellow-50 font-large text-richblack-900 px-3 sm:px-4 py-2 rounded-md flex items-center justify-between gap-1 text-sm sm:text-base w-full sm:w-auto"}
                />
            </div>
    </form>
  )
}

export default CourseInformationForm