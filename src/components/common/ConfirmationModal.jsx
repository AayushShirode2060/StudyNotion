import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="px-4 sm:px-8 lg:px-12 py-3   sm:py-4 w-full max-w-md sm:max-w-lg mx-auto bg-richblack-800 rounded-md border border-richblack-700">
        <div className='flex flex-col gap-4 sm:gap-5'>
            <p className='text-richblack-5 font-semibold text-lg sm:text-xl text-center'>
                {modalData.text1}
            </p>
            <p className='text-richblack-300 text-sm sm:text-base text-center leading-relaxed'>
                {modalData.text2}
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
                <IconBtn
                customClasses={"bg-yellow-50 font-semibold text-richblack-900 px-4 sm:px-6 py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto hover:bg-yellow-100 transition-colors"}
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
                />
                <button onClick={modalData?.btn2Handler}
                 className='font-semibold text-richblack-900 px-4 sm:px-6 py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto bg-richblack-300 hover:bg-richblack-200 transition-colors'>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
   </div>
  )
}

export default ConfirmationModal