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
            console.log(response.data);
            setAppointments(response.data);
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
 


 
  



    return (
        <>
        <Headers/>
        <Sidebar active="dashboard"/>
        <div>
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
                    <td><button className="btn btn-danger">Accept</button></td>
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
        </div>

        </>
    )
              
}
