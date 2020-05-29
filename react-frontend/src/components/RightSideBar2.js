import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class LeftSideBar extends Component {
  render() {
    return (
      <div className="LeftContainer">
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <Button variant="contained" color="Secondary" className="defred">
          Upload Reports
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" color="Secondary" className="defred">
          Upload Reciepts
        </Button>
        <br></br>
        <br></br>
        <Button variant="contained" color="Secondary" className="defred">
          Remove Patient
        </Button>
      </div>
    );
  }
}
export default LeftSideBar;
