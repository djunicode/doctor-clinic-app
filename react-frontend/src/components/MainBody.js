import React, { Component } from "react";
import PatientInfo from "./PatientInfo";
import { Context } from '../context/Context';
import Modal from '@material-ui/core/Modal';
import PanToolIcon from '@material-ui/icons/PanTool';

class MainBody extends Component {
  static contextType = Context

  // constructor(props){
    // super(props);
    state = {
      modalSearch: "",
      modalContent: [],
      open: false
    }
  // }

  body = (
    // <h1>HI</h1>
    <>
      <input
        type="text"
        placeholder="Search.."
        className="SearchBar"
        onChange={(e)=>{
          this.search(this.context.appointments, e.target.value)
        }}
      ></input>
      <p>{JSON.stringify(this.state.modalContent)}</p>
    </>
  )

  search = (list, val) => {
    let arr = list.filter( appt => { 
      let flag = appt.appointment.patient.toLowerCase().includes(val) && appt.present==false
      return flag
    })
    // let arr = list.find((appt) => {
    //   return appt.patient.includes(val)
    //   // if(appt.patients.includes(val)){
    //   //   return 
    //   // }
    // })
    console.log(arr)
    this.setState({
      modalContent: arr
      //modalSearch: val
    })
  }

  render() {
    return (
      <div className="MainContainer">
        <p className="MainPara">
          <span className="span1">Patients</span>
          {/* <PanToolIcon onClick={() => this.setState({open: true})} style={{float: 'right', marginTop: 12}} /> */}
          <input
            type="text"
            placeholder="Search.."
            className="SearchBar"
          ></input>
        </p><p className="margin_10">{this.context.patients.map((patient) => (
          <PatientInfo
            name={patient.username}
            dname={patient.doctor}
            desc="description"
            id={patient.patient_id}
          ></PatientInfo>
        ))}</p>
        {/* <Modal
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.body}
        </Modal> */}
      </div>
    );
  }
}
export default MainBody;
