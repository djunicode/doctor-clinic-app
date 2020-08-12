import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class RightSideBar2 extends Component {
  render() {
    return (
      <div className="LeftContainer">
        <Button variant="contained" color="Secondary" className="defred margin_10 margin_10_b margin_30">
          Upload Reports
        </Button>
        <Button variant="contained" color="Secondary" className="defred margin_10 margin_10_b">
          Upload Reciepts
        </Button>
      </div>
    );
  }
}
export default RightSideBar2;
