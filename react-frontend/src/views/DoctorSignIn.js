import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Header from '../components/Header';
import './doctorSignin.css'

function DoctorSignIn() {
  const [username, setUsername] = useState("");
  const [Pass, setPass] = useState("");
  const history = useHistory();
  const [activityIndicator,setActivityIndicator] = useState(false)
  const usernamehandler = e => {
    setUsername(e.target.value);
  };
  const passhandler = e => {
    setPass(e.target.value);
  };

  const checkCredentials = async(e) => {
    e.preventDefault()
    setActivityIndicator(true);
    const res = await fetch("http://localhost:8000/login/",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: Pass
      })
    })
    const resData = await res.json()
    console.log(resData)
    try{
      localStorage.setItem('doctorClinicAppData', JSON.stringify(resData))
    }
    catch(err){
      console.log(err)
    }
    history.replace('/receptionist1')
  };

  return (
    <div>
      <Header />
      {activityIndicator ? <LinearProgress style={{position: 'fixed', top: 60, width: '100%'}} /> : null}
      <div className="outerContainer">
            <div className="innerContainer">
                <div className="innerField">
                    <h1 className="welcome">WELCOME!</h1>
                    <form className="form">
                      <Grid container className="gridContainer">
                        <div className="fields-inner-container">
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            className="fields"
                            onChange={usernamehandler}
                            value={username}
                          />
                        </div>
                        <div className="fields-inner-container">
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className="fields"
                            onChange={passhandler}
                          />
                        </div>
                      </Grid>
                      <div>
                        <Button type="submit" className="signInButton" id="stylebutton"  variant="contained" onClick={(e) => checkCredentials(e)}>LOGIN</Button>
                        
                      </div>
                      <div style={{paddingBottom: 30}}>
                        <p>Dont have an account? <Link className="link" to="/doctorsignup">Sign Up</Link></p>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DoctorSignIn;
