import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
// import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './doctorSignup.css'

const PatientDashboard = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = date => {
      setSelectedDate(date);
    };

    return(
        <div >
        <Header />
        <Grid container style={{paddingTop: 50}}>
            <Grid item xs={12} sm={12} md={8}>
                <div style={{marginLeft: '10%', marginRight:'10%', marginTop: '5%'}}>
                    <div style={{textAlign:'left'}}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={4}>
                                <div>
                                    <img
                                        src="https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png"
                                        style={{width: 200}}
                                    ></img>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <p style={{fontSize: 30}}>PATIENT NAME</p>
                                <p style={{fontSize: 23}}>DOCTOR NAME</p>
                                <br />
                                <div className="patientDetails">
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <div style={{marginTop: '10%'}}>
                    <h2 style={{color:'#666'}}>REQUEST APPOINTMENT</h2>
                    <div>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        style={{width: 200}}
                    /></div>
                    <Button variant="contained" style={{backgroundColor: "#cf6a6a", color: 'white', margin: 20}}>
                        REQUEST
                    </Button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                    <Button variant="contained" style={{backgroundColor: "#cf6a6a", color: 'white', margin: 20,width: 200}}>
                        VIEW REPORTS
                    </Button>
                    </div>
                    <div>
                    <Button variant="contained" style={{backgroundColor: "#cf6a6a", color: 'white', margin: 10, width: 200}}>
                        VIEW RECEIPTS
                    </Button>
                    </div>
                </div>
            </Grid>
        </Grid>
        </div>
    )
}

export default PatientDashboard