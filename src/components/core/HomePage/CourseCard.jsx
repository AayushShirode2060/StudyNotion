import React from 'react'

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData.heading

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`cursor-pointer rounded-md p-4 transition-shadow duration-150 ${isActive ? 'ring-2 ring-offset-2 ring-yellow-200 bg-richblack-500' : 'bg-richblack-400 hover:shadow-lg'}`}>
      <div>
        <h2 className='font-semibold text-lg'>{cardData.heading}</h2>
        <p className='text-black mt-2'>{cardData?.description}</p>
        <div className='mt-3 text-sm'>{cardData.lessionNumber}</div>
        <div className='text-sm'>{cardData.level}</div>
      </div>
    </div>
  )
}

export default CourseCard
