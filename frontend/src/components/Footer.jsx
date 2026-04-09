import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
const Footer = () => {
    const navigate=useNavigate()
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left content */}
            <div>
                <img onClick={()=>{navigate("/"); scrollTo(0,0)}} className='mb-5 w-40 cursor-pointer' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                HealBook is your trusted healthcare companion, connecting you with top-rated doctors for seamless appointment booking. We are committed to making quality healthcare accessible, reliable, and convenient for everyone.
                </p>
            </div>
            {/* center content */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                   <NavLink to="/" onClick={()=>scrollTo(0,0)}>
                    <li>Home</li>
                    </NavLink>
                    <NavLink to="/about">
                    <li>About us</li>
                    </NavLink>
                    <NavLink to="/contact">
                    <li>Contact us</li>
                    </NavLink>
                    <NavLink>
                    <li>Privacy policy</li>
                    </NavLink>
                </ul>
            </div>
            {/* right content */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'><li>+91-8279813554</li>
                <li>piyushchauhan8279@gmail.com</li></ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2026 HealBook - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer