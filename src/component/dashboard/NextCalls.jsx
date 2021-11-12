import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import Headers from '../Home-Page/Header';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Sidebar from './Side-bar';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import styled from 'styled-components';
import {viewProfileAs} from '../../features/profileActivities';
import {setCalldetails} from '../../features/readyCallActivities';

export default function NextCalls() {
      const selectUser=useSelector((state)=>state.authActivity.user)
    const history=useHistory();
    const [appointmentsuser,setAppointmentsUser]=React.useState([]);
     const [appointmentsprofession,setAppointmentsProfessions]=React.useState([]);
    const viewUserAs=useSelector((state)=>state.profileActivity.viewas)
      const callActivity=useSelector((state)=>state.readyCallActivities.value)
   const  dispatch = useDispatch();

      const Centerdiv = styled.div `
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;
      useEffect(() => {
        if(selectUser==null){
            history.push(`/signin`);
        }
    }, [selectUser]);


const makeCall=(id,name)=>{
  dispatch(setCalldetails({roomid:id,username:name}))
    let path = `/makecall`; 
    history.push(path);
}


     const getAppointmentsProfessions= async ()=>{
        const getProfession = {

            "userid": selectUser.user,
        
            
        
            };

            console.log(selectUser.user);

            

        await axios.post('http://localhost:5000/api/professional/getAllAvailableAppoinmentsByProfessionId',getProfession, {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
          if(typeof response.data !== 'undefined' || response.data.length !== 0 )
          {
            console.log("res "+JSON.stringify(response.data));
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

    const getAppointmentsUser= async ()=>{
       

            

        await axios.get('http://localhost:5000/api/professional/getAllAvailableAppoinmentsByUserId', {
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
        getAppointmentsUser();
        getAppointmentsProfessions();
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
           // getAppointments();
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
        <Sidebar active="calls"/>
        <div>
       {true?
              
             
        <Centerdiv>
    
    {viewUserAs.viewas==="2" ?
    <div>
             <h4>Your Next Appointments</h4>
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
      
      
               {appointmentsprofession.map((name)=>
               <tr key={name.id}>
                    <td>{name.name}</td>
                    <td>{name.sheduledDate}</td>
                    <td>{name.time}</td>
                    <td><button onClick={()=>makeCall(name.id,name.name)} className="btn btn-success">Join</button></td>
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
      
     <th>Name</th>
    <th>SheduledDate</th>
    <th>Time</th>
    <th>Status</th>
  </tr>
</thead>

<tbody>
    
             {appointmentsuser.map((name)=>
             <tr key={name.id}>
                  <td>{name.name}</td>
                  <td>{name.sheduledDate}</td>
                  <td>{name.time}</td>
                <td><button onClick={()=>makeCall(name.id,name.name)} className="btn btn-success">Join</button></td>

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