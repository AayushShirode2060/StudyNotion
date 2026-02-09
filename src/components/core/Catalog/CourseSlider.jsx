import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Autoplay,Navigation,Pagination} from "swiper/modules"

import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <>
    {console.log("This are courses in courseslider",Courses)}
    {

        Courses?.length?(
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={100}
            modules={[Pagination,Autoplay,Navigation]}
            className='mySwiper'
            navigation={true}
            pagination={true}
            autoplay={{delay:2500,disableOnInteraction:false}}
            breakpoints={{
                1024:{slidesPerView:3}
            }}

            >
             {
                Courses?.map((course,index)=>(
                    
                    <SwiperSlide key={index}>
                        <CourseCard course={course} Height={"h-[350px]"}/>
                    </SwiperSlide>
                ))
             }
            </Swiper>
        ):(
            <p>No courses found</p>
        )
    }
      
    </>
  )
}

export default CourseSlider
