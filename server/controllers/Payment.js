const {instance}=require("../config/razorpay")
const Course=require("../models/Course")
const User=require("../models/User")
const mailSender=require("../utils/mailSender")
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail")
const Razorpay = require("razorpay")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const { default: mongoose } = require("mongoose")
const crypto=require("crypto")
const CourseProgress = require("../models/CourseProgress")


//initiate the order
exports.capturePayment=async(req,res)=>{
  const {courses}=req.body
  const userId=req.user.id

  if(courses.length===0){
    return res.json({success:false,message:"Please provide Course Id"})
  }

  let totalAmount=0;

  for (const course_id of courses){
    let course;
    try{
        course=await Course.findById(course_id)
        console.log("This is my course id",course_id)
        if(!course){
            return res.status(200).json({success:false,message:"Could not find the course"})
        }

        const uid=new mongoose.Types.ObjectId(userId)
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({success:false,message:"Student is already enrolled "})
        }

        totalAmount+=course.price


    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message})
    }
  }

  const options={
    amount:totalAmount*100,
    currency:"INR",
    receipt:Math.random(Date.now()).toString()
  }

  try{
    const paymentResponse=await instance.orders.create(options)
    res.json({
        success:true,
        message:paymentResponse,
        key: process.env.RAZORPAY_KEY_ID,
    })
  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"Could not initiate order"})
  }
}

exports.verifyPayment=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id
    const razorpay_payment_id=req.body?.razorpay_payment_id
    const razorpay_signature=req.body?.razorpay_signature

    console.log("I am in verify payment")
    
    const courses=req.body?.courses;
    const userId=req.user.id
    
    if(!razorpay_order_id || !razorpay_signature||!razorpay_payment_id || !courses ||!userId){
        return res.status(200).json({success:false,message:"Payment Failed"})
    }
    
    let body=razorpay_order_id +"|"+razorpay_payment_id
    
   
    const expectedSignature=crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    console.log("I am in verify payment expectred Siganture",expectedSignature)
    console.log("I am in verify payment razorpay Siganture",razorpay_signature)

    if(expectedSignature===razorpay_signature){
        //enroll krwa do student ko
        await enrollStudent(courses,userId,res)
        //return res
        return res.status(200).json({success:true,message:"Payment Verified"})
    }
    return res.status(200).json({success:"false",message:"Payment Failed"})

}

const enrollStudent=async(courses,userId,res)=>{
    if(!courses ||!userId){
        return res.status(400).json({success:false,message:"Please provide data for courses or userId"})
    }

    for(const courseId of courses){
        try{

            const enrolledCourse= await Course.findByIdAndUpdate(
             {_id:courseId},
             {
                 $push:{studentsEnrolled:userId}
             },
              {new:true}
             )

             console.log("This is enorolled course",enrolledCourse)
             if(!enrolledCourse){
                 return res.status(500).json({success:false,message:"Course not found"})
             }
     
             //find the student and add the course tho the list of enrolled students 
             const courseProgress=await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[]
             })

             const enrolledStudent=await User.findByIdAndUpdate(
                 userId,
                 {
                 $push:{
                    courses:courseId,
                    courseProgress:courseProgress._id

                 }
                 },
                 {new:true})
             
                 console.log("This is enrolled student",enrolledStudent)
                 //bacche ko mail send kar do
                //  const emailResponse=await mailSender(
                //      enrollStudent.email,
                //     ` Succesfully enrolled into ${enrolledCourse.courseName}`,
                //     courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`) 
                //  )
         
                //  console.log("Email send successfully",emailResponse.response)
            }catch(error){
                console.log(error);
                return res.status(500).json({success:false,message:error.message})
            }

        }


}

exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body

    const userId=req.user.id

    if(!orderId || !paymentId || !amount ||!userId ){
        return res.status(400).json({success:false,message:"Please provide all the fields"})
    }

    try{
        //student ko dhundo
        console.log("i am sending email")
        const enrolledStudent=await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId)
        )
        console.log("i have sended email")
    }catch(error){
        console.log("Error in sending mail",error)
        return res.status(500).json({success:false,message:"Could not send email"})
    }
}
//capture the payment and initiate the Razorpay Order
// exports.capturePayment=async(req,res)=>{
//     //get courseId and userId
//     const {course_id}=req.body;
//     const userId =req.user.id;

//     //validation
//     //valid course id
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"Please provide valid course id"
//         })
//     }
//     //valid course detail
//     let course;
//     try{
//         course=await Course.findById(course_id)
//         if(!course){
//             return res.json({
//             success:false,
//             message:"Could not find the course"
//         })
//         }

//         //user already pay for the same thing
//         const uid=new mongoose.Types.ObjectId(userId)
//         if(course.studentsEnrolled.includes(uid)){
//              return res.json({
//             success:false,
//             message:"Student is already enrolled"
//         })
//         }

//     }catch(error){
//       console.error(error)
//       return res.status.json({
//         success:false,
//             message:"error.message"
//       })
//     }
 
//     //order create
//     const amount=course.price
//     const currency="INR"

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     }

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse=await instance.orders.create(options)
//         console.log(paymentResponse)
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         })

//     }catch(error){
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         })
//     }

// }


//verify signature of razorpay and server
// exports.verifySignature=async(req,res)=>{
//     const webhookSecret="12345678";
//     const signature=req.headers["x-razorpay-signature"]
    
//     const shasum=crypto.createHmac("sha256",webhookSecret)
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature===digest){
//         console.log("Payment is Authorized")
//         //here as req is coming from razorpay directly not frontend so there is not user id in req body so we have passed notes earlier while capturing the payment so we can fetch it from there
//         const {courseId,userId}=req.body.payload.payment.entity.notes;
//         try{
//            //fulfil the action

//            //find the course and enroll the student in it
//            const enrolledCourse=await Course.findOneAndUpdate(
//             {_id:courseId},
//             {$push:{courses:courseId}},
//             {new:true}
//            )

//            if(!enrolledCourse){
//             return res.status(500).json({
//                 success:false,
//                 message:"Course not found"
//             })

//         }
//             console.log(enrolledCourse)
             
//             const enrolledStudent=await User.findOneAndUpdate(

//                 {_id:userId},
//                 {$push:{courses:courseId}},
//                 {new:true}
//             )
//             console.log(enrolledStudent )

//             const emailResponse=await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from Codehelp",
//                 "Congratulations,you are onboarded into new codehelp course"
//             )

//             console.log(emailResponse)

//             return res.status(200).json(
//                 {
//                     success:true,
//                     message:"Signature verified and course added"
//                 }
//             )
//         }catch(error){
//             console.log(error)
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })


//         }
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"invalid request"
//         })
//     }

// }