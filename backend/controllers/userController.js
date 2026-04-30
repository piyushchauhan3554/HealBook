import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import users from '../models/userModel.js';

// user registration api
const userRegister=async (req,res)=>{
   try {
     const {name,email,password}=req.body;

    // validations
    if(!name || !email || !password){
        return res.json({
            success:false,
            message:"Missing fields"
        })
    }

    if(!validator.isEmail(email)){
        return res.json({
            success:false,
            message:"Invalid Email"
        })
    }
    

    if(password.length < 6){
        return res.json({
            success:false,
            message:"Enter a strong password"
        })
    }

    const u=await users.findOne({email})
    if(u){
        return res.json({
            success:false,
            message:"User with this email already exists"
        })
    }

    // storing a hashed password in db

    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)
    
    const newUser=new users({
        email,password:hashedPassword,name
    })

   const user= await newUser.save()

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    res.json({success:true,token})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   }
}

// user login api
const userLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
    // check email in the db

    const user=await users.findOne({email})
    if(!user){
        return res.json({
            success:false,
            message:"User does not exist"
        })
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({
        success:true,
        token
    })
    }else{
        res.json({
            success:false,
            message:"Invalid Credentials"
        })
    }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }

}

export {userRegister,userLogin}