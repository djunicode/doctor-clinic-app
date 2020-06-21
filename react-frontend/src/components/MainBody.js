import React, { Component } from "react";
import PatientInfo from "./PatientInfo";
import {Context} from '../context/Context'
// const patientslist = [
//   {
//     id: 5,
//     name: "Vatsal Chheda",
//     dname: "Dr Asthana",
//     desc:
//       "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary",
//   },
//   {
//     id: 3,
//     name: "Samit Kapadia",
//     dname: "Dr Avasthi",
//     desc:
//       "Lorem ipsum dolor sit amet, has officiis dignissim urbanitas an, mea an verear tamquam intellegat, vitae legere dissentiunt mea te. Mutat alienum accumsan eam ad, cum rebum sententiae comprehensam ut. Cibo expetenda qui at, case populo albucius mei at, cu suas menandri pri. Vis et diam urbanitas.",
//   },
//   {
//     id: 8,
//     name: "Rishi Desai",
//     dname: "Dr Dolittle",
//     desc:
//       "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my",
//   },
// ];
// const patientslistarray = [];
// for (var i = 0; i < patientslist.length; i++) {
//   patientslistarray.push(
//     <PatientInfo
//       name={patientslist[i].name}
//       dname={patientslist[i].dname}
//       desc={patientslist[i].desc}
//       id={patientslist[i].id}
//     ></PatientInfo>
//   );
// }
class MainBody extends Component {
  static contextType = Context

  render() {
    return (
      <div className="MainContainer">
        <p className="MainPara">
          <span className="span1">Patients</span>
          <input
            type="text"
            placeholder="Search.."
            className="SearchBar"
          ></input>
          <br></br>
          <br></br>
        </p>
        {/* {patientslistarray} */}
        {this.context.patients.map((patient)=>(
          <PatientInfo
            name={patient.username}
            dname={patient.doctor}
            desc="description"
            id={patient.id}
          ></PatientInfo>
        ))}
        {/* <PatientInfo name="VAtsal CHheda" dname="Dr Asthana" />
        <PatientInfo name="VAtsal CHheda" dname="Dr Asthana" />
        <PatientInfo name="VAtsal CHheda" dname="Dr Asthana" /> */}
      </div>
    );
  }
}
export default MainBody;
