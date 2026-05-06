import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-primary via-primary to-indigo-800 rounded-[2.5rem] px-8 md:px-14 lg:px-24 overflow-hidden shadow-premium relative min-h-[550px]'
    >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-white/10 rounded-full -mr-20 -mt-20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-indigo-400/20 rounded-full -ml-20 -mb-20 blur-[80px]"></div>

        {/* left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-8 py-16 md:py-[6vw] z-10'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-white/10 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-white/10 mb-6 inline-block">
                Trust & Care First
              </span>
              <h1 className='text-5xl md:text-6xl lg:text-7xl text-white font-extrabold leading-[1.1] tracking-tighter'>
                  Book Appointment <br /> <span className="text-white/70">With Trusted Doctors</span>
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className='flex flex-col sm:flex-row items-center gap-5 text-white/80 text-lg'
            >
                <div className="flex -space-x-3">
                  <img className='w-12 h-12 rounded-full border-2 border-primary object-cover shadow-lg' src={assets.group_profiles} alt="" />
                </div>
                <p className='font-medium max-w-md leading-relaxed'>
                  Simply browse through our extensive list of trusted doctors, 
                  schedule your appointment hassle-free.
                </p>
            </motion.div>

            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              href="#speciality" 
              className='flex items-center gap-3 bg-white px-12 py-5 rounded-2xl text-primary font-bold text-lg shadow-2xl hover:shadow-primary/20 transition-all duration-500 group'
            >
              Book Appointment 
              <img className='w-4 group-hover:translate-x-2 transition-transform duration-300' src={assets.arrow_icon} alt="arrow_icon" />
            </motion.a>
        </div>

        {/* right side */}
        <div className='md:w-1/2 relative flex items-end justify-center pt-12 md:pt-0'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <img 
                className='w-full max-w-[500px] md:absolute bottom-0 h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)] z-10 animate-float' 
                src={assets.header_img} 
                alt="header_img" 
              />
            </motion.div>
        </div>
    </motion.div>
  )
}

export default Header