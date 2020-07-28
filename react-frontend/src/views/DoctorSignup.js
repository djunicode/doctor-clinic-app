import React, { useState, useContext } from 'react';
import SignupForm from '../components/signupForm';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from '../components/Header'
import { Context } from '../context/Context';
import "react-toastify/dist/ReactToastify.css";
import './doctorSignup.css';

const values = {
    firstname: "",
    lastname: "",
    username: "",
    password1: "",
    password2: "",
    qualification: "",
    speciality: "",
    postgrad: "",
    email: "",
    DOB: "",
    phone: "",
    dailyTime: "",
    endTime: ""
}

const DoctorSignup = (props) => {
    const [activityIndicator, setActivityIndicator] = useState(false)
    const context = useContext(Context)

    return(
        <div className="bodyStyles">
            <Header />
            {activityIndicator ? <LinearProgress /> : null}
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="innerField">
                        <h1 className="heading">DOCTOR-SIGNUP</h1>
                        <SignupForm 
                            activity={setActivityIndicator} 
                            values={values} 
                            method= "POST"
                            url='api/newdoc/'
                            message="Doctor Added"
                            token={context.Token}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorSignup;