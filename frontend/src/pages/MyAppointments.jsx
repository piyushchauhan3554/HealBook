import React, { useContext, useCallback } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
const MyAppointments = () => {
  const {backendUrl,token,getAllDoctors}=useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const navigate=useNavigate()
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const getAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-appointments', {
        headers: {
          token
        }
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  const cancelAppointment=async (appointmentId)=>{
    
    try {
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{
        headers:{
          token
        }
      })
      if(!data.success){
        toast.error(data.message)
      }else{
        toast.success(data.message)
        getAppointments()
        getAllDoctors()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPayment=(order)=>{

    const options={
      key : import.meta.env.VITE_BACKEND_RAZORPAY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response);

        try {
          const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{
            headers:{
              token
            }
          }) 
          if(data.success){
            toast.success(data.message)
            // Wait for the server to process, then refresh the data
            await new Promise(resolve => setTimeout(resolve, 1000))
            await getAppointments()
            // Stay on the page - no navigate needed, fresh data will show paid button
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }

    const rzp=new window.Razorpay(options)
    rzp.open()
  }
  const appointmentRazorpay=async (appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId},{
        headers:{
          token
        }
      })

      if(data.success){
        initPayment(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const changeDateFormat=(slotDate)=>{
    if(slotDate){
      const dateArray=slotDate.split("_")
      return `${dateArray[0]} ${months[dateArray[1]-1]} ${dateArray[2]}`
    }
  }

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token, getAppointments]);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 h-32 bg-indigo-50 object-cover' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{changeDateFormat(item.slotDate)} | {item.slotTime}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Status: </span>{item.cancelled ? 'Cancelled' : 'Active'}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {item.cancelled ? (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 font-medium'>Appointment Cancelled</button>
                ) : item.isCompleted ? (
                  <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500 font-medium'>Completed</button>
                ) : item.payment ? (
                  <>
                    <button className='sm:min-w-48 py-2 border rounded text-green-600 bg-green-50 font-medium'>Payment Completed</button>
                    <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer'>Cancel Appointment</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>Pay Online</button>
                    <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer'>Cancel Appointment</button>
                  </>
                )}
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments