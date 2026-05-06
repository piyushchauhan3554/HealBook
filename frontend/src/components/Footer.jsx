import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
    const navigate = useNavigate()
    
    return (
        <footer className='md:mx-10 border-t border-slate-100 pt-20 pb-10'>
            <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-16 mb-16 text-sm'>
                {/* left content */}
                <div className="space-y-6">
                    <motion.img 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => { navigate("/"); scrollTo(0,0) }} 
                        className='mb-5 w-44 cursor-pointer' 
                        src={assets.logo} 
                        alt="HealBook Logo" 
                    />
                    <p className='w-full md:w-3/4 text-slate-500 leading-relaxed text-base font-medium'>
                        HealBook is your trusted healthcare companion, connecting you with top-rated doctors for seamless appointment booking. We are committed to making quality healthcare accessible, reliable, and convenient for everyone.
                    </p>
                </div>

                {/* center content */}
                <div>
                    <p className='text-slate-900 font-black text-lg mb-8 tracking-tighter uppercase'>Company</p>
                    <ul className='flex flex-col gap-4 text-slate-500 font-semibold'>
                        <NavLink to="/" onClick={() => scrollTo(0,0)} className="hover:text-primary transition-colors">
                            <li>Home</li>
                        </NavLink>
                        <NavLink to="/about" onClick={() => scrollTo(0,0)} className="hover:text-primary transition-colors">
                            <li>About us</li>
                        </NavLink>
                        <NavLink to="/contact" onClick={() => scrollTo(0,0)} className="hover:text-primary transition-colors">
                            <li>Contact us</li>
                        </NavLink>
                        <li className="hover:text-primary cursor-pointer transition-colors">Privacy policy</li>
                    </ul>
                </div>

                {/* right content */}
                <div>
                    <p className='text-slate-900 font-black text-lg mb-8 tracking-tighter uppercase'>Get In Touch</p>
                    <ul className='flex flex-col gap-4 text-slate-500 font-semibold'>
                        <li className="hover:text-primary cursor-pointer transition-colors">+91-8279813554</li>
                        <li className="hover:text-primary cursor-pointer transition-colors break-words">piyushchauhan8279@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className='pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4'>
                <p className='text-sm text-slate-400 font-bold'>
                    Copyright © 2026 <span className="text-primary">HealBook</span> - All Right Reserved.
                </p>
                <div className="flex gap-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Cookies</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer