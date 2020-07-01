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
        <div className="PContainer margin_10">
          <div className="PImage"></div>
          <div className="PInfo">
            <p>Samit</p>
            <p>kapadia</p>
          </div>
        </div>
        <div className="MainPara margin_10">
          <span className="span1" id="span1 margin_10">
            Free slots of therapist:
          </span>
          <FormControl className="Select">
            <InputLabel id="demo-simple-select-label">Slot</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem>None</MenuItem>
              <MenuItem>Slot 1</MenuItem>
              <MenuItem>Slot 2</MenuItem>
              <MenuItem>Slot 3</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            className="defred Select margin_10 margin_10_b"
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}

export default Requests;
