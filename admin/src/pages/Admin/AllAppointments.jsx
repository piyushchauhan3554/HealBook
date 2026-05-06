import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'
import { motion } from 'framer-motion'

const AllApointment = () => {
  const { aToken, getAllAppointment, appointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, changeDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointment()
    }
  }, [aToken])

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System <span className="gradient-text">Appointments</span></h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Overview of all medical bookings across the platform</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-white px-5 py-2.5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
            <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">{appointments.length} Records Found</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-premium border border-slate-100 overflow-hidden">
        <div className="hidden lg:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-5 px-10 bg-slate-50/50 border-b border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">#</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Age</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Schedule</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Professional</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fees</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
          {appointments.map((item, index) => (
            <motion.div 
              variants={itemAnim}
              key={index} 
              className="grid grid-cols-1 lg:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-slate-600 py-5 px-10 border-b border-slate-50 hover:bg-slate-50/80 transition-all group"
            >
              <p className="text-xs font-semibold text-slate-400 lg:block hidden">{index + 1}</p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img className="w-full h-full object-cover" src={item.userData.image} alt="" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">{item.userData.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase lg:hidden block">Patient Details</p>
                </div>
              </div>

              <div className="text-center lg:block flex justify-between items-center mt-2 lg:mt-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase lg:hidden block">Age</p>
                <p className="text-sm font-semibold text-slate-500 bg-slate-50 lg:bg-transparent px-3 py-1 lg:p-0 rounded-lg">{calculateAge(item.userData.dob)}Y</p>
              </div>

              <div className="text-center lg:block flex justify-between items-center mt-2 lg:mt-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase lg:hidden block">Visit Time</p>
                <p className="text-sm font-semibold text-slate-900">{changeDateFormat(item.slotDate)} | <span className="text-primary">{item.slotTime}</span></p>
              </div>

              <div className="flex items-center gap-3 lg:mt-0 mt-4 border-t lg:border-0 pt-4 lg:pt-0">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-100 shrink-0">
                  <img className="w-full h-full object-cover" src={item.docData.image} alt="" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.docData.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.docData.speciality}</p>
                </div>
              </div>

              <div className="lg:block flex justify-between items-center mt-4 lg:mt-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase lg:hidden block">Amount Paid</p>
                <p className="text-base font-bold text-slate-900">{currency}{item.amount}</p>
              </div>

              <div className="flex justify-end mt-6 lg:mt-0">
                {item.cancelled ? (
                  <span className="px-3 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-lg">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">Completed</span>
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => cancelAppointment(item._id)} 
                    className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-rose-50 hover:text-rose-500 transition-all group/btn"
                  >
                    <img className="w-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" src={assets.cancel_icon} alt="cancel" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {appointments.length === 0 && (
        <div className='text-center py-20 bg-white rounded-[3rem] mt-10 border border-slate-100'>
          <div className='w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6'>📋</div>
          <p className='text-slate-400 font-bold uppercase tracking-widest'>No appointments found</p>
        </div>
      )}
    </motion.div>
  )
}

export default AllApointment