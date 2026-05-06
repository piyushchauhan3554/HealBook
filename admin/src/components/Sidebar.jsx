import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  
  return (
    <div className='min-h-screen bg-white border-r border-slate-100 w-20 md:w-80 shrink-0 sticky top-0 h-screen overflow-y-auto'>
      <div className='flex flex-col py-8 h-full'>

        {aToken && (
          <ul className='space-y-1'>
            {[
              { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
              { to: "/all-appointments", icon: assets.appointment_icon, label: "Appointments" },
              { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
              { to: "/doctor-list", icon: assets.people_icon, label: "Doctor List" }
            ].map((item) => (
              <NavLink 
                key={item.to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} 
                to={item.to}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  src={item.icon} 
                  alt={item.label} 
                  className="w-5 shrink-0"
                />
                <p className='hidden md:block tracking-tight'>{item.label}</p>
              </NavLink>
            ))}
          </ul>
        )}

        {dToken && (
          <ul className='space-y-1'>
            {[
              { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
              { to: "/doctor-appointments", icon: assets.appointment_icon, label: "Appointments" },
              { to: "/doctor-profile", icon: assets.people_icon, label: "Profile" }
            ].map((item) => (
              <NavLink 
                key={item.to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} 
                to={item.to}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  src={item.icon} 
                  alt={item.label} 
                  className="w-5 shrink-0"
                />
                <p className='hidden md:block tracking-tight'>{item.label}</p>
              </NavLink>
            ))}
          </ul>
        )}

       
      </div>
    </div>
  )
}

export default Sidebar
