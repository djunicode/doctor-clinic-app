import React from "react";
import "../App.css";
import Nav from "../components/nav";
import LeftSideBar from "../components/LeftSideBar";
import Requests from "../components/Requests";
import Schedule from "../components/Schedule";
import RightSideBar from "../components/RightSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Receptionist2() {
  return (
    <div className="App">
      <Container fluid className="ContainerPadding">
        <Nav />
        <Row>
          <Col xs={12} md={2} className="Cellpadding">
            <LeftSideBar className1="defred" />
          </Col>
          <Col xs={12} md={8} className="Cellpadding">
            <div id="div1">
              <Row>
                <Col xs={12} md={6} className="Cellpadding">
                  <br></br>
                  <Requests />
                </Col>
                <Col xs={12} md={6} className="Cellpadding">
                  <br></br>
                  <Schedule />
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={2} className="Cellpadding">
            <RightSideBar
              time="18:00"
              date="24-03-20"
              day="Tuesday"
              queue="1"
              name="Samit Kapadia"
              docname="Dr. Hati"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Receptionist2;
