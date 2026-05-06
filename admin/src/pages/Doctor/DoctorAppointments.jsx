import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";
import { motion } from "framer-motion";

const DoctorAppointments = () => {
  const { getAppointments, dToken, appointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, changeDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 w-full max-w-7xl mx-auto"
    >
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Manage <span className="gradient-text">Appointments</span></h1>
          <p className='text-slate-500 font-medium text-sm mt-2'>Review and update your patient visits</p>
        </div>
        
      </div>

      <div className="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden">
        <div className="hidden lg:grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1.5fr] items-center py-5 px-10 bg-slate-50/50 border-b border-slate-100">
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>#</p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Patient</p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Payment</p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Age</p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Schedule</p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Fees</p>
          <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right'>Action</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className='max-h-[70vh] overflow-y-auto custom-scrollbar'
        >
          {appointments?.reverse().map((item, index) => (
            <motion.div 
              variants={itemAnim}
              key={index} 
              className="grid grid-cols-1 lg:grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1.5fr] items-center text-slate-600 py-5 px-10 border-b border-slate-50 hover:bg-slate-50/80 transition-all group"
            >
              <p className="text-xs font-semibold text-slate-400 lg:block hidden">{index + 1}</p>
              
              <div className="flex items-center gap-3">
                <div className='w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0'>
                  <img className="w-full h-full object-cover" src={item.userData.image} alt="" />
                </div>
                <div>
                  <p className='font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight'>{item.userData.name}</p>
                  <p className='text-[10px] font-bold text-slate-400 uppercase lg:hidden block'>Patient Name</p>
                </div>
              </div>

              <div className="lg:block flex justify-between items-center mt-2 lg:mt-0">
                <p className='text-[10px] font-bold text-slate-400 uppercase lg:hidden block'>Payment Mode</p>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${item.payment ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                  {item.payment ? "Online" : "Cash"}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-500 lg:block hidden">{calculateAge(item.userData.dob)}Y</p>
              
              <div className="lg:block flex justify-between items-center mt-2 lg:mt-0">
                <p className='text-[10px] font-bold text-slate-400 uppercase lg:hidden block'>Visit Time</p>
                <p className='text-sm font-semibold text-slate-900'>{changeDateFormat(item.slotDate)} | <span className='text-primary'>{item.slotTime}</span></p>
              </div>

              <div className="lg:block flex justify-between items-center mt-2 lg:mt-0">
                <p className='text-[10px] font-bold text-slate-400 uppercase lg:hidden block'>Amount</p>
                <p className='text-base font-bold text-slate-900'>{currency}{item.amount}</p>
              </div>

              <div className="flex justify-end mt-4 lg:mt-0 gap-2">
                {item.cancelled ? (
                  <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">Completed</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => cancelAppointment(item._id)} 
                      className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                      <img className="w-4 group-hover:brightness-0 group-hover:invert" src={assets.cancel_icon} alt="cancel" />
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => completeAppointment(item._id)} 
                      className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                    >
                      <img className="w-4 group-hover:brightness-0 group-hover:invert" src={assets.tick_icon} alt="complete" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {appointments?.length === 0 && (
        <div className='text-center py-20 bg-white rounded-[2rem] mt-10 border border-slate-100'>
          <div className='w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6'>📋</div>
          <p className='text-slate-400 font-bold uppercase tracking-widest'>No appointments scheduled yet</p>
        </div>
      )}
    </motion.div>
  );
};


export default DoctorAppointments;
