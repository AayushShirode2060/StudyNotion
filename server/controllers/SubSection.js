
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");


//create Subsection
exports.createSubSection = async (req, res) => {
    try{
     //fetch data from req body
     const {sectionId,title,description}=req.body

     //extract file/video
     const video=req.files.video;
     //validation
     if(!sectionId || !title || !description || !video){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
     }
     //upload video to cloudinary and obtain secure url
     const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
     //create a subsection
     const SubSectionDetails=await SubSection.create({
        title:title,
        timeDuration:uploadDetails.duration || "00:00", // Use video duration from cloudinary or default
        description:description,
        videoUrl:uploadDetails.secure_url
     })
     //update section with this subsection ObjectId
     const updatedSection=await Section.findByIdAndUpdate(
        {_id:sectionId},
        {$push:{
            subSection:SubSectionDetails._id
        }},
        {new:true}
     ).populate("subSection")

     // Find the course and populate it with sections and subsections
     const Course = require("../models/Course");
     const updatedCourse = await Course.findOne({
       courseContent: sectionId
     }).populate({
       path: "courseContent",
       populate: {
         path: "subSection"
       }
     })

     //return response
     return res.status(200).json({
        success:true,
        message:"Sub section Created Successfully",
        data: updatedSection
     })
    } catch (error) {
        console.error("CREATE SUB-SECTION ERROR:", error);
        return res.status(500).json({
        success:false,
        message:"Sub section Creation error",
        error:error.message
     })
    }

}

//Hw:updateSubSection
  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()

      const updatedSection=await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

//HW:deleteSubSection
exports.deleteSubSection=async(req,res)=>{
    try{
      const {subSectionId,sectionId}=req.body
      await Section.findByIdAndUpdate(sectionId,
         {$pull:{subSection:subSectionId}},
         
      )
      const subSection=await SubSection.findByIdAndDelete(subSectionId)

        if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection=await Section.findById(sectionId).populate("subSection")


      return res.status(200).json({
        success:true,
        message:"Subsection deleted successfully",
        data:updatedSection
      })

    }catch(error){
        return res.status(400).json({
        success:false,
        message:"Unable to delete subsection",
        SubSection
      })
    }
}