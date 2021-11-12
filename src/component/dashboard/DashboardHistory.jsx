 
import Headers from '../Home-Page/Header'
 
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
 
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Sidebar from './Side-bar';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import styled from 'styled-components';
import {viewProfileAs} from '../../features/profileActivities';

export default function DashboardHistory() {

     const selectUser=useSelector((state)=>state.authActivity.user)
    const history=useHistory();
    const [appointments,setAppointments]=React.useState([]);
      const [appointmentsuser,setAppointmentsUser]=React.useState([]);
    const viewUserAs=useSelector((state)=>state.profileActivity.viewas)

    const Centerdiv = styled.div `
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;
      useEffect(() => {
        if(selectUser==null){
            history.push(`/signin`);
        }
    }, [selectUser])

    const getAppointments= async ()=>{
      

        await axios.get('http://localhost:5000/api/professional/getAllUpdatedAppoinmentsByProfession', {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
          if(typeof response.data !== 'undefined' || response.data.length !== 0 )
          {
            console.log("res "+JSON.stringify(response.data));
            setAppointments(response.data);
          }
          //  addNotify("Success", JSON.stringify(response));
        }).catch(error => {
           // addNotify("Error", JSON.stringify(error));
            console.log(error.response);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
    }

    const getAppointmentsUser= async ()=>{
      

        await axios.get('http://localhost:5000/api/professional/getAllUpdatedAppoinmentsByUser', {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
          if(typeof response.data !== 'undefined' || response.data.length !== 0 )
          {
            console.log("res "+JSON.stringify(response.data));
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
        getAppointments();
        getAppointmentsUser();
    }, [])//appointments
 

 
 
  return (
        <>
        <Headers/>
        <Sidebar active="history"/>
        <div>
       {true?
              
             
        <Centerdiv>
    
    {viewUserAs.viewas==="2"?
    <div>
             <h4> Updated Appointments Status</h4>
        <Table stripped bordered hover size="sm"  >
            <thead>
    <tr>
      {/* <th>#</th> */}
        
      <th>UserId</th>
      <th>SheduledDate</th>
      <th>Time</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
      
      
               {appointments.map((name)=>
               <tr key={name.id}>
                    <td>{name.userId}</td>
                    <td>{name.sheduledDate}</td>
                    <td>{name.time}</td>
               
                    <td>{name.status===1?"Success":name.status===99?"Rejected":"Not Confirmed"}</td>
                   </tr>
               )}
             
             </tbody>
           </Table>
          </div>
           : <div>
           <h4>My Appointments Status</h4>
      <Table stripped bordered hover size="sm"  >
          <thead>
  <tr>
    {/* <th>#</th> */}
      
    <th>UserId</th>
    <th>SheduledDate</th>
    <th>Time</th>
    <th>Status</th>
  </tr>
</thead>

<tbody>
    
             {appointmentsuser.map((name)=>
             <tr key={name.id}>
                  <td>{name.userId}</td>
                  <td>{name.sheduledDate}</td>
                  <td>{name.time}</td>
                  <td>{name.status===1?"Success":name.status===99?"Rejected":"Not Confirmed"}</td>
                 </tr>
             )}
           
           </tbody>
         </Table>
        </div>}
        </Centerdiv>
          :"No Data Available"
              }
        </div>

        </>
    )
}
