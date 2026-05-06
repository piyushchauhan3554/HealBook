import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext);
  const { changeDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    dashData && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="m-6"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">DASHBOARD OVERVIEW</h1>
          <p className="text-slate-500 font-medium">Welcome back! Here's what's happening today.</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemAnim} className="card-dashboard group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-5 bg-primary/10 rounded-[1.5rem] text-primary shadow-inner">
                <img className="w-10" src={assets.doctor_icon} alt="doctors" />
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 leading-none">{dashData.doc}</p>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Total Doctors</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemAnim} className="card-dashboard group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-5 bg-green-50 rounded-[1.5rem] text-green-600 shadow-inner">
                <img className="w-10" src={assets.appointments_icon} alt="appointments" />
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 leading-none">{dashData.app}</p>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Appointments</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemAnim} className="card-dashboard group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-5 bg-orange-50 rounded-[1.5rem] text-orange-600 shadow-inner">
                <img className="w-10" src={assets.patients_icon} alt="patients" />
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 leading-none">{dashData.patients}</p>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Total Patients</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white mt-12 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-10 py-8 bg-slate-50/30 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <img src={assets.list_icon} className="w-6" />
              </div>
              <p className="text-xl font-black text-slate-900 uppercase tracking-tight">Latest Bookings</p>
            </div>
            </div>

          <div className="divide-y divide-slate-50">
            {dashData.latestAppointments.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (index * 0.05) }}
                className="flex items-center px-10 py-6 gap-6 hover:bg-slate-50/80 transition-all group"
                key={index}
              >
                <div className="relative">
                  <img
                    className="rounded-2xl w-14 h-14 object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                    src={item.docData.image}
                    alt=""
                  />
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${item.cancelled ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-extrabold text-lg group-hover:text-primary transition-colors">
                    {item.docData.name}
                  </p>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-tighter">
                    {changeDateFormat(item.slotDate)}
                  </p>
                </div>
                <div>
                  {item.cancelled ? (
                    <span className="bg-rose-50 text-rose-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em]">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em]">Completed</span>
                  ) : (
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl cursor-pointer transition-all border border-slate-100"
                    >
                      <img className="w-4" src={assets.cancel_icon} alt="cancel" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default Dashboard;


