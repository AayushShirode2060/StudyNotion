import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import RatingStars from '../../common/RatingStars'

const CourseCard = ({course,Height}) => {
    const [avgReviewCount,setAvgReviewCount]=useState(0)

    useEffect(()=>{
        const count=GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
    },[course])

    
    console.log("This are courses in course card",course)
  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div>
            <div>
                <img src={course?.thumbnail} alt="course ka thumbnail"
                className={`${Height} w-full rounded-xl object-cover`} />
            </div>
            <div>
                <p>{course?.courseName}</p>
                {console.log("This si instructors name",course)}
                <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className='flex gap-x-3'>
                    <span>{avgReviewCount ||0}</span>
                    <RatingStars Review_Count={avgReviewCount}/>
                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                </div>
                <p>{course?.price}</p>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard
