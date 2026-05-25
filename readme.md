# HealBook – Modern Healthcare Appointment Booking Platform

## Overview

HealBook is a full-stack healthcare appointment booking platform developed using MERN stack technologies. The platform allows patients to search doctors by specialization, book appointments online, make secure payments, and manage healthcare activities efficiently.

The system also provides dedicated dashboards for doctors and administrators to manage appointments, schedules, profiles, and overall healthcare operations.

---

# Features

## Patient Features

* User Registration & Login
* Secure JWT Authentication
* Search Doctors by Specialization
* View Doctor Profiles
* Book Appointments Online
* Dynamic Appointment Slot Management
* Online Payment Integration using Razorpay
* View Appointment History
* Profile Management

## Doctor Features

* Doctor Dashboard
* Manage Appointments
* Update Availability
* Track Earnings
* Manage Profile Information

## Admin Features

* Admin Dashboard
* Add & Manage Doctors
* Monitor Appointments
* View Platform Statistics
* Centralized Healthcare Management

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion

## Backend

* Node.js
* Express.js
* JWT Authentication
* Bcrypt.js

## Database

* MongoDB
* Mongoose

## Cloud & Services

* Cloudinary
* Razorpay

---

# Project Structure

```bash
HealBook/
│
├── backend/
├── frontend/
├── admin/
│
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/piyushchauhan3554/HealBook.git
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4. Install Admin Panel Dependencies

```bash
cd admin
npm install
```

---

# Environment Variables

Create a `.env` file inside backend folder.

```env
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

---

# Run Project Locally

## Backend

```bash
cd backend
npm run server
```

---

## Frontend

```bash
cd frontend
npm run dev
```

---

## Admin Panel

```bash
cd admin
npm run dev
```

---

# Deployment

## Backend Deployment

* Render

## Frontend Deployment

* Vercel

## Database

* MongoDB Atlas

## Media Storage

* Cloudinary

---

# Security Features

* JWT-Based Authentication
* Password Hashing using Bcrypt.js
* Role-Based Access Control
* Protected API Routes
* Secure Payment Verification

---

# Future Enhancements

* Telemedicine & Video Consultation
* Mobile Application Support
* AI-Based Healthcare Recommendations
* Electronic Medical Records
* Email & SMS Notifications
* Multi-Language Support

---

# Author

## Piyush Chauhan

Full Stack Web Developer

---

# License

This project is developed for educational and academic purposes.
