import React, { Component } from "react";

class LeftSideBarTherapist extends Component {
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
          <p>Name Of Therapist</p>
          <p>Qualification</p>
        </div>
      </div>
    );
  }
}
export default LeftSideBarTherapist;
