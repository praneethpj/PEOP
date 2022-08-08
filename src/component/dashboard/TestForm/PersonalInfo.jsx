import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment';

function PersonalInfo({mondayTime,tuesdayTime,wednsedayTime,thursedayTime,fridayTime,saturdayTime,sundayTime}) {
  const selectUser = useSelector((state) => state.authActivity.user)
  const [selectday, setDay] = useState("0");
  const [timegap, setTimegap] = useState(5);
  const [options, setOptions] = useState([]);
  const [times, setTimes] = useState([]);
  const [selecttime, setSelecttime] = useState("");
  const [sundayData, setSundayData] = useState([]);
  const [mondayaData, setMondayData] = useState([]);
  const [tuedataData, setTuesdayData] = useState([]);
  const [wednesdayaData, setWednesdayData] = useState([]);
  const [thursedayData, setThursedayData] = useState([]);
  const [fridayData, setFridayData] = useState([]);
  const [saturdayData, setSaturdayData] = useState([]);
 
  // const [mondayTime, setMondayTime] = useState([]);
  // const [tuesdayTime, setTuesdayTime] = useState([]);
  // const [wednsedayTime, setWednsdayTime] = useState([]);
  // const [thursedayTime, setThursedayTime] = useState([]);
  // const [fridayTime, setFridayTime] = useState([]);
  // const [saturdayTime, setSaturdayTime] = useState([]);
  // const [sundayTime, setSundayTime] = useState([]);
  const [profilehistory, setProfilehistory] = useState([]);

  const [selectId, setSelectId] = useState("");

  let next = false;


  const dispatch = useDispatch();
  const changeDay = (e) => {
      let sid = 0
      switch (e.target.value) {
          case "Sunday": sid = 0;
              break;
          case "Monday": sid = 1;
              break;
          case "Tuesday": sid = 2;
              break;
          case "Wednesday": sid = 3;
              break;
          case "Thursday": sid = 4;
              break;
          case "Friday": sid = 5;
              break;
          case "Saturday": sid = 6;
              break;

      }


      setSelectId(sid);
      setDay(e.target.value);


  }


  const changeTimegap = (e) => {
    console.log("timegap " + e.target.value)
    setTimegap(e.target.value);
    options.length = 0;


    var start = new Date();
    start.setHours(0);
    start.setMinutes(0);


    let initiontime = 1;

    let i = 0;
    let d1 = "";
    let d2 = "";
    let add = false;
    while (start.getHours() < 23) {
        var newDateObj = moment(start).add(e.target.value, 'm').toDate();
        console.log();
        start = newDateObj;
        // let nextime=(initiontime+timegap)%60;


        if (i % 2 == 0) {
            d1 = newDateObj.getHours() + ":" + newDateObj.getMinutes();
            add = false;
        } else {
            d2 = newDateObj.getHours() + ":" + newDateObj.getMinutes();
            add = true;
        } i++;
        if (add == true) {
            options.push(d1 + " - " + d2);
        }

    }

};

const handleSelectTime = (e) => {
  console.log(e.target.value);
  setSelecttime(e.target.value);
}

const handleTimes = (e) => {

  console.log("Selected day " + selectId + " " + selectday)
  // currentSelect,setCurrentSelect
  if (selectId == 0) {
      console.log("details " + sundayTime + " " + selecttime + " " + selectday + " " + selectId)

      //Object.assign(sundayTime, {"time":selecttime,"availability":true});
      // console.log(JSON.parse('[{"name":"Pizza","price":"10","quantity":"7"}, {"name":"Cerveja","price":"12","quantity":"5"}, {"name":"Hamburguer","price":"10","quantity":"2"}, {"name":"Fraldas","price":"6","quantity":"2"}]'));

      sundayTime.push(`{"time":"` + selecttime + `"}`);

      //sundayTime.set(...sundayTime,"time",selecttime);
      //Object.assign(sundayTime, {"time": selecttime});
      // setSundayTime({"time":selecttime,"availability":true})
      // setCurrentSelect(selectId);

      if (next === true) {
          const newContact = {
              // id: nanoid(),
              id: 0,
              day: "Sunday",
              available: sundayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setSundayData(newContacts);

      } else {
          const newContact = {
              // id: nanoid(),
              id: 0,
              day: "Sunday",
              available: sundayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setSundayData(newContacts);
          next = true;
      }
  } else if (selectId == 1) {
      console.log("details " + sundayTime + " " + selecttime + " " + selectday + " " + selectId)
      //mondayTime.push("{time:"+selecttime + ",availability:true},");
      mondayTime.push(`{"time":"` + selecttime + `"}`);
      // setSundayTime(...sundayTime,selecttime)
      // setCurrentSelect(selectId);

      if (next === true) {
          const newContact = {
              // id: nanoid(),
              id: setSelectId,
              day: selectday,
              available: mondayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setSundayData(newContacts);

      } else {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: mondayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setMondayData(newContacts);
          next = true;
      }
  } else if (selectId == 2) {
      console.log("details " + tuesdayTime + " " + selecttime + " " + selectday + " " + selectId)
      //tuesdayTime.push(selecttime + ",");
      tuesdayTime.push(`{"time":"` + selecttime + `"}`);
      // setSundayTime(...sundayTime,selecttime)
      // setCurrentSelect(selectId);

      if (next === true) {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: tuesdayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setTuesdayData(newContacts);

      } else {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: tuesdayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setTuesdayData(newContacts);
          next = true;
      }
  }


  if (selectId == 3) {

      //wednsedayTime.push(selecttime + ",");
      wednsedayTime.push(`{"time":"` + selecttime + `"}`);
      console.log("details " + wednsedayTime + " " + selecttime + " " + selectday + " " + selectId)
      // setSundayTime(...sundayTime,selecttime)
      // setCurrentSelect(selectId);

      const newContact = {
          // id: nanoid(),
          id: selectId,
          day: selectday,
          available: wednsedayTime,
          availability: "true",
          timegaps: timegap
      };

      const newContacts = [newContact];
      setWednesdayData(newContacts);


  }


  if (selectId == 4) {
      console.log("details " + sundayTime + " " + selecttime + " " + selectday + " " + selectId)
      // thursedayTime.push(selecttime + ",");
      thursedayTime.push(`{"time":"` + selecttime + `"}`);
      // setSundayTime(...sundayTime,selecttime)
      // setCurrentSelect(selectId);

      if (next === true) {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: thursedayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setThursedayData(newContacts);

      } else {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: thursedayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setThursedayData(newContacts);
          next = true;
      }
  }


  if (selectId == 5) {
      console.log("details " + sundayTime + " " + selecttime + " " + selectday + " " + selectId)
      //fridayTime.push(selecttime + ",");
      fridayTime.push(`{"time":"` + selecttime + `"}`);
      // setSundayTime(...sundayTime,selecttime)
      // setCurrentSelect(selectId);

      if (next === true) {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: fridayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setFridayData(newContacts);

      } else {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: fridayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setFridayData(newContacts);
          next = true;
      }
  }

  if (selectId == 6) {
      console.log("details " + sundayTime + " " + selecttime + " " + selectday + " " + selectId)
      // saturdayTime.push(selecttime + ",");
      saturdayTime.push(`{"time":"` + selecttime + `"}`);
      // setSundayTime(...sundayTime,selecttime)
      // setCurrentSelect(selectId);

      if (next === true) {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: saturdayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setSaturdayData(newContacts);

      } else {
          const newContact = {
              // id: nanoid(),
              id: selectId,
              day: selectday,
              available: saturdayTime,
              availability: "true",
              timegaps: timegap
          };

          const newContacts = [newContact];
          setSaturdayData(newContacts);
          next = true;
      }
  }
 


}
  return (
    <div className="personal-info-container">
    <div className="mt-5 mb-5">
                                    <div className="form-group">
                                        <label>Select a day</label>
                                        <select className="form-control"
                                            onChange={changeDay}>
                                            <option selected={
                                                selectday === "Sunday"
                                            }
                                                a-key={0}
                                                key="0"
                                                value="Sunday">Sunday</option>
                                            <option selected={
                                                selectday === "Monday"
                                            }
                                                a-key={1}
                                                key="1"
                                                value="Monday">Monday</option>
                                            <option selected={
                                                selectday === "Tuesday"
                                            }
                                                key="2"
                                                value="Tuesday">Tuesday</option>
                                            <option selected={
                                                selectday === "Wednesday"
                                            }
                                                key="3"
                                                value="Wednesday">Wednesday</option>
                                            <option selected={
                                                selectday === "Thursday"
                                            }
                                                key="4"
                                                value="Thursday">Thursday</option>
                                            <option selected={
                                                selectday === "Friday"
                                            }
                                                key="5"
                                                value="Friday">Friday</option>
                                            <option selected={
                                                selectday === "Saturday"
                                            }
                                                key="6"
                                                value="Saturday">Saturday</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Select Call duration</label>
                                    </div>
                                    <div>
                                        <input type="radio" value="5" name="gender" id="5"
                                            checked={
                                                timegap === "5"
                                            }
                                            onChange={changeTimegap} />
                                        5 Minitues
                                        <br />
                                        <input type="radio" value="10" name="gender" id="10"
                                            checked={
                                                timegap === "10"
                                            }
                                            onChange={changeTimegap} />
                                        10 Minitues
                                        <br />
                                        <input type="radio" value="15" name="gender"
                                            checked={
                                                timegap === "15"
                                            }
                                            onChange={changeTimegap} />
                                        15 Minitues
                                        <br />
                                        <input type="radio" value="20" name="gender"
                                            checked={
                                                timegap === "20"
                                            }
                                            onChange={changeTimegap} />
                                        20 Minitues
                                        <br />
                                        <input type="radio" value="30" name="gender"
                                            checked={
                                                timegap === "30"
                                            }
                                            onChange={changeTimegap} />
                                        30 Minitues
                                        <br />
                                        <input type="radio" value="40" name="gender"
                                            checked={
                                                timegap === "40"
                                            }
                                            onChange={changeTimegap} />
                                        40 Minitues
                                        <br />
                                        <input type="radio" value="60" name="gender"
                                            checked={
                                                timegap === "60"
                                            }
                                            onChange={changeTimegap} />
                                        60 Minitues
                                    </div>

                                    <div className="form-group">
                                        <label>Select Time Range</label>
                                    </div>
                                    <select className="form-control"
                                        onChange={handleSelectTime}>

                                        {/* <option value="">Select the Time slots</option> */}
                                        {

                                            options.map((v) => (
                                                <option key={v}
                                                    value={v}>
                                                    {v} </option>
                                            ))
                                        } </select>
                                    <div className="form-group">

                                    </div>
                                    <button type="button" className="btn btn-success"
                                        onClick={handleTimes}>
                                        Add to Table
                                    </button>

                                    <div className="form-group">

                                    </div>
                                    {/* <input className="form-control" type="text" disabled placeholder="" name="times"
                            value={times}
                            onChange={setTimes}/> */}
                                    <Table stripped bordered hover size="sm" >
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Day</th>
                                                <th>Available Time</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody> {

                                            sundayData.map((contact) => (
                                                <tr>
                                                    <td>{
                                                        contact.id
                                                    }</td>
                                                    <td>{
                                                        contact.day
                                                    }</td>
                                                    <td>{
                                                        contact.available
                                                    }</td>
                                                    <td><input type="button" value="delete" /></td>
                                                </tr>
                                            ))
                                        }
                                            {

                                                mondayaData.map((contact) => (
                                                    <tr>
                                                        <td>{
                                                            contact.id
                                                        }</td>
                                                        <td>{
                                                            contact.day
                                                        }</td>
                                                        <td>{
                                                            contact.available
                                                        }</td>
                                                        <td><input type="button" value="delete" /></td>
                                                    </tr>
                                                ))
                                            }

                                            {

                                                tuedataData.map((contact) => (
                                                    <tr>
                                                        <td>{
                                                            contact.id
                                                        }</td>
                                                        <td>{
                                                            contact.day
                                                        }</td>
                                                        <td>{
                                                            contact.available
                                                        }</td>
                                                        <td><input type="button" value="delete" /></td>
                                                    </tr>
                                                ))
                                            }
                                            {

                                                wednesdayaData.map((contactw) => (
                                                    <tr>
                                                        <td>{
                                                            contactw.id
                                                        }</td>
                                                        <td>{
                                                            contactw.day
                                                        }</td>
                                                        <td>{
                                                            contactw.available
                                                        }</td>
                                                        <td><input type="button" value="delete" /></td>
                                                    </tr>
                                                ))
                                            }
                                            {

                                                thursedayData.map((contact) => (
                                                    <tr>
                                                        <td>{
                                                            contact.id
                                                        }</td>
                                                        <td>{
                                                            contact.day
                                                        }</td>
                                                        <td>{
                                                            contact.available
                                                        }</td>
                                                        <td><input type="button" value="delete" /></td>
                                                    </tr>
                                                ))
                                            }
                                            {

                                                fridayData.map((contact) => (
                                                    <tr>
                                                        <td>{
                                                            contact.id
                                                        }</td>
                                                        <td>{
                                                            contact.day
                                                        }</td>
                                                        <td>{
                                                            contact.available
                                                        }</td>
                                                        <td><input type="button" value="delete" /></td>
                                                    </tr>
                                                ))
                                            }
                                            {

                                                saturdayData.map((contact) => (
                                                    <tr>
                                                        <td>{
                                                            contact.id
                                                        }</td>
                                                        <td>{
                                                            contact.day
                                                        }</td>
                                                        <td>{
                                                            contact.available
                                                        }</td>
                                                        <td><input type="button" value="delete" /></td>
                                                    </tr>
                                                ))
                                            } </tbody>
                                    </Table>
                                    </div>
                                  

    </div>
  );
}

export default PersonalInfo;