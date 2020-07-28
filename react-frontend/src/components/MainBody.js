import React, { useState, useContext, useEffect } from "react";
import PatientInfo from "./PatientInfo";
import { Context } from '../context/Context';
import Grid from "@material-ui/core/Grid";
import PanToolIcon from '@material-ui/icons/PanTool';

const MainBody = (props) => {
  const context = useContext(Context)
  const [patientsToShow, setPatientsToShow] = useState(null)

  const search = () => {
    let val = document.getElementById("searchInput").value.trim().toLowerCase()
    if(val===""){
      setPatientsToShow(context.patients)
    }
    else{
      let arr = context.patients.filter( pat => { 
        let flag = pat.username.username.toLowerCase().includes(val) // && pat.present==false
        return flag
      })
      console.log(arr)
      setPatientsToShow(arr)
    }
  }

  const patList = () => {
    if(context.loading){
      return(
        <div class="lds-dual-ring" ></div>
      )
    }
    let arr = patientsToShow;
    if(patientsToShow===null){
      arr = context.patients
    }
    return arr.map((patient) => {
      return(
        <Grid md={4} sm={6} xs={12} style={{marginBottom: 30}}>
          <PatientInfo
            name={patient.username.username}
            dname={patient.username.first_name+" "+patient.username.last_name}
            dp={patient.username.profile_pic}
            id={patient.patient_id}
          ></PatientInfo>
        </Grid>
      )
    })
  }

  return (
    <div className="MainContainer" style={{marginLeft: 20}}>
      <p className="MainPara">
        <span className="span1">Patients</span>
        {/* <PanToolIcon onClick={() => this.setState({open: true})} style={{float: 'right', marginTop: 12}} /> */}
        <input
          id="searchInput"
          type="text"
          placeholder="Search.."
          className="SearchBar"
          onKeyDown={() => setTimeout(() => search(), 1)}
        ></input>
      </p><p  style={{marginTop: 100}}>
        <Grid container style={{height: 450, overflowY:'scroll'}}>
          {patList()}
        </Grid>
      </p>
    </div>
  );
}
export default MainBody;
