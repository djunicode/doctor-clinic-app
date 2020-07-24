import React, { useEffect, useContext, useRef } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import DoctorSignup from "./views/DoctorSignup";
import DoctorSignIn from "./views/DoctorSignIn";
import PatientSignUp from "./views/PatientSignUp.js";
import PatientDashboard from "./views/patientDashboard";
import Receptionist3 from "./views/receptionist3";
import Receptionis1 from "./views/receptionis1";
import Receptionist2 from "./views/receptionist2";
import patientprofile from "./views/patientprofile";
import Therapist1 from "./views/therapist1";
import NotFound from "./views/NotFound";
import "./App.css";
import { Context } from "./context/Context";

const App = () => { 
  const context = useContext(Context)
  console.log(context);

  return (
    <div className="App">
      {context.loggedIn!==null && <BrowserRouter> 
        {context.loggedIn ? 
          <Switch>
            <Route exact path="/receptionist1" component={Receptionis1} />
            <Route exact path="/appointment" component={Receptionist2} />
            <Route exact path="/addpatient" component={Receptionist3} />
            <Route exact path="/patientdashboard" component={PatientDashboard} />
            <Route exact path="/profile" component={patientprofile} />
            <Route exact path="/therapist1" component={Therapist1} />
            <Route exact path="/doctorsignup" component={DoctorSignup} />
            <Redirect exact from="/" to="/receptionist1" />
            <Route path="*" component={NotFound} />
          </Switch>
        : 
          <Switch>
            <Route exact path="/" component={DoctorSignIn} />
            <Redirect to="/" />
          </Switch>
        }
      </BrowserRouter>
      }
    </div>
  );
};

export default App;
