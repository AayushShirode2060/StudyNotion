import React from 'react'

const Stats=[
    {count:"5K" ,label:"Active Students"},
    {count:"10+" ,label:"Mentors"},
    {count:"200+" ,label:"Courses"},
    {count:"50+" ,label:"Awards"}
]

const StatsComponent = () => {
  return (
    <section className='bg-richblack-800 p-20 px-32 my-4'>
        <div className='mx-auto w-9/12'>
            <div className='flex items-center justify-evenly'>
                {
                    Stats.map((data,index)=>{
                        return(
                            <div key={index} className='flex flex-col items-center justify-center gap-4 p-4'>
                                <p className='text-richblack-5 font-bold text-3xl '>{data.count}</p>
                                <h1 className='text-richblack-500 font-semibold'>{data.label}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
