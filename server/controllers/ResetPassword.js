const User=require("../models/User")
const mailSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")
//reset password token
exports.resetPasswordToken=async(req,res)=>{
    //get email from req body
    try{
     const {email}=req.body;
    //check user  for this email,emial validation
    const user=await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message:"Your email is not registered with us"
        })
    }
    //generate token
    const token=crypto.randomUUID()
    //update user by adding token and expiration time
    const updatedDetails=await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000

        },
        {new:true}
    )
    //create url
    const url=`http://localhost:3000/update-password/${token}`
    //send mail containing url
    await mailSender(
        email,
        "Password  Reset Link",
        `Password Reset Link : ${url}`
    )
    //return response
    return res.json({
        success:true,
        message:"Email sent successfully,please check email and change pwd"
    })
    }catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"something went wrong while reset pwd mail"
       })
    }
     
}

//reset password
exports.resetPassword=async(req,res)=>{
 try{
    //data fetch
    const {password,confirmPassword,token}=req.body
    if(password !==confirmPassword){
        return res.json({
            success:true,
            message:"Password not matching"
        })
    }
    //get userdetails from db using token
    const userDetails=await User.findOne({token:token})
    //if mo entry invalid ttoken
    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is Invalid"
        })
    }
    //token time check
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"Token is expired,please regenerate your token",
        })
    }
    //hash pwd
    const hashedPassword=await bcrypt.hash(password,10)
    //password update
  await User.findOneAndUpdate(
    {token:token},
    {password:hashedPassword},
    {new:true}
  )
    //return response
    return res.status(200).json({
        success:true,
        message:"Password Reset successfully"

    })
 }catch(error){
    console.log(error)
     return res.status(500).json({
        success:false,
        message:"something went wrong while reset pwd mail"

    })
 }

}