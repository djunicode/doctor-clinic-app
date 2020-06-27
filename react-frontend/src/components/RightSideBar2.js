import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class RightSideBar2 extends Component {
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
        <Button variant="contained" color="Secondary" className="defred margin_10 margin_10_b">
          Upload Reports
        </Button>
        <Button variant="contained" color="Secondary" className="defred margin_10 margin_10_b">
          Upload Reciepts
        </Button>
        <Button variant="contained" color="Secondary" className="defred margin_10 margin_10_b">
          Remove Patient
        </Button>
      </div>
    );
  }
}
export default RightSideBar2;
