import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'
const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0])
    const [courses,setCourse]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter ((course)=>course.tag===value)
        console.log(result)
        setCourse(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }
  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12'>
      {/* Main Title Section */}
      <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center'>
        Unlock the 
        <HighlightText text={"Power of Code"}/>
      </div>
      
      {/* Subtitle */}
      <p className='text-center text-richblack-300 text-xs sm:text-sm md:text-base mt-3 md:mt-4'>
        Learn to build Anything you can imagine
      </p>

      {/* Tabs Section */}
{/* <div className="flex flex-row md:justify-center justify-start
                bg-richblack-800 md:rounded-full
                mb-8 md:mb-12 mt-6 md:mt-8
                border border-richblack-100
                px-2 sm:px-3 py-2
                overflow-x-auto
                gap-2 sm:gap-3
                scrollbar-hide">

  {tabsName.map((element, index) => (
    <div
      key={index}
      onClick={() => setMyCards(element)}
      className={`text-xs sm:text-sm md:text-base
                  flex items-center justify-center
                  whitespace-nowrap
                  px-4 sm:px-6 md:px-7 py-2
                  rounded-full
                  transition-all duration-200
                  cursor-pointer
                  ${
                    element === currentTab
                      ? "bg-richblack-900 font-medium text-richblack-5"
                      : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
                  }`}
    >
      {element}
    </div>
  ))}
</div> */}

<div
  className="
    flex flex-wrap md:flex-nowrap
    justify-center md:justify-around
    bg-richblack-800
    md:rounded-full
    mb-6 md:mb-12
    mt-4 md:mt-8
    border border-richblack-100
    px-2 sm:px-3 py-2
    gap-2
  "
>
  {tabsName.map((element, index) => (
    <div
      key={index}
      onClick={() => setMyCards(element)}
      className={`
        text-xs sm:text-sm md:text-base
        flex items-center justify-center
        whitespace-nowrap
        px-3 sm:px-5 md:px-7 py-2
        rounded-full
        transition-all duration-200
        cursor-pointer
        ${
          element === currentTab
            ? "bg-richblack-900 text-richblack-5 font-medium"
            : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
        }
      `}
    >
      {element}
    </div>
  ))}
</div>



      {/* Spacing */}
      <div className='h-16 sm:h-24 md:h-32 lg:h-[50px]'></div>

      {/* Courses Card Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 relative'>
        {
            courses.map((element,index)=>{
                return(
                    <CourseCard
                      key={index}
                      cardData={element}
                      currentCard={currentCard}
                      setCurrentCard={setCurrentCard}
                    />
                )
            })
        }
      </div>
    </div>
  )
}

export default ExploreMore
