
import React from 'react'
import LogoImg from "../../assets/Logo/Logo-Full-Light.png"
import { PiGoogleLogoFill ,PiFacebookLogoDuotone,PiTwitterLogoFill,PiYoutubeLogoFill } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="bg-richblack-800 flex flex-col w-full">
      <div className="FBox w-[95%] md:w-[90%] lg:w-[80%] mx-auto flex flex-col md:flex-row gap-6 md:gap-0">
        { /* First Section */}
        <div className="firstSec w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col sm:flex-row">
            {/* Logo and Company */}
            <div className="firstSub w-full sm:w-1/3 text-richblack-400 py-4 flex flex-col gap-4">
              < img src={LogoImg} alt="logo" className="h-6 w-28 mb-2" />
              <div className="flex flex-col space-y-1 justify-center gap-1">
                <h2 className="text-richblack-100 font-bold text-md">Company</h2>
                <span className="text-sm cursor-pointer hover:text-yellow-50">about</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Careers</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Affilates</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <PiFacebookLogoDuotone className="hover:text-yellow-50 h-[24px] w-[24px] cursor-pointer" />
                <PiGoogleLogoFill className="hover:text-yellow-50 h-[24px] w-[24px] cursor-pointer" />
                <PiTwitterLogoFill className="hover:text-yellow-50 h-[24px] w-[24px] cursor-pointer" />
                <PiYoutubeLogoFill className="hover:text-yellow-50 h-[24px] w-[24px] cursor-pointer" />
              </div>
            </div>
            {/* Resources and Support */}
            <div className="SecSub w-full sm:w-1/3 text-richblack-400 py-4 flex flex-col gap-4">
              <div className="flex space-y-1  flex-col gap-1">
                <h2 className="text-richblack-100 font-bold text-md">Resources</h2>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Articles</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Blog</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Chart Sheet</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Code challenges</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Docs</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Projects</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Videos</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Workspaces</span>
              </div>
              <div className="flex flex-col gap-1 space-y-1  mt-2">
                <h2 className="text-richblack-100 font-bold text-md">Support</h2>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Help Center</span>
              </div>
            </div>
            {/* Plans and Community */}
            <div className="ThirdSub w-full sm:w-1/3 text-richblack-400 py-4 flex flex-col gap-4">
              <div className="flex flex-col space-y-1  gap-1">
                <h2 className="text-richblack-100 font-bold text-md">Plans</h2>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Paid memberships</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">For students</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Bussiness solutions</span>
              </div>
              <div className="flex flex-col space-y-1  gap-1 mt-2">
                <h2 className="text-richblack-100 font-bold text-md">Community</h2>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Forums</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Chapters</span>
                <span className="text-sm cursor-pointer hover:text-yellow-50">Events</span>
              </div>
            </div>
          </div>
        </div>
        {/* Divider for md+ */}
            <div className="hidden md:block w-[1px] h-[500px] bg-richblack-700 my-auto mx-10" />
        {/* Second Section */}
        <div className="SecondSec text-richblack-400 flex flex-col md:flex-row py-4 w-full md:w-1/2 gap-6 md:gap-0">
          {/* Subjects */}
          <div className="FSec w-full space-y-1  md:w-1/3 flex flex-col gap-1 mb-4 md:mb-0">
            <h2 className="text-richblack-100 font-bold text-md mb-1">Subjects</h2>
            <span className="text-sm cursor-pointer hover:text-yellow-50">AI</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Cloud Computing</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Code Foundations</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Computer Science</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Cyber Security</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Data Analytics</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Data Science</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Data Visualization</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50" >Developer Tools</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">DevOps</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Game Development</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">IT</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Machine Learning</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Math</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Mobile Development</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Web Design</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Web Development</span>
          </div>
          {/* Languages */}
          <div className="SSec w-full space-y-1  md:w-1/3 flex flex-col gap-1 mb-4 md:mb-0">
            <h2 className="text-richblack-100 font-bold text-md mb-1">Languages</h2>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Bash</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">C</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">C++</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">C#</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Go</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">HTML &amp; CSS</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Java</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">JavaScript</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Kotlin</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">PHP</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Python</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">R</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Ruby</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">SQL</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Swift</span>
          </div>
          {/* Career building */}
          <div className="TSec w-full space-y-1  md:w-1/3 flex flex-col gap-1">
            <h2 className="text-richblack-100 font-bold text-md mb-1">Career building</h2>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Career paths</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Career services</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Interview prep</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Professional certification</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">-</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Full Catalog</span>
            <span className="text-sm cursor-pointer hover:text-yellow-50">Beta Content</span>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-4 border-richblack-700 w-[80%] mx-auto" />
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center my-4 justify-between w-[95%] md:w-[90%] lg:w-[80%] mx-auto text-richblack-300 text-sm gap-2">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="cursor-pointer hover:text-yellow-50">Privacy Policy</span>
          <span className="hidden sm:block">|</span>
          <span className="cursor-pointer hover:text-yellow-50">Cookie Policy</span>
          <span className="hidden sm:block">|</span>
          <span className="cursor-pointer hover:text-yellow-50">Terms</span>
        </div>
        <div className="text-center">
          Made with ❤️ Aayush &copy; 2025 StudyNotion
        </div>
      </div>
    </div>
  )
}

export default Footer
