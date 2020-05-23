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
import './doctorSignin.css'

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
            <div style={{display: 'flex',justifyContent:'center', margin: 5, marginTop: 100}}>
                <div className="innerContainer" style={{backgroundColor:'#CF6A6A'}}>
                    <div style={{backgroundColor:'#F5F5F5', borderRadius:15, margin: 20}}>
                        <h1 style={{paddingTop:35}}>PATIENT-SIGNUP</h1>
                        <form style={{paddingLeft: 20, paddingRight: 20}}>
                            <Grid container style={{justifyContent:'center'}}>
                              <div className="fields-inner-container">
                                  <TextField name="username" required className="fields" id="outlined-basic" label="Username" onChange={(event)=>this.setState({username: event.target.value})} variant="outlined"/><br />
                              </div>
                              <div className="fields-inner-container">
                                  <TextField name="DateOfBirth" required className="fields" id="outlined-basic" label="Email-ID" onChange={(event)=>this.setState({DateOfBirth: event.target.value})} variant="outlined"/><br />
                              </div>
                              <div className="fields-inner-container">
                                <FormControl component="fieldset">
                                  <FormLabel component="legend" style={{color: 'black', fontSize: 17.5, marginBottom: 8}}>Gender *</FormLabel>
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
                                  <TextField required className="fields" id="outlined-basic" label="Doctor Name" onChange={(event)=>this.setState({doctorname: event.target.value})} variant="outlined" /><br />
                              </div>
                            </Grid>
                            <div style={{paddingBottom: 30}}>
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
