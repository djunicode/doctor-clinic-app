import React, { useState, useEffect, useContext, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWillMount from '../custom hooks/useWillMount';
import { Context } from '../context/Context';
import './doctorSignup.css';

const PatientDashboard = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [modal, setModal] = useState({state: false, type: "Reports"})
    const [details, setDetails] = useState()
    const [Reports, setReports] = useState(null)
    const [Receipts, setReceipts] = useState(null)
    const [report, setReport] = useState()
    const [receipt, setReceipt] = useState()
    const context = useContext(Context)
    const patientID = new URLSearchParams(props.location.search).get("id")
    console.log(patientID)

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

    useWillMount(() => {
        init()
    })

    const today = () => {
        let dt = new Date()
        return dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate()
    }

    const upload = async(type) => {
        let formdata = new FormData()
        formdata.append("filelocation",report.file)
        formdata.append("published_on", today())
        formdata.append("typeof", type)
        formdata.append("patient", patientID)
        try{
            document.getElementById('upload'+type).disabled = true
            const response = await fetch('api/report/', {
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
                toast.success("Uploaded file", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            document.getElementById('upload'+type).disabled = false
        }
        catch(err){
            console.log(err);
        }
    }

    const view = async() => {
        try{
            const response = await fetch(`api/report?patientid=${patientID}`,{
                headers: {
                    'Authorization': context.Token
                }
            })
            const resData = await response.json()
            console.log(resData)
            setReports(resData)
        }
        catch(err){
            console.log(err)
        }
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
        modal.type === "Reports" ? <div style={{
            top: '40%',
            left: '7.5%',
            width: '85%'
        }} className={classes.paper}>
            <ClearIcon onClick={() => setModal({
                ...modal,
                state: false
            })} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
            <h2 id="simple-modal-title">Reports</h2>
            {Reports===null ? view() : Reports!==[] ? Reports.map((report) => (
                <div>
                    <a href={report.filelocation}>{report.typeof}</a>
                </div>
            )) : <p>No Reports Found</p>}
            {/* <p id="simple-modal-description">
                Reports
            </p> */}
        </div> :
        <div style={{
            top: '40%',
            left: '7.5%',
            width: '85%'
        }} className={classes.paper}>
            <ClearIcon onClick={() => setModal({
                ...modal,
                state: false
            })} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
            <h2 id="simple-modal-title">Receipts</h2>
            {/* <p id="simple-modal-description">
                Receipts
            </p> */}
        </div>
    );

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
                                        src = {require("../images/defaultdp.webp")}
                                        className="LImage"
                                    ></img>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <p style={{marginTop: 30,fontSize: 30}}>PATIENT NAME</p>
                                <div className="patientDetails margin_10">
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
                                <button>EDIT</button>
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
                    <div className="margin_10">
                        <Button variant="contained" onClick={() => {
                            setModal({
                                type: "Reports",
                                state: true
                            })
                        }} className="ViewModal" style={{backgroundColor: "#cf6a6a", color: 'white'}}>
                            VIEW REPORTS
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" onClick={() => {
                            setModal({
                                type: "Receipts",
                                state: true
                            })
                        }} className="ViewModal" style={{backgroundColor: "#cf6a6a", color: 'white'}}>
                            VIEW RECEIPTS
                        </Button>
                    </div>

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
                        </div>}
                    </div>
                    <div className="margin_10">
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
                        </div>}
                    </div>
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