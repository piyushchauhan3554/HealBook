import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center py-24 gap-8 text-gray-800'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-primary font-extrabold text-sm uppercase tracking-[0.3em] mb-4 inline-block">Categories</span>
          <h1 className='text-4xl md:text-5xl font-black tracking-tighter text-slate-900'>Find by Speciality</h1>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='text-lg text-center sm:w-1/2 text-slate-500 px-6 leading-relaxed'
        >
          Simply browse through our extensive list of trusted doctors, <br className='hidden md:block' /> 
          schedule your appointment hassle-free.
        </motion.p>

        <div className='flex gap-8 sm:justify-center pt-10 w-full overflow-x-auto pb-10 px-8 no-scrollbar'>
               {
                specialityData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center text-sm cursor-pointer shrink-0 group relative' 
                        to={`/doctors/${item.speciality}`}
                      >
                        <div className='w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center mb-5 group-hover:bg-primary transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-primary group-hover:-translate-y-3 group-hover:shadow-premium relative overflow-hidden'>
                          <div className="absolute inset-0 bg-primary/5 group-hover:bg-white/0 transition-colors"></div>
                          <img className="w-12 sm:w-16 relative z-10 group-hover:scale-110 transition-all duration-500" src={item.image} alt={item.speciality} />
                        </div>
                        <p className='font-bold text-slate-700 group-hover:text-primary transition-colors tracking-tight uppercase text-xs'>{item.speciality}</p>
                      </Link>
                    </motion.div>
                ))
               } 
        </div>
    </div>
  )
}

export default SpecialityMenu

