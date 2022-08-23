import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import Headers from '../Home-Page/Header';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Sidebar from './Side-bar';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import styled from 'styled-components';
import { viewProfileAs } from '../../features/profileActivities';
import { setCalldetails } from '../../features/readyCallActivities';

export default function NextCalls() {
  const selectUser = useSelector((state) => state.authActivity.user)
  const history = useHistory();
  const [appointmentsuser, setAppointmentsUser] = React.useState([]);
  const [appointmentsprofession, setAppointmentsProfessions] = React.useState([]);
  const viewUserAs = useSelector((state) => state.profileActivity.viewas)
  const callActivity = useSelector((state) => state.readyCallActivities.value)
  const dispatch = useDispatch();
  console.log("call act " + callActivity.roomstatus)
  const Centerdiv = styled.div`
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;
  useEffect(() => {
    if (selectUser == null) {
      history.push(`/signin`);
    }
  }, [selectUser]);


  const makeCall = (id, name) => {
    dispatch(setCalldetails({ roomid: id, username: name, roomstatus: "false" }));
    console.log("call act " + callActivity.roomstatus)
    let path = `/makecall`;
    history.push(path);
  }


  const getAppointmentsProfessions = async () => {
    const getProfession = {

      "userid": selectUser.user,



    };

    console.log("user " + selectUser.user);


//set room id here
    await axios.post(process.env.REACT_APP_BACKEND_URL+'api/professional/getAllAvailableAppoinmentsByProfessionId', getProfession, {
      "headers": {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      if (typeof response.data !== 'undefined' || response.data.length !== 0) {
        console.log("res " + JSON.stringify(response.data));
        setAppointmentsProfessions(response.data);
      }
      //  addNotify("Success", JSON.stringify(response));
    }).catch(error => {
      // addNotify("Error", JSON.stringify(error));
      console.log(error.response);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    });
  }

  const getAppointmentsUser = async () => {




    await axios.get(process.env.REACT_APP_BACKEND_URL+'api/professional/getAllAvailableAppoinmentsByUserId', {
      "headers": {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      if (typeof response.data !== 'undefined' || response.data.length !== 0) {
        console.log("res " + JSON.stringify(response.data));
        setAppointmentsUser(response.data);
      }
      //  addNotify("Success", JSON.stringify(response));
    }).catch(error => {
      // addNotify("Error", JSON.stringify(error));
      console.log(error.response);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    });
  }



  useEffect(() => {
    getAppointmentsUser();
    getAppointmentsProfessions();
  }, [])//appointments



  const appoinmentAction = async (id, state, timeid) => {
    const data = {

      "id": id,
      "status": state,
      "timeid": timeid

    };

    await axios.put(process.env.REACT_APP_BACKEND_URL+'api/professional/updatePaymentSheduled', data, {
      "headers": {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      if (typeof response.data !== 'undefined' || response.data.length !== 0) {
        // getAppointments();
        console.log("res " + JSON.stringify(response.data));

      }
      //  addNotify("Success", JSON.stringify(response));
    }).catch(error => {
      // addNotify("Error", JSON.stringify(error));
      console.log(error.response);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    });
  }





  return (
    <>
      <Headers />
      <Sidebar active="calls" />
      <div>
        {true ?


          <Centerdiv>

            {viewUserAs.viewas === "2" ?
              appointmentsprofession.length > 0 ?
                <div>
                  <h1 class="display-6">Your Next Appointments</h1>
                  <Table stripped bordered hover size="sm"  >
                    <thead>
                      <tr>
                        {/* <th>#</th> */}

                        <th>Name</th>
                        <th>SheduledDate</th>
                        <th>Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>


                      {appointmentsprofession.map((name) =>
                        <tr key={name.id}>
                          <td>{name.name}</td>
                          <td>{name.sheduledDate}</td>
                          <td>{name.time}</td>
                          <td><button onClick={() => makeCall(name.id, name.name)} className="btn btn-success">Start</button></td>
                        </tr>
                      )}

                    </tbody>
                  </Table>
                </div>
                : <div class="jumbotron"><h1 class="display-6">New Calles not Available !</h1>

                </div>
              : appointmentsuser.length > 0 ? <div>
                <h1 class="display-6">My Available Appointments</h1>
                <Table stripped bordered hover size="sm"  >
                  <thead>
                    <tr>
                      {/* <th>#</th> */}

                      <th>Name</th>
                      <th>SheduledDate</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {appointmentsuser.map((name) =>
                      <tr key={name.id}>
                        <td>{name.name}</td>
                        <td>{name.sheduledDate}</td>
                        <td>{name.time}</td>
                        <td>{name.callStatus == "1" ? <button onClick={() => makeCall(name.id, name.name)} className="btn btn-success">Join</button> : "Not Started Yet"}</td>

                      </tr>
                    )}

                  </tbody>
                </Table>
              </div> : <div class="jumbotron"><h1 class="display-6">New Calles not Available !</h1>

                <p class="lead">Once a appointaments recived we will let you know soon as possible</p>
              </div>}
          </Centerdiv>
          : "No Data Available"
        }
      </div>

    </>
  )

}