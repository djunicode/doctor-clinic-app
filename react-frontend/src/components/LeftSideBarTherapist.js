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
          <p className ="margin_10">{this.props.doctor.username}</p>
          <p>{this.props.doctor.qualification}</p>
        </div>
      </div>
    );
  }
}
export default LeftSideBarTherapist;
