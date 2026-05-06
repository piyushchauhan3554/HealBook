import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      <div className='text-center pt-16'>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
        >
          <span className="text-primary font-extrabold text-sm uppercase tracking-[0.4em] mb-4 inline-block">Get In Touch</span>
          <h1 className='text-4xl md:text-5xl font-black tracking-tighter text-slate-900'>Contact <span className="gradient-text">HealBook</span></h1>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>
      </div>

      <div className='flex flex-col my-24 justify-center md:flex-row gap-20 mb-32 items-center'>
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] rotate-6 transform -z-10 group-hover:rotate-0 transition-transform duration-700"></div>
          <img className='w-full max-w-[450px] rounded-[2rem] shadow-2xl relative z-10 border-4 border-white' src={assets.contact_image} alt="contact" />
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className='flex flex-col gap-10 items-start justify-center'
        >
          <div className="space-y-6">
            
            <div className="space-y-4">
              <div className='flex items-center gap-4 group'>
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">📞</div>
                <div>
                  <p className='text-slate-400 font-bold text-[10px] uppercase tracking-widest'>Call Us</p>
                  <p className='text-slate-900 font-black text-lg'>+91-8279813554</p>
                </div>
              </div>
              <div className='flex items-center gap-4 group'>
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">✉️</div>
                <div>
                  <p className='text-slate-400 font-bold text-[10px] uppercase tracking-widest'>Email Us</p>
                  <p className='text-slate-900 font-black text-lg'>piyushchauhan8279@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Contact

