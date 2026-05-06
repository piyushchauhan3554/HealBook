import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { motion } from 'framer-motion'

const DoctorList = () => {
  const { aToken, doctors, getAllDoctors, changeAvailablity } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="m-6 max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight uppercase">All Doctors</h1>
        <p className="bg-primary-light text-primary px-4 py-1.5 rounded-full text-sm font-bold">
          Total: {doctors.length}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {doctors.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-premium transition-all duration-300"
            key={index}
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-primary/5"
                src={item.image}
                alt={item.name}
              />
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${item.available ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'}`}>
                  {item.available ? 'Active' : 'Offline'}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-slate-900 text-lg font-bold truncate group-hover:text-primary transition-colors">
                  {item.name}
                </p>
                <p className="text-slate-500 text-sm font-medium">{item.speciality}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => changeAvailablity(item._id)}
                      checked={item.available}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Availability</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DoctorList;

