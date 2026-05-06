import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom' 
import { motion, AnimatePresence } from 'framer-motion'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + "/api/user/register", { name, password, email })
        if (!data.success) {
          toast.error(data.message)
        } else {
          setToken(data.token)
          localStorage.setItem('token', data.token)
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", { password, email })
        if (!data.success) {
          toast.error(data.message)
        } else {
          setToken(data.token)
          localStorage.setItem('token', data.token)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
   <div className='flex items-center justify-center min-h-[80vh] px-4'>
      <motion.form 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmitHandler} 
        className='flex flex-col gap-6 m-auto p-10 items-start min-w-[340px] sm:min-w-[420px] glass-card rounded-3xl text-slate-600 text-sm shadow-premium'
      >
          <div className='w-full'>
            <motion.p 
              key={state}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='font-bold text-3xl text-slate-800'
            >
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </motion.p>
            <p className='mt-1 text-slate-500 font-medium'>
              {state === 'Sign Up' ? 'Join us today to book your first appointment' : 'Login to manage your appointments'}
            </p>
          </div>

          <AnimatePresence mode='wait'>
            {state === 'Sign Up' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className='w-full overflow-hidden'
              >
                <p className='font-bold mb-1.5 ml-1'>Full Name</p>
                <input 
                  className='border border-slate-200 rounded-2xl w-full p-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white/50 backdrop-blur-sm' 
                  type="text" 
                  placeholder="John Doe"
                  onChange={(event) => (setName(event.target.value))} 
                  value={name} 
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className='w-full'>
            <p className='font-bold mb-1.5 ml-1'>Email Address</p>
            <input 
              className='border border-slate-200 rounded-2xl w-full p-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white/50 backdrop-blur-sm' 
              type="email" 
              placeholder="example@email.com"
              onChange={(event) => (setEmail(event.target.value))} 
              value={email} 
              required
            />
          </div>

          <div className='w-full'>
            <p className='font-bold mb-1.5 ml-1'>Password</p>
            <input 
              className='border border-slate-200 rounded-2xl w-full p-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white/50 backdrop-blur-sm' 
              type="password" 
              placeholder="••••••••"
              onChange={(event) => (setPassword(event.target.value))} 
              value={password} 
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit' 
            className='btn-primary w-full py-4 text-base font-bold shadow-xl shadow-primary/20'
          >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </motion.button>

          <div className='w-full text-center mt-2'>
            {state === 'Sign Up' ? (
              <p className='font-medium'>Already have an account? <span onClick={() => (setState('Login'))} className='text-primary cursor-pointer font-bold hover:underline ml-1'>Login here</span></p>
            ) : (
              <p className='font-medium'>New to HealBook? <span onClick={() => (setState('Sign Up'))} className='text-primary cursor-pointer font-bold hover:underline ml-1'>Create account</span></p>
            )}
          </div>
      </motion.form>
   </div>
  )
}

export default Login