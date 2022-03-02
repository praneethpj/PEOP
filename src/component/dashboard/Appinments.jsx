import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import Headers from '../Home-Page/Header';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Sidebar from './Side-bar';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import styled from 'styled-components';
import {viewProfileAs} from '../../features/profileActivities';
 

export default function Dashboard() {
    const selectUser=useSelector((state)=>state.authActivity.user)
    const history=useHistory();
    const [appointments,setAppointments]=React.useState([]);
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
        const getProfession = {

            "userid": selectUser.user,
        
            
        
            };

            console.log(selectUser.user);

            

        await axios.post('http://localhost:5000/api/professional/getAllAppoinmentsByProfessionId', getProfession, {
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

    useEffect(() => {
        getAppointments();
    }, [])//appointments
 


const appoinmentAction= async(id,state,timeid)=>{
const data = {

            "id": id,
            "status":state,
            "timeid":timeid
        
            };

  await axios.put('http://localhost:5000/api/professional/updatePaymentSheduled', data, {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
          if(typeof response.data !== 'undefined' || response.data.length !== 0 )
          {
            getAppointments();
            console.log("res "+JSON.stringify(response.data));
           
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
        <Headers/>
        <Sidebar active="dashboard"/>
        <div>
        <div>
       {appointments.length !==0 ?
              
             
        <Centerdiv>
    
    {viewUserAs.viewas==="2" ?
    <div>
             <h4>Please Take Action on Available Appointments</h4>
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
                    <td><button onClick={(id,state,timeid)=>appoinmentAction(name.id,1,name.timeid)} className="btn btn-success">Accept</button><button className="btn btn-danger"  onClick={(id,state,timeid)=>appoinmentAction(name.id,99,name.timeid)}>Reject</button></td>
                   </tr>
               )}
             
             </tbody>
           </Table>
          </div>
           : <div>
           <h4>My Available Appointments</h4>
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
                  <td><span  >Accepted</span></td>
                 </tr>
             )}
           
           </tbody>
         </Table>
        </div>}
        </Centerdiv>
          : <Centerdiv> <div class="jumbotron"><h1 class="display-6">New Appointments not Available !</h1> 
          
          <p class="lead">Once a appointaments recived we will let you know soon as possible</p>
          </div> </Centerdiv>
              }
</div>
        </div>

        </>
    )
              
}
