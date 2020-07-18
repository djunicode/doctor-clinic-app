import React, {useState, createContext} from 'react'

export const Context = createContext()

const INIT_STATE = {
    doctors: [],
    patients: [],
    appointments: []
}

const ContextProvider = (props) => {
    const [clinicData, setClinicData] = useState(INIT_STATE)

    const init = async() => {
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
        return data;
    }

    return(
        <Context.Provider value={{appointments: clinicData.appointments, patients: clinicData.patients, doctors: clinicData.doctors, init}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;