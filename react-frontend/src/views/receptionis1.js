import React from "react";
import "../App.css";
import Nav from "../components/nav";
import LeftSideBar from "../components/LeftSideBar";
import MainBody from "../components/MainBody";
import RightSideBar from "../components/RightSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header";

function Receptionist1() {
  return (
    <div className="App">
      <Header />
      <Container fluid className="ContainerMargin">
        <Row className="RowMarginAppointment">
          <Col xs={12} md={3} lg={2} className="Cellpadding">
            <LeftSideBar className="defred" />
          </Col>
          <Col xs={12} md={6} lg={8} className="Cellpadding">
            <MainBody />
          </Col>
          <Col xs={12} md={3} lg={2} className="Cellpadding">
            <RightSideBar
              time="18:00"
              date="24-03-20"
              day="Tuesday"
              queue="1"
              name="Vatsal Chheda"
              docname="Dr. Asthana"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Receptionist1;
