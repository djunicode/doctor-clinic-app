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
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [symptom_since, setSymptom_since] = useState("");
  const [therapist, setTherapist] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState("");
  const [activityIndicator, setActivityIndicator] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (
      firstname === "" ||
      lastname === "" ||
      age === "" ||
      condition === "" ||
      symptom_since === "" ||
      therapist === "" ||
      date === "" ||
      phone === "" ||
      email === ""
    ) {
      alert("Fill in all fields");
    } else {
      let formdata = new FormData();
      formdata.append("firstname", firstname);
      formdata.append("lastname", lastname);
      formdata.append("age", age);
      formdata.append("condition", condition);
      formdata.append("symptom_since", symptom_since);
      formdata.append("therapist", therapist);
      formdata.append("date", date);
      formdata.append("phone", phone);
      formdata.append("Email", email);
      formdata.append("history", history);
      try {
        setActivityIndicator(true);
        // Take rishi's help for this
        const response = await fetch("http://localhost:8000/register/", {
          method: "POST",
          headers: {
            //'Content-Type': 'application/json',
          },
          body: formdata,
        });
        const resData = await response.json();
        if (resData.success === "Successfully created new doctor") {
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
              <div className="fields-inner-container">
                <TextField
                  required
                  className="fields1"
                  id="outlined-basic"
                  label="First Name"
                  onChange={(event) => setFirstname(event.target.value)}
                  variant="outlined"
                />
                <br />
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
                  type="text"
                  className="fields1"
                  id="outlined-basic"
                  label="Last Name"
                  onChange={(event) => setLastname(event.target.value)}
                  variant="outlined"
                />
                <br />
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
                  label="Age"
                  type="Number"
                  onChange={(event) => setAge(event.target.value)}
                  variant="outlined"
                />
                <br />
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
                  label="Condition"
                  type="Text"
                  onChange={(event) => setCondition(event.target.value)}
                  variant="outlined"
                />
                <br />
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
                  label="Symptom Since"
                  type="Text"
                  onChange={(event) => setSymptom_since(event.target.value)}
                  variant="outlined"
                />
                <br />
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
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Therapist
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    className="fields1"
                    id="demo-simple-select-outlined"
                    onChange={(event) => {
                      setTherapist(event.target.value);
                    }}
                    labelWidth={120}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {menuoptions}
                  </Select>
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
                  label="Date"
                  type="Text"
                  onChange={(event) => setDate(event.target.value)}
                  variant="outlined"
                />
                <br />
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
                <br />
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
                <br />
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
                <br />
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