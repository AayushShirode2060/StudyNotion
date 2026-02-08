const express=require("express")
const { auth, isStudent } = require("../middlewares/auth")
const { capturePayment, verifySignature, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payment")
const router=express.Router()

router.post("/capturePayment",auth,isStudent,capturePayment)
router.post("/verifyPayment",auth,isStudent,verifyPayment)
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail)

module.exports=router