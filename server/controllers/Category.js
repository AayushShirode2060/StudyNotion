const Category=require("../models/Category")
const Course = require("../models/Course")

//create tag ka handler
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		
		return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};


// getAllTags
exports.showAllCategories=async(req,res)=>{
    try{
      const allCategories=await Category.find({},{name:true,description:true })

      return res.status(200).json({
            success:true, 
            message:"All tags returned Successfully",
           allCategories
        })
   
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//category page
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: { path: "ratingAndReviews" },
      })
      .exec()

    console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (!Array.isArray(selectedCategory.course) || selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = null
    if (Array.isArray(categoriesExceptSelected) && categoriesExceptSelected.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoriesExceptSelected.length)
      const randomCategoryId = categoriesExceptSelected[randomIndex]._id
      differentCategory = await Category.findById(randomCategoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
    }
    
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate:{
          path:"instructor"
        }
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}