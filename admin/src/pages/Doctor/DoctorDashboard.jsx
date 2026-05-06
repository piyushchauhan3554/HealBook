import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const DoctorDashboard = () => {
  const { getDashboardData, dashData, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency, changeDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashboardData();
    }
  }, [dToken]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        className="p-8 w-full max-w-7xl mx-auto"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Doctor <span className="gradient-text">Dashboard</span></h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Welcome back! Here's a quick overview of your practice today.</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Earnings Card */}
          <motion.div variants={itemAnim} className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center transition-all duration-500">
                <img className="w-6 transition-all" src={assets.earning_icon} alt="" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{currency}{dashData.earnings}</p>
                <p className="text-slate-400 font-semibold text-xs uppercase tracking-widest mt-2">Earnings</p>
              </div>
            </div>
            
          </motion.div>

          {/* Appointments Card */}
          <motion.div variants={itemAnim} className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center transition-all duration-500">
                <img className="w-6 transition-all" src={assets.appointments_icon} alt="" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{dashData.totalAppointments}</p>
                <p className="text-slate-400 font-semibold text-xs uppercase tracking-widest mt-2">Appointments</p>
  
              </div>
            </div>
                    </motion.div>

          {/* Patients Card */}
          <motion.div variants={itemAnim} className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center transition-all duration-500">
                <img className="w-6  transition-all" src={assets.patients_icon} alt="" />
              </div>
              <div className="text-center">
                 <p className="text-3xl font-bold text-slate-900 tracking-tight">{dashData.totalPatients}</p>
                  <p className="text-slate-400 font-semibold text-xs uppercase tracking-widest mt-2">Patients</p>
              </div>
            </div>
           
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemAnim}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden"
        >
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <img className="w-4 brightness-0 invert" src={assets.list_icon} alt="" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Latest Bookings</h2>
            </div>
            </div>

          <div className="px-4 py-2">
            {dashData.latestAppointments.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="flex items-center px-6 py-5 gap-6 hover:bg-slate-50/80 rounded-2xl transition-all group"
                key={index}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img className="w-full h-full object-cover" src={item.userData.image} alt="" />
                </div>
                
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">
                    {item.userData.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-slate-400 font-medium text-[11px]">
                      {changeDateFormat(item.slotDate)} at <span className="text-slate-700 font-semibold">{item.slotTime}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">Completed</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center cursor-pointer shadow-sm"
                        title="Cancel Appointment"
                      >
                        <img className="w-5" src={assets.cancel_icon} alt="cancel" />
                      </motion.div>
                      <motion.div 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => completeAppointment(item._id)}
                        className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center cursor-pointer shadow-sm"
                        title="Complete Appointment"
                      >
                        <img className="w-5" src={assets.tick_icon} alt="complete" />
                      </motion.div>
                    </div>
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

export default DoctorDashboard;

