import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Banner = () => {
    const navigate = useNavigate()
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='flex bg-gradient-to-r from-primary to-indigo-700 rounded-[2.5rem] px-6 sm:px-10 md:px-14 lg:px-16 my-24 md:mx-10 shadow-premium overflow-hidden relative min-h-[350px]'
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-[80px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-[40px]"></div>

            {/* left section */}
            <div className='flex-1 py-12 sm:py-16 md:py-20 lg:py-24 z-10'>
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter'
                >
                    <p>Book Appointment</p>
                    <p className='mt-2 text-white/70'>With 100+ Trusted Doctors</p>
                </motion.div>
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        navigate("/login");
                        scrollTo(0, 0)
                    }} 
                    className='bg-white text-primary font-extrabold px-12 py-5 rounded-2xl mt-10 shadow-xl hover:shadow-white/20 transition-all duration-300 uppercase text-sm tracking-widest'
                >
                    Create Account
                </motion.button>
            </div>
            
            {/* right section */}
            <div className='hidden md:block md:w-1/2 lg:w-[400px] relative'>
                <motion.img 
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className='w-full absolute bottom-0 right-0 max-w-md animate-float drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]' 
                    src={assets.appointment_img} 
                    alt="appointment" 
                />
            </div>
        </motion.div>
    )
}

export default Banner