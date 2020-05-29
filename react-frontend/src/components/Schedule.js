import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

export default class Schedule extends React.Component {
  state = {
    loading: true,
    person: null,
  };

  async componentDidMount() {
    // const url = "http://127.0.0.1:8000/book-appointment/";
    const url = "http://localhost:8000/api/list/testing/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ person: data, loading: false });
  }

  render() {
    // if (this.state.loading) {
    //   return <div>loading...</div>;
    // }

    // if (!this.state.person) {
    //   return <div>didn't get a person</div>;
    // }

    return (
      <div class="ScheduleContainer ">
        <div className="MainPara">
          <span className="span1">SCHEDULE APPOINTMENTS</span>
          <br></br>
          <br></br>
          <br></br>
          <div className="defgrey appointmentbox">
            <p>PATIENT:</p>
            <Autocomplete
              id="combo-box-demo"
              options={this.state.person}
              getOptionLabel={(option) => option.patient.toString()}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Patient" variant="outlined" />
              )}
            />
            <br></br>
            <p>THERAPIST:</p>
            <Autocomplete
              id="combo-box-demo"
              options={this.state.person}
              getOptionLabel={(option) => option.doctor.toString()}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Therapist" variant="outlined" />
              )}
            />
            <br></br>

            <p>TYPE OF APPOINTMENT:</p>
            <Autocomplete
              id="combo-box-demo"
              options={this.state.person}
              getOptionLabel={(option) => option.type.toString()}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Type" variant="outlined" />
              )}
            />
            <br></br>
            <div style={{ float: "left" }}>
              <p>DATE:</p>
              <Autocomplete
                id="combo-box-demo"
                options={this.state.person}
                getOptionLabel={(option) => option.date.toString()}
                style={{ width: 150 }}
                renderInput={(params) => (
                  <TextField {...params} label="Date" variant="outlined" />
                )}
              />
            </div>
            <div style={{ float: "right", marginRight: "45px" }}>
              <p>SLOT:</p>
              <Autocomplete
                id="combo-box-demo"
                options={this.state.person}
                getOptionLabel={(option) => option.start_time.toString()}
                style={{ width: 150 }}
                renderInput={(params) => (
                  <TextField {...params} label="Slot" variant="outlined" />
                )}
              />
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Button
              variant="contained"
              color="secondary"
              className="defred "
              style={{ marginLeft: "35%" }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
