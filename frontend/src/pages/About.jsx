import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-20"
    >
      {/* Header */}
      <div className='text-center pt-16'>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block"
        >
          <span className="text-primary font-extrabold text-sm uppercase tracking-[0.4em] mb-4 inline-block">Our Story</span>
          <h1 className='text-4xl md:text-5xl font-black tracking-tighter text-slate-900'>About <span className="gradient-text">HealBook</span></h1>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>
      </div>

      {/* About Section */}
      <div className='flex flex-col my-24 md:flex-row gap-20 items-center'>
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className='w-full md:max-w-[450px] relative group'
        >
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] -rotate-6 transform -z-10 group-hover:rotate-0 transition-transform duration-700"></div>
          <img className='w-full rounded-[2rem] shadow-2xl relative z-10 border-4 border-white' src={assets.about_image} alt="HealBook about" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className='flex flex-col gap-8 justify-center md:w-3/5'
        >
          <div className="space-y-6 text-slate-500 text-lg leading-relaxed font-medium">
            <p>
              Welcome to <strong className="text-primary font-bold">HealBook</strong> — your trusted partner for managing all your healthcare needs conveniently and efficiently. We understand how challenging it can be to find the right doctor, schedule appointments, and keep track of your health records.
            </p>
            <p>
              HealBook is committed to excellence in healthcare technology. We continuously improve our platform by integrating the latest advancements to enhance user experience and deliver superior service.
            </p>
          </div>
          
          <div className="pt-6 border-t border-slate-100">
            <h3 className='text-slate-900 text-2xl font-black tracking-tight mb-4 uppercase'>Our Vision</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Our vision at HealBook is to create a seamless, stress-free healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers — making it easier for you to access quality care when and where you need it most.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className='mt-32 mb-12 text-center'>
        <span className="text-primary font-extrabold text-sm uppercase tracking-[0.4em] mb-4 inline-block">The Advantage</span>
        <h2 className='text-4xl font-black text-slate-900 tracking-tighter uppercase'>Why <span className="gradient-text">Choose Us</span></h2>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
        {[
          { 
            title: 'Efficiency', 
            desc: 'Book doctor appointments in minutes with our streamlined scheduling system — designed to fit your busy lifestyle.',
            icon: '⚡'
          },
          { 
            title: 'Convenience', 
            desc: 'Access a wide network of verified and trusted healthcare professionals across multiple specialities, all in one place.',
            icon: '🏥'
          },
          { 
            title: 'Personalization', 
            desc: 'Get tailored doctor recommendations, appointment reminders, and health insights to help you stay on top of your wellbeing.',
            icon: '👤'
          }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -15 }}
            className='p-12 flex flex-col gap-6 bg-white rounded-[2.5rem] shadow-sm border border-slate-50 hover:shadow-premium transition-all duration-500 cursor-pointer group relative overflow-hidden'
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-inner relative z-10">
              {item.icon}
            </div>
            <div className="relative z-10">
              <h4 className='text-slate-900 text-xl font-black mb-3 group-hover:text-primary transition-colors'>{item.title}</h4>
              <p className='text-slate-500 font-medium text-base leading-relaxed group-hover:text-slate-600 transition-colors'>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default About
