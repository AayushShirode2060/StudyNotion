import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningPage from '../components/core/AboutPage/LearningPage'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'
const About = () => {
  return (
    <div className=' mx-auto w-full  text-white '>
      {/* section1 */}
      <section className='bg-richblack-800 pt-12'>
        <div className='flex flex-col items-center justify-center '>
            <div className='text-richblack-300 text-center mx-auto mb-4'>About Us</div>
            <header className='text-richblack-5 '>
               <h1 className='font-semibold text-4xl text-center mx-auto  w-10/12 lg:w-5/12 p-2'> Driving innovation in Online Education for a 
                <HighlightText text={" Brighter Future"}/></h1>
                <p className="text-richblack-300 text-[16px] text-center lg:w-5/12 mx-auto tracking-wider p-8">
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
            </header>   
            <div className='flex flex-col gap-y-6 md:flex-row md:gap-x-3 mx-auto items-center justify-center px-4  translate-y-20'>
                <img src={BannerImage1} alt="" />
                <img src={BannerImage2} alt="" />
                <img src={BannerImage3} alt="" />

            </div>
        </div>        
      </section>
      { /* section2 */}
      <section> 
        <div className='mt-32'>
            <Quote/>
            <hr className='border-t-2 border-richblack-700'/>
        </div>

      </section>
    {/* section3 */}
        <section className=''>
            <div className='flex  flex-col items-center justify-center'>
                    {/* Founding story wala div */}
                <div className='grid-cols-1 md:grid-cols-2 grid mx-auto w-11/12 max-w-maxContent gap-10 py-10 px-4'>
                    {/* founding story wala left div */}
                   <div className='flex flex-col  w-9/12 gap-6  p-2 mx-auto'>
                        <h1 className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]  bg-clip-text text-transparent font-bold text-3xl">Our Founding Story</h1>
                        <p className='text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>

                    </div> 
                    {/* founding story wala right div */}
                    <div className=' p-2 m-auto w-9/12'>
                        <img src={FoundingStory} alt="" />
                    </div>
                </div>
                    {/* vision and mission wala parent div */}
                    <div className='grid grid-cols-1 md:grid-cols-2 mx-auto w-11/12 max-w-maxContent gap-10 py-10 px-8'>
                    {/* left box */}
                        <div className='flex flex-col  w-9/12 gap-6 p-2 mx-auto'>
                            <h1 className='font-bold text-3xl bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent'>Our Vision</h1>
                            <p className='text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                    {/* right box */}
                        <div className='flex flex-col  w-9/12 gap-6 p-2 mx-auto '>
                            <h1 className='font-bold text-3xl bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>Our Mission</h1>
                            <p className='text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
            </div>
        </section>

    {/* section4 */}
    <StatsComponent/>

    {/* section5 */}
    <section className='w-full mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <LearningPage/>
        <ContactFormSection title="Get In Touch" desc="We'd love to here for you ,please fill out this form"/>
    </section>

    <section className='mx-auto  w-2/3 py-8'>
        <div className='text-4xl font-semibold text-center mx-auto py-4'>
            Review from other learners
        </div>
        {/* Review slider */}
        <ReviewSlider/>
    </section>

    <Footer/>
    </div>
    
  )
}

export default About
