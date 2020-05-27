import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
const options = [
  { key: 1, text: "Dr.Asthana ", value: 1 },
  { key: 2, text: "Dr.Shah ", value: 2 },
  { key: 3, text: "Dr.Strange ", value: 3 },
];
class MainBody2 extends Component {
  render() {
    return (
      <div className="MainContainer">
        <h2>Add Patient</h2>
        <div className="formclass">
          <Form>
            <Form.Group widths="equal">
              <Form.Input fluid label="First name" placeholder="First name" />
              <Form.Input fluid label="Last name" placeholder="Last name" />
            </Form.Group>
            <Form.Group>
              <Form.Input type="number" placeholder="Age" />
            </Form.Group>
            <Form.Group>
              <Form.Input type="text" placeholder="Condition" />
            </Form.Group>

            <Form.Group>
              <Form.Input type="text" placeholder="Symptons since" />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Dropdown
                clearable
                options={options}
                selection
                placeholder="Therapists"
              />
            </Form.Group>

            <Form.Group>
              <Form.Input type="text" placeholder="Date" />
            </Form.Group>

            <Form.Group>
              <Form.Input type="text" placeholder="Phone" />
            </Form.Group>

            <Form.Group>
              <Form.Input type="email" placeholder="Email Address" />
            </Form.Group>

            <Form.Group>
              <Form.Input type="text" placeholder="History" />
            </Form.Group>
            <Button variant="contained" color="secondary" className="defred">
              Confirm
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default MainBody2;
