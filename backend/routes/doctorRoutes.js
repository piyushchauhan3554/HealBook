import express from "express";
import {
  getAllDoctors,
  loginDoctor,
  getDoctorAppointments,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  getDoctorProfile,
  updateDoctorProfile
} from "../controllers/doctorsController.js";
import authDoctor from "../middlewares/authDoctor.js";
const doctorRouter = express.Router();
doctorRouter.get("/list", getAllDoctors);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, getDoctorAppointments);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard",authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,getDoctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter;
