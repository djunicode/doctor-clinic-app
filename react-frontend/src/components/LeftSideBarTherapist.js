import React, { Component } from "react";

class LeftSideBarTherapist extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="LeftContainer">
        <div>
          <img
            src = {require("../images/defaultdp.webp")}
            className="LImage"
          ></img>
          <p><b>Name:</b> {this.props.doctor.username.first_name + " " + this.props.doctor.username.last_name}</p>
          <p><b>Qualifications:</b> {this.props.doctor.qualification + ", " + this.props.doctor.postgrad}</p>
          <p><b>Daily Timing:</b> {this.props.doctor.daily_start_time + " - " + this.props.doctor.daily_end_time}</p>
          <p className ="margin_10"><b>Username:</b> {this.props.doctor.username.username}</p>
          <p><b>Email-ID:</b> {this.props.doctor.username.email}</p>
          <p><b>Contact No.:</b> {this.props.doctor.username.contact_no}</p>
          <p><b>Date of Birth:</b> {this.props.doctor.username.DOB}</p>
        </div>
      </div>
    );
  }
}
export default LeftSideBarTherapist;
