const User=require("../models/User")
const OTP=require("../models/OTP")
const otpGenerator=require("otp-generator");
const Profile = require("../models/Profile");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

require("dotenv").config()
//sendOtp
// exports.sendOTP=async(req,res)=>{
//     try{
//         const {email}=req.body;

//     const existingUser=await User.findOne({email})

//     if(existingUser){
//         return res.status(401).json({
//             success:false,
//             message:"User already exists"
//         })
//     }
    
//     var otp=otpGenerator.generate(6,{
//         upperCaseAlphabets:false,
//         lowerCaseAlphabets:false,
//         specialChars:false
//     })


//     const result=await OTP.findOne({otp:otp})
   
//     while(result){
//         otp=otpGenerator.generate(6,{
//         upperCaseAlphabets:false,
//         lowerCaseAlphabets:false,
//         specialChars:false
//         })

//      result=await OTP.findOne({otp:otp})

//     }
//     //create an entry for otp
//     const otpPayload={email,otp}
//     const otpBody=await OTP.create(otpPayload)

  

//     //return response succesfful
//     res.status(200).json({
//         success:true,
//         message:"Otp Sent successfully",
//         otp
//     })
    

//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:error.message 
//         })
//     }
    
    
// }




const otpTemplate = require("../mail/templates/emailVerificationTemplate")

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      })
    }

    // generate unique OTP
    let otp
    let existingOtp

    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      existingOtp = await OTP.findOne({ otp })
    } while (existingOtp)

    // save OTP to DB (FAST)
    await OTP.create({ email, otp })

    // Send email and wait for it to complete
    // This ensures we catch errors and can log them properly
    try {
      await mailSender(
        email,
        "Verification Email from StudyNotion",
        otpTemplate(otp)
      )
      console.log("OTP email sent successfully to", email)
      
      // respond after email is sent successfully
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      })
    } catch (emailError) {
      console.error("Failed to send OTP email:", emailError.message)
      console.error("Full email error:", emailError)
      
      // Still return success to user (OTP is saved in DB)
      // But log the error for debugging
      return res.status(200).json({
        success: true,
        message: "OTP generated successfully. Please check your email.",
        warning: "Email delivery may be delayed. Please check spam folder or try again."
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//signUp
exports.signUp=async(req,res)=>{
    console.log('SIGNUP REQ.BODY:', req.body)
    try{


        //data fetch from request body
        
        const {firstName,lastName,email,password,confirmPassword,accountType,otp,contactNumber}=req.body
        //validate data
        if(!firstName || !lastName ||!email ||!password ||!confirmPassword ||!otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        //2 passwd match
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"both password and confirm password must be same"
            })
        }
        //check if user exists in db
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                 success:false,
                message:"User is already registered, please login"
            })
        }
        //find most recent otp of the user
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("this is recent otp")
        console.log(recentOtp)
        //validate otp
        if(recentOtp.length===0){
            return res.status(400).json({
                success:false,
                message:"The OTP is not valid"
            })
        }
        else if(otp !==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"otp did not matched,Enter the valid OTP"
            })
        }
        //password hashing

        const hashedPass=await bcrypt.hash(password,10)
        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        //store in db
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        // Build user object
        const userObj = {
            firstName,
            lastName,
            email,
            password:hashedPass,
            accountType:accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        };
        if (contactNumber) userObj.contactNumber = contactNumber;

        const user=await User.create(userObj);
        //response
        return res.status(200).json({
            success:true,
            user,
            message:"User registered Successfully"
        })
    }catch(error){
        console.log(error)
       return res.status(500).json({
            success:false,
            message:"User cannot be regitered ,please try again"
        })
    }
}

//Login

exports.login=async(req,res)=>{
    try{
        //get data from req body
          const {email,password}=req.body
    //validate data
        if(!email || !password){
            return res.status(400).json({
                successs:false,
                message:"All fields are required"
            })
        }
    //user check
        const user=await User.findOne({email}).populate("additionalDetails")

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered,please signup first"
            })
        }
     //compare password
       if(await bcrypt.compare(password,user.password)){
         const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
         }
        
         let token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"})
        
        //  const user=existingUser.toObject()
         user.token=token
         user.password=undefined

         const options={
            expires:new Date(Date.now() +3*24*60*60*1000),
            httpOnly:true
         }

         res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user:user,
            message:"User logged in successfully"
         })

       }else{
        return res.status(401).json({
            success:false,
            message:"Password is incorrect"
        })
       }
//gnerate JWT token,after passwd matching
//create cookie
//send response
    }catch(error){
       console.log(error);
       return res.status(401).json({
        success:false,
        message:"Login Failure ,please try again"
       })
    }
}
// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};