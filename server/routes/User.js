const express = require("express");
const router=express.Router()
const { login, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

//Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login",login)
router.post("/signup",signUp)
router.post("/sendotp",sendOTP)
router.post("/changepassword",auth,changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

module.exports=router