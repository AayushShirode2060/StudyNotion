const express=require("express")
const app=express()

const userRoutes=require("./routes/User")
const profileRoutes=require("./routes/Profile")
const paymentRoutes=require("./routes/Payments")
const courseRoutes=require("./routes/Course")

const database=require("./config/database")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")

dotenv.config();
const PORT=process.env.PORT ||4000

//database connectivity
database.connect()

//middleware connectivity
app.use(express.json())
app.use(cookieParser())

//to entertain with frontend
// app.use(
//     cors({
//            origin: [
//       "http://localhost:3000",
//       "https://study-notion-i49iwk489-aayushshirode2060s-projects.vercel.app",
//     ],
//         credentials:true
//     })
// )

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin === "http://localhost:3000" ||
        origin.includes("vercel.app")
      ) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

// 👇 THIS LINE IS CRITICAL (preflight fix)
app.options(/.*/, cors())

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection
cloudinaryConnect()

//routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)

//def route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running'
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at Port:${PORT}`)
})