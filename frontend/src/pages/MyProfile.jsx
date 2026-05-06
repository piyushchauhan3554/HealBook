import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('dob', userData.dob)
      formData.append('gender', userData.gender)
      formData.append('address', JSON.stringify(userData.address))

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token }
      })

      if (data.success) {
        toast.success(data.message)
        await loadUserData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='max-w-6xl mx-auto py-12 px-6 relative'
    >
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10"></div>

      <div className='flex flex-col lg:flex-row gap-12 items-start'>
        {/* Left Side - Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='w-full lg:w-[380px] shrink-0'
        >
          <div className='bg-white rounded-[2.5rem] p-10 shadow-premium border border-slate-100 text-center relative overflow-hidden'>
            <div className='relative inline-block mb-8'>
              <div className='w-44 h-44 rounded-[2.2rem] p-1.5 bg-gradient-to-tr from-primary to-secondary shadow-xl relative z-10'>
                <div className='w-full h-full rounded-[2rem] overflow-hidden bg-slate-50 relative group'>
                  <img 
                    className={`w-full h-full object-cover transition-all duration-500 ${isEdit ? 'opacity-40 blur-[2px]' : ''}`} 
                    src={image ? URL.createObjectURL(image) : userData.image} 
                    alt="" 
                  />
                  {isEdit && (
                    <label htmlFor='image' className='absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/10'>
                      <img className='w-10' src={assets.upload_icon} alt="" />
                      <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                  )}
                </div>
              </div>
              {!isEdit && (
                <div className='absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl z-20 border border-slate-50'>✨</div>
              )}
            </div>

            <div className='space-y-2'>
              {isEdit ? (
                <input 
                  className='text-2xl font-bold text-slate-900 bg-slate-50 rounded-xl px-4 py-2 w-full text-center border-b-2 border-primary focus:outline-none'
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <h2 className='text-3xl font-bold text-slate-900 tracking-tight'>{userData.name}</h2>
              )}
          
            </div>

          

            <div className='mt-10 flex flex-col gap-3'>
              {isEdit ? (
                <div className='flex gap-2'>
                  <button onClick={() => { setIsEdit(false); setImage(false) }} className='flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all'>Cancel</button>
                  <button onClick={updateUserProfileData} className='flex-[2] btn-primary py-3 rounded-xl font-bold text-sm shadow-primary/20'>Save Changes</button>
                </div>
              ) : (
                <button onClick={() => setIsEdit(true)} className='btn-primary w-full py-4 rounded-xl font-bold text-sm shadow-primary/20 flex items-center justify-center gap-2 group'>
                  <span>Edit Profile</span>
                  <span className='group-hover:translate-x-1 transition-transform'>→</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Details Grid */}
        <div className='flex-1 space-y-8'>
          {/* Contact Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='bg-white rounded-[2.5rem] p-10 shadow-premium border border-slate-100 space-y-8'
          >
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary'>📩</div>
              <h3 className='text-lg font-bold text-slate-900 tracking-tight'>Contact Information</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-1.5'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1'>Email Address</p>
                <p className='text-base font-semibold text-slate-700 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-50/50'>{userData.email}</p>
              </div>

              <div className='space-y-1.5'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1'>Phone Number</p>
                {isEdit ? (
                  <input 
                    className='w-full bg-slate-50 rounded-2xl px-5 py-3.5 font-bold text-slate-700 border border-slate-200 focus:border-primary focus:outline-none transition-all'
                    value={userData.phone}
                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <p className='text-base font-semibold text-slate-700 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-50/50'>{userData.phone}</p>
                )}
              </div>

              <div className='md:col-span-2 space-y-1.5'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1'>Home Address</p>
                {isEdit ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <input className='w-full bg-slate-50 rounded-2xl px-5 py-3.5 font-bold text-slate-700 border border-slate-200 focus:border-primary focus:outline-none transition-all' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} placeholder='Street Address' />
                    <input className='w-full bg-slate-50 rounded-2xl px-5 py-3.5 font-bold text-slate-700 border border-slate-200 focus:border-primary focus:outline-none transition-all' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} placeholder='City, State' />
                  </div>
                ) : (
                  <p className='text-base font-semibold text-slate-700 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-50/50 leading-relaxed'>
                    {userData.address.line1}<br/>{userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Basic Details Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='bg-white rounded-[2.5rem] p-10 shadow-premium border border-slate-100 space-y-8'
          >
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500'>👤</div>
              <h3 className='text-lg font-bold text-slate-900 tracking-tight'>Personal Details</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-1.5'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1'>Gender</p>
                {isEdit ? (
                  <select 
                    className='w-full bg-slate-50 rounded-2xl px-5 py-3.5 font-bold text-slate-700 border border-slate-200 focus:border-primary focus:outline-none transition-all appearance-none'
                    value={userData.gender}
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className='text-base font-semibold text-slate-700 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-50/50'>{userData.gender}</p>
                )}
              </div>

              <div className='space-y-1.5'>
                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1'>Birthday</p>
                {isEdit ? (
                  <input 
                    type='date'
                    className='w-full bg-slate-50 rounded-2xl px-5 py-3.5 font-bold text-slate-700 border border-slate-200 focus:border-primary focus:outline-none transition-all'
                    value={userData.dob}
                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  />
                ) : (
                  <p className='text-base font-semibold text-slate-700 bg-slate-50 px-5 py-3.5 rounded-2xl border border-slate-50/50'>{userData.dob}</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default MyProfile