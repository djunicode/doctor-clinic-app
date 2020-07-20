import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import './style.css'


const options = [
  { key: 1, text: "Dr.Asthana ", value: 1 },
  { key: 2, text: "Dr.Shah ", value: 2 },
  { key: 3, text: "Dr.Strange ", value: 3 },
];

const menuoptions = [];
for (var i = 0; i < options.length; i++) {
  menuoptions.push(
    <MenuItem value={options[i].text}>{options[i].text}</MenuItem>
  );
}

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
        if (resData.success === "Successfully added new Patient") {
          history.push("/");
        }
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
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="Date of Birth"
                  type="Text"
                  onChange={(event) => setDOB(event.target.value)}
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
      </div>
    </div>
  );
};
export default MainBody2;