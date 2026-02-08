import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import {Link} from "react-router-dom"
import CTAButton from "../components/core/HomePage/Button"
import HighlightText from '../components/core/HomePage/HighlightText'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Footer from '../components/common/Footer'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>
      {/* Section1 */}
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-center '>
       <Link to={"/signup"}>
            <div className='group mt-10 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all  duration-200 group-hover:bg-richblack-900'>
                    <p>Become An Instructor</p>
                    <FaArrowRight/>
                </div>
            </div>
       </Link>

       <div className='text-center text-4xl font-semibold mt-7'>
       Empower Your future with
       <HighlightText text={" Coding Skills"} />
       </div>

       <div className='mt-4 w-[90%] text-center font-bold text-lg text-richblack-300'>
         With our online coding courses,you can learn at your own pace,from anywhere in the world ,and get access to welath resources ,including hands on projects,quizzes, and personlaized feedback for instructors
       </div>

       <div className='flex flex-row gap-7 mt-8 '>
        <CTAButton linkto={"/signup"} active={true}>
            Learn More
        </CTAButton>
        <CTAButton linkto={"login"} active={false}>
            Book A Demo
        </CTAButton>
       </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
    
       {/* Code Section1 */}
        <div>
            <CodeBlocks
            position={"lg:flex-row"}
            heading={
                <div className='text-4xl font-semibold'>
                    Unlock Your 
                    <HighlightText  text={" coding potential "}/>
                    with our onine courses
                </div>
            }
            subheading={
                "Our courses are designed and taught by industry experts who have years of experience"
            }
            ctabtn1={
                {
                    btnText:"Try it Yourself",
                    linkto:"/signup",
                    active:true
                }
            }
            ctabtn2={
                {
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false
                }
            }
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\nbody\nh1><a href="/">Header</a>\n/h1>\nnav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
            />
        </div>
       {/* Code Section2 */}
        <div>
            <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
                <div className='text-4xl font-semibold'>
                    Start
                    <HighlightText text={" coding in seconds "}/>
                </div>
            }
            subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={
                {
                    btnText:"Continue Lesson",
                    linkto:"/signup",
                    active:true
                }
            }
            ctabtn2={
                {
                    btnText:"Learn More",
                    linkto:"/login",
                    active:false
                }
            }
           codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\nbody\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><a href="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
            
            />
        </div>

            <ExploreMore/>

      </div>
      {/* Section2 */}
      <div className='bg-pure-greys-5  text-richblack-700'>
        <div className='homepage_bg h-[310px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                <div className='h-[150px]'></div>
                <div className='flex flex-row gap-7 text-white'>
                    <CTAButton  active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-3 '>
                            Explore Full Catalog
                        <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton  active={false} linkto={"/signup"}>
                        <div className='flex items-center gap-3 '>
                            Learn More
                        <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>

        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
        
            <div className="flex flex-row gap-5 mb-10  mt-[95px]">
                <div className='text-4xl font-semibold w-[45%]'>
                    Get the skills you need for a 
                    <HighlightText text={" Job that is in demand"} />
                </div>

                <div className="flex w-[40%] gap-10 flex-col items-start">
                    <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
         <TimelineSection/>
         <LearningLanguageSection/>
        </div>    


      </div>
      {/* Section3 */}

      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900 text-white '>
          <InstructorSection/>
          
          <div className='p-4 py-20'>

          <h2 className='text-center text-4xl font-semibold mt-18 py-4'>Reviews from other Learners</h2>
          <ReviewSlider/>
          </div>
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home
