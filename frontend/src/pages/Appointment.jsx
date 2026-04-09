import { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext' 
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/relatedDoctors';

const Appointment = () => {
  const {docId}=useParams();
  
  const {doctors,currencySymbol}=useContext(AppContext)
  const [docInfo,setDocInfo]=useState(null)

  const [docSlot,setDocSlot]=useState([])
  const [slotIdx,setSlotIdx]=useState(0)
  const [slotTime,setSlotTime]=useState('')

  const daysOfWeek=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlot=async ()=>{
    setDocSlot([])
    const today=new Date()

    for(let i=0;i<7;i++){
      let currDate=new Date(today)
      currDate.setDate(today.getDate()+i)

      let endTime=new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      if(today.getDate()===currDate.getDate()){
        currDate.setHours(currDate.getHours()>10 ? currDate.getHours()+1 : 10)
        currDate.setMinutes(currDate.getMinutes()>30 ? 30:0)

      }else{
        currDate.setHours(10)
        currDate.setMinutes(0)
      }
      
      let timeSlots=[]
      while(currDate<endTime){
        let formattedTime=currDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        timeSlots.push({
          datetime:new Date(currDate),
          time:formattedTime
        })
        currDate.setMinutes(currDate.getMinutes()+30)
      }
      setDocSlot(prev=>([...prev,timeSlots]))
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
              <div onClick={()=>setSlotIdx(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIdx === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] &&  daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlot.length > 0 && docSlot[slotIdx] && docSlot[slotIdx].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime===item.time ? 'bg-primary text-white' : 'border border-gray-300'}`}>
                {
                  item.time.toLowerCase()
                }
              </p>
            ))
          }
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-6'>Book an appointment</button>
      </div>

          {/* listing related doctors */}

          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  ) : null
}

export default Appointment