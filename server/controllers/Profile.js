const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile=require("../models/Profile")
const User=require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile=async(req,res)=>{
    try{
        //get data - handle at root level
        const {firstName="", lastName="", dateOfBirth="", about="", contactNumber="", gender=""} = req.body
        //get userid
        const id = req.user.id
        
        //find user
        const userDetails = await User.findById(id).populate("additionalDetails")
        
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        
        // Update User fields (firstName, lastName) - only if provided
        if (firstName.trim()) {
            userDetails.firstName = firstName
        }
        if (lastName.trim()) {
            userDetails.lastName = lastName
        }
        
        // Save user updates
        await userDetails.save()
        
        // Update Profile (additionalDetails) fields
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)
        
        if (profileDetails) {
            // Update all fields from additionalDetails, allowing empty strings to be saved
            if (dateOfBirth !== undefined && dateOfBirth !== null) {
                profileDetails.dateOfBirth = dateOfBirth
            }
            if (about !== undefined && about !== null) {
                profileDetails.about = about
            }
            if (contactNumber !== undefined && contactNumber !== null) {
                profileDetails.contactNumber = contactNumber
            }
            if (gender !== undefined && gender !== null) {
                profileDetails.gender = gender
            }
            
            await profileDetails.save()
        }
        
        // Fetch updated user with populated profile details
        const updatedUserDetails = await User.findById(id).populate("additionalDetails")
        
        //return response with updated user details
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Profile cant be updated"
        })
    }
}

//deletAccount
//explore how can we schedule this deletion operation
exports.deleteAccount=async(req,res)=>{
    try{
        //get id
        const id=req.user.id
        console.log(id)
        //validation
        const userDetails=await User.findById({_id:id})
       
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        //delete profile
        const p1=await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        console.log(p1)
        //delete user
        await User.findByIdAndDelete({_id:id})

        // TODO:HW unenroll users from all enrolled courses
        //delete user

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User Cannot be deleted successfully"
        })
    }
}


exports.getAllUserDetails=async(req,res)=>{
    try{
        //get id
        //validation and get user details
      const id=req.user.id
      const userDetails=await User.findById({_id:id}).populate("additionalDetails").exec()

      return res.status(200).json({
        success:true,
        message:"All details of user fetched successfully",
        userDetails
      })
    }catch(error){
        return res.status(500).json({
        success:false,
        message:error.message,
        userDetails
      })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.user.id
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//         .populate("courses")
//         .exec()

//         console.log("this are user details",userDetails)
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userDetails}`,
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };


exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()

    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard=async(req,res)=>{
  try{
    const courseDetails=await Course.find({instructor:req.user.id})

    const courseData=courseDetails.map((course)=>{
      const totalStudentEnrolled=course.studentsEnrolled.length
      const totalAmountGenerated=totalStudentEnrolled*course.price

      //create a new object with the new additional fields
      const courseDataWithStats={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalStudentEnrolled,
        totalAmountGenerated
      }
      return courseDataWithStats
    })

    res.status(200).json({courses:courseData})

  }catch(error){
    console.error(error)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
}
