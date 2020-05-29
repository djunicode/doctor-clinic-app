import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Header from '../components/Header'
import Cookies from 'js-cookie';
import './doctorSignin.css'

function DoctorSignIn() {
  const [username, setUsername] = useState("");
  const [Pass, setPass] = useState("");
  const history = useHistory();
  //const [token,setToken] = useState();
  const [activityIndicator,setActivityIndicator] = useState(false)
  useEffect(()=>{
        // setToken(Cookies.get('csrftoken'))
    // console.log(Cookies.get('csrftoken'))
  },[])
  const usernamehandler = e => {
    setUsername(e.target.value);
  };
  const passhandler = e => {
    setPass(e.target.value);
  };

  const checkCredentials = async() => {
    setActivityIndicator(true);
    const res = await fetch("http://localhost:8000/login/",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        //'Authorization': 'Token c0ddb0f680fdddac1d74c930c6722f6748b44e3a'
        //'X-CSRftoken': token
      },
      body: JSON.stringify({
        username: username,
        password: Pass
      })
    })
    const resData = await res.json()
    console.log(resData)
    localStorage.setItem('doctorClinicAppToken', resData.token)
    history.push('/home')
  };

  return (
    <div>
      {activityIndicator ? <LinearProgress /> : null}
      <Header />
      <div style={{display: 'flex',justifyContent:'center', margin: 5, marginTop: 100}}>
            <div className="innerContainer" style={{backgroundColor:'#CF6A6A'}}>
                <div style={{backgroundColor:'#F5F5F5', borderRadius:15, margin: 20}}>
                    <h1 style={{paddingTop:35}}>WELCOME!</h1>
                    <form style={{paddingLeft: 20, paddingRight: 20}}>
                      <Grid container style={{justifyContent:'center'}}>
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
                          /><br />
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
                          /><br />
                        </div>
                      </Grid>
                      <div>
                        <Button type="submit" className="signInButton" style={{backgroundColor: '#CF6A6A', color: 'white', fontWeight: 'bold', fontSize: 17, borderRadius: 10}} variant="contained" onClick={checkCredentials}>LOGIN</Button>
                        
                      </div>
                      <div style={{paddingBottom: 30}}>
                        <p>Dont have an account? <Link style={{textDecoration: 'none', fontWeight:'bold', color: 'black'}} to="/doctorsignup">Sign Up</Link></p>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DoctorSignIn;
