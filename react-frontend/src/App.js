import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import DoctorSignup from "./views/DoctorSignup";
import DoctorSignIn from "./views/DoctorSignIn";
import PatientSignUp from "./views/PatientSignUp.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={DoctorSignIn} />
        <Route exact path="/doctorsignup" component={DoctorSignup} />
        <Route exact path="/patientsignup" component={PatientSignUp} />
      </BrowserRouter>
    </div>
  );
};

export default App;
