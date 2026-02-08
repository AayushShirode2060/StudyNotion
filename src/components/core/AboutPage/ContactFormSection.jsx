import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = ({title,desc}) => {
  return (
    <div className="border border-richblack-600 rounded-xl px-6 py-5">
      <h1 className='text-4xl w-4/5 font-semibold text-center mx-auto my-2'>
        {title}
      </h1>
      <p className='text-richblack-300 text-center '>{desc}</p>
      <div>
         <ContactUsForm/>
      </div>
      
    </div>
  )
}

export default ContactFormSection
