// const nodemailer=require("nodemailer")

// const mailSender=async(email,title,body)=>{
//     try{
//         console.log(process.env.MAIL_USER);
//        let transporter=nodemailer.createTransport({
//         // host:process.env.MAIL_HOST,
//         service:"gmail",
//         auth:{
//             user:process.env.MAIL_USER,
//             pass:process.env.MAIL_PASSWORD
//         }
//        })
//        console.log(process.env.MAIL_USER);
//        try{
//            let info=await transporter.sendMail({
//             from:'StudyNotion || Aayush Shirode',
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`
//            })
    
//            console.log(info);
//            return info;
           
//        }catch(error){
//          console.log("MAIL ERROR:", error);
//        }
       
//     }catch(error){
//         console.log(error.message)
//     }
// }

// module.exports=mailSender

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {

    // 🔹 Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD, // your 16-char APP PASSWORD
      },
    });

    // 🔹 Verify SMTP connection (helps in debugging production)
    await transporter.verify();
    console.log("✅ SMTP is ready to send emails");

    // 🔹 Send mail
    const info = await transporter.sendMail({
      from: `"StudyNotion || Aayush Shirode" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;

  } catch (error) {
    console.log("❌ MAIL ERROR:", error.message);
  }
};

module.exports = mailSender;
