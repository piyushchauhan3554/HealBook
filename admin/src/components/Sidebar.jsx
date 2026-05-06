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
        <div className='px-6 mb-10'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl'>H</div>
            <p className='font-bold text-slate-800 text-lg hidden md:block'>HealBook</p>
          </div>
        </div>

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

        <div className='mt-auto px-10 py-8 hidden md:block'>
          <div className='bg-slate-50 rounded-3xl p-6 border border-slate-100'>
            <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1'>Admin Support</p>
            <p className='text-xs font-bold text-slate-600'>24/7 Professional Medical Assistance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar