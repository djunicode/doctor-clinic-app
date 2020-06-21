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
            src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/6-512.png"
            className="LImage"
          ></img>
          <br></br>
          <br></br>
          <p>{this.props.doctor.username}</p>
          <p>{this.props.doctor.qualification}</p>
        </div>
      </div>
    );
  }
}
export default LeftSideBarTherapist;
