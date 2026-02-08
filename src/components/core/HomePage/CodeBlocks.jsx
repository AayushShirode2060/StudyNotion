import React from 'react'
import CTAButton from "../HomePage/Button"
// import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex flex-col lg:flex-row ${position} my-12 lg:my-20 justify-between gap-6 lg:gap-10`}>
      {/* Section1 */}
      <div className='w-full lg:w-1/2 flex flex-col gap-6'>
        {heading}
        <div className='text-richblack-200 font-bold'>
            {subheading}
        </div>
        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn2.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>

        </div>
      </div>

      {/* Section2 */}
      <div className='h-fit my-4 shadow-[10px_0px_20px_-5px_rgba(10,0,0,0.3)] bg-[#111E3261] border border-[#FFFFFF38] flex flex-row text-[12px] w-full lg:w-[500px] overflow-hidden'>
        {/* hw:bg-gradient */}
        <div className='text-center flex flex-col w-12 sm:w-16 text-richblack-400 font-inter font-bold py-2'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={`flex-1 flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 overflow-x-auto text-[12px] sm:text-sm md:text-base`}>
            <TypeAnimation
            sequence={[codeblock,2000,""]}
            repeat={Infinity}
            cursor={true}
            style={
                {
                    whiteSpace:"pre-line",
                    display:"block"
                }
            }
            omitDeletionAnimation={true}
            />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
