import React, { useState, useContext, useEffect } from "react";
import PatientInfo from "./PatientInfo";
import { Context } from '../context/Context';
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
        let flag = pat.username.toLowerCase().includes(val) // && pat.present==false
        return flag
      })
      console.log(arr)
      setPatientsToShow(arr)
    }
  }

  const patList = () => {
    // if(context.patients===[]){
    //   return <div>

    //   </div>
    // }
    let arr = patientsToShow;
    if(patientsToShow===null){
      arr = context.patients
    }
    return arr.map((patient) => {
      return(
        <>
          <PatientInfo
            name={patient.username}
            // dname={patient.doctor}
            id={patient.patient_id}
          ></PatientInfo>
        </>
      )
    })
  }

  return (
    <div className="MainContainer">
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
      </p><p className="margin_10">{patList()}</p>
    </div>
  );
}
export default MainBody;
