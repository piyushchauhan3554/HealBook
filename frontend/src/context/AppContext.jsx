import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useEffect } from "react";
export const AppContext=createContext();

const AppContextProvider =(props)=>{
    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData,setUserData]=useState(false)
    const getAllDoctors=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctors(data.allDocs)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loadUserData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/user/get-profile",{
            headers:{
                token
            }})
        
            if(!data.success){
                toast.error(data.message)
            }else{
                setUserData(data.userData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        getAllDoctors()
    },[])

    useEffect(()=>{
        if(token){
            loadUserData()
        }else{
            setUserData(false)
        }
    },[token])
    
    const value={
    currencySymbol,doctors,backendUrl,token,setToken,userData,setUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
