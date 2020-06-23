import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import './style.css'

class Requests extends Component {
  render() {
    return (
      <div class="RequestsContainer">
        <p className="MainPara">
          <span className="span1">APPOINTMENT REQUESTS</span>
        </p>
        <br></br>
        <br></br>
        <div className="PContainer">
          <div className="PImage"></div>
          <div className="PInfo">
            <p>Samit</p>
            <p>kapadia</p>
          </div>
        </div>
        <br></br>
        <div className="MainPara">
          <br></br>
          <span className="span1" id="span1">
            Free slots of therapist:
          </span>
          <br></br>
          <FormControl className="Select">
            <InputLabel id="demo-simple-select-label">Slot</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem>None</MenuItem>
              <MenuItem>Slot 1</MenuItem>
              <MenuItem>Slot 2</MenuItem>
              <MenuItem>Slot 3</MenuItem>
            </Select>
          </FormControl>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="secondary"
            className="defred Select"
          >
            Confirm
          </Button>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default Requests;
