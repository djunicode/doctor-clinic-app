import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import DoctorSignup from "./views/DoctorSignup";
import DoctorSignIn from "./views/DoctorSignIn";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={DoctorSignIn} />
        <Route exact path="/doctorsignup" component={DoctorSignup} />
      </BrowserRouter>
    </div>
  );
};

export default App;
