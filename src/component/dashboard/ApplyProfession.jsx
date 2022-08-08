import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Headers from '../Home-Page/Header'
import Sidebar from './Side-bar'
import axios from 'axios';
import { loadingVisibility } from '../../features/configurationsActivity';
import { store } from 'react-notifications-component';
import styled from 'styled-components'
import { InputTags } from 'react-bootstrap-tagsinput'
import moment from 'moment';
// import Loading from '../Home-Page/Loading';
import { useEffect } from "react";
import ProfileHistory from './appoinment-sub/ProfileHistory';
import Popup from 'reactjs-popup';
import { Table, Toast, ToastContainer } from 'react-bootstrap';
import AlertToast from '../Home-Page/AlertToast';
import BasicDetailsForm from './applyprofession/BasicDetailsForm';
export default function ApplyProfession() {
    const [details, setDetails] = useState({ professionName: "", description: "", chargesperHour: "" })
    const [professionName, setProfessionName] = useState('');

    const history = useHistory();
    const selectUser = useSelector((state) => state.authActivity.user)
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

    const [selectday, setDay] = useState("0");
    const [selectId, setSelectId] = useState("");
    const [currentSelect, setCurrentSelect] = useState("");
    const [mondayTime, setMondayTime] = useState([]);
    const [tuesdayTime, setTuesdayTime] = useState([]);
    const [wednsedayTime, setWednsdayTime] = useState([]);
    const [thursedayTime, setThursedayTime] = useState([]);
    const [fridayTime, setFridayTime] = useState([]);
    const [saturdayTime, setSaturdayTime] = useState([]);
    const [sundayTime, setSundayTime] = useState([]);
    const [profilehistory, setProfilehistory] = useState([]);
    //let sundayTime=new Object();
    const [basic, setBasic] = useState(true);
    let next = false;
    let nextwedneday = false;

    // const options = [
    //      "Paris", "Marseille", "Lille", "Lyon",

    // ];

    const [alertShow, setAlertShow] = useState(false);
    const [alertBody, setalertBody] = useState("");

    // useEffect(() => {

    // }, [])

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

    const applyProfessionalProfile = () => {
        const getProfession = {

            "userid": selectUser.user,



        };

        console.log(selectUser.user);

        axios.post('https://peop-backend-app.herokuapp.com/api/professional/getProfession', getProfession, {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
            // console.log("profilehistory "+response.status);
            setProfilehistory(response.data);
            dispatch(loadingVisibility({ visibility: "false" }));
            //  addNotify("Success", JSON.stringify(response));
            setalertBody(JSON.stringify(response));
            setAlertShow(true);
            // setAlertShow(false);
        }).catch(error => {
            // addNotify("Error", JSON.stringify(error));
            console.log(error.response);
            setalertBody(JSON.stringify(error));
            setAlertShow(true);
            // setAlertShow(false);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
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

        // if(currentSelect!==selectId){
        //     times.push(selecttime+",");
        //     tmptime.push(selecttime);
        //     setCurrentSelect(selectId);

        //     const newContact = { // id: nanoid(),
        //         id: selectId,
        //         day: selectday,
        //         available: tmptime
        //     };

        //     const newContacts = [
        //         ...contacts,
        //         newContact
        //     ];
        //     setContacts(newContacts);
        // }else{


        //     times.length=0;
        //     times.push(selecttime+",");


        //     tmptime.push(times);

        //     setCurrentSelect(selectId);

        //     const newContact = { // id: nanoid(),
        //         id: selectId,
        //         day: selectday,
        //         available: tmptime
        //     };

        //     const newContacts = [

        //         newContact
        //     ];
        //     setContacts(newContacts);
        //     //times.push(selecttime+",");

        // }


    }
    const addNotify = (t, e) => {
        store.addNotification({
            title: t,
            message: e,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: [
                "animate__animated", "animate__fadeIn"
            ],
            animationOut: [
                "animate__animated", "animate__fadeOut"
            ],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }
    function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    }

    function update(obj, key, newVal) {
        for (var i in obj) {
            if (typeof obj[i] == 'object') {
                update(obj[i], key, newVal);
            } else if (i === key) {
                obj[i] = newVal;
            }
        }
        return obj;
    }
    const registernewprofession = (e) => {
        e.preventDefault();
        dispatch(loadingVisibility({ visibility: "true" }));

        // var obj = Object.assign(...sundayTime.map(([key, val]) => ({[key]: val})))
        // console.log(obj);
        let sunval = `[` + sundayTime.toString() + `]`;




        //     let object = {...sundayTime};
        const registerProfession = {

            "professionName": details.professionName,
            "description": details.description,
            "chargesperHour": details.chargesperHour,
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
        console.log(JSON.parse('[{"name":"Pizza","price":"10","quantity":"7"}, {"name":"Cerveja","price":"12","quantity":"5"}, {"name":"Hamburguer","price":"10","quantity":"2"}, {"name":"Fraldas","price":"6","quantity":"2"}]'));
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
            console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });


        // dispatch(signedUser({
        //     user:"praneeth"
        // }));


        dispatch(loadingVisibility({ visibility: "false" }));
        // console.log(selectUser);
    }
    const Centerdiv = styled.div`
     margin: auto;
  width: 50%;
   
  padding: 10px;

     `;



    return (
        <div>
            <Headers />
            {/* <Loading /> */}
            <ToastContainer className="p-1" position="top-end">

                <Toast onClose={() => setAlertShow(false)} show={alertShow} delay={3000} autohide>
                    {/* <Toast.Header> */}
                    {/* <img
                   src="holder.js/20x20?text=%20"
                   className="rounded me-2"
                   alt=""
                 /> */}
                    {/* <strong className="me-auto">Error</strong> */}
                    {/* <small>11 mins ago</small> */}
                    {/* </Toast.Header> */}
                    <Toast.Body className="Danger" style={{ color: "black" }}>{alertBody}</Toast.Body>
                </Toast>

            </ToastContainer>
            <Sidebar active="applyprofession" />
            <>

                {profilehistory.length !== 0 ? <ProfileHistory details={profilehistory} /> :
                    <Centerdiv>

                        <form className="login_form"
                            onSubmit={
                                (e) => registernewprofession(e)
                            }>

                            {basic == true ?

                                <div className="mt-5 mb-5">

                                    <div className="form-group">
                                        <label>What is your Profession</label>
                                        <input key="random1" className="form-control" type="text" placeholder="professionName" name="professionName" id="professionName1"
                                            value={details.professionName}
                                            onChange={e => setDetails({ professionName: e.target.value })}


                                        />

                                    </div>

                                    <div className="form-group">
                                        <label>Briefly Describe about it</label>

                                        <input className="form-control" type="text" placeholder="description" name="description" id="description1"
                                            value={
                                                details.description
                                            }
                                            onChange={
                                                (e) => setDetails({
                                                    ...details,
                                                    description: e.target.value
                                                })
                                            }

                                            key="random2"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>How much charge you per hour</label>
                                        <input className="form-control" type="text" placeholder="chargesperHour" name="chargesperHour" id="chargesperHour1"
                                            value={
                                                details.chargesperHour
                                            }
                                            onChange={
                                                (e) => setDetails({
                                                    ...details,
                                                    chargesperHour: e.target.value
                                                })
                                            }
                                            key="random3"
                                        />


                                    </div>
                                    <div className="form-group">
                                        <input type="button" className="btn btn-success" value="Next Step" onClick={() => setBasic(false)} />
                                    </div>
                                </div>
                                :
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
                                    <div className="form-group">


                                        <input type="button" className="btn btn-success" value="Back to basic details" onClick={() => setBasic(true)} />

                                        <button type="submit" className="btn btn-success" onClick={() => applyProfessionalProfile()}>
                                            Apply to Profession
                                        </button>
                                    </div>
                                </div>}




                        </form>
                        {/* <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
        Content here
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup> */}
                    </Centerdiv>
                }
            </>
        </div>
    )
}
