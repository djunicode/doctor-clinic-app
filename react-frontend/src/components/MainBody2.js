import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import 'react-calendar/dist/Calendar.css';

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

  const today = () => {
    let dt = new Date()
    return dt.getMonth() + "-" + dt.getDate() + "-" + dt.getFullYear() 
  }

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
              <div className="fields-inner-container">
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
                <TextField
                  id="date"
                  label="Date of Birth"
                  type="date"
                  defaultValue={today()}
                  style={{ width: 230 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setDOB(event.target.value)}
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
              <div className="fields-inner-container ">
                <TextField
                  // required
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue=""
                  className="fields1"
                  label="Medical Conditions"
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
              <div className="fields-inner-container">
                <TextField
                  className="fields1"
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue=""
                  label="Medical History / Add Details"
                  type="Text"
                  onChange={(event) => setHistory(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
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
      </div>
    </div>
  );
};
export default MainBody2;