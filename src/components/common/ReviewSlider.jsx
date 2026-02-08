import React, { useEffect, useState } from 'react'

import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import {Autoplay, FreeMode,Navigation,Pagination} from "swiper/modules"
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa'
const ReviewSlider = () => {
    const [reviews,setReviews]=useState([]);
    const truncateWords=15

    useEffect(()=>{
        const fetchAllReviews=async()=>{
           const response= await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
        //    console.log("Loggin resposne in rating",response)

           const {data}=response
           if(data?.success){
            setReviews(data?.data)
           }

           console.log("Printing Reviews",reviews)
        }
        fetchAllReviews()
    },[])
  return (
    <div className='text-white py-7'>
        
      <div className='h-[190px] max-w-maxContent  mx-2 flex flex-col '>
        <Swiper
        // slidesPerView={1}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        // navigation={true}
        pagination={true}
        className='mySwiper w-full  flex flex-col  '
         breakpoints={{
                640:{slidesPerView:1},
                768:{slidesPerView:2},
                1024:{slidesPerView:3},
                1280:{slidesPerView:4}
            }}
        >

{/* slidesPerView={1}
            loop={true}
            spaceBetween={200}
            modules={[Pagination,Autoplay,Navigation]}
            className='mySwiper'
            navigation={true}
            pagination={true}
            autoplay={{delay:2500,disableOnInteraction:false}}
            breakpoints={{
                1024:{slidesPerView:3}
            }} */}
            {
                reviews.map((review,index)=>(
                    <SwiperSlide key={index} className='bg-richblack-800 h-60 py-1'>
                      <div className='flex px-3 py-1 justify-start gap-3 items-center'>
                        <img src={review?.user?.image ? review?.user?.image:`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                         alt=""
                         className='h-9 w-9 object-cover rounded-full' />
                         <div className=''>
                         <p className='text-lg text-richblack-50'>{review?.user?.firstName}</p>
                         <p className='text-richblack-500 text-md'>{review?.course?.courseName}</p>
                          </div>

                      </div>
                      <div className='flex flex-col px-2'>
                         <p className='text-richblack-50'>
                            {review?.review}        
                         </p>

                        <div className='flex flex-row justify-start gap-2 items-center'>
                         <p>{review?.rating.toFixed(1)}</p>

                         <ReactStars
                         count={5}
                         value={review?.rating}
                         size={20}
                         edit={false}
                         activeColor={"#ffd700"}
                         emptyIcon={<FaStar/>}
                         fullIcon={<FaStar/>}
                         />

                        </div>

                      </div>

                    </SwiperSlide>
                    )
                )
            }

        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
