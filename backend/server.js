import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoutes.js"
import doctorRouter from "./routes/doctorRoutes.js"
import userRouter from "./routes/userRoutes.js"
// app config
const app = express()
const port = process.env.PORT || 4000

// db connection
connectDB()
// cloudinary connection
connectCloudinary()

// middlewares

app.use(express.json())
app.use(cors())

// api endpoints

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.get('/', (req, res) => {
    res.send('Home Page');
})

// server

app.listen(port, () => {
    console.log(`server is listening at PORT:${port}`);
})