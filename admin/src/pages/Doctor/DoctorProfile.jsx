import { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + "/api/doctor/update-profile", updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  return profileData && (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='m-6'
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight uppercase">My Profile</h1>
        <button 
          onClick={isEdit ? updateProfile : () => setIsEdit(true)} 
          className={`btn-admin flex items-center gap-2 cursor-pointer ${isEdit ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {isEdit ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        <div className="lg:w-1/3">
          <div className='bg-white p-4 rounded-3xl shadow-sm border border-slate-100'>
            <img className='w-full rounded-2xl object-cover aspect-square bg-primary/5 shadow-inner' src={profileData.image} alt="" />
            <div className="mt-6 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-slate-900">{profileData.name}</h2>
              <p className="text-primary font-semibold mt-1">{profileData.degree} - {profileData.speciality}</p>
              <span className='mt-3 py-1 px-4 bg-primary-light text-primary text-xs font-bold rounded-full uppercase tracking-wider'>{profileData.experience} Experience</span>
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col gap-6'>
          {/* About Section */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              About Me
            </h3>
            <p className='text-slate-600 leading-relaxed'>{profileData.about}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Appointment Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-wider mb-2'>Appointment Fee</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-700">{currency}</span>
                    {isEdit ? (
                      <input 
                        type="number" 
                        className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-full outline-primary font-bold text-slate-800" 
                        onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                        value={profileData.fees} 
                      />
                    ) : (
                      <span className="text-xl font-bold text-slate-800">{profileData.fees}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-wider'>Availability Status</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                      checked={profileData.available}
                      disabled={!isEdit}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Clinic Address
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-wider mb-2'>Street / Line 1</p>
                  {isEdit ? (
                    <input 
                      type="text" 
                      className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-full outline-primary text-slate-700" 
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                      value={profileData.address.line1} 
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{profileData.address.line1}</p>
                  )}
                </div>
                
                <div>
                  <p className='text-slate-400 text-xs font-bold uppercase tracking-wider mb-2'>City / Line 2</p>
                  {isEdit ? (
                    <input 
                      type="text" 
                      className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-full outline-primary text-slate-700" 
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                      value={profileData.address.line2} 
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{profileData.address.line2}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DoctorProfile;
