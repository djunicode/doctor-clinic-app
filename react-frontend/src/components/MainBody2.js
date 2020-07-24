import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Modal from '@material-ui/core/Modal';
import DateTimePicker from 'date-time-picker'
import Calendar from 'react-calendar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import 'react-calendar/dist/Calendar.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

const MainBody2 = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [condition, setCondition] = useState("");
  const [password1,setPassword1] = useState("")
  const [password2,setPassword2] = useState("")
  const [DOB, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [open,setOpen] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    if (firstname === "" || lastname === "" || username === "" || condition === "" || DOB === "" || phone === "" || email === "" || password1 ==="" || password2 ==="") {
      alert("Fill in all fields");
    }  else if(password1!==password2){
      alert("Passwords do not match")
  } else {
      let formdata = new FormData();
      formdata.append("first_name", firstname);
      formdata.append("last_name", lastname);
      formdata.append("username", username);
      formdata.append("conditions", condition);
      formdata.append("password",password1)
      formdata.append("confirm_password",password2)
      formdata.append("DOB", DOB);
      formdata.append("contact_no", phone);
      formdata.append("email", email);
      formdata.append("history", history);
      try {
        setActivityIndicator(true);
        const response = await fetch("api/newpat/", {
          method: "POST",
          headers: {
            //'Content-Type': 'application/json',
          },
          body: formdata,
        });
        const resData = await response.json();
        if (resData.added) {
          toast.success("New Patient Added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(resData, resData.status)
        setActivityIndicator(false);
      } catch (err) {
        console.log(err);
        setActivityIndicator(false);
      }
    }
  };

  return (
    <div className="MainContainer">
      <h2>Add Patient</h2>
      <div className="formclass">
        <form className="form">
          <Grid container style={{ justifyContent: "center" }}>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container ">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="First Name"
                  onChange={(event) => setFirstname(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container  ">
                <TextField
                  required
                  type="text"
                  className="fields1"
                  id="outlined-basic"
                  label="Last Name"
                  onChange={(event) => setLastname(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container ">
              
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Username"
                  type="text"
                  onChange={(event) => setUsername(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container ">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Condition"
                  type="Text"
                  onChange={(event) => setCondition(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container ">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Enter Password"
                  type="Password"
                  onChange={(event) => setPassword1(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container ">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Re-enter Password"
                  type="Password"
                  onChange={(event) => setPassword2(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container">
                {/* <h3>DOB: </h3> */}
                {/* <TextField
                  required
                  id="outlined-read-only-input"
                  className="fields1"
                  // id="outlined-basic"
                  defaultValue={DOB}
                  InputProps={{
                    readOnly: true,
                  }}
                  label="Date of Birth"
                  type="Text"
                  onChange={(event) => setDOB(event.target.value)}
                  variant="outlined"
                /> */}
                <FormControl variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={DOB}
            // onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end" onClick={() => {
              // var datePicker = new DateTimePicker.Date(null, {
              //   lang: 'EN', // default 'EN'. One of 'EN', 'zh-CN'
              //   format: 'yyyy-MM-dd', // default 'yyyy-MM-dd'
              //    // default `new Date()`. If `default` type is string, then it will be parsed to `Date` instance by `format` . Or it can be a `Date` instance
              //   min: '1930-01-01', // min date value, `{String | Date}`, default `new Date(1900, 0, 1, 0, 0, 0, 0)`
              //   max: `new Date()` // max date value, `{String | Date}`, default `new Date(2100, 11, 31, 23, 59, 59, 999)`
              // })
              // datePicker.on('selected', function (formatDate, now) {
              //   setDOB(formatDate)
              //   // formatData = 2016-10-19
              //   // now = Date instance -> Wed Oct 19 2016 20:28:12 GMT+0800 (CST)
              // })
              // datePicker.on('cleared', function () {
              //   // clicked clear btn
              // })
              setOpen(true)
            }}>select</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={0}
          />
          <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
        </FormControl>
                
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Phone"
                  onChange={(event) => setPhone(event.target.value)}
                  type="Number"
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Email Id"
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid
              className="fields-container"
              container
              item
              lg={6}
              sm={8}
              xs={12}
            >
              <div className="fields-inner-container">
                <TextField
                  className="fields1"
                  id="outlined-basic"
                  label="History / Add Details"
                  type="Text"
                  onChange={(event) => setHistory(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            <button onClick={() => {
              var datePicker = new DateTimePicker.Time(null, {
                lang: 'EN', // default 'EN'
                format: 'HH:mm', // default 'HH:mm'
                default: '12:27', // default `new Date()`. If `default` type is string, then it will be parsed to `Date` instance by `format` . Or it can be a `Date` instance
                minuteStep: 5, // default 5. Select minutes step, must be one of [1, 5, 10]
                min: '00:00', // min time value, `{String | Date}`, default `new Date(1900, 0, 1, 0, 0, 0, 0)`
                max: '23:59' // max time value, `{String | Date}`, default `new Date(2100, 11, 31, 23, 59, 59, 999)`
              })
              datePicker.on('selected', function (formatDate, now) {
                // formatData = 2016-10-19
                // now = Date instance -> Wed Oct 19 2016 20:28:12 GMT+0800 (CST)
              })
              datePicker.on('cleared', function () {
                // clicked clear btn
              })
            }}>Dt/Ti</button>
          </Grid>
          <div>
            <Button
              type="submit"
              className="signUpButton"
              style={{
                backgroundColor: "#CF6A6A",
                color: "white",
                fontWeight: "bold",
                fontSize: 17,
                borderRadius: 10,
              }}
              variant="contained"
              onClick={(e) => submit(e)}
            >
              SUBMIT
            </Button>
          </div>
        </form>
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
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {(
            <Calendar
              onChange={(date)=>{
                console.log(date)
              }}
              value={new Date()}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};
export default MainBody2;