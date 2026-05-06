import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext' 
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendUrl, getAllDoctors } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [docSlot, setDocSlot] = useState([])
  const [slotIdx, setSlotIdx] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlot = async () => {
    if (!docInfo) return;
    setDocSlot([])
    const today = new Date()
    let allSlots = []

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today)
      currDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() >= 10 ? currDate.getHours() + 1 : 10)
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currDate.setHours(10)
        currDate.setMinutes(0)
      }
      
      let timeSlots = []
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let day = currDate.getDate()
        let month = currDate.getMonth() + 1
        let year = currDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime

        const isBooked = docInfo.slot_booked && docInfo.slot_booked[slotDate] && 
                 docInfo.slot_booked[slotDate].includes(slotTime)

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime
          })
        }
        currDate.setMinutes(currDate.getMinutes() + 30)
      }
      allSlots.push({
        date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
        slots: timeSlots
      })
    }
    setDocSlot(allSlots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to Book Appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      return toast.warn('Please select a time slot')
    }

    try {
      if (!docSlot[slotIdx] || (docSlot[slotIdx].slots.length === 0 && !slotTime)) {
        return toast.error('No slots available for the selected day')
      }

      const date = docSlot[slotIdx].date;
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendUrl + "/api/user/book-appointment", {
        slotDate, slotTime, docId
      }, { headers: { token } })
      
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlot()
  }, [docInfo])

  return docInfo ? (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* doctor details */}
      <div className='flex flex-col sm:flex-row gap-8'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className='w-full sm:max-w-72'
        >
          <img className='bg-primary rounded-3xl w-full shadow-premium' src={docInfo.image} alt="" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex-1 glass-card rounded-3xl p-8 py-7 mx-2 sm:mx-0 mt-[-60px] sm:mt-0 relative z-10'
        >
          <div className='flex items-center gap-2 text-3xl font-bold text-slate-900'>
            {docInfo.name} 
            <img className='w-6' src={assets.verified_icon} alt="" /> 
          </div>
          <div className='flex items-center gap-3 text-lg mt-2 text-slate-600 font-medium'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className='py-1 px-4 bg-primary-light text-primary text-sm rounded-full'>{docInfo.experience} Experience</span>
          </div>

          <div className='mt-8'>
            <p className='flex items-center gap-2 text-lg font-bold text-slate-900'>
              About 
              <img className="w-4 opacity-50" src={assets.info_icon} alt="" />
            </p>
            <p className='text-slate-600 leading-relaxed max-w-[700px] mt-2'>{docInfo.about}</p>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-100 flex items-center justify-between'>
            <div>
              <p className='text-slate-500 font-medium'>Appointment Fee</p>
              <p className='text-2xl font-bold text-slate-900'>{currencySymbol}{docInfo.fees}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* booking slots */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='sm:ml-80 sm:pl-4 mt-12'
      >
        <p className='text-xl font-bold text-slate-800 mb-6'>Select Booking Slot</p>
        
        <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 no-scrollbar'>
          {docSlot.length > 0 && docSlot.map((item, index) => (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSlotIdx(index); setSlotTime('') }} 
              className={`text-center py-6 min-w-20 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-1 ${slotIdx === index ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'}`} 
              key={index}
            >
              <p className='text-sm font-medium uppercase'>{daysOfWeek[item.date.getDay()]}</p>
              <p className='text-2xl font-bold'>{item.date.getDate()}</p>
            </motion.div>
          ))}
        </div>

        <div className='flex gap-3 items-center w-full overflow-x-auto mt-8 pb-4 no-scrollbar'>
          <AnimatePresence mode='wait'>
            <motion.div 
              key={slotIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-3"
            >
              {docSlot.length > 0 && docSlot[slotIdx] && docSlot[slotIdx].slots.map((item, index) => (
                <motion.p 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSlotTime(item.time)} 
                  key={index} 
                  className={`text-sm font-semibold shrink-0 px-6 py-3 rounded-2xl cursor-pointer transition-all ${slotTime === item.time ? 'bg-primary text-white shadow-lg' : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'}`}
                >
                  {item.time.toLowerCase()}
                </motion.p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={bookAppointment} 
          className='btn-primary mt-10 w-full sm:w-auto px-20 py-4 shadow-xl'
        >
          Book Appointment Now
        </motion.button>
      </motion.div>

      <div className="mt-24">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </motion.div>
  ) : (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Appointment