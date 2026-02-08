const mongoose=require("mongoose")
const mailSender = require("../utils/mailSender")
const otpTemplate = require("../mail/templates/emailVerificationTemplate")

const OTPSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
      default:Date.now(),
      expires:5*60 // The document will be automatically deleted after 5 minutes of its creation time
    }
})


//a function to send email
async function sendVerificationEmail(email,otp){
    try{
       const mailResponse=await mailSender(email,"Verification Email From StudyNotion",otpTemplate(otp))
       console.log("Email Send Successfully",mailResponse)
    }catch(error){
        console.log("error occurred while sedning email",error)
        throw error
    }
}

OTPSchema.pre("save",async function(next){
   // Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next()
})

module.exports=mongoose.model("OTP",OTPSchema)