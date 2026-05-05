import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import users from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointment from "../models/appointmentModel.js";
import razorpay from "razorpay";
// user registration api
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validations
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Enter a strong password",
      });
    }

    const u = await users.findOne({ email });
    if (u) {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // storing a hashed password in db

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new users({
      email,
      password: hashedPassword,
      name,
    });

    const user = await newUser.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user login api
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email in the db

    const user = await users.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
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

// get user profile api

const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }
    const userData = await users.findById(userId).select("-password");
    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update user profile api

const updateProfile = async (req, res) => {
  try {
    const { name, address, dob, gender, phone } = req.body;
    const imageFile = req.file;
    const { userId } = req;

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!name || !address || !dob || !gender || !phone) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    const updateData = {
      name,
      dob,
      gender,
      phone,
      address: JSON.parse(address),
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await users.findByIdAndUpdate(userId, updateData);

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

// appointment booking api

const bookAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor not Available",
      });
    }

    let slot_booked = docData.slot_booked;

    // now check if doctor slot is available or not on a particular date and time

    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not Available",
        });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } else {
      slot_booked[slotDate] = [];
      slot_booked[slotDate].push(slotTime);
    }

    const userData = await users.findById(userId).select("-password");

    // do not need of slot_booked in docData
    const docObj = docData.toObject();
    delete docObj.slot_booked;
    const appointmentData = {
      docId,
      userId,
      slotDate,
      slotTime,
      amount: docData.fees,
      docData: docObj,
      userData,
      date: Date.now(),
    };

    const newAppointment = new appointment(appointmentData);
    await newAppointment.save();

    // save the new slot_booked in doctor db
    await doctorModel.findByIdAndUpdate(docId, {
      slot_booked,
    });

    res.json({
      success: true,
      message: "Appointment Booked",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to get user's appointment

const listAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const appointments = await appointment.find({ userId }).sort({ date: -1 });
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to cancel the appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { appointmentId } = req.body;

    const appointmentData = await appointment.findById(appointmentId);

    // verify appointment users
    if (appointmentData.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized action",
      });
    }

    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment already cancelled",
      });
    }

    await appointment.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot

    const { docId, slotTime, slotDate } = appointmentData;

    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slot_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime,
    );

    await doctorModel.findByIdAndUpdate(docId, {
      slot_booked: slots_booked,
    });
    res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// payment api using razorpay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointment.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or Not Found",
      });
    }

    // creating options for razorpay payment

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // order creation

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to verify razorpay payment

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify the signature for security
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return res.json({
        success: false,
        message: "Invalid Payment Signature",
      });
    }

    // Signature is valid, now verify with Razorpay
    const order_info = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (order_info.status === "paid") {
      const updateResult = await appointment.findByIdAndUpdate(
        order_info.receipt,
        { payment: true },
        { new: true },
      );

      res.json({
        success: true,
        message: "Payment Successfull",
      });
    } else {
      res.json({
        success: false,
        message: "Payment Failed - Order status: " + order_info.status,
      });
    }
  } catch (error) {
    console.log("Payment verification error:", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  userRegister,
  userLogin,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
