import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { Context } from "../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Schedule extends React.Component {
  state = {
    loading: true,
    person: null,
    confirmVisible: false,
    doctors: [],
    type: ["X-ray", "checkup", "sonography", "other"],
    dates: [],
    patients: [],
    slots: [],
    selectedType: null,
    selectedPatient: null,
    selectedDoctor: null,
    selectedDate: null,
    selectedSlot: null,
  };

  static contextType = Context;

  leapYr = () => {
    let y = new Date().getYear()
    if(y%400 === 0 || (y%100 !== 0 && y%4 === 0)){
      return 29
    }
    return 28
  }

  daysInMonth = {
    1: 31,
    2: this.leapYr(),
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31 
  }

  componentDidMount() {
    let arr = [];
    let dt = new Date() 
    let y = dt.getYear() + 1900
    let m = dt.getMonth() + 1
    let d = dt.getDate() - 1
    for (let i = 0; i < 7; i++) {
      d += 1
      if(d == this.daysInMonth[m] + 1) {
        m += 1
        d = 1
        if(m==13){
          m = 1
          y += 1
        }
      }
      arr.push(
        y +
        "-" +
        m +
        "-" +
        d
      );
    }
    console.log(this.context);
    this.setState({ dates: arr, loading: false });
  }

  getTherapistData = async (docID, date) => {
    document.getElementById("confirm").disabled = false;
    const url = `http://localhost:8000/api/newAppointment?id=${docID}&date=${date}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.availableSlots(data.doctor[0], data.patients);
  };

  availableSlots(doctorData, patientData) {
    if (
      patientData.length ===
      parseInt(doctorData.daily_end_time.slice(0, 2)) -
        parseInt(doctorData.daily_start_time.slice(0, 2))
    ) {
      toast.error("No slots available", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let abc = patientData.map((x) => {
        return x.start_time;
      });
      let array = [];
      let current = doctorData.daily_start_time;
      array.push(current);
      let flag = true;
      if (current.split(":")[1] === "30") {
        flag = false;
      }
      while (doctorData.daily_end_time !== current) {
        if (flag) {
          let temp = current.split(":");
          current = temp[0] + ":" + (parseInt(temp[1]) + 30) + ":" + temp[2];
          array.push(current);
        } else {
          let temp1 = current.split(":");
          current = parseInt(temp1[0]) + 1 + ":" + "00" + ":" + temp1[2];
          array.push(current);
        }
        flag = !flag;
      }
      array.pop();
      let slots = array.filter((element) => {
        return !abc.includes(element);
      });
      console.log(slots);
      this.setState({ slots });
    }
  }

  confirmAppointment = () => {
    let formdata = new FormData();
    formdata.append("doctor", parseInt(this.state.selectedDoctor));
    formdata.append("patient", parseInt(this.state.selectedPatient));
    formdata.append("type_of", this.state.selectedType);
    formdata.append("start_time", this.state.selectedSlot);
    formdata.append("date", this.state.selectedDate);
    if (this.state.selectedSlot.split(":")[1] === "00") {
      let temp = this.state.selectedSlot.split(":");
      let end_time = temp[0] + ":" + (parseInt(temp[1]) + 30) + ":" + temp[2];
      formdata.append("end_time", end_time);
    } else {
      let temp1 = this.state.selectedSlot.split(":");
      let end_time = parseInt(temp1[0]) + 1 + ":" + "00" + ":" + temp1[2];
      formdata.append("end_time", end_time);
    }
    fetch("http://localhost:8000/api/newAppointment/", {
      method: "POST",
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        let temp = this.state.slots;
        let index = temp.findIndex((slot) => slot === this.state.selectedSlot);
        console.log(index);
        temp.splice(index, 1);
        console.log(temp);
        this.setState({
          slots: temp,
          confirmVisible: false,
        });
        toast.success("Appointment booked", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        document.getElementById("slot").textContent = temp[0];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div class="ScheduleContainer ">
        <div className="MainPara">
          <span className="span1">SCHEDULE APPOINTMENTS</span>
          <div className="defgrey appointmentbox">
            <p>PATIENT:</p>
            {this.context.patients.length === 0 ? (
              <p>Loading Patients...</p>
            ) : (
              <Autocomplete
                id="combo-box-demo"
                options={this.context.patients}
                getOptionLabel={(option) =>
                  option.id.toString() + ": " + option.username
                }
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Patient" variant="outlined" />
                )}
                onChange={(e) => {
                  this.setState({
                    selectedPatient: e.target.textContent.split(": ")[0],
                  });
                }}
              />
            )}
            <p class="margin_10">THERAPIST:</p>
            {this.context.doctors.length === 0 ? (
              <p>Loading Doctors...</p>
            ) : (
              <Autocomplete
                id="combo-box-demo"
                options={this.context.doctors}
                getOptionLabel={(option) =>
                  option.id.toString() + ": " + option.username
                }
                style={{ width: 300 }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Therapist"
                      variant="outlined"
                    />
                  );
                }}
                onChange={(e) => {
                  this.setState({
                    selectedDoctor: e.target.textContent.split(": ")[0],
                  });
                }}
              />
            )}
            <p class="margin_10">TYPE OF APPOINTMENT:</p>
            <Autocomplete
              id="combo-box-demo"
              options={this.state.type}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => {
                return (
                  <TextField {...params} label="Type" variant="outlined" />
                );
              }}
              onChange={(e) => {
                this.setState({ selectedType: e.target.textContent });
              }}
            />
            <div class = "margin_10" style={{ float: "left" }}>
              <p>DATE:</p>
              <Autocomplete
                id="combo-box-demo"
                options={this.state.dates}
                getOptionLabel={(option) => option.toString()}
                style={{ width: 150 }}
                renderInput={(params) => (
                  <TextField {...params} label="Date" variant="outlined" />
                )}
                onChange={(e) => {
                  this.setState({ selectedDate: e.target.textContent });
                }}
              />
            </div>
            {this.state.selectedDate !== null &&
              this.state.selectedDoctor !== null && (
                <button
                  onClick={() =>
                    this.getTherapistData(
                      parseInt(this.state.selectedDoctor),
                      this.state.selectedDate
                    )
                  }
                >
                  getslots
                </button>
              )}
            {this.state.selectedDate !== null &&
              this.state.selectedDoctor !== null &&
              this.state.slots.length !== 0 && (
                <div style={{ float: "right", marginRight: "45px" }}>
                  <p>SLOT:</p>
                  <Autocomplete
                    id="slot"
                    options={this.state.slots}
                    getOptionLabel={(option) => option.toString()}
                    style={{ width: 150 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Slot" variant="outlined" />
                    )}
                    onChange={(e) => {
                      this.setState({
                        selectedSlot: e.target.textContent,
                        confirmVisible: true,
                      });
                    }}
                  />
                </div>
              )}

            <Button
              variant="contained"
              color="secondary"
              className="defred"
              id="confirm"
              style={{ marginLeft: "35%", marginTop:" 45%", zIndex: 1001 }}
              onClick={this.confirmAppointment}
              disabled={!this.state.confirmVisible}
            >
              Confirm
            </Button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    );
  }
}
