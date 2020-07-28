import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import Modal from '@material-ui/core/Modal';
import MainBody2 from '../components/MainBody2';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Webcam from "../components/Webcam";
import useWillMount from '../custom hooks/useWillMount';
import { Context } from '../context/Context';
import './doctorSignup.css';
var myToken = null

const PatientDashboard = (props) => {
    const [modal, setModal] = useState({state: false, type: "Reports"})
    const [editModal, setEditModal] = useState({state: false, validation: false})
    const [details, setDetails] = useState()
    const [receiptAppointment, setReceiptAppointment] = useState("")
    const [type_of_report, set_type_of_report] = useState("")
    const [Reports, setReports] = useState(null)
    const [Receipts, setReceipts] = useState(null)
    const [report, setReport] = useState()
    const [receipt, setReceipt] = useState()
    const [receiptPrice, setReceiptPrice] = useState("")
    const [username, setUsername] = useState("");
    const [Pass, setPass] = useState("");
    const [openCamera, setOpenCamera] = useState(false)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const context = useContext(Context)

    const usernamehandler = e => {
        setUsername(e.target.value);
    };
    const passhandler = e => {
        setPass(e.target.value);
    };
    
    const patientID = new URLSearchParams(props.location.search).get("id")
    // console.log(patientID)

    const init = async() => {
        const response = await fetch("api/patientdetails?id="+patientID, {
            headers: {
                'Authorization': context.Token
            }
        })
        const details = await response.json()
        console.log(details)
        setDetails(details)
    }

    const view = async(type) => {
        try{
            const response = await fetch(`api/${type}?patientid=${patientID}`, {
                headers: {
                    'Authorization': context.Token
                }
            })
            const resData = await response.json()
            console.log(resData)
            if(type=="report"){
                setReports(resData)
            }
            else{
                setReceipts(resData)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useWillMount(() => {
        let arr = []
        if(context.is_doctor){
            arr = [init(), view("receipt"), view("report")]
        }
        else{
            arr = [init()]
        }
        Promise.all(arr)
    })

    const today = () => {
        let dt = new Date()
        return dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate()
    }

    const upload = async(type) => {
        if(type==="Receipt"){
            if(receiptPrice==="" && isNaN(parseFloat(receiptPrice)) && receiptAppointment==="")  {
                alert("Enter proper values for Receipt details")
                return
            }
        }
        else{
            if(type_of_report===""){
                alert("Enter proper values for Report details")
                return
            }
        }
        let formdata = new FormData()
        if(type==="Report"){
            formdata.append("filelocation", report.file)  
            formdata.append("typeof", type_of_report)  
            formdata.append("published_on", today())
        }
        else{
            formdata.append("filelocation", receipt.file)
            formdata.append("date", today())
            formdata.append("price", receiptPrice)
            formdata.append("doctor", parseInt(receiptAppointment.doctor_id))
            formdata.append("appointment", parseInt(receiptAppointment.appt_id))
        }
        formdata.append("patient", patientID)
        console.log(formdata)
        try{
            document.getElementById('upload'+type).disabled = true
            const response = await fetch(`api/${type.toLowerCase()}/`, {
                method: 'POST',
                headers: {
                    'Authorization': context.Token
                },
                body: formdata
            })
            // console.log(await response.text())
            const resData = await response.json()
            console.log(resData)
            if(resData.success){
                toast.success(`Uploaded ${type}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // if(type==="Receipt"){
                //     // setReceipts(() => [...Receipts, {type_of: type_of_report}])
                // }
                // else{
                //     setReports(() => [...Reports, {typeof: type_of_report, filelocation: resData.location}])
                // }
            }
            document.getElementById('upload'+type).disabled = false
            if(type==="Report"){
                setReport(null)
            }else{
                setReceipt(null)
            }
            document.getElementById(type.toLowerCase() + '-upload').value = null
        }
        catch(err){
            console.log(err);
        }
    }

    const checkCredentials = async(e) => {
        e.preventDefault()
        if(details[0].username.username!==username){
            alert("Wrong username");
            return;
        }
        setActivityIndicator(true)
        try{
            const res = await fetch("api/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password: Pass
                })
            })
            const resData = await res.json()
            console.log(resData)
            if(!resData.isPatient){
                alert("Invalid credentials")
                setActivityIndicator(false)
                return
            }
            if(resData.token){
                myToken = resData.token
                setEditModal({
                    ...editModal,
                    validation: true
                })
            }
            else{
                alert("Invalid credentials")
            }
        }
        catch(err){
            console.log(err)
            alert("Something went wrong")
        }
        setActivityIndicator(false)
        // setTimeout(() => {
        //     myToken = null
        //     // alert("token gaya")
        //     setEditModal({
        //         ...editModal,
        //         validation: false
        //     }) 
        // },300000)
    };
      
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
        modal.type === "Reports" ? <div style={{
            top: '12.5%',
            left: '7.5%',
            width: '85%',
            height: '75%',
            overflowY: 'scroll'
        }} className={classes.paper}>
            <ClearIcon onClick={() => setModal({
                ...modal,
                state: false
            })} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
            <h2 id="simple-modal-title">Reports</h2>
            {Reports===null ? <p>Loading Reports..</p> : Reports!==[] ? Reports.map((report) => (
                <div>
                    <a href={"http://localhost:8000"+report.filelocation}>{report.typeof}</a>
                </div>
            )) : <p>No Reports Found</p>}
        </div> :
        <div style={{
            top: '12.5%',
            left: '7.5%',
            width: '85%',
            height: '75%',
            overflowY: 'scroll'
        }} className={classes.paper}>
            <ClearIcon onClick={() => setModal({
                ...modal,
                state: false
            })} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
            <h2 id="simple-modal-title">Receipts</h2>
            {Receipts===null ? <p>Loading Receipts..</p> : Receipts!==[] ? Receipts.map((receipt) => (
                <div>
                    <a href={"http://localhost:8000"+receipt.filelocation}>{receipt.date}</a>
                </div>
            )) : <p>No Receipts Found</p>}
        </div>
    );

    const editBody = () => {
        if(editModal.validation){
            let values = {
                firstname: details[0].username.first_name,
                lastname: details[0].username.last_name,
                username: details[0].username.username,
                condition: details[0].conditions,
                DOB: details[0].username.DOB,
                phone: details[0].username.contact_no,
                email: details[0].username.email,
                history: details[0].history
            }
            return (
                <div style={{
                    top: '12.5%',
                    left: '7.5%',
                    width: '85%',
                    height: '80%'
                }} className={classes.paper}>
                    <ClearIcon onClick={() => setEditModal({
                        ...editModal,
                        state: false
                    })} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
                    <MainBody2 
                        url = {"api/newpat/?patid="+patientID}
                        type = "PUT"
                        message = "Patient Edited"
                        values = {values}
                        edit={true}
                        init={init}
                    />
                </div>
            )
        }
        else{
            return(
                <div style={{
                    top: '12.5%',
                    left: '7.5%',
                    width: '85%',
                    height: '75%'
                }} className={classes.paper}>
                    {activityIndicator && <LinearProgress />}
                    <ClearIcon onClick={() => setEditModal({
                        ...editModal,
                        state: false
                    })} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
                    <div style={{flex: 1, flexDirection: 'column'}}>
                        <div id="modalLogin" style={{ textAlign: 'center'}}>
                            <div className="innerField">
                                <form className="form">
                                <Grid container className="gridContainer">
                                    <h2>Patient Verification</h2>
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
                                    <div>
                                        <Button type="submit" className="signInButton" id="stylebutton"  variant="contained" onClick={(e) => checkCredentials(e)}>SUBMIT</Button>
                                    </div>
                                </Grid>
                                
                                {/* <div style={{paddingBottom: 30}}>
                                    <p>Dont have an account? <Link className="link" to="/doctorsignup">Sign Up</Link></p>
                                </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const demoDP = (imageSrc) => {
        document.getElementById("profilepic").src = imageSrc
    }

    const showPatientAppointments = (flag) => {
        let arr = context.appointments.map((appt) => {
            if(appt.appointment.patient.patient_id == patientID){
                if(flag){
                    return (
                        <div>
                            <p>Doctor: {appt.appointment.doctor.username.username}</p>
                            <p>Time: {appt.appointment.start_time}</p>
                        </div>
                    )
                }
                else{
                    let obj = {
                        doctor_id: appt.appointment.doctor.doctor_id,
                        appt_id: appt.appointment.id
                    }
                    return(
                        <option value={JSON.stringify(obj)}>{appt.appointment.doctor.username.username+"@"+appt.appointment.start_time}</option>
                    )
                }
            } 
        })
        if(arr.length === 0){
            if(flag){
                return <p>No appointments today</p>
            }
        }
        return arr
    }

    return(
        <div>
        <Header />
        <Grid container style={{paddingTop: 50}}>
            <Grid item xs={12} sm={12} md={8}>
                <div style={{marginLeft: '10%', marginRight:'10%', marginTop: '5%'}}>
                    <div style={{textAlign: 'left'}}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={4}>
                                <div>
                                    {details && <><img id="profilepic"
                                        src = {details[0].username.profile_pic===null ? require("../images/defaultdp.webp") : details[0].username.profile_pic}
                                        className="LImage"
                                    ></img>{!context.is_doctor && <div style={{marginLeft: '25%'}}>
                                        <PhotoCameraIcon style={{width: 40, height: 40, cursor: 'pointer'}} onClick = {() => {
                                            if(!editModal.validation){
                                                setEditModal({
                                                    ...editModal,
                                                    state: true
                                                })
                                            }
                                            else{
                                                setOpenCamera(!openCamera)
                                            }
                                        }} /> </div>}
                                        {openCamera && 
                                            <Modal open={openCamera} style={{flex: 1, display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                <div>
                                                    <Webcam token={myToken} ID={patientID} url="api/newpat/?patid=" demo={demoDP} closeCamera={(flag) => {
                                                        setOpenCamera(false)
                                                        if(!flag){
                                                            if(details[0].username.profile_pic===null){
                                                                document.getElementById("profilepic").src = require("../images/defaultdp.webp")
                                                            }
                                                            else{
                                                                document.getElementById("profilepic").src = details[0].username.profile_pic
                                                            }
                                                        } 
                                                    }} />
                                                </div>
                                            </Modal>
                                        }
                                        {/* <input id="dp-upload" type="file" style={{display: 'none'}} onChange={(e) => {
                                            // let name = document.getElementById("dp-upload").value
                                            uploadDp(e.target.files[0])
                                        }} /> */}
                                    </>}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <p style={{marginTop: 30,fontSize: 30}}>{details && (details[0].username.first_name + " " + details[0].username.last_name)}</p>
                                {!context.is_doctor && <Button variant="contained" onClick={() => {
                                    setEditModal({
                                        ...editModal,
                                        state: true
                                    })
                                }} style={{backgroundColor: "#cf6a6a", color: 'white', float: 'right'}}>EDIT</Button>}
                                <div className="patientDetails margin_10">
                                    {details ? <>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}><b>Username:</b> {details[0].username.username}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}><b>Date of Birth:</b> {details[0].username.DOB}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}><b>Contact No.:</b> {details[0].username.contact_no}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}><b>Email ID:</b> {details[0].username.email}</p>
                                    </div> 
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}><b>Medical Conditions:</b> {details[0].conditions}</p>
                                    </div>
                                    <div style={{margin: 25}}>
                                        <p style={{fontSize: 20}}><b>Medical History:</b> {details[0].history}</p>
                                    </div> </> : <div class="lds-dual-ring" style={{marginTop:'20%', marginBottom: '20%'}}></div>}
                                </div>
                                <div style={{marginTop: 30, marginBottom: 10, height: '40%', overflowY: 'scroll'}}>
                                    <h5>APPOINTMENTS TODAY:</h5>
                                    {showPatientAppointments(true)}
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <div style={{marginTop: '10%'}}>
                    {/* <h2 style={{color:'#666'}}>REQUEST APPOINTMENT</h2>
                    <div>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        style={{width: 200}}
                    /></div>
                    <Button variant="contained" className="RequestButton margin_10_b">
                        REQUEST
                    </Button> */}
                    {context.is_doctor ? <div style={{paddingTop: '30%'}}> <div className="margin_10">
                        <Button variant="contained" onClick={() => {
                            setModal({
                                type: "Reports",
                                state: true
                            })
                        }} className="ViewModal" style={{backgroundColor: "#cf6a6a", color: 'white'}}>
                            VIEW REPORTS
                        </Button>
                    </div>
                    <div className="contained">
                        <Button variant="margin_10" onClick={() => {
                            setModal({
                                type: "Receipts",
                                state: true
                            })
                        }} className="ViewModal" style={{backgroundColor: "#cf6a6a", color: 'white'}}>
                            VIEW RECEIPTS
                        </Button>
                    </div> </div> : <div style={{paddingTop: '30%'}}>

                    <div className="margin_10">
                        <Button variant="contained" onClick={() => {
                            document.getElementById("report-upload").click()
                        }} className="ViewModal" style={{backgroundColor: "#cf6a6a", color: 'white'}}>
                            <input id="report-upload" type="file" style={{display: 'none'}} onChange={(e) => {
                                let name = document.getElementById("report-upload").value
                                setReport({ file: e.target.files[0], name })
                            }} />UPLOAD REPORTS
                        </Button>
                        {report && <div>
                            <p>{report.name} <button id="uploadReport" onClick={() => {
                                upload("Report")
                            }}>Upload</button></p>
                            <label for="type_of">Type of</label>
                            <input id="type_of" onChange={(e) => {
                                set_type_of_report(e.target.value)
                            }} />
                        </div>}
                    </div>
                    <div className="contained">
                        <Button  variant="contained" onClick={() => {
                            document.getElementById("receipt-upload").click()
                        }} className="ViewModal" style={{backgroundColor: "#cf6a6a", color: 'white'}}>
                            <input id="receipt-upload" type="file" style={{display: 'none'}} onChange={(e) => {
                                let name = document.getElementById("receipt-upload").value
                                setReceipt({ file: e.target.files[0], name })
                            }} />UPLOAD RECEIPTS
                        </Button>
                        {receipt && <div>
                            <p>{receipt.name} <button id="uploadReceipt" onClick={() => {
                                upload("Receipt")
                            }}>Upload</button></p>
                            <div>
                                <label for="price">Price</label>
                                <input id="price" onChange={(e) => {
                                    setReceiptPrice(e.target.value)
                                }} />
                            </div>
                            <div>
                                <label for="select">Appointment</label>
                                <select id="select" onChange={(e) => {
                                    console.log(JSON.parse(e.target.value))
                                    setReceiptAppointment(JSON.parse(e.target.value))
                                }}>
                                    <option value="">Select</option>
                                    {showPatientAppointments(false)}
                                </select>
                            </div>
                        </div>}
                    </div> </div>}
                    <Modal
                        open={modal.state}
                        onClose={() => setModal({
                            ...modal,
                            state: false
                        })}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                    <Modal
                        open={editModal.state}
                        onClose={() => setEditModal({
                            ...editModal,
                            state: false
                        })}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {editBody()}
                    </Modal>
                </div>
            </Grid>
        </Grid>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        </div>
    )
}

export default PatientDashboard