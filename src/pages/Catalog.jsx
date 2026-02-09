import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import CourseCard from '../components/core/Catalog/CourseCard'
import CourseSlider from '../components/core/Catalog/CourseSlider'

const Catalog = () => {
    const {catalogName}=useParams()
    const [catalogPageData,setCatalogPageData]=useState(null)
    const [categoryId,setCategoryid]=useState("")

    //Fetch all categories
    useEffect(()=>{
        const getCategories=async()=>{
            const res=await apiConnector("GET",categories.CATEGORIES_API);
            const list = res?.data?.allCategories || []
            const match = list.find((ct)=>
                ct?.name?.split(" ").join("-").toLowerCase()===catalogName
            )
            if (match && match._id) {
                setCategoryid(match._id)
            } else {
                setCategoryid("")
            }
        }
        getCategories()
    },[catalogName])

    useEffect(()=>{
     const getCategoryDetails=async()=>{
        if (!categoryId) { return }
        try{
            const res=await getCatalogPageData(categoryId)
            console.log("Printing res: ",res)
            setCatalogPageData(res)
            // console.log("This is catalog page data ",catalogPageData)
        }catch(error){
            console.log(error)
        }
     }

     getCategoryDetails()
    },[categoryId])
  return (
    <div className='text-white'>
        
        {/* Breadcrumb Section */}
        <div className='px-4 py-4 sm:px-6 md:px-8 lg:px-12'>
            <p className='text-xs sm:text-sm md:text-base text-richblack-300'>{`Home/Catalog/`}
                <span className='font-semibold'>
                    {catalogPageData?.data?.selectedCategory?.name}
                </span>
            </p>
        </div>

        {/* Header Section */}
        <div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4'>
                {catalogPageData?.data?.selectedCategory?.name}
            </h1>
            <p className='text-xs sm:text-sm md:text-base lg:text-lg text-richblack-300 leading-relaxed'>
                {catalogPageData?.data?.selectedCategory?.description}
            </p>
        </div>

        <div className='px-4 sm:px-6 md:px-8 lg:px-12'>
            {/* Section1: Most Popular & New */}
            <div className='py-8'>
                <div className='flex gap-x-3 mb-6'>
                    <button className='px-3 sm:px-4 md:px-6 py-2 text-sm sm:text-base border border-richblack-300 rounded hover:bg-richblack-700 transition'>
                        Most Popular
                    </button>
                    <button className='px-3 sm:px-4 md:px-6 py-2 text-sm sm:text-base border border-richblack-300 rounded hover:bg-richblack-700 transition'>
                        New
                    </button>
                </div>
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.course}/>
            </div>

            {/* Section2: Top Courses */}
            <div className='py-8'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6'>
                    Top Courses
                </h2>
                <div>
                    {console.log("this are different category courses",catalogPageData?.data?.differentCategory?.course)}
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}/>
                </div>
            </div>

            {/* Section3: Frequently Bought Courses */}
            <div className='py-8 md:py-12'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8'>
                    Frequently Bought Courses
                </h2>
                <div className='py-6 md:py-8'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                        {console.log("This is catalog page data ", catalogPageData)}
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course,i)=>(
                                <CourseCard course={course} key={i} Height={"h-[250px] sm:h-[300px] lg:h-[400px]"}/>
                             ) )
                        }
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
   </div>
  )
}

export default Catalog