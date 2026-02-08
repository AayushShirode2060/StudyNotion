const jwt=require("jsonwebtoken")
const User = require("../models/User")
require("dotenv").config()

//auth
exports.auth=async(req,res,next)=>{
    //extract token
try{
    if (req.path && req.path.includes("/getEnrolledCourses")) {
      console.log("INCOMING HEADERS FOR getEnrolledCourses:", req.headers)
      
    }
    const authHeader = req.header("Authorization") || req.header("authorization")
    
    const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader
    const tokenFromCookie = req && req.cookies ? req.cookies.token : null
    const tokenFromBody = req && req.body ? req.body.token : null
    const token = tokenFromCookie || tokenFromBody || bearerToken

  //is token is missing then send response
  if(!token){
    return res.status(401).json({
        success:false,
        message:"Token is missing"
    })
  }
  //verify the token
  try{
   const decode= jwt.verify(token,process.env.JWT_SECRET)
  
   req.user=decode
  }catch(error){
    //verification issues
    console.error("JWT VERIFY ERROR:", error && error.name, error && error.message)
    return res.status(401).json({
        success:false,
        message:`token is invalid: ${error && error.name || 'UnknownError'}`
    })
  }
  next()

}catch(error){
  console.error("AUTH MIDDLEWARE ERROR:", error && error.message)
  return res.status(401).json({
    success:false,
        message:"Something went wrong while validating the token"
  })
}
}

//isStudent
exports.isStudent=async(req,res,next)=>{
    try{
     if(req.user.accountType !=="Student"){
        return res.status(401).json({
         success:false,
        message:"this is a protecte droute for student"
        })
     }
     next()
    }catch(error){
        return res.status(401).json({
         success:false,
        message:"User role did not match"
        })
    }
}
//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try{
     if(req.user.accountType!=="Instructor"){
        return res.status(401).json({
         success:false,
        message:"this is a protecte droute for Instructor"
        })
     }
     next()
     console.log("This is next")
    }catch(error){
        return res.status(401).json({
         success:false,
        message:"User role did not match"
        })
    }
}
//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
     if(req.user.accountType !=="Admin"){
        return res.status(401).json({
         success:false,
        message:"this is a protected droute for Instructor"
        })
     }
     next()
    }catch(error){
        return res.status(401).json({
         success:false,
        message:"User role did not match"
        })
    }
}