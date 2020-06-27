import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
          <div className='margin_10'>
            <Link to={`/patientdashboard?id=${this.props.id}`}>
              <Button variant="contained" color="secondary" className="defred">
                Profile
            </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientInfo;
