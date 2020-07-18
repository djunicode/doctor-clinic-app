import React, { useContext } from 'react';
import { Context } from '../context/Context';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DoneIcon from '@material-ui/icons/Done';
import WarningIcon from '@material-ui/icons/Warning';

const RightSideBar = (props) => {
  const context = useContext(Context)

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

  return (
    <div className="RightContainer">
      {/* <p>Time: {appointment.appointment.start_time}</p> */}
      <p>{today()}</p>
      <div style={{height: '80vh',overflow: 'scroll'}}>
        {context.appointments.length>0 ? context.appointments.map((appointment) => (
          <div>
            <h6>QUEUE: {appointment.token} {status(appointment.appointment.start_time, appointment.present)}</h6>
            <p>Name: {appointment.appointment.patient.username.first_name, appointment.appointment.patient.username.last_name}</p>
            <p>Doctor: {appointment.appointment.doctor.username.first_name, appointment.appointment.doctor.username.last_name}</p>
            <p>Time: {appointment.appointment.start_time}</p>
          </div>
        )): <p>No Appointments Today</p>}
        {/* {JSON.stringify(context.appointments)} */}
      </div>
    </div>
  )
}

export default RightSideBar