import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import Header from "../components/Header";
import LeftSideBarTherapist from "../components/LeftSideBarDoctor";
import AppointmentDay from "../components/AppointmentDay";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../context/Context';

function DoctorDashboard(props) {
  const context = useContext(Context)

  const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Header />
      <Container fluid className="ContainerMargin">
        {context.doctorProfile!==null && 
          <Row>
            <Col xs={12} md={3} className="Cellpadding">
              <LeftSideBarTherapist doctor={context.doctorProfile.doctor} token={context.Token} classes={classes} />
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

export default DoctorDashboard;
