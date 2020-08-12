import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";

class PatientInfo extends Component {
  render() {
    return (
      <div className="PContainer">
        <div className="PImage">
          <img id="dp" src={this.props.dp===null ? require("../images/defaultdp.webp") : this.props.dp} />
        </div>
        <div className="PInfo">
          <p>{this.props.name}</p>
          <p>{this.props.dname}</p>
          {/* <p>{this.props.desc}</p> */}
          <div className='margin_10' style={{paddingTop: 10}}>
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
