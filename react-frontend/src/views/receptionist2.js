import React, { useEffect, useState } from "react";
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
import Header from "../components/Header";

function Receptionist2() {
  const [appointments, setAppointments] = useState([])

  useEffect(()=>{
    getAppointments()
  },[])

  const getAppointments = async() => {
    const response = await fetch('api/appointments/')
    const resp = await response.json()
    console.log(resp)
  }

  return (
    <>
      <Header />
      <Container className="ContainerMargin" fluid>
        <Row className="RowMarginAppointment">
          <Col xs={12} md={4} className="Cellpadding">
            <LeftSideBar className1="defred" />
          </Col>
          <Col xs={12} md={5} className="Cellpadding">
            <div id="div1">
              <Row>
                  <Schedule />
              </Row>
            </div>
          </Col>
          <Col xs={12} md={3} lg={2} className="Cellpadding">
            {/* {appointments.map((appointment)=>( */}
              <RightSideBar
                
              />
            {/* ))} */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Receptionist2;
