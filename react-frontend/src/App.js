import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import DoctorSignup from './views/DoctorSignup';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Redirect from="/" to="/doctorsignup" />
        <Route exact path="/doctorsignup" component={DoctorSignup} />
      </BrowserRouter>
    </div>
  );
}

export default App;
