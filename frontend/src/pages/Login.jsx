import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom' 
import { useEffect } from 'react'
const Login = () => {
  const [state,setState]=useState('Sign Up')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {token,setToken,backendUrl}=useContext(AppContext)
  const navigate=useNavigate()
  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try {
      if(state==='Sign Up'){
        const {data}=await axios.post(backendUrl + "/api/user/register" , {name,password,email})
        if(!data.success){
          toast.error(data.message)
        }else{
          setToken(data.token)
          localStorage.setItem('token',data.token)
          
        }
      }else{
        const {data}=await axios.post(backendUrl + "/api/user/login" , {password,email})
        if(!data.success){
          toast.error(data.message)
        }else{
          setToken(data.token)
          localStorage.setItem('token',data.token)
          
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
   <form onSubmit={onSubmitHandler} className='flex items-center min-h-[80vh]'>
      <div className='flex flex-col gap-3 m-auto p-8 items-start min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='font-semibold text-2xl'>{state==='Sign Up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state==='Sign Up' ? 'sign up' : 'sign in'} to book appointment</p>
          {
            state==='Sign Up' ? <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(event)=>(setName(event.target.value))} value={name} />
          </div> : null
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(event)=>(setEmail(event.target.value))} value={email} />
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(event)=>(setPassword(event.target.value))} value={password} />
          </div>
          <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer'>{state==='Sign Up' ? 'Create Account' : 'Login'}</button>
          {state==='Sign Up' ? <p>Already have an account ? <span onClick={()=>(setState('Login'))} className='text-primary cursor-pointer underline'>Login here</span></p> :<p>Create a new Account <span onClick={()=>(setState('Sign Up'))} className='text-primary cursor-pointer underline'>Click here</span></p>}
      </div>
   </form>
  )
}

export default Login