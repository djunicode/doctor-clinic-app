import React, {useState, useEffect, createContext} from 'react'
import useWillMount from '../custom hooks/useWillMount'

export const Context = createContext()

const INIT_STATE = {
    doctors: [],
    patients: [],
    appointments: []
}

var Token = null
var is_doctor = false

const ContextProvider = (props) => {
    const [clinicData, setClinicData] = useState(INIT_STATE)
    const [loggedIn, setLoggedIn] = useState(null)

    const init = async() => {
        try{
            Token = await localStorage.getItem('doctorClinicAppToken')
            if(Token){
                setLoggedIn(true)
                getClinicData()
            }
            else{
                setLoggedIn(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useWillMount(() => {
        init()
    })

    const getClinicData = async() => {
        const arrayOfPromises = [getAllDoctors(), getAllPatients(), getDailyAppointments()]
        const responses = await Promise.all(arrayOfPromises)
        console.log(responses);
        setClinicData({
            doctors: responses[0],
            patients: responses[1],
            appointments: responses[2]
        })
    }

    const getAllDoctors = async() => {
        const url = "api/test/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }

    const getAllPatients = async() => {
        const url = "api/allpat/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }

    const getDailyAppointments = async() => {
        const url = "api/daily/"
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.sort(sort_daily_appointments);
    }

    const sort_daily_appointments = (a,b) => {
        if(a.token > b.token){
            return 1
        }
        return -1
    }

    const forceRefreshAppt = async() => {
        setClinicData({
            ...clinicData,
            appointments: await getDailyAppointments()
        })
    }

    const attendance = (index) => {
        let temp = clinicData.appointments
        temp[index].present = true
        setClinicData({
            ...clinicData,
            appointments: temp
        })
    }

    const login = async(username, password) => {
        try{
            const res = await fetch("login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const resData = await res.json()
            console.log(resData)
            localStorage.setItem('doctorClinicAppToken', resData.token)
            Token = resData.token
            setLoggedIn(true)
            getClinicData()
        }
        catch(err){
            console.log(err)
        }   
    }

    const logout = () => {
        setLoggedIn(false)
        try{
            localStorage.removeItem('doctorClinicAppToken')
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <Context.Provider value={{
            appointments: clinicData.appointments, 
            patients: clinicData.patients, 
            doctors: clinicData.doctors, 
            forceRefreshAppt,
            init, 
            attendance, 
            loggedIn,
            is_doctor, 
            Token, 
            login,
            logout
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;