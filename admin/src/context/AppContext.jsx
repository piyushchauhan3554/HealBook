import { createContext } from "react";

export const AppContext=createContext();

const AppContextProvider=(props)=>{
        const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        const currency='$'
        const changeDateFormat=(slotDate)=>{
        if(slotDate){
        const dateArray=slotDate.split("_")
        return `${dateArray[0]} ${months[dateArray[1]-1]} ${dateArray[2]}`
        }
        }
    const calculateAge = (dob)=>{
        if (!dob) return 'N/A'
        const today=new Date()
        const birthDate=new Date(dob)
        if (Number.isNaN(birthDate.getTime())) return 'N/A'

        let age=today.getFullYear()-birthDate.getFullYear()
        const monthDiff=today.getMonth()-birthDate.getMonth()
        const dayDiff=today.getDate()-birthDate.getDate()

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age -= 1
        }

        return age
    }
    const value={
        calculateAge,changeDateFormat,currency
    }
    return (
        <>
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
        </>
    )
}

export default AppContextProvider;