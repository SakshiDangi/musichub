import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute  from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import gigRoute from "./routes/gig.route.js";
import submissionRoute from "./routes/submission.route.js";
import postRoute from "./routes/post.route.js";

dotenv.config({});

const app = express();

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"Successfully connected with Backend",
//         success:true
//     })
// })

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
    origin:'http://localhost:5173',
    Credentials:true 
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/gig", gigRoute);
app.use("/api/v1/submission", submissionRoute);
app.use("/api/v1", postRoute);


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})