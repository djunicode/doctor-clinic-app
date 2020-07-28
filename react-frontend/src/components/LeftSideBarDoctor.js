import React, { Component } from "react";
import SignupForm from './signupForm';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from "@material-ui/core/Modal";
import Webcam from "../components/Webcam";
import { Context } from "../context/Context";
import ClearIcon from '@material-ui/icons/Clear';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

class LeftSideBarDoctor extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      activityIndicator: false,
      openCamera: false
    }
  }

  static contextType = Context

  demoDP = (imageSrc) => {
    document.getElementById('profilepic').src = imageSrc 
  }

  render() {
    const { modal, activityIndicator, openCamera } = this.state
    const { doctor, token, classes } =  this.props
    const values = {
      firstname: doctor.username.first_name,
      lastname: doctor.username.last_name,
      qualification: doctor.qualification,
      speciality: doctor.speciality,
      postgrad: doctor.postgrad,
      email: doctor.username.email,
      DOB: doctor.username.DOB,
      phone: doctor.username.contact_no,
      dailyTime: doctor.daily_start_time,
      endTime: doctor.daily_end_time
    }

    return (
      <div className="LeftContainer">
        <div>
          <img
            id = "profilepic"
            src = {doctor.username.profile_pic===null ? require("../images/defaultdp.webp") : doctor.username.profile_pic}
            className="LImage"
          ></img>
          <div>
            <PhotoCameraIcon style={{width: 40, height: 40, cursor: 'pointer', marginBottom: 5}} onClick = {() => {    
              this.setState({ openCamera: !openCamera })
            }} /> </div>
            <p><b>Name:</b> {doctor.username.first_name + " " + doctor.username.last_name}</p>
            <p><b>Qualifications:</b> {doctor.qualification + ", " + doctor.postgrad}</p>
            <p><b>Daily Timing:</b> {doctor.daily_start_time + " - " + doctor.daily_end_time}</p>
            <p className ="margin_10"><b>Username:</b> {doctor.username.username}</p>
            <p><b>Email-ID:</b> {doctor.username.email}</p>
            <p><b>Contact No.:</b> {doctor.username.contact_no}</p>
            <p><b>Date of Birth:</b> {doctor.username.DOB}</p>
        </div>
        {openCamera && 
          <Modal open={openCamera} style={{flex: 1, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div>
                  <Webcam token={this.context.Token} ID={doctor.doctor_id} url="api/newdoc/?docid=" demo={this.demoDP} closeCamera={(flag) => {
                      this.setState({ openCamera: false })
                      if(!flag){
                          if(doctor.username.profile_pic===null){
                              document.getElementById("profilepic").src = require("../images/defaultdp.webp")
                          }
                          else{
                              document.getElementById("profilepic").src = doctor.username.profile_pic
                          }
                      } 
                  }} />
              </div>
          </Modal>
        }
        <Button className="defred" variant="contained" color="secondary" onClick={() => {
          this.setState({ modal: true })
        }}>EDIT</Button>
        <Modal
          open={modal}
          style={{textAlign:'center', marginLeft: '10%', marginTop: '5%'}}
        >
          <div className={classes.paper} style={{width: '93%', height: '88%'}}>
            {activityIndicator && <LinearProgress />}
            <ClearIcon onClick={() => {
              this.setState({ modal: false })
            }} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer'}} />
            <SignupForm
              activity={(flag) => {
                this.setState({ activityIndicator: flag })
                if(!flag){
                  this.context.refreshProfile(doctor.doctor_id)
                }
              }}
              values={values}
              method="PUT"
              url={'api/newdoc/?docid='+doctor.doctor_id}
              message="Doctor Edited"
              token={this.context.Token}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
export default LeftSideBarDoctor;
