import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import Header from "../components/Header";
import LeftSideBarTherapist from "../components/LeftSideBarTherapist";
import AppointmentDay from "../components/AppointmentDay";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from '../context/Context';

function Therapist1(props) {
  const [data, setData] = useState()
  const context = useContext(Context)

  useEffect(()=>{
    // let d = new Date()
    // getTherapistData(new URLSearchParams(props.location.search).get("id"), (d.getYear()+1900)+'-'+(d.getMonth()+1)+'-'+(d.getDate()))
  },[])

  const getTherapistData = async(docID, date) => {
    const url = `api/newAppointment?id=${docID}&date=${date}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setData(data)
  }

  return (
    <div>
      <Header />
      <Container fluid className="ContainerMargin">
        {context.doctorProfile!==null && 
          <Row>
            <Col xs={12} md={3} className="Cellpadding">
              <LeftSideBarTherapist doctor={context.doctorProfile.doctor} />
            </Col>
            <Col xs={12} md={7} className="Cellpadding">
              <AppointmentDay patients={context.doctorProfile.patients} />
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default Therapist1;
