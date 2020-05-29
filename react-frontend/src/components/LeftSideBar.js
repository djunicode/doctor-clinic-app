import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
class LeftSideBar extends Component {
  render() {
    return (
      <div className="LeftContainer">
        <div>
          <img
            src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/6-512.png"
            className="LImage"
            alt="Profile"
          ></img>
        </div>
        <Button variant="contained" className={this.props.className}>
          <Link style={{ color: "black" }} to="/">
            Patients
          </Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" className={this.props.className1}>
          <Link style={{ color: "black" }} to="/appoinment">
            Appointments
          </Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" className={this.props.className2}>
          <Link style={{ color: "black" }} to="/addpatient">
            New Patients
          </Link>
        </Button>
      </div>
    );
  }
}
export default LeftSideBar;
