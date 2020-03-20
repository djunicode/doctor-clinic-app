import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

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
  const useStyles = makeStyles(theme => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const classes = useStyles();

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
    <Typography component="div" className="App">
      <Typography component="h1" variant="h5">
        <br></br>
        <br></br>
        Log In
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="username"
              name="email"
              autoComplete="email"
              onChange={usernamehandler}
              value={username}
            />
          </Grid>

          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Pass"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passhandler}
            />
          </Grid>
          <Grid item xs={4}></Grid>

          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="centre">
              <Button
                
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={checkCredentials}
              >
                Sign In
              </Button>
              <Link to="/doctorsignup">
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Typography>
    </div>
  );
}

export default DoctorSignIn;
