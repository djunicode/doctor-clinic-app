import React from "react";
import LeftSideBarTherapist from "../components/LeftSideBarTherapist";
import Nav from "../components/nav.js";
import RightSideBar2 from "../components/RightSideBar2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import Col from "react-bootstrap/Col";
function patientprofile() {
  return (
    <div className="App">
      <Container fluid className="ContainerPadding">
        <Nav />
        <Row>
          <Col xs={12} md={2} className="Cellpadding">
            <LeftSideBarTherapist />
          </Col>
          <Col xs={12} md={8} className="Cellpadding patientprofilemain">
            <div className="ppmain">
              <img
                src="https://cdn2.iconfinder.com/data/icons/user-people-4/48/6-512.png"
                alt="Profile"
                className="LImage"
                style={{
                  width: "10%",
                  height: "10%",
                  float: "left",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              ></img>
              <span className="DocNameSpan">Name</span>
              <span className="EditButton">
                <Button
                  variant="contained"
                  color="Secondary"
                  className="defred"
                >
                  Edit
                </Button>
              </span>
              <div className="docinfo">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur sed libero lobortis, convallis felis nec, blandit
                  arcu. Nunc sollicitudin quam a ex ultrices, ac ultricies enim
                  dapibus. In rutrum ex cursus urna consequat congue. Donec
                  vulputate quam fringilla risus consequat, ac cursus dui
                  cursus. Pellentesque finibus est vitae hendrerit efficitur.
                  Donec nec convallis magna, vitae efficitur tortor. Maecenas
                  porttitor nunc.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur sed libero lobortis, convallis felis nec, blandit
                  arcu. Nunc sollicitudin quam a ex ultrices, ac ultricies enim
                  dapibus. In rutrum ex cursus urna consequat congue. Donec
                  vulputate quam fringilla risus consequat, ac cursus dui
                  cursus. Pellentesque finibus est vitae hendrerit efficitur.
                  Donec nec convallis magna, vitae efficitur tortor. Maecenas
                  porttitor nunc.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur sed libero lobortis, convallis felis nec, blandit
                  arcu. Nunc sollicitudin quam a ex ultrices, ac ultricies enim
                  dapibus. In rutrum ex cursus urna consequat congue. Donec
                  vulputate quam fringilla risus consequat, ac cursus dui
                  cursus. Pellentesque finibus est vitae hendrerit efficitur.
                  Donec nec convallis magna, vitae efficitur tortor. Maecenas
                  porttitor nunc.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={2} className="Cellpadding">
            <RightSideBar2 />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default patientprofile;
