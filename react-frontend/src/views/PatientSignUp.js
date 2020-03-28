import React from "react";

class PatientSignUp extends React.Component {
  state = {
    username: "",
    DateOfBirth: "",
    doctorname: "",
    gender: ""
  };
  change = event => {
    // this.props.onChange({ [event.target.name]: event.target.value });
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    alert("Thank you for registering with us!!");
    this.setState({
      username: "",
      DateOfBirth: "",
      gender: "",
      doctorname: ""
    });
    this.props.onChange({
      username: "",
      DateOfBirth: "",
      gender: "",
      doctorname: ""
    });
  };
  render() {
    return (
      <div>
        <form>
          <h1>Register Patient</h1>
          <p>
            Username:{" "}
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              onChange={event => this.change(event)}
              value={this.state.username}
            />
          </p>
          <br></br>
          <p>
            Date Of Birth:{" "}
            <input
              type="text"
              placeholder="Date Of Birth"
              name="DateOfBirth"
              required
              onChange={event => this.change(event)}
              value={this.state.DateOfBirth}
            />
          </p>
          <br></br>
          <p>
            Gender:{" "}
            <input
              type="radio"
              onClick={event => this.change(event)}
              name="gender"
              value="Male"
            />
            Male
            <input
              type="radio"
              onClick={event => this.change(event)}
              name="gender"
              value="Female"
            />
            Female
            <input
              type="radio"
              onClick={event => this.change(event)}
              name="gender"
              value="Other"
            />
            Other
          </p>
          <br></br>
          <p>
            Doctor name:{" "}
            <input
              type="text"
              placeholder="Doctor Name"
              name="doctorname"
              required
              onChange={event => this.change(event)}
              value={this.state.doctorname}
            />
          </p>
          <br></br>
          <input type="Submit" onClick={event => this.onSubmit(event)} />
        </form>
        <p>{JSON.stringify(this.state, null, 2)}</p>
      </div>
    );
  }
}

export default PatientSignUp;
