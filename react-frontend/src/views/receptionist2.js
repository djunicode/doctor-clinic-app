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

function Receptionist2() {
  const [appointments, setAppointments] = useState([])

  useEffect(()=>{
    getAppointments()
  },[])

  const getAppointments = async() => {
    const response = await fetch('http://localhost:8000/api/appointments/')
    const resp = await response.json()
    console.log(resp)
    // setAppointments(resp.appointments)
  }

  return (
    <div className="App">
      <Container fluid className="ContainerPadding">
        <Nav />
        <Row>
          <Col xs={12} md={4} className="Cellpadding">
            <LeftSideBar className1="defred" />
          </Col>
          <Col xs={12} md={4} className="Cellpadding">
            <div id="div1">
              <Row>
                {/* <Col xs={12} md={6} className="Cellpadding">
                  <br></br>
                  <Requests />
                </Col> */}
                {/* <Col xs={12} md={6} className="Cellpadding"> */}
                  <br></br>
                  <Schedule />
                {/* </Col> */}
              </Row>
            </div>
          </Col>
          <Col xs={12} md={4} className="Cellpadding">
            {appointments.map((appointment)=>(
              <RightSideBar
                time={appointment.start_time}
                date={appointment.date}
                day="Tuesday"
                queue="1"
                name={appointment.patient}
                docname={appointment.doctor}
              />
            ))}
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Receptionist2;
