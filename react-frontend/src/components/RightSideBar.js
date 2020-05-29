import React, { Component } from "react";

class RightSideBar extends Component {
  render() {
    return (
      <div className="RightContainer">
        <p>Time: {this.props.time}</p>
        <p>
          Date/Day: {this.props.date} , {this.props.day}
        </p>
        <h6>QUEUE: {this.props.queue}</h6>
        <p>Name: {this.props.name}</p>
        <p>Doctor: {this.props.docname}</p>
        <p>Time: {this.props.time}</p>
      </div>
    );
  }
}

export default RightSideBar;
