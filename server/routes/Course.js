const express=require("express");
const router=express.Router();
const { createCourse, getAllCourses, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/Course");
const { createSection, deleteSection, updateSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/SubSection");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");
const { isInstructor, isStudent, auth, isAdmin } = require("../middlewares/auth");
const { updateCourseProgress } = require("../controllers/courseProgress");

//creation updation and deletion of courses section and subsectionn is only done by an instructor
//Course Routes
router.post("/createCourse",auth,isInstructor,createCourse)
router.post("/editCourse",auth,isInstructor,editCourse)
router.post("/addSection",auth,isInstructor,createSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.post("/addSubSection",auth,isInstructor,createSubSection)
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)
router.post("/getCourseDetails",getCourseDetails)
router.get("/getAllCourses",getAllCourses)
router.post("/getFullCourseDetails",auth,getFullCourseDetails)
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)

//Category Routes
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories)
router.post("/getCategoryPageDetails",categoryPageDetails)

//Rating And Reviews Routes
router.post("/createRating",auth,isStudent,createRating)
router.post("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)

//Instructor Courses Route
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)
router.delete("/deleteCourse",deleteCourse)

module.exports=router