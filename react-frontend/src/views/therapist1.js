import React, { useEffect, useState } from "react";
import "../App.css";
import Nav from "../components/nav";
import LeftSideBarTherapist from "../components/LeftSideBarTherapist";
import AppointmentDay from "../components/AppointmentDay";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Therapist1(props) {
  const [data, setData] = useState()

  useEffect(()=>{
    let d = new Date()
    getTherapistData(new URLSearchParams(props.location.search).get("id"),'2020-11-11')//(d.getYear()+1900)+'-'+(d.getMonth()+1)+'-'+(d.getDate()))
  },[])

  const getTherapistData = async(docID, date) => {
    const url = `http://localhost:8000/api/newAppointment?id=${docID}&date=${date}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setData(data)
    // if(data.patients.length===0){
    //   toast.error('No slots available', {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }else{
    //   this.availableSlots(data.doctor[0],data.patients)
    // }
  }

  return (
    <div className="App">
      <Container fluid className="ContainerPadding">
        <Nav />
        {data && 
          <Row>
            <Col xs={12} md={2} className="Cellpadding">
              <LeftSideBarTherapist doctor={data.doctor[0]} />
            </Col>
            <Col xs={12} md={8} className="Cellpadding">
              <AppointmentDay patients={data.patients} />
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default Therapist1;
