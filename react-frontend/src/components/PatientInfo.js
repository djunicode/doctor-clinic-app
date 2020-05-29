import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class PatientInfo extends Component {
  render() {
    return (
      <div className="PContainer">
        <div className="PImage"></div>
        <div className="PInfo">
          <p>{this.props.name}</p>
          <p>{this.props.dname}</p>
          <p>{this.props.desc}</p>
          <br></br>
          <Button variant="contained" color="secondary" className="defred">
            Profile
          </Button>
        </div>
      </div>
    );
  }
}

export default PatientInfo;
