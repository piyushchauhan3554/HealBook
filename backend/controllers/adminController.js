import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointment from "../models/appointmentModel.js"
import users from '../models/userModel.js'
// admin can add doctors 
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, address, degree, experience, about, fees } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !address || !degree || !experience || !about
            || !fees
        ) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Image not Selected" })
        }


        //  validate email

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" })
        }

        // checking strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a Strong Password" })
        }

        // encryption of password
        // generate salt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // upload image on cloudinary and get url 
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type: "image",
            timeout: 60000 
        })
        const imageUrl = imageUpload.secure_url;
        

        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            address: JSON.parse(address),
            fees,
            degree,
            about,
            speciality,
            experience,
            date: Date.now()
        }
        )
        await newDoctor.save()

        return res.json({ success: true, message: "Doctor Added" })


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.json({
                success: true,
                token
            })
        } else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

const allDoctors=async (req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password')
        return res.json({
            success:true,
            doctors
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        console.log(error);
    }

}

const appointmentAdmin=async(req,res)=>{
    try {
        const allAppointments=await (await appointment.find({})).reverse()
        res.json({
            success:true,
            allAppointments
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,message:error.message
        })
    }
}

// api to cancel the appointment

const cancelAppointment=async(req,res)=>{
  try {
    
    const {appointmentId}=req.body;

    const appointmentData=await appointment.findById(appointmentId)

    await appointment.findByIdAndUpdate(appointmentId,{
      cancelled:true
    })

    // releasing doctor slot

    const {docId,slotTime,slotDate}=appointmentData;

    const docData=await doctorModel.findById(docId)

    let slots_booked=docData.slot_booked

    slots_booked[slotDate]=slots_booked[slotDate].filter((e)=>e!==slotTime)

    await doctorModel.findByIdAndUpdate(docId,{
      slot_booked:slots_booked
    })
    res.json({
      success:true,
      message:"Appointment Cancelled"
    })
  } catch (error) {
    console.log(error.message);
    res.json({
      success:false,
      message:error.message
    })
  }
}

// api to get the dashboard data

const adminDashboard=async (req,res)=>{
    try {
        const a=await appointment.find({})
        const d=await doctorModel.find({})
        const u=await users.find({})

        const dashData={
            app:a.length,
            doc:d.length,
            patients:u.length,
            latestAppointments:a.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
    console.log(error.message);
    res.json({
      success:false,
      message:error.message
    })
    }
}

export { addDoctor, adminLogin , allDoctors, appointmentAdmin,cancelAppointment,adminDashboard}