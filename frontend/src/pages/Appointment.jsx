import { useContext, useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {AppContext} from '../context/AppContext' 
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/relatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const {docId}=useParams();
  
  const {doctors,currencySymbol,token,backendUrl,getAllDoctors}=useContext(AppContext)
  const [docInfo,setDocInfo]=useState(null)

  const [docSlot,setDocSlot]=useState([])
  const [slotIdx,setSlotIdx]=useState(0)
  const [slotTime,setSlotTime]=useState('')
  const navigate=useNavigate()

  const daysOfWeek=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlot=async ()=>{
    if(!docInfo) return;
    setDocSlot([])
    const today=new Date()
    let allSlots = []

    for(let i=0;i<7;i++){
      let currDate=new Date(today)
      currDate.setDate(today.getDate()+i)

      let endTime=new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      if(today.getDate()===currDate.getDate()){
        currDate.setHours(currDate.getHours()>=10 ? currDate.getHours()+1 : 10)
        currDate.setMinutes(currDate.getMinutes()>30 ? 30:0)

      }else{
        currDate.setHours(10)
        currDate.setMinutes(0)
      }
      
      let timeSlots=[]
      while(currDate<endTime){
        let formattedTime=currDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

        let day=currDate.getDate()
        let month=currDate.getMonth()+1
        let year=currDate.getFullYear()

        const slotDate=day +"_"+ month+"_"+year;
        const slotTime=formattedTime

        const isBooked = docInfo.slot_booked && docInfo.slot_booked[slotDate] && 
                 docInfo.slot_booked[slotDate].includes(slotTime)

        if(!isBooked){
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime
          })
        }


        currDate.setMinutes(currDate.getMinutes()+30)
      }
      allSlots.push({
        date: new Date(today.getTime() + i * 24 * 60 * 60 * 1000),
        slots: timeSlots
      })
    }
    setDocSlot(allSlots)

  }

  const bookAppointment=async()=>{
    if(!token){
      toast.warn('Login to Book Appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      return toast.warn('Please select a time slot')
    }

    try {
      if (!docSlot[slotIdx] || docSlot[slotIdx].slots.length === 0 && !slotTime) {
        return toast.error('No slots available for the selected day')
      }

      const date=docSlot[slotIdx].date;
      let day=date.getDate()
      let month=date.getMonth() +1
      let year=date.getFullYear()

      const slotDate=day +"_"+ month+"_"+year;

      const {data}=await axios.post(backendUrl+"/api/user/book-appointment" , {
        slotDate,slotTime,docId
      },{headers:{token}})
      
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors, docId])

  useEffect(()=>{
    getAvailableSlot()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlot);
  },[docSlot])

  return docInfo ? (
    <div>
      {/* doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>

      <div>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
      </div>

      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
      {/* doctor details like name , degree and experience */}
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /> </p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>
        {/* doctor about */}
        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 mt-4 font-medium'>Appointment fee: <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span></p>
      </div>

      </div>
      {/* booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex mt-4 gap-3 items-center w-full overflow-x-scroll'>
          {
            docSlot.length > 0 && docSlot.map((item,index)=>(
              <div onClick={()=>{setSlotIdx(index); setSlotTime('')}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{daysOfWeek[item.date.getDay()]}</p>
                <p>{item.date.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlot.length > 0 && docSlot[slotIdx] && docSlot[slotIdx].slots.map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime===item.time ? 'bg-primary text-white' : 'border border-gray-300'}`}>
                {
                  item.time.toLowerCase()
                }
              </p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary cursor-pointer text-white text-sm font-light px-14 py-3 rounded-full mt-6'>Book an appointment</button>
      </div>

          {/* listing related doctors */}

          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  ) : null
}

export default Appointment