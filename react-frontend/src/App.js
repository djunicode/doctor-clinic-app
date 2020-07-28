import React, { useContext } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import DoctorSignup from "./views/DoctorSignup";
import SignIn from "./views/SignIn";
import PatientDashboard from "./views/patientDashboard";
import Receptionist1 from "./views/receptionist1";
import Receptionist2 from "./views/receptionist2";
import Receptionist3 from "./views/receptionist3";
import DoctorDashboard from "./views/doctorDashboard";
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
          <>
            {context.is_doctor ? 
              <Switch>
                <Route exact path="/profile" component={DoctorDashboard} />
                <Route exact path="/patientdashboard" component={PatientDashboard} />
                <Redirect exact from="/" to="/profile" />
                <Route path="*" component={NotFound} />
              </Switch> 
            :
              <Switch>
                <Route exact path="/home" component={Receptionist1} />
                <Route exact path="/appointment" component={Receptionist2} />
                <Route exact path="/addpatient" component={Receptionist3} />
                <Route exact path="/doctorsignup" component={DoctorSignup} />
                <Route exact path="/patientdashboard" component={PatientDashboard} />
                <Redirect exact from="/" to="/home" />
                <Route path="*" component={NotFound} />
              </Switch>
            }
          </>
        : 
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Redirect to="/" />
          </Switch>
        }
      </BrowserRouter>
      }
    </div>
  );
};

export default App;
