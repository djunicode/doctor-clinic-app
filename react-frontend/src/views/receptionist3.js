import React from "react";
import "../App.css";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import MainBody2 from "../components/MainBody2";
import RightSideBar from "../components/RightSideBar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Receptionist3() {
  return (
    <div>
      <Header />
      <Container fluid className="ContainerMargin">
        <Row>
          <Col xs={12}  lg={3} xl={2} className="Cellpadding">
            <LeftSideBar className2="defred" />
          </Col>
          <Col xs={12}  lg={6} xl={8} className="Cellpadding">
            <MainBody2 />
          </Col>
          <Col xs={12}  lg={3} xl={2} className="Cellpadding">
            <RightSideBar
             
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Receptionist3;
