import React from 'react'
import { BiSolidPhone } from 'react-icons/bi'
import { BsGlobeEuropeAfrica } from 'react-icons/bs'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const ContactUs = () => {
  return (
   <div className='text-white mt-12 p-6'>
    {/* section1 */}
     <div className='flex  flex-col md:flex-row mx-auto justify-center gap-12'>
            {/* 3 subsections */}
        <div className='bg-richblack-800 md:w-1/5 md:max-h-[35vh] flex flex-col rounded-lg space-y-4  px-8 py-5 '>
            <div className='flex items-start gap-1 '>
                <HiChatBubbleLeftRight className='text-richblack-5'/>
                <div>
                    <h1 className='text-richblack-5 text-lg font-semibold'>Chat on us</h1>
                    <p className='text-richblack-200 text-md'>Our friendly team is here to help</p>
                    <p  className='text-richblack-200 text-md'>@mail address</p>
                </div>
            </div>
            <div className='flex items-start gap-1'>
                <BsGlobeEuropeAfrica className='text-richblack-5'/>
                <div>
                    <h1 className='text-richblack-5 text-lg font-semibold'>Visist Us</h1>
                    <p className='text-richblack-200 text-md'>Come and say hello at our office HQ</p>
                    <p  className='text-richblack-200 text-md'>Here is the location/address</p>
                </div>
            </div>
            <div className='flex items-start gap-1'>
                <BiSolidPhone className='text-richblack-5'/>
                <div>
                    <h1 className='text-richblack-5 text-lg font-semibold'>Call us</h1>
                    <p className='text-richblack-200 text-md'>Mon-Fri From 8am to 5pm</p>
                    <p  className='text-richblack-200 text-md'>+123 456 7890</p>
                </div>
            </div>
        </div>
                {/* ContactusForm */}
        <div className="md:w-2/5">
            <ContactFormSection title="Got a Idea? We’ve got the skills. Let’s team up" desc="Talk us more about yourself and what you’re got in mind."/>
        </div>
     </div>
     {/* section2-Review */}
     <div className='flex flex-col justify-center items-center py-8 lg:py-20'>
        <h1 className='font-bold items-center text-3xl'>Review From Other Learners</h1>
        <div>
            <ReviewSlider/>
        </div>
     </div>
     {/* Footer */}
    <Footer/>
   </div>
  )
}

export default ContactUs