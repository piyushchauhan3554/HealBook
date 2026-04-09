import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      {/* Header */}
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>HEALBOOK</span></p>
      </div>

      {/* About Section */}
      <div className='flex flex-col my-10 md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="HealBook about" />
        <div className='flex flex-col gap-6 justify-center md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome to <strong>HealBook</strong> — your trusted partner for managing all your healthcare needs conveniently and efficiently. We understand how challenging it can be to find the right doctor, schedule appointments, and keep track of your health records. HealBook brings it all together in one simple, intuitive platform.
          </p>
          <p>
            HealBook is committed to excellence in healthcare technology. We continuously improve our platform by integrating the latest advancements to enhance user experience and deliver superior service. Whether you are booking your very first appointment or managing ongoing care, HealBook is here to support you at every step of your health journey.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision at HealBook is to create a seamless, stress-free healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers — making it easier for you to access quality care when and where you need it most.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl my-4'>
        <p>WHY <span className='font-semibold text-gray-700'>CHOOSE HEALBOOK</span></p>
      </div>
      <div className='flex md:flex-row flex-col mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Book doctor appointments in minutes with our streamlined scheduling system — designed to fit your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access a wide network of verified and trusted healthcare professionals across multiple specialities, all in one place.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Get tailored doctor recommendations, appointment reminders, and health insights to help you stay on top of your wellbeing.</p>
        </div>
      </div>
    </div>
  )
}

export default About