import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (docImg === false) {
        return toast.error('Image not Selected')
      }
      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('fees', Number(fees))
      formData.append('speciality', speciality)
      formData.append('experience', experience)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      formData.append('degree', degree)
      formData.append('about', about)

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { aToken }
      })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setDegree('')
        setAbout('')
        setAddress1('')
        setAddress2('')
      } else {
        return toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  const inputClass = "w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none focus:border-primary transition-all placeholder:text-slate-300";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 w-full max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New <span className="gradient-text">Doctor</span></h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Register a new healthcare professional to the platform</p>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        <div className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100">
          
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative group">
              <label htmlFor="doc-img" className="cursor-pointer block">
                <div className="w-40 h-40 rounded-[2.2rem] border-2 border-dashed border-slate-200 group-hover:border-primary transition-all overflow-hidden bg-slate-50 flex items-center justify-center relative">
                  {docImg ? (
                    <img className="w-full h-full object-cover" src={URL.createObjectURL(docImg)} alt="" />
                  ) : (
                    <div className="text-center">
                      <img className="w-10 mx-auto mb-2 opacity-30 group-hover:opacity-100 transition-opacity" src={assets.upload_area} alt="" />
                      <p className="text-[11px] font-bold text-slate-400 group-hover:text-primary uppercase tracking-widest">Upload Photo</p>
                    </div>
                  )}
                </div>
              </label>
              <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
              {docImg && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg border-4 border-white">✓</div>
              )}
            </div>
            <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doctor Profile Picture</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            {/* Left Column: Personal Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">👤</div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Personal Information</h3>
              </div>

              <div>
                <label className={labelClass}>Doctor Full Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} className={inputClass} type="text" required placeholder="Dr. John Doe" />
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className={inputClass} type="email" required placeholder="john@example.com" />
              </div>

              <div>
                <label className={labelClass}>Account Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className={inputClass} type="password" required placeholder="••••••••" />
              </div>

              <div>
                <label className={labelClass}>Experience Level</label>
                <select className={inputClass} onChange={(e) => setExperience(e.target.value)} value={experience}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} year${i > 0 ? 's' : ''}`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                  ))}
                  <option value="10+ years">10+ Years</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Consultation Fees</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input onChange={(e) => setFees(e.target.value)} value={fees} className={`${inputClass} pl-10`} type="number" required placeholder="0.00" />
                </div>
              </div>
            </div>

            {/* Right Column: Professional Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">🎓</div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Professional Details</h3>
              </div>

              <div>
                <label className={labelClass}>Speciality</label>
                <select className={inputClass} onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Education / Degree</label>
                <input onChange={(e) => setDegree(e.target.value)} value={degree} className={inputClass} type="text" required placeholder="MBBS, MD" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={labelClass}>Clinic Address L1</label>
                  <input onChange={(e) => setAddress1(e.target.value)} value={address1} className={inputClass} type="text" required placeholder="Line 1" />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Clinic Address L2</label>
                  <input onChange={(e) => setAddress2(e.target.value)} value={address2} className={inputClass} type="text" required placeholder="Line 2" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-50">
            <label className={labelClass}>Doctor Biography / About</label>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className={`${inputClass} min-h-[160px] resize-none py-5 leading-relaxed`} required placeholder="Write a brief professional summary about the doctor..."></textarea>
          </div>

          <div className="mt-12 flex justify-end">
            <button type="submit" className="btn-admin flex items-center gap-2 group">
              <span>Register Doctor</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddDoctor;
