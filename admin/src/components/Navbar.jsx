import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets_admin/assets"
import { AdminContext } from "../context/AdminContext"
import { DoctorContext } from "../context/DoctorContext";
import { motion } from 'framer-motion'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate()
    
    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className="flex justify-between items-center px-6 sm:px-10 py-4 border-b border-slate-100 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <motion.img 
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer w-50 sm:w-56" 
                  src={assets.admin_logo}
                  onClick={() => navigate(aToken ? '/admin-dashboard' : '/doctor-dashboard')}
                />
                <span className="bg-primary/10 text-primary text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {aToken ? 'Admin Panel' : 'Doctor Panel'}
                </span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout} 
              className="btn-admin !py-2 !px-8 text-sm"
            >
              Logout
            </motion.button>
        </div>
    )
}

export default Navbar
