import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

class AppointmentDay extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="AppointmentContainer">
        <p class="Para">
          <h2 className="span3 margin_10">APPOINTMENTS OF THE DAY :</h2>
        </p>
        <div class="PContainer1 margin_10">
          {this.props.patients.map((patient) => (
            <div class="Patientcard" style={{flex: 1, flexDirection: 'row'}}>
              <Grid container>
                <Grid item md={9} sm={6} xs={12}>
                  <div class="PatientNameTime" >
                    <div>
                      <span id="PatientName"><b>Patient Name:</b> {patient.patient.username.first_name + " " + patient.patient.username.last_name}</span>
                    </div>
                    <div>
                      <span><b>Time:</b> {patient.start_time} </span>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                  <div class="Patientprofilebutton">
                    <Link to={"/patientdashboard?id=" + patient.patient.patient_id}>
                      <Button
                        variant="contained"
                        color="secondary"
                        id="TButton"
                        className="defred"
                        onclick
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AppointmentDay;
