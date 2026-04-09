import validator from "validator"
import bcrypt from "bcrypt"
import cloudinary from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
// admin can add doctors 
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, address, degree, experience, about, fees } = req.body;
        const imageFile = req.file;

        console.log(imageFile);

        if (!name || !email || !password || !speciality || !address || !degree || !experience || !about
            || !fees
        ) {
            return res.json({ success: false, message: "Missing Details" })
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
        console.log("hashedPassword :-" + hashedPassword);

        // upload image on cloudinary and get url 

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url;

        console.log("image url :-" + imageUrl);


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

export { addDoctor, adminLogin }