import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';

const RightSideBar = (props) => {
  const context = useContext(Context)
  const [spinner, showSpinner] = useState(false)

  const status = (start_time, present) => {
    let dt = new Date()
    let time = dt.getHours()*60 + dt.getMinutes()
    if(parseInt(start_time.slice(0,2))*60 + parseInt(start_time.slice(3,5)) < time){
      if(present){
        return(<DoneIcon />)
      }
      return(<WarningIcon />)
    }
    else{
      if(present){
        return(<ThumbUpIcon />)
      }
    }
  }

  const DOWcodes = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  const today = () => {
    let dt = new Date()
    return DOWcodes[dt.getDay()] + ", " + dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear() 
  }

  const markAttendance = async(id, index) => {
    // alert("x")
    showSpinner(true)
    try{
      const response = await fetch(`api/markAttend/?id=${id}`)
      // console.log(await response.text())
      const res = await response.json()
      console.log(res)
      context.attendance(index)
    }
    catch(err){
      console.log(err)
    }
    showSpinner(false)
  }

  return (
    <div className="RightContainer">
      {/* <p>Time: {appointment.appointment.start_time}</p> */}
      <p>{today()}</p>
      <div style={{position:'relative', height: '80vh', overflowY: 'scroll'}}>
        {spinner && <div style={{width: '100%',height:'100%',top:0,left:0,position: 'absolute', zIndex: 1001, backgroundColor: 'rgba(255,255,255,0.5)'}}>
          <div class="lds-dual-ring" style={{marginTop:'70%'}}></div>
        </div>}
        {context.appointments.length>0 ? context.appointments.map((appointment, index) => (
          <div style={{width: '100%',height:'100%',top:0,left:0,position: 'absolute'}}>
            <h6>QUEUE: {appointment.token} {status(appointment.appointment.start_time, appointment.present)}</h6>
            <p>Name: {appointment.appointment.patient.username}</p>
            <p>Doctor: {appointment.appointment.doctor.username}</p>
            <p>Time: {appointment.appointment.start_time}</p>
            {/* <p>{appointment.appointment.id}</p> */}
            {!appointment.present && <button onClick={() => markAttendance(appointment.appointment.patient.patient_id, index)}>mark</button>}
          </div>
        )): <p>No Appointments Today</p>}
        {/* {JSON.stringify(context.appointments)} */}
      </div>
    </div>
  )
}

export default RightSideBar