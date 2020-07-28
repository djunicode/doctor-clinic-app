import React, {useState, useEffect, createContext} from 'react'
import useWillMount from '../custom hooks/useWillMount'

export const Context = createContext()

const INIT_STATE = {
    doctors: [],
    patients: [],
    appointments: [],
    doctorProfile: null
}

var Token = null
var is_doctor = false

const ContextProvider = (props) => {
    const [clinicData, setClinicData] = useState(INIT_STATE)
    const [loggedIn, setLoggedIn] = useState(null)

    const init = async() => {
        try{
            let Data = await localStorage.getItem('doctorClinicAppData')
            if (Data){
                Data = JSON.parse(Data)
                is_doctor = Data.isDoctor
                Token = Data.token
            }
            if(Token){
                setLoggedIn(true)
                getClinicData(Data.doctor_id)
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

    const getClinicData = async(docID) => {
        let arrayOfPromises = []
        if(is_doctor){
            arrayOfPromises = [getAllDoctors(), getAllPatients(), getDailyAppointments(), getDoctorProfile(docID)]
        }
        else{
            arrayOfPromises = [getAllDoctors(), getAllPatients(), getDailyAppointments()]
        }
        const responses = await Promise.all(arrayOfPromises)
        console.log(responses);
        setClinicData({
            doctors: responses[0],
            patients: responses[1],
            appointments: responses[2],
            doctorProfile: responses[3]
        })
    }

    const getAllDoctors = async() => {
        const url = "api/doclist/";
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

    const forceRefreshPatients = async() => {
        setClinicData({
            ...clinicData,
            patients: await getAllPatients()
        })
    }

    const refreshProfile = async(docID) => {
        setClinicData({
            ...clinicData,
            doctorProfile: await getDoctorProfile(docID)
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

    const getDoctorProfile = async(docID) => {
        let d = new Date()
        // alert("x")
        const url = `api/newAppointment?id=${docID}&date=${(d.getYear()+1900)+'-'+(d.getMonth()+1)+'-'+(d.getDate())}`
        const response = await fetch(url)
        // console.log(await response.text())
        const data = await response.json()
        console.log(data)
        return data
        // doctorProfile = data
    }

    const login = async(username, password) => {
        try{
            const res = await fetch("api/login/", {
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
            if(resData.token){
                is_doctor = resData.isDoctor
                localStorage.setItem('doctorClinicAppData', JSON.stringify(resData))
                // localStorage.setItem('doctorClinicAppRole', resData.isDoctor)
                Token = resData.token
                setLoggedIn(true)
                getClinicData(resData.doctor_id)
                return true
            }
        }
        catch(err){
            console.log(err)
        }
        return false
    }

    const logout = () => {
        setLoggedIn(false)
        Token = null
        is_doctor = false
        try{
            localStorage.removeItem('doctorClinicAppData')
        }
        catch(err){
            console.log(err)
        }
        setClinicData(INIT_STATE)
    }

    return(
        <Context.Provider value={{
            appointments: clinicData.appointments, 
            patients: clinicData.patients, 
            doctors: clinicData.doctors, 
            doctorProfile: clinicData.doctorProfile,
            forceRefreshAppt,
            forceRefreshPatients,
            refreshProfile,
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