import React, { useEffect, useContext } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import DoctorSignup from "./views/DoctorSignup";
import DoctorSignIn from "./views/DoctorSignIn";
import PatientSignUp from "./views/PatientSignUp.js";
import PatientDashboard from "./views/patientDashboard";
import Home from "./views/Home.js";
import Receptionist3 from "./views/receptionist3";
import Receptionis1 from "./views/receptionis1";
import Receptionist2 from "./views/receptionist2";
import patientprofile from "./views/patientprofile";
import Therapist1 from "./views/therapist1";
import "./App.css";
import { Context } from "./context/Context";

const App = () => { 
  const context = useContext(Context)
  console.log(context);

  useEffect(()=>{
    context.init()
  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={DoctorSignIn} />
        <Route exact path="/doctorsignup" component={DoctorSignup} />
        <Route exact path="/patientsignup" component={PatientSignUp} />
        <Route exact path="/patientdashboard" component={PatientDashboard} />
        {/* <Route exact path="/home" component={Home} /> */}
        <Route exact path="/receptionist1" component={Receptionis1} />
        <Route exact path="/appointment" component={Receptionist2} />
        <Route exact path="/addpatient" component={Receptionist3} />
        <Route exact path="/profile" component={patientprofile} />
        <Route exact path="/therapist1" component={Therapist1} />
      </BrowserRouter>
    </div>
  );
};

export default App;
