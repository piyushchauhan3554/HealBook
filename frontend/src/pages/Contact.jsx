import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>CONTACT<span className='font-semibold text-gray-700'> US</span></p>
      </div>

      <div className='flex flex-col my-10 justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-6 items-start justify-center'>
        <p className='text-gray-500'>Tel: +91-8279813554</p>
        <p className='text-gray-500'>Email: piyushchauhan8279@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact