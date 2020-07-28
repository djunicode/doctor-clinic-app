import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Context } from '../context/Context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.css'

const MainBody2 = (props) => {
  const [firstname, setFirstname] = useState(props.values.firstname);
  const [lastname, setLastname] = useState(props.values.lastname);
  const [username, setUsername] = useState(props.values.username);
  const [condition, setCondition] = useState(props.values.condition);
  const [password1,setPassword1] = useState(props.values.password1)
  const [password2,setPassword2] = useState(props.values.password2)
  const [DOB, setDOB] = useState(props.values.DOB);
  const [phone, setPhone] = useState(props.values.phone);
  const [email, setEmail] = useState(props.values.email);
  const [history, setHistory] = useState(props.values.history);
  const context = useContext(Context)
  const [activityIndicator, setActivityIndicator] = useState(false);

  const today = () => {
    let dt = new Date()
    return dt.getMonth() + "-" + dt.getDate() + "-" + dt.getFullYear() 
  }

  const submit = async (e) => {
    e.preventDefault();
    if (firstname === "" || lastname === "" || username === "" || condition === "" || DOB === "" || phone === "" || email === "" || password1 ==="" || password2 ==="") {
      alert("Fill in all fields");
    } else if(password1!==password2){
        alert("Passwords do not match")
    }
    else if(props.type=="POST" && password1.length<8){
      alert("Password must be longer than 8 characters")
    } else {
      let formdata = new FormData();
      formdata.append("first_name", firstname);
      formdata.append("last_name", lastname);
      formdata.append("conditions", condition);
      if(props.type=="POST"){
        formdata.append("username", username);
        formdata.append("password",password1)
        formdata.append("password2",password2)
      }
      formdata.append("DOB", DOB);
      formdata.append("contact_no", phone);
      formdata.append("email", email);
      formdata.append("history", history);
      try {
        setActivityIndicator(true);
        const response = await fetch(props.url, {
          method: props.type,
          headers: {
            'Authorization': context.Token
          },
          body: formdata,
        });
        // console.log(await response.text())
        const resData = await response.json();
        if (resData.added || resData.updated) {
          toast.success(props.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if(props.init){
            props.init()
          }
          context.addPatient(resData.Patient)
          // e.target.reset()
        }
        console.log(resData)
        setActivityIndicator(false);
      } catch (err) {
        console.log(err);
        setActivityIndicator(false);
      }
    }
  };

  return (
    <div className="MainContainer">
      <h2>{props.edit ? "Edit" : "Add"} Patient</h2>
      <div className="formclass" style={{height: (props.edit && '90%'), overflowY: (props.edit && 'scroll')}}>
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
                  defaultValue={firstname}
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
                  defaultValue={lastname}
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
                  id={props.edit ? "outlined-read-only-input" : "outlined-basic" }
                  label="Username"
                  type="text"
                  defaultValue={username}
                  InputProps={{
                    readOnly: props.edit,
                  }}
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
                  defaultValue={email}
                  onChange={(event) => setEmail(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid>
            {!props.edit && <> <Grid
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
                  defaultValue={password1}
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
                  defaultValue={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                  variant="outlined"
                />
              </div>
            </Grid> </>}
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
                  defaultValue={DOB}
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
                  defaultValue={phone}
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
                  defaultValue={condition}
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
                  defaultValue={history}
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