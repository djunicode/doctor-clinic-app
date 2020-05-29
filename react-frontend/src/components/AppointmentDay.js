import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class AppointmentDay extends Component {
  render() {
    return (
      <div class="AppointmentContainer">
        <p class="Para">
          <br></br>
          <h2 className="span3">APPOINTMENT OF THE DAY :</h2>
        </p>
        <br></br>
        <br></br>
        <div class="PContainer1">
          <div class="Patientcard">
            <div class="PatientNameTime ">
              Patient Name: <br></br>Time:
            </div>
            <div class="Patientprofilebutton">
              <Button
                variant="contained"
                color="secondary"
                id="TButton"
                className="defred"
              >
                View Profile
              </Button>
            </div>
          </div>
          <div class="Patientcard">
            <div class="PatientNameTime ">
              Patient Name: <br></br>Time:
            </div>
            <div class="Patientprofilebutton">
              <Button
                variant="contained"
                color="secondary"
                id="TButton"
                className="defred"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentDay;
