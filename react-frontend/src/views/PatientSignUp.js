import React from "react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header'
import { useHistory, Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './doctorSignin.css';
import './patient.css';

class PatientSignUp extends React.Component {
  state = {
    username: "",
    DateOfBirth: "",
    doctorname: "",
    gender: ""
  };
  onSubmit = event => {
    event.preventDefault();
    alert("Thank you for registering with us!!");
    this.setState({
      username: "",
      DateOfBirth: "",
      gender: "",
      doctorname: ""
    });
    this.props.onChange({
      username: "",
      DateOfBirth: "",
      gender: "",
      doctorname: ""
    });
  };
  render() {
    return (
      <div>
        <Header />
            {/* {activityIndicator ? <LinearProgress /> : null} */}
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="innerField">
                        <h1 className="heading">PATIENT-SIGNUP</h1>
                        <form className="form">
                            <Grid container className="gridContainer">
                              <div className="fields-inner-container">
                                  <TextField name="username" required className="fields" id="outlined-basic" label="Username" onChange={(event)=>this.setState({username: event.target.value})} variant="outlined"/>
                              </div>
                              <div className="fields-inner-container">
                                  <TextField name="DateOfBirth" required className="fields" id="outlined-basic" label="Email-ID" onChange={(event)=>this.setState({DateOfBirth: event.target.value})} variant="outlined"/>
                              </div>
                              <div className="fields-inner-container">
                                <FormControl component="fieldset">
                                  <FormLabel component="legend" className="formlabel">Gender *</FormLabel>
                                  <RadioGroup row aria-label="position" name="gender" defaultValue="top" onChange={(event)=>this.setState({gender: event.target.value})}>
                                    <FormControlLabel
                                      value="Male"
                                      control={<Radio style={{color: '#CF6A6A'}} />}
                                      label="Male"
                                      labelPlacement="start"
                                    />
                                    <FormControlLabel
                                      value="Female"
                                      control={<Radio style={{color: '#CF6A6A'}} />}
                                      label="Female"
                                      labelPlacement="start"
                                    />
                                    <FormControlLabel
                                      value="Other"
                                      control={<Radio style={{color: '#CF6A6A'}} />}
                                      label="Other"
                                      labelPlacement="start"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                              <div className="fields-inner-container">
                                  <TextField required className="fields" id="outlined-basic" label="Doctor Name" onChange={(event)=>this.setState({doctorname: event.target.value})} variant="outlined" />
                              </div>
                            </Grid>
                            <div className="already">
                                <p>Already Registered? <Link style={{textDecoration: 'none', fontWeight:'bold', color: 'black'}} to="/">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

export default PatientSignUp;
