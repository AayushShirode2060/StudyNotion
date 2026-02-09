const nodemailer=require("nodemailer")

const mailSender=async(email,title,body)=>{
    try{
       // Validate environment variables
       if(!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASSWORD){
           throw new Error("Email configuration is missing. Please check MAIL_HOST, MAIL_USER, and MAIL_PASSWORD environment variables.")
       }

       let transporter=nodemailer.createTransport({
        service: 'gmail', // Use Gmail service
        host: process.env.MAIL_HOST,
        port: 587, // Gmail SMTP port for TLS
        secure: false, // true for 465, false for other ports
        auth:{
            user: process.env.MAIL_USER.trim(), // Remove any whitespace
            pass: process.env.MAIL_PASSWORD.trim() // Remove any whitespace
        },
        tls: {
            rejectUnauthorized: false // Allow self-signed certificates
        }
       })

       // Verify transporter configuration
       await transporter.verify()

       let info=await transporter.sendMail({
        from:`"StudyNotion" <${process.env.MAIL_USER.trim()}>`,
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
       })

       console.log("Email sent successfully:", info.messageId);
       return info;
       
    }catch(error){
        console.error("Email sending failed:", error.message);
        console.error("Full error:", error);
        // Re-throw error so it can be handled by caller
        throw error;
    }
}

module.exports=mailSender