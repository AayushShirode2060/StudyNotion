import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm( )

    const submitContactForm=async(data)=>{
      console.log("Logging data",data)
      try{
        // const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)
        const response={status:"OK"}
        console.log("Logging Response ",response)
      }catch(error){
        console.log("Error:",error.message)
      }
    }

    useEffect(()=>{
      if(isSubmitSuccessful){
        reset({
          email:"",
          firstname:"",
          lastname:"",
          message:"",
          phoneNo:""
        })
      }
    },[reset,isSubmitSuccessful])


  return (
    <form  onSubmit={handleSubmit(submitContactForm)}>
      
      <div className='flex flex-col gap-5 my-10'>
      <div className='flex gap-5 my-1 justify-between '>
        {/* firstname */}
        <div className='flex flex-col w-1/2'>
          <label className='text-richblack-5 my-2' htmlFor='firstname'>First Name</label>
          <input type="text" 
          name='firstname'
          id="firstname"
          placeholder='Enter first name'
          className='text-richblack-200 bg-richblack-800 p-3 rounded-lg border-b border-b-richblack-400'
          {...register("firstname",{required:true})}
          
          />
          {
            errors.firstname && (
             <span>
             Please Enter Your name
             </span>
            )
          }
        </div>

         {/* lastname */}
        <div className='flex flex-col w-1/2'>
          <label className='text-richblack-5 my-2' htmlFor="lastname">Last Name</label>
          <input type="text" 
          name='lastname'
          id="lastname"
          className='text-richblack-200 bg-richblack-800 p-3 rounded-lg border-b border-b-richblack-400'
          placeholder='Enter last name'
          {...register("lastname")}
          
          />
          {
            errors.lastname && (
             <span>
             Please Enter Your last name
             </span>
            )
          }
        </div>
      </div>

        {/* email */}
        <div className='flex flex-col'>
          <label className='text-richblack-5 my-2' htmlFor="email">Email Address</label>
          <input type="email"
           name="email"
           id="email"
           className='text-richblack-200 bg-richblack-800 p-3 rounded-lg border-b border-b-richblack-400'
           placeholder='Enter Email Address'
           {...register("email",{required:true})}
          />
          {
            errors.email && (
              <span>
                Please Enter your email address
              </span>
            )
          }
        </div>

        {/* phoneno */}
        <div className='flex flex-col '>
            <label className='text-richblack-5 my-2' htmlFor="phoneno">Phone Number</label>
            <div className='flex flex-row  gap-5'>
               {/* dropdown */}
              
                  <select 
                  name="dropdown" 
                  id="dropdown"
                  className=' w-[80px] text-richblack-200 bg-richblack-800 p-3 pr-4 rounded-lg border-b border-b-richblack-400'
                  {...register("countrycode",{required:true})}
                  >
                      {
                          CountryCode.map((element,index)=>{
                            return(
                              <option  key={index} value={element.code}>
                                {element.code}-{element.country}
                              </option>
                            )
                          })
                      }

                  </select>
                

              
                  <input 
                  type="number" 
                  name='phonenumber'
                  id='phonenumber'
                
                  className=' w-[calc(100%-90px)] text-richblack-200 bg-richblack-800 p-3 rounded-lg border-b  border-b-richblack-400'
                  placeholder='12345 67890'
                  {...register("phoneNo",
                  {
                    required:true,maxLength:{value:10,message:"Invalid Phone number"},minLength:{value:8,message:"INvalid phone number"}
                  }
                  )
                  }
                  />
             
            </div>
            {
              errors.phoneNo && (
                <span>
                  please enter your phone no
                </span>
              )
            }
        </div>

        {/* message */}
        <div className='flex flex-col'>
          <label className='text-richblack-5 ' htmlFor="message">Message</label>
          <textarea
            name='message'
            id="message"
            cols="30"
            rows="7"
            placeholder='Enter Your message here'
             className='text-richblack-200 bg-richblack-800 p-3 rounded-lg border-b border-b-richblack-400 my-2'
            {...register("message",{required:true})}
          />
          {
            errors.message && (
              <span>
                Please enter your message
              </span>
            )
          }
        </div> 

        <button
        className='rounded-md bg-yellow-50 text-center px-6 py-2 text-[16px] font-semibold text-black' 
        type='submit'>
          Send Message
        </button>

      </div>
    </form>
  )
}

export default ContactUsForm
