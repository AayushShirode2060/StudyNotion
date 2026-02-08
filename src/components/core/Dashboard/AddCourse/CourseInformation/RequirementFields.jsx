import React, { useEffect, useState } from 'react'

const RequirementFields = ({name,label,register,errors,setValue,getValues}) => {
  const [requirement,setRequirement]=useState("")
  const [requirementsList,setRequirementsList]=useState([])
  

  useEffect(()=>{
    register(name,{
        required:true,
        // validate:(value)=>value.length>0
    })
  },[])

  useEffect(()=>{
    setValue(name,requirementsList);

  },[requirementsList])

  const handleAddRequirement=()=>{
     console.log("This is clicked")
     if(requirement){
       setRequirementsList([...requirementsList,requirement])
       setRequirement("")
      }
      console.log(requirementsList)
     console.log("This is also clicked")
  }

  const handleRemoveRequirement=(index)=>{
    const updatedRequirementList=[...requirementsList]
    updatedRequirementList.splice(index,1)
    setRequirementsList(updatedRequirementList)
  }
    return (
    <div>
       <label htmlFor="name">
        {label}<sup className='text-pink-200'>*</sup>
       </label>
       <div>

        <input
        type='text'
        id={name}
        value={requirement}
        onChange={(e)=>setRequirement(e.target.value)}
        className='w-full bg-richblack-700 text-richblack-200 px-8 py-3 mx-2 my-1 rounded-lg'
        />

        <button 
         type='button'
         onClick={handleAddRequirement}
         className='font-semibold text-yellow-50 mx-2 my-1'
         >
            Add
        </button>
       </div>

       {
        requirementsList.length>0 && (
            <ul className="mt-2 list-inside list-disc">
                {requirementsList.map((requirement,index)=>(
                    <li key={index} className='flex items-center text-richblack-5'>
                        <span>{requirement}</span>
                        <button 
                        type="button" 
                        className='ml-2 text-xs text-pure-greys-300'
                        onClick={()=>handleRemoveRequirement(index)} 
                        >
                          clear
                        </button>
                    </li>
                ))}
            </ul>
        )
       }
       {errors[name] &&(
        <span>
            {label} is required
        </span>
       )}
    </div>
  )
}

export default RequirementFields