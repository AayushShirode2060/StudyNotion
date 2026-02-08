import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='font-semibold text-richblack-100  mx-auto text-center text-3xl  max-w-maxContent tracking-wider py-14 pb-20 px-8' >
      <span className='text-richblack-600'>&quot;</span> We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text={" combines technology"}/> ,
      <span className='bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'>
        {"expertise"}
      </span> , and community to create an  
      <span className='bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'>
      {" "}
      unparalleled educational experience.

      </span>

       <span className='text-richblack-600'>&quot;</span>
    </div>
  )
}

export default Quote
