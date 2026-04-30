import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctor,adminLogin, allDoctors } from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorsController.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availablity',authAdmin,changeAvailablity)

export default adminRouter