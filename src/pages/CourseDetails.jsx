import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
// import { getAverageRating } from '../../server/controllers/RatingAndReview';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from "../components/common/RatingStars"
import { formatDate } from '../services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import { FiCalendar, FiGlobe, FiUsers, FiMessageCircle } from 'react-icons/fi';
import { IoStar } from 'react-icons/io5';
const CourseDetails = () => {
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {courseId}=useParams();
    const {loading}=useSelector((state)=>state.profile)
    const {paymentLoading}=useSelector((state)=>state.course)
   
    const [courseData,setCourseData]=useState(null)
    const [confirmationModal,setConfirmationModal]=useState(null)
    // const [response,setResponse]=useState(null)

    const [isActive,setIsActive]=useState(Array(0))
    const [timeDuration,setTimeDuration]=useState(0);

    const handleActive=(id)=>{
      setIsActive(
        !isActive.includes(id)
        ? isActive.concat([id])
        :isActive.filter((e)=>e!=id)
      )
    }

      useEffect(()=>{

        const getCourseFullDetails=async()=>{
          
          try{
            const result=await fetchCourseDetails(courseId);
            setCourseData(result)
            console.log("Printing CourseData->",result)
  
          }catch(error){
            console.log("Could not fetch course details")
          }


        }

        getCourseFullDetails()
      },[courseId])

      const [avgReviewCount,setAvgReviewCount]=useState(0)

      const [totalNoOflectures,setTotalNoOfLectures]=useState(null)

      useEffect(()=>{
        const count=GetAvgRating(courseData?.data[0]?.ratingAndReviews)
        setAvgReviewCount(count)

      },[courseData])

      useEffect(()=>{
        let lectures=0;
        courseData?.data?.courseDetails?.courseContent?.foreach((sec)=>{
          lectures+=sec.subSection.length || 0
        })

        setTotalNoOfLectures(lectures)
      },[courseData])

      //To update
    const handleBuyCourse=()=>{
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch)
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

     function duration(){
        const time=courseData?.data[0]?.courseContent[0]?.subSection.reduce((acc,curr)=>{
          acc+=curr.timeDuration ||0
          console.log("this is acc",acc,)
          return acc
        },0)

        console.log("this is time",time)

        setTimeDuration(Math.round(time))
    }

    useEffect(()=>{
      duration()
    },[courseData])

    console.log("this si time duration",timeDuration)
   

    if(loading || !courseData){
      return (
        <div>
          Loading...
        </div>
      )
    }

    if(!courseData.success){
      return (
        <div>
          <Error/>
        </div>
      )
    }

    const {_id:course_id,courseName,courseDescription,thumbnail,price,whatYouWillLearn,courseContent,ratingAndReviews,instructor,studentsEnrolled,createdAt}=courseData.data[0]
  return (
    <>
    <div className='flex flex-col text-white min-h-screen bg-richblack-900'>

    {/* Hero Section */}
    <div className='w-full bg-gradient-to-b from-richblack-800 to-richblack-900 px-4 md:px-8 py-8 md:py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
          {/* Left Content - Course Info */}
          <div className='lg:col-span-2 flex flex-col gap-6'>
            {/* Course Title */}
            <div>
              <h1 className='font-bold text-3xl md:text-5xl text-white leading-tight mb-3'>
                {courseName}
              </h1>
              <p className='text-richblack-300 text-lg md:text-xl leading-relaxed'>
                {courseDescription}
              </p>
            </div>

            {/* Rating and Stats Section */}
            <div className='flex flex-col gap-4'>
              {/* Rating */}
              <div className='flex flex-wrap items-center gap-3 md:gap-4'>
                <div className='flex items-center gap-1 bg-richblack-800 px-4 py-2 rounded-lg'>
                  <span className='text-yellow-50 font-bold text-lg'>{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={20}/>
                </div>
                <span className='text-richblack-300 text-sm md:text-base'>
                  {`(${ratingAndReviews.length} reviews)`}
                </span>
                <div className='hidden sm:flex items-center gap-2 text-richblack-300'>
                  <FiUsers className='text-yellow-50' />
                  <span className='text-sm md:text-base'>{`${studentsEnrolled.length} students`}</span>
                </div>
              </div>

              {/* Mobile Students Count */}
              <div className='sm:hidden text-richblack-300 text-sm flex items-center gap-2'>
                <FiUsers className='text-yellow-50' />
                {`${studentsEnrolled.length} students enrolled`}
              </div>
            </div>

            {/* Instructor and Meta Info */}
            <div className='border-t border-richblack-700 pt-6 space-y-4'>
              {/* Instructor */}
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center'>
                  <span className='font-bold text-richblack-900'>{instructor.firstName.charAt(0)}</span>
                </div>
                <div>
                  <p className='text-richblack-300 text-sm'>Created by</p>
                  <p className='text-white font-semibold text-base md:text-lg'>
                    {instructor.firstName} {instructor.lastName}
                  </p>
                </div>
              </div>

              {/* Date and Language */}
              <div className='flex flex-col sm:flex-row gap-4 md:gap-8'>
                <div className='flex items-center gap-3'>
                  <FiCalendar className='text-yellow-50 text-lg' />
                  <div>
                    <p className='text-richblack-300 text-xs md:text-sm'>Created</p>
                    <p className='text-white font-semibold text-sm md:text-base'>{formatDate(createdAt)}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <FiGlobe className='text-yellow-50 text-lg' />
                  <div>
                    <p className='text-richblack-300 text-xs md:text-sm'>Language</p>
                    <p className='text-white font-semibold text-sm md:text-base'>English</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Course Card */}
          <div className='lg:col-span-1'>
        <CourseDetailsCard
          course={courseData?.data[0]}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
          </div>
        </div>
      </div>
    </div>

    {/* What You Will Learn Section */}
    <div className='w-full px-4 md:px-8 py-12 bg-richblack-900'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='font-bold text-2xl md:text-4xl text-white mb-6'>What you will learn</h2>
        <div className='bg-richblack-800 rounded-lg p-6 md:p-8 border border-richblack-700'>
          <p className='text-richblack-200 text-base md:text-lg leading-relaxed'>
            {whatYouWillLearn}
          </p>
        </div>
      </div>
    </div>

    {/* Course Content Section */}
    <div className='w-full px-4 md:px-8 py-12 bg-richblack-900'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='font-bold text-2xl md:text-4xl text-white mb-8'>Course Content</h2>

        {/* Course Stats */}
        <div className='flex flex-col sm:flex-row gap-4 md:gap-8 mb-8 bg-richblack-800 p-6 rounded-lg border border-richblack-700'>
          <div className='flex-1 flex items-center gap-2'>
            <span className='text-yellow-50 font-bold text-lg'>{courseContent.length}</span>
            <span className='text-richblack-200'>section(s)</span>
          </div>
          <div className='flex-1 flex items-center gap-2'>
            <span className='text-yellow-50 font-bold text-lg'>{totalNoOflectures}</span>
            <span className='text-richblack-200'>lectures</span>
          </div>
          <div className='flex-1 flex items-center gap-2'>
            <span className='text-yellow-50 font-bold text-lg'>{timeDuration}</span>
            <span className='text-richblack-200'>total length</span>
          </div>

          <button 
            onClick={()=>setIsActive([])}
            className='mt-4 sm:mt-0 px-6 py-2 bg-yellow-50 text-richblack-900 font-semibold rounded-lg hover:bg-yellow-100 transition-colors duration-200'
          >
            Collapse all
          </button>
        </div>

        {/* Accordion Content */}
        <div className='space-y-4 mb-12'>
          {
            courseContent?.map((course,index)=>(
              <CourseAccordionBar
                course={course}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))
          }
        </div>
      </div>
    </div>

    {/* Author Section */}  
    <div className='w-full px-4 md:px-8 py-12 bg-richblack-800'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='font-bold text-2xl md:text-4xl text-white mb-8'>About the instructor</h2>
        <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-richblack-700 p-8 rounded-lg border border-richblack-600'>
          <img 
            className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-yellow-50 shadow-lg' 
            src={courseData.data[0]?.instructor.image} 
            alt="instructor image" 
          />
          <div className='flex flex-col gap-2 flex-1'>
            <h3 className='text-xl md:text-2xl font-bold text-white'>
              {courseData.data[0]?.instructor.firstName} {courseData.data[0]?.instructor.lastName}
            </h3>
            <p className='text-richblack-300 text-sm md:text-base leading-relaxed'>
              {courseData.data[0]?.instructor.additionalDetails.about}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
    </>
  )
}

export default CourseDetails

//razorpay steps
//step1 :load ths sript
