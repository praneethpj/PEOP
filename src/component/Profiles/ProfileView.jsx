
import React, { useEffect, useState } from 'react'
import Headers from '../Home-Page/Header'
import queryString from 'query-string';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@restart/ui/esm/Button';
import Select from 'react-select'
import PaymentPay from './PaymentPay';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Loading from '../Home-Page/Loading';
import { useDispatch } from 'react-redux';
import { loadingVisibility } from '../../features/configurationsActivity';
import './Profile.css'
import { Breadcrumb } from 'react-bootstrap';

export default function ProfileView() {

    const [date, setDate] = useState(new Date());
    const [time, SetTime] = useState("");
    const [loading, setLoading] = useState(true);
    const [submit, setSubmit] = useState(false)
    const [submitData, setSubmitData] = useState();
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [avtime, setAvtime] = useState(false);

    const selectUser = useSelector((state) => state.userActivity.value)
    const loggeduser = useSelector((state) => state.authActivity.user)
    console.log("userid " + selectUser.userid);

    const dispatch = useDispatch();

    useEffect(async () => {
        //getAllData();
        setLoading(true);
        dispatch(loadingVisibility({ visibility: "true" }));


        let result = await fetch(process.env.REACT_APP_BACKEND_URL+"api/professional/get/" + selectUser.userid);

        result = await result.json();
        setData(result);
        dispatch(loadingVisibility({ visibility: "false" }));
        setLoading(false);
    }, [])

    const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;

    const ProfileImage = styled.img`
  src: url('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
  `;

    const paymentBtnHandler = () => {
        setLoading(true);
        dispatch(loadingVisibility({ visibility: "true" }));

        // alert(id+ " "+time.value);
        let modify = moment(date).format("DD/MM/YYYY")
        setSubmitData({ "pid": id, "date": modify, "timeid": time.value, "time": time.label, "uid": data.uid, "name": data.name })
        setSubmit(true);

        dispatch(loadingVisibility({ visibility: "false" }));
        setLoading(false);
        // let path = `/payment`; 
        // history.push(path);
    }

    const dateChange = (date) => {
        setDate(date);

        // console.log(date.getDay());
        try {
            setLoading(true);
            dispatch(loadingVisibility({ visibility: "true" }));
            let time = data.timeSlot.timeSlot[date.getDay()].times;

            let dec = time;
            console.log(dec)
            let val = [];
            val.push({ "value": "Select Time", "label": "Select Time" });
            dec.map((e) => {
                console.log(e.time + " " + e.availability)
                if (e.availability == true) {
                    val.push({ "value": e.id, "label": e.time })
                } else {
                    val.push({ "value": e.id, "label": e.time, "disabled": "true" })
                }
                //  val.push({"value":dec[i],"label":dec[i]})
            })
            // for(var i = 0; i < dec.length; i++) {

            //    // setOptions({"value":dec[i],"label":dec[i]})
            //    //var hour=dec[i];
            //    //console.log(dec[i])




            // }
            setOptions([...val

            ]);
            setAvtime(true);
            dispatch(loadingVisibility({ visibility: "false" }));
            setLoading(false);
        } catch (v) {
            setAvtime(false);
            setOptions({ "value": "Not Available", "label": "Not Available" })
            console.log(v)
        }

        // setOptions({value:date.})
        // data.timeSlot.timeSlot.map((d)=>
        // console.log(d)
        // //setOptions({value:d.times,label:d.times})
        // );
    }

    const makeCall = () => {
        let path = `/makecall/${id}`;
        history.push(path);
    }

    const showUserLogin = () => {

        history.push('/signin');
    }
    const showUserSignup = () => {

        history.push('/signup');
    }
    // const options = [
    //     { value: '8.00', label: '8.00',disabled: true },
    //     { value: '10.00', label: '10.00' },
    //     { value: '12.00', label: '12.00' }
    //   ]

    return (
        <>

            <Headers />

            <Loading />

            {!loading ?
                <div className >


                    {!submit ?



                        <div className='container mt-5' >
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item >
                                    Profile
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="row ">
                                <div className="col-5 product-border ">
                                    <img

                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        style={{ border: "1px solid rgba(0,0,0,.125)", height: "80%" }}
                                        src={data.ProfileImage != null ? "/assets/profileImg/" + data.id + ".png" : "https://i.pinimg.com/474x/8c/70/8b/8c708b478e0e71f7599b75b9cc108ddf.jpg"}

                                    /></div>
                                <div className="col-5 bar">

                                    <div className="col">
                                        <div>
                                            <h3 className="small-title">Hi I am,</h3><div className="large-title">{data.name}</div><h3 className="small-title"><br></br>My Profession is </h3><h2> {data.profession_name}</h2>
                                            <section className="small-title">
                                                {data.description}
                                            </section>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="mt-2">
                                        Choose a  date
                                        <DatePicker className="form-control" selected={date} onChange={date => dateChange(date)} />
                                    </div>
                                    <br></br>
                                    {avtime == true ?
                                        <div className="mt-2">
                                            Choose a time slot
                                            <Select options={options} isOptionDisabled={(option) => option.disabled} onChange={t => SetTime(t)} />
                                        </div>
                                        : "Please Select another date"}
                                    <div className='mt-5'>
                                        {((localStorage.getItem("token") != null) && (loggeduser != null)) ?
                                            <Button className="btn-lg btn-danger btn-block" onClick={() => paymentBtnHandler()}>Make a schedule</Button>
                                            : <div>  <Button className="btn btn-success" onClick={() => showUserLogin()}>Login</Button> <Button className="btn btn-success" onClick={() => showUserSignup()}>Sign up</Button></div>}
                                        {/* <Button className="btn btn-danger" onClick={()=>makeCall()}>Call Now</Button> */}
                                    </div>
                                </div>
                            </div>


                        </div>

                        :
                        <PaymentPay Submitdata={submitData} />
                    }
                </div>
                : <div>
                    s
                    </div>}
        </>
    )
}
