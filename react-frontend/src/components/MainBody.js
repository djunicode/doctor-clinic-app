import React, { Component } from "react";
import PatientInfo from "./PatientInfo";
import { Context } from '../context/Context'

class MainBody extends Component {
  static contextType = Context

  render() {
    return (
      <div className="MainContainer">
        <p className="MainPara">
          <span className="span1">Patients</span>
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
            id={patient.id}
          ></PatientInfo>
        ))}</p>

      </div>
    );
  }
}
export default MainBody;
