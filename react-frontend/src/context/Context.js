import React, {useState, createContext} from 'react'

export const Context = createContext()

const INIT_STATE = {
    doctors: [],
    patients: []
}

const ContextProvider = (props) => {
    const [clinicData, setClinicData] = useState(INIT_STATE)

    const init = async() => {
        const arrayOfPromises = [getAllDoctors(), getAllPatients()]
        const responses = await Promise.all(arrayOfPromises)
        console.log(responses);
        setClinicData({
            doctors: responses[0],
            patients: responses[1]
        })
    }

    const getAllDoctors = async() => {
        const url = "http://localhost:8000/api/test/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }

    const getAllPatients = async() => {
        const url = "http://localhost:8000/api/allpat/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }

    return(
        <Context.Provider value={{patients: clinicData.patients, doctors: clinicData.doctors, init}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;