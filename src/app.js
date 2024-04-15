import express, { json } from 'express'
import { config }from 'dotenv'
import userRoutes from './Routes/user/userRoute.js'
import jobRoutes from './Routes/jobs/job.route.js'
import cors from "cors";
import cookieParser from "cookie-parser";
config()

const app=express()
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
  );
app.use(json())
const port=process.env.PORT||5300
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.get('/test',(req,res)=>{
    console.log('server running');
    res.status(200).json({
        success:true,
        message:'server running'
    })
})

// app.use('/api/v1/user',(userRoutes=>{
//     console.log('user route');
// }))
app.use('/api/v1/user/',userRoutes)
app.use('/api/v1/job',jobRoutes)
export default app;