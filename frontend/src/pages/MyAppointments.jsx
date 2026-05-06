import React, { useContext, useCallback, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const MyAppointments = () => {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const getAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-appointments', {
        headers: { token }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, {
        headers: { token }
      })
      if (!data.success) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
        getAppointments()
        getAllDoctors()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPayment = (order) => {
    const options = {
      key: import.meta.env.VITE_BACKEND_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {
            headers: { token }
          })
          if (data.success) {
            toast.success(data.message)
            await new Promise(resolve => setTimeout(resolve, 1000))
            await getAppointments()
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, {
        headers: { token }
      })

      if (data.success) {
        initPayment(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const changeDateFormat = (slotDate) => {
    if (slotDate) {
      const dateArray = slotDate.split("_")
      return `${dateArray[0]} ${months[dateArray[1] - 1]} ${dateArray[2]}`
    }
  }

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token, getAppointments]);

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='py-10 max-w-5xl mx-auto px-4'
    >
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12'>
        <div>
          <h1 className='text-4xl font-black text-slate-900 tracking-tighter uppercase'>My <span className="gradient-text">Appointments</span></h1>
          <p className='text-slate-500 font-bold text-sm uppercase tracking-widest mt-2'>Manage and track your medical visits</p>
        </div>
        <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm'>
          <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></div>
          <p className='text-slate-600 font-bold text-xs uppercase tracking-tight'>{appointments.length} Scheduled</p>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className='grid grid-cols-1 gap-6'
      >
        {appointments.map((item, index) => (
          <motion.div 
            variants={itemAnim}
            key={index}
            className='bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-50 hover:shadow-premium transition-all duration-500 group relative overflow-hidden'
          >
            <div className='flex flex-col md:flex-row gap-8 items-start relative z-10'>
              {/* Doctor Image */}
              <div className='relative shrink-0'>
                <div className='w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-slate-50'>
                  <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' src={item.docData.image} alt="" />
                </div>
                {!item.cancelled && !item.isCompleted && (
                  <div className='absolute -top-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg'>Live</div>
                )}
              </div>

              {/* Appointment Details */}
              <div className='flex-1 space-y-4'>
                <div>
                  <h3 className='text-2xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight'>{item.docData.name}</h3>
                  <p className='text-primary font-bold text-sm uppercase tracking-[0.2em] mt-1'>{item.docData.speciality}</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50'>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400'>📍</div>
                      <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Location</p>
                        <p className='text-sm font-bold text-slate-600'>{item.docData.address.line1}, {item.docData.address.line2}</p>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary'>📅</div>
                      <div>
                        <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Date & Time</p>
                        <p className='text-sm font-black text-slate-900'>{changeDateFormat(item.slotDate)} | <span className="text-primary">{item.slotTime}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col gap-3 w-full md:w-56 justify-end'>
                {item.cancelled ? (
                  <button className='w-full py-4 bg-rose-50 text-rose-500 font-black text-xs uppercase tracking-widest rounded-2xl border border-rose-100 cursor-default'>
                    Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button className='w-full py-4 bg-emerald-50 text-emerald-600 font-black text-xs uppercase tracking-widest rounded-2xl border border-emerald-100 cursor-default'>
                    Completed
                  </button>
                ) : (
                  <>
                    {!item.payment ? (
                      <button 
                        onClick={() => appointmentRazorpay(item._id)} 
                        className='w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform active:scale-95'
                      >
                        Pay Online
                      </button>
                    ) : (
                      <button className='w-full py-4 bg-emerald-50 text-emerald-600 font-black text-xs uppercase tracking-widest rounded-2xl border border-emerald-100 cursor-default flex items-center justify-center gap-2'>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Paid
                      </button>
                    )}
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='w-full py-4 bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 font-black text-xs uppercase tracking-widest rounded-2xl border border-slate-100 hover:border-rose-100 transition-all transform active:scale-95'
                    >
                      Cancel Visit
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700'></div>
          </motion.div>
        ))}
      </motion.div>

      {appointments.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-col items-center justify-center py-20 text-center'
        >
          <div className='w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6'>🏥</div>
          <h2 className='text-2xl font-black text-slate-900'>No Appointments Yet</h2>
          <p className='text-slate-500 font-medium mt-2'>Book your first consultation today!</p>
          <button onClick={() => navigate('/doctors')} className='btn-primary mt-8 px-10'>Browse Doctors</button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MyAppointments