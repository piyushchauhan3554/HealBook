import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext"
import { motion } from 'framer-motion'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    
    return (
        <div className='flex flex-col items-center gap-6 my-20 text-gray-800 md:mx-10'>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='text-3xl md:text-4xl font-bold tracking-tight'
            >
                Top Doctors to Book
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className='sm:w-1/3 text-center text-sm sm:text-base text-gray-600'
            >
                Simply browse through our extensive list of trusted doctors.
            </motion.p>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 pt-10 gap-y-10 px-6 sm:px-0">
                {
                    doctors.slice(0, 10).map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                            className='group border border-slate-100 cursor-pointer rounded-2xl overflow-hidden hover:shadow-premium transition-all duration-300 bg-white'
                        >
                            <div className='overflow-hidden bg-primary-light'>
                                <img className='w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500' src={item.image} alt={item.name} />
                            </div>
                            <div className='p-5'>
                                <div className='flex items-center gap-2 text-sm text-center mb-2'>
                                    <span className={`w-2 h-2 ${item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'} rounded-full`}></span>
                                    <p className={item.available ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                                        {item.available ? 'Available' : 'Not Available'}
                                    </p>    
                                </div>
                                <p className='text-slate-900 text-lg font-bold group-hover:text-primary transition-colors'>{item.name}</p>
                                <p className='text-slate-500 text-sm font-medium'>{item.speciality}</p>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate("/doctors"); scrollTo(0, 0) }} 
                className='btn-outline mt-12'
            >
                View More Doctors
            </motion.button>
        </div>
    )
}

export default TopDoctors