import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

function DoctorSignIn() {
  const [EmailID, setEmailID] = useState("");
  const [Pass, setPass] = useState("");
  const Emailhandler = e => {
    setEmailID(e.target.value);
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

  const checkCredentials = () => {
    fetch("https://jsonplaceholder.typicode.com/users" + { EmailID })
      .then(response => response.json())
      .then(json => console.log(json));
  };

  return (
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
              onChange={Emailhandler}
              value={EmailID}
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
                type="submit"
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
  );
}

export default DoctorSignIn;
