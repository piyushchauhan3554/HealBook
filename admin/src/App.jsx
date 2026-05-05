import { useContext } from 'react';
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList';
import AllAppointments from './pages/Admin/AllAppointments';
import Dashboard from './pages/Admin/Dashboard';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
const App = () => {
  const { aToken } = useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return aToken || dToken ? (<div className='bg-[#F8F9FD]'>
    <ToastContainer />
    <Navbar />
    <div className='flex items-start'>
      <Sidebar />
      <Routes>
        {
          aToken ? <Route path='/' element={<Dashboard/>}></Route> : <Route path='/' element={<DoctorDashboard/>}></Route>
        }
        {/* Admin Routes */}
        <Route path='/add-doctor' element={<AddDoctor/>}></Route>
        <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
        <Route path='/all-appointments' element={<AllAppointments/>}></Route>
        <Route path='/doctor-list' element={<DoctorList/>}></Route>
        {/* Doctor Routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
        <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
        <Route path='/doctor-appointments' element={<DoctorAppointments/>}></Route>
      </Routes>
    </div>
  </div>)
    :
    (<>
      <Login />
      <ToastContainer />
    </>)
}

export default App