import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './doctorSignup.css'

const PatientDashboard = (props) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState()
    const [modalContent, setModalContent] = React.useState("Reports")
    console.log(new URLSearchParams(props.location.search).get("id"))
    useEffect(() => {
        init()
    },[])

    const handleDateChange = date => {
      setSelectedDate(date);
    };

    const init = async() => {
        const token = await JSON.parse(localStorage.getItem('doctorClinicAppData')).token
        const response = await fetch("http://localhost:8000/api/patientdetails?id="+new URLSearchParams(props.location.search).get("id"),{
            headers: {
                'Authorization': token
            }
        })
        const details = await response.json()
        console.log(details)
        setDetails(details)
    }
      
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

      const classes = useStyles();

        const body = (
            modalContent === "Reports" ? <div style={{
                top: '40%',
                left: '7.5%',
                width: '85%'
            }} className={classes.paper}>
                <ClearIcon onClick={() => setOpen(false)} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
                <h2 id="simple-modal-title">Reports</h2>
                <p id="simple-modal-description">
                    Reports
                </p>
          </div> :
            <div style={{
                top: '40%',
                left: '7.5%',
                width: '85%'
            }} className={classes.paper}>
                <ClearIcon onClick={() => setOpen(false)} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
                <h2 id="simple-modal-title">Receipts</h2>
                <p id="simple-modal-description">
                    Receipts
                </p>
            </div>
          );
    // )

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
                                    {details ? <>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Patient: {details[0].username}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Doctor: {details[0].doctor}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Date of Birth: {details[0].DOB}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}>Details</p>
                                    </div> </> : <p>Loading...</p>}
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
                    <Button variant="contained" onClick={() => {
                        setModalContent("Reports")
                        setOpen(true)
                    }}style={{backgroundColor: "#cf6a6a", color: 'white', margin: 20,width: 200}}>
                        VIEW REPORTS
                    </Button>
                    </div>
                    <div>
                    <Button variant="contained" onClick={() => {
                        setModalContent("Receipts");
                        setOpen(true)
                    }} style={{backgroundColor: "#cf6a6a", color: 'white', margin: 10, width: 200}}>
                        VIEW RECEIPTS
                    </Button>
                    </div>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                </div>
            </Grid>
        </Grid>
        </div>
    )
}

export default PatientDashboard