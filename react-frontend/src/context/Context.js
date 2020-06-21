import React, {useState, createContext} from 'react'

export const Context = createContext()

// var patients = []
// var doctors = []

const ContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])

    const init = async() => {
        getAllDoctors()
        getAllPatients()
    }

    const getAllDoctors = async() => {
        const url = "http://localhost:8000/api/test/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setDoctors(data)
    }

    const getAllPatients = async() => {
        const url = "http://localhost:8000/api/allpat/";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setPatients(data)
    }

    return(
        <Context.Provider value={{patients, doctors, init}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;