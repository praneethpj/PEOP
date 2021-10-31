import React, {useState} from 'react'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import Headers from '../Home-Page/Header'
import Sidebar from './Side-bar'
import axios from 'axios';
import {loadingVisibility} from '../../features/configurationsActivity';
import {store} from 'react-notifications-component';
import styled from 'styled-components'
import {InputTags} from 'react-bootstrap-tagsinput'
import moment from 'moment';
import Loading from '../Home-Page/Loading';

export default function ApplyProfession() {
    const [details, setDetails] = useState({professionName: "", description: "", chargesperHour: ""})
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
    let next = false;
    let nextwedneday = false;

    // const options = [
    //      "Paris", "Marseille", "Lille", "Lyon",

    // ];

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
            sundayTime.push("{time:"+selecttime + "availability:true},");

            // setSundayTime(...sundayTime,selecttime)
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
            mondayTime.push("{time:"+selecttime + "availability:true},");

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
            tuesdayTime.push(selecttime + ",");

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

            wednsedayTime.push(selecttime + ",");
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
            thursedayTime.push(selecttime + ",");

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
            fridayTime.push(selecttime + ",");

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
            saturdayTime.push(selecttime + ",");

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
    const registernewprofession = (e) => {
        e.preventDefault();
        dispatch(loadingVisibility({visibility: "true"}));

        
        delete sundayTime.keyname;
        const registerProfession = {

            "professionName": details.professionName,
            "description": details.description,
            "chargesperHour": details.chargesperHour,
            "timeSlot": [{

                "timeSlot": [
                    {
                        "dayname": "0",
                        "times": toObject(sundayTime),
                        "available": "true"
                    },
                    // {
                    //     "dayname": "1",
                    //     "times": toObject(mondayTime),
                    //     "available": "true"
                    // },
                    // {
                    //     "dayname": "2",
                    //     "times": tuesdayTime,
                    //     "available": "true"
                    // },
                    // {
                    //     "dayname": "3",
                    //     "times": wednsedayTime,
                    //     "available": "true"
                    // }, {
                    //     "dayname": "4",
                    //     "times": thursedayTime,
                    //     "available": "true"
                    // }, {
                    //     "dayname": "5",
                    //     "times": fridayTime,
                    //     "available": "true"
                    // }, {
                    //     "dayname": "6",
                    //     "times": saturdayTime,
                    //     "available": "true"
                    // }

                ]
            }]
        };

        delete registerProfession.keyname;

        axios.post('http://localhost:5000/api/professional/addProfession', registerProfession, {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
            addNotify("Success", JSON.stringify(response.data.message));
        }).catch(error => {
            addNotify("Error", JSON.stringify(error.response.data.message));
            console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });


        // dispatch(signedUser({
        //     user:"praneeth"
        // }));


        dispatch(loadingVisibility({visibility: "false"}));
        // console.log(selectUser);
    }
    const Centerdiv = styled.div `
     margin: auto;
  width: 50%;
   
  padding: 10px;

     `;

    return (
        <div>
            <Headers/>
            <Loading/>
            <Sidebar active="applyprofession"/>
            <>


                <Centerdiv>
                    <form className="login_form"
                        onSubmit={
                            (e) => registernewprofession(e)
                    }>
                        <input className="form-control" type="text" placeholder="professionName" name="professionName"
                            value={
                                details.professionName
                            }
                            onChange={
                                (e) => setDetails({
                                    ...details,
                                    professionName: e.target.value
                                })
                            }/>
                        <input className="form-control" type="text" placeholder="description" name="description" id="description"
                            value={
                                details.description
                            }
                            onChange={
                                (e) => setDetails({
                                    ...details,
                                    description: e.target.value
                                })
                            }/>
                        <input className="form-control" type="text" placeholder="chargesperHour" name="chargesperHour" id="chargesperHour"
                            value={
                                details.chargesperHour
                            }
                            onChange={
                                (e) => setDetails({
                                    ...details,
                                    chargesperHour: e.target.value
                                })
                            }/>


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


                        <div>
                            <input type="radio" value="5" name="gender" id="5"
                                checked={
                                    timegap === "5"
                                }
                                onChange={changeTimegap}/>
                            5 Minitues
                            <br/>
                            <input type="radio" value="10" name="gender" id="10"
                                checked={
                                    timegap === "10"
                                }
                                onChange={changeTimegap}/>
                            10 Minitues
                            <br/>
                            <input type="radio" value="15" name="gender"
                                checked={
                                    timegap === "15"
                                }
                                onChange={changeTimegap}/>
                            15 Minitues
                            <br/>
                            <input type="radio" value="20" name="gender"
                                checked={
                                    timegap === "20"
                                }
                                onChange={changeTimegap}/>
                            20 Minitues
                            <br/>
                            <input type="radio" value="30" name="gender"
                                checked={
                                    timegap === "30"
                                }
                                onChange={changeTimegap}/>
                            30 Minitues
                            <br/>
                            <input type="radio" value="40" name="gender"
                                checked={
                                    timegap === "40"
                                }
                                onChange={changeTimegap}/>
                            40 Minitues
                            <br/>
                            <input type="radio" value="60" name="gender"
                                checked={
                                    timegap === "60"
                                }
                                onChange={changeTimegap}/>
                            60 Minitues
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
                        <button type="button" className="btn btn-success"
                            onClick={handleTimes}>
                            Add
                        </button>
                        {/* <input className="form-control" type="text" disabled placeholder="" name="times"
                            value={times}
                            onChange={setTimes}/> */}
                        <table>
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
                                        <td><input type="button" value="delete"/></td>
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
                                        <td><input type="button" value="delete"/></td>
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
                                        <td><input type="button" value="delete"/></td>
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
                                        <td><input type="button" value="delete"/></td>
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
                                        <td><input type="button" value="delete"/></td>
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
                                        <td><input type="button" value="delete"/></td>
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
                                        <td><input type="button" value="delete"/></td>
                                    </tr>
                                ))
                            } </tbody>
                        </table>

                        <button type="submit" className="btn btn-success" >
                            Submit
                        </button>
                    </form>
                </Centerdiv>
            </>
        </div>
    )
}
