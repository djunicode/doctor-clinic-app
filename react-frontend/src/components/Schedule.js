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
    spinnerVisible: false
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

  appointmentValidation = () => {
    const { selectedType, selectedPatient, selectedDoctor, selectedDate, selectedSlot } = this.state
    if(selectedType!==null && selectedPatient!==null && selectedDoctor!==null && selectedDate!==null && selectedSlot!==null){
      return true
    }
    return false
  }

  getSlotsValidation = () => {
    const { selectedDoctor, selectedDate } = this.state
    if(selectedDoctor!==null && selectedDate!==null){
      return true
    }
    return false
  }

  getTherapistData = async (docID, date) => {
    // alert("getslots")
    const { selectedDoctor, selectedDate } = this.state
    // alert(selectedDoctor)
    if(selectedDoctor!==null && selectedDate!==null){
      // alert("apicall")
      // document.getElementById("confirm").disabled = false;
      this.setState({spinnerVisible: true, slots: []})
      const url = `api/newAppointment?id=${parseInt(selectedDoctor)}&date=${selectedDate}`;
      const response = await fetch(url);
      // console.log(await response.text())
      const data = await response.json();
      console.log(data);
      this.availableSlots(data.doctor, data.patients);
    }
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
      this.setState({slots: [], spinnerVisible: false})
    } else {
      let abc = patientData.map((x) => {
        return x.start_time;
      });
      let array = [];
      let current = doctorData.daily_start_time;
      let dt = new Date()
      let splitUp = current.split(":")
      if((dt.getMinutes() + (dt.getHours()*60)) > ((parseInt(splitUp[0])*60) + parseInt(splitUp[1]))){
        if(dt.getMinutes() > 30){
          splitUp[0] = this.hoursCalc((dt.getHours() + 1).toString())
        }
        else{
          splitUp[0] = this.hoursCalc(dt.getHours().toString())
          splitUp[1] = "30"
        }
        current = splitUp.join(":")
      }
      array.push(current);
      let flag = true;
      if (current.split(":")[1] === "30") {
        flag = false;
      }
      while (doctorData.daily_end_time !== current) {
        if (flag) {
          let temp = current.split(":");
          current = this.hoursCalc(temp[0]) + ":" + (parseInt(temp[1]) + 30) + ":" + temp[2];
          array.push(current);
        } else {
          let temp1 = current.split(":");
          current = this.hoursCalc((parseInt(temp1[0]) + 1).toString()) + ":" + "00" + ":" + temp1[2];
          array.push(current);
        }
        flag = !flag;
      }
      array.pop();
      let slots = array.filter((element) => {
        return (!abc.includes(element) );
      });
      console.log(slots);
      this.setState({ slots, spinnerVisible: false });
    }
  }

  hoursCalc = (hr) => {
    if(hr.length===1){
      return "0"+hr
    }
    return hr
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
    fetch("api/newAppointment/", {
      method: "POST",
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        if(response['Not posssible']){
          toast.error("This slot has been booked", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else{
          let temp = this.state.slots;
          let index = temp.findIndex((slot) => slot === this.state.selectedSlot);
          console.log(index);
          if(index>=0){
            temp.splice(index, 1);
          }
          console.log(temp);
          this.setState({
            slots: temp,
            // confirmVisible: false,
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
          this.context.forceRefreshAppt();
          document.getElementById("slot").textContent = temp[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div class="ScheduleContainer " style={{textAlign:'center'}}>
        <div className="MainPara">
          <span className="span1">SCHEDULE APPOINTMENTS</span>
          <div className="defgrey appointmentbox">
            <p>PATIENT:</p>
            {this.context.doctors.hasOwnProperty('No Patients') ? <p>No Patients Yet</p> : this.context.patients.length === 0 ? (
              <p>Loading Patients...</p>
            ) : (
              <Autocomplete
                id="combo-box-demo"
                options={this.context.patients}
                getOptionLabel={(option) =>
                  // option.id.toString() + ": " + 
                  option.username.username
                }
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Patient" variant="outlined" />
                )}
                onChange={(e, newValue) => {
                  this.setState({
                    selectedPatient: newValue===null ? null : newValue.patient_id,
                  });
                }}
              />
            )}
            <p class="margin_10">DOCTOR:</p>
            {this.context.doctors.hasOwnProperty('No Doctors') ? <p>No Doctors Yet</p> : this.context.doctors.length === 0 ? (
              <p>Loading Doctors...</p>
            ) : (
              <Autocomplete
                id="combo-box-demo"
                options={this.context.doctors}
                getOptionLabel={(option) =>
                  // option.id.toString() + ": " + 
                  option.username.username
                }
                style={{ width: 300 }}
                // onInputChange={(event, newInputValue) => {
                //   // alert("newInputValue"+newInputValue)
                //   this.setState({
                //     selectedDoctor: newInputValue,
                //     // confirmVisible: true,
                //   });

                // }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Doctor"
                      variant="outlined"
                    />
                  );
                }}
                onChange={async(e, newValue) => {
                  // alert(Object.keys(newValue))
                  // alert(newValue['doctor_id'])
                  await this.setState({
                    selectedDoctor: newValue===null ? null : newValue['doctor_id'],
                  });
                  this.getTherapistData()
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
              onChange={(e, newValue) => {
                this.setState({ selectedType: newValue });
              }}
            />
            <div style={{display: "flex", flex: 1}}>
              <div class = "margin_10" style={{ float: "left" }}>
                <p>DATE:</p>
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.dates}
                  getOptionLabel={(option) => option.toString()}
                  style={{ width: 140 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Date" variant="outlined" />
                  )}
                  onChange={async(e, newValue) => {
                    // alert(newValue)
                    await this.setState({ selectedDate: newValue });
                    this.getTherapistData()
                  }}
                />
              </div>
              {this.state.spinnerVisible && <div class="lds-dual-ring" style={{marginLeft: 95, marginTop: 80}}></div>}
              {this.getSlotsValidation() &&
                this.state.slots.length !== 0 && (
                  <div class="margin_10" style={{ float: "right", marginLeft: 20, marginRight: "45px" }}>
                    <p>SLOT:</p>
                    <Autocomplete
                      id="slot"
                      options={this.state.slots}
                      getOptionLabel={(option) => option.toString()}
                      style={{ width: 140 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Slot" variant="outlined" />
                      )}
                      onChange={(e, newValue) => {
                        this.setState({
                          selectedSlot: newValue,
                        });
                      }}
                    />
                  </div>
                ) }
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="defred"
              id="confirm"
              style={{ alignSelf: 'center',marginLeft: "35%", marginTop: 50, zIndex: 1001 }}
              onClick={this.confirmAppointment}
              disabled={!this.appointmentValidation()}
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
