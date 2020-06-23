import React from "react";
import "../App.css";
import Nav from "../components/nav";
import LeftSideBar from "../components/LeftSideBar";
import MainBody2 from "../components/MainBody2";
import RightSideBar from "../components/RightSideBar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Receptionist3() {
  return (
    <div className="App">
      <Container fluid className="ContainerPadding">
        <Nav />
        <Row>
          <Col xs={12} md={2} className="Cellpadding">
            <LeftSideBar className2="defred" />
          </Col>
          <Col xs={12} md={8} className="Cellpadding">
            
            <MainBody2 />
          </Col>
          <Col xs={12} md={2} className="Cellpadding">
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

export default Receptionist3;
