import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointment from "../models/appointmentModel.js";
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availablity Changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const allDocs = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, allDocs });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api for doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get all the appointments of specific doctor

const getDoctorAppointments = async (req, res) => {
  try {
    const { docId } = req;
    const appointments = await appointment.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to mark the appointment completed

const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req;
    const appointmentData = await appointment.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointment.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Mark Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to mark appointment cancel

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req;
    const appointmentData = await appointment.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointment.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      // releasing doctor slot
      const { slotTime, slotDate } = appointmentData;
      const docData = await doctorModel.findById(docId);

      let slots_booked = docData.slot_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime,
      );

      await doctorModel.findByIdAndUpdate(docId, {
        slot_booked: slots_booked,
      });

      return res.json({
        success: true,
        message: "Appointment Cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancellation Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api for doctor dashboard data

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req;
    const appointments = await appointment.find({ docId });

    let earnings = 0;
    appointments.map((item) => {
      if (!item.cancelled) {
        if (item.isCompleted || item.payment) {
          earnings += item.amount;
        }
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      totalAppointments: appointments.length,
      totalPatients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    return res.json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get doctor profile

const getDoctorProfile = async (req, res) => {
  try {
    const { docId } = req;
    const doctorProfileData = await doctorModel
      .findById(docId)
      .select(["-password"]);
    res.json({
      success: true,
      doctorProfileData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to update the doctor profile

const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body;
    const { docId } = req;
    await doctorModel.findByIdAndUpdate(docId, {
      available,
      address,
      fees,
    });
    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  changeAvailablity,
  getAllDoctors,
  loginDoctor,
  getDoctorAppointments,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  updateDoctorProfile,
  getDoctorProfile
};
