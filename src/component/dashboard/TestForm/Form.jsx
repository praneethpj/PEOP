import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import Headers from "../../Home-Page/Header";
// import "./App.css";
import Sidebar from "../Side-bar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadingVisibility } from "../../../features/configurationsActivity";
import axios from "axios";

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    // email: "",
    // password: "",
    // confirmPassword: "",
    // firstName: "",
    // lastName: "",
    // username: "",
    // nationality: "",
    // other: "",
    professionName: "",
    description: "",
    chargesperHour: ""
  });

  const dispatch = useDispatch();

  const [mondayTime, setMondayTime] = useState([]);
  const [tuesdayTime, setTuesdayTime] = useState([]);
  const [wednsedayTime, setWednsdayTime] = useState([]);
  const [thursedayTime, setThursedayTime] = useState([]);
  const [fridayTime, setFridayTime] = useState([]);
  const [saturdayTime, setSaturdayTime] = useState([]);
  const [sundayTime, setSundayTime] = useState([]);


  const FormTitles = ["Sign Up to Profession", "My Availability", "Other"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} mondayTime={mondayTime} tuesdayTime={tuesdayTime} wednsedayTime={wednsedayTime} thursedayTime={thursedayTime} fridayTime={fridayTime} saturdayTime={saturdayTime} sundayTime={sundayTime}    />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };




  const registernewprofession = () => {
    //e.preventDefault();
   // dispatch(loadingVisibility({ visibility: "true" }));

    // var obj = Object.assign(...sundayTime.map(([key, val]) => ({[key]: val})))
   console.log("registernewprofession()");
    let sunval = `[` + sundayTime.toString() + `]`;




    //     let object = {...sundayTime};
    const registerProfession = {

      "professionName": formData.professionName,
      "description": formData.description,
      "chargesperHour": formData.chargesperHour,
      "timeSlot": {

        "timeSlot": [
          {
            "dayname": "0",//[JSON.parse(sundayTime[0])]
            "times": JSON.parse(`[` + sundayTime + `]`),
            "available": "true"
          },
          {
            "dayname": "1",
            "times": JSON.parse(`[` + mondayTime + `]`),
            "available": "true"
          },
          {
            "dayname": "2",
            "times": JSON.parse(`[` + tuesdayTime + `]`),
            "available": "true"
          },
          {
            "dayname": "3",
            "times": JSON.parse(`[` + wednsedayTime + `]`),
            "available": "true"
          }, {
            "dayname": "4",
            "times": JSON.parse(`[` + thursedayTime + `]`),
            "available": "true"
          }, {
            "dayname": "5",
            "times": JSON.parse(`[` + fridayTime + `]`),
            "available": "true"
          }, {
            "dayname": "6",
            "times": JSON.parse(`[` + saturdayTime + `]`),
            "available": "true"
          }


        ]
      }
    };
   // console.log(JSON.parse('[{"name":"Pizza","price":"10","quantity":"7"}, {"name":"Cerveja","price":"12","quantity":"5"}, {"name":"Hamburguer","price":"10","quantity":"2"}, {"name":"Fraldas","price":"6","quantity":"2"}]'));
    //sundayTime
    //var parsedobj =  JSON.parse( JSON.stringify(registerProfession));
    var level = "registerProfession.timeSlot.timeSlot.times";
    //console.log("sun "+sundayTime[0]);
    // console.log("val "+JSON.stringify(update(registerProfession,"times",JSON.parse(sundayTime[0]))));
    //         var obj = JSON.parse(level);
    // obj['times'].push({"time":"10"});


    axios.post('https://peop-backend-app.herokuapp.com/api/professional/addProfession', registerProfession, {
      "headers": {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      console.log(response);
      //  addNotify("Success", "You have been applied");
    }).catch(error => {
      //addNotify("Error", JSON.stringify(error));
      console.log(error);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    });


    // dispatch(signedUser({
    //     user:"praneeth"
    // }));


    //dispatch(loadingVisibility({ visibility: "false" }));
    // console.log(selectUser);
  }
  return (

    <>

      <Headers />

      <Sidebar active="profession" />
      <Centerdiv>
        <div className="form">


          <div className="progressbar">
            <div
              style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
            ></div>
          </div>
          <div className="form-container">
            <div className="header">
              <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">{PageDisplay()}</div>
            <div className="footer">
              <button
                disabled={page == 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
              <button
                onClick={() => {
                  if (page === 1) {
                    //alert("FORM SUBMITTED");
                    console.log(formData);
                    registernewprofession();
                  } else {
                    setPage((currPage) => currPage + 1);
                  }
                }}
              >
                {page === FormTitles.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </Centerdiv>
    </>
  );
}

const Centerdiv = styled.div`
margin: auto;
width: 50%;

padding: 10px;

`;

export default Form;