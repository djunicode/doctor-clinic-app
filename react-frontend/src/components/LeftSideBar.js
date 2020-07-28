import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import './style.css'

class LeftSideBar extends Component {
  render() {
    return (
      <div className="LeftContainer">
        <div>
          <img
            src = {require("../images/hospital.jpg")}
            className="LImage"
            alt="Profile"
          ></img>
        </div>
        <Button variant="contained" className={this.props.className}>
          <Link className="link" to="/home">
            Home
          </Link>
        </Button>
        <div className="margin_10 margin_10_b">
          <Button variant="contained" className={this.props.className1} >
          <Link className="link" to="/appointment">
            Appointments
          </Link>
        </Button>
        </div>
        
        <Button variant="contained" className={this.props.className2}>
          <Link className="link" to="/addpatient">
            New Patients
          </Link>
        </Button>
      </div>
    );
  }
}
export default LeftSideBar;
