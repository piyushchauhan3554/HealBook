import { useState, useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'All Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <nav className='flex items-center justify-between py-6 mb-10 sticky top-0 bg-white/70 backdrop-blur-xl z-50 px-4 md:px-0 border-b border-slate-100'>
      <motion.img 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { navigate("/"); window.scrollTo(0, 0) }} 
        className='w-44 cursor-pointer' 
        src={assets.logo} 
        alt="HealBook" 
      />
      
      <ul className='hidden md:flex items-center gap-10 font-bold text-slate-500'>
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => `relative py-2 transition-all duration-300 hover:text-primary tracking-tight ${isActive ? 'text-primary' : ''}`}
          >
            {({ isActive }) => (
              <span className="relative">
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                  />
                )}
              </span>
            )}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-6'>
        {token && userData ? (
          <div className='flex items-center gap-3 cursor-pointer group relative'>
            <div className='w-10 h-10 rounded-2xl overflow-hidden border-2 border-primary/10 group-hover:border-primary transition-all duration-500 shadow-sm'>
              <img className='w-full h-full object-cover' src={userData.image} alt="profile" />
            </div>
            <img className='w-2.5 opacity-40 transition-transform group-hover:rotate-180 group-hover:opacity-100' src={assets.dropdown_icon} alt="" />
            
            <div className='absolute right-0 top-full pt-3 hidden group-hover:block z-50'>
              <div className='min-w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 flex flex-col'>
                <p onClick={() => navigate("/my-profile")} className='px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-all cursor-pointer font-bold text-slate-600 text-sm'>My Profile</p>
                <p onClick={() => navigate("/my-appointments")} className='px-5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-all cursor-pointer font-bold text-slate-600 text-sm'>My Appointments</p>
                <div className='h-px bg-slate-100 my-2 mx-2'></div>
                <p onClick={logout} className='px-5 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer font-bold text-slate-500 text-sm'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")} 
            className="btn-primary hidden md:block"
          >
            Create Account
          </motion.button>
        )}
        
        <div 
          onClick={() => setShowMenu(true)} 
          className='md:hidden w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors'
        >
          <img className='w-6' src={assets.menu_icon} alt="menu" />
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed inset-0 z-[100] bg-white md:hidden flex flex-col'
              style={{ backgroundColor: '#ffffff' }}
            >
              <div className='flex items-center justify-between px-8 py-8 border-b border-slate-50 bg-white'> 
                <img className='w-40' src={assets.logo} alt="logo" />
                <div onClick={() => setShowMenu(false)} className='w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl cursor-pointer'>
                  <img className='w-5' src={assets.cross_icon} alt="close" />
                </div>
              </div>
              
              <ul className='flex flex-col gap-3 p-8'>
                {navItems.map((item) => (
                  <NavLink 
                    key={item.name}
                    onClick={() => setShowMenu(false)} 
                    to={item.path}
                    className={({ isActive }) => `px-8 py-5 rounded-[1.5rem] text-xl font-black transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </ul>

              <div className="mt-auto p-8">
                {!token && (
                  <button onClick={() => { navigate("/login"); setShowMenu(false) }} className="w-full btn-primary py-5">
                    Create Account
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar




