import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../../features/authenticationActivities';
import {viewProfileAs} from '../../../features/profileActivities';
import axios from 'axios';

export const NotificationDropdown =()=> {
 
    const [isOpen,setIsOpen] = React.useState(false);
    const history = useHistory();
    const selectUser=useSelector((state)=>state.authActivity.user)
    const viewUserAs=useSelector((state)=>state.profileActivity.viewas)
    const [profileImg,setProfile]=React.useState('');
    const [bellCount,setBellCount]=useState(0);
    const [message,setMessage]=useState("");

    const  dispatch = useDispatch();
  const handleLogout=()=>{
        dispatch(logout({}));


        
  }
 
  
 
  const handleDashboard=()=>{
    history.push(`/dashboard`)
  }
  const handleView=(type)=>{
       
    dispatch(viewProfileAs({viewas:type}));
  }
    const toggleOpen = () =>{
         setIsOpen(!isOpen);
    }
    const handleNotification=()=>{
        history.push(`/notification`)
      }
  
      useEffect(() => {
      
      }, [])

        const checkNotification=()=>{
        //console.log("sdsd");
           axios.get('https://peop-backend-app.herokuapp.com/api/notification/getLatest', {
             "headers": {
                 'Content-Type': 'application/json',
                 Authorization: 'Bearer ' + localStorage.getItem("token")
             }
         }).then(response => {
           if(typeof response.data !== 'undefined' || response.data.length !== 0 )
           {
             //console.log("resl "+response.data.length);
      setBellCount(response.data.length);
      setMessage(response.data)       
            // setAppointments(response.data);
           }
           //  addNotify("Success", JSON.stringify(response));
         }).catch(error => {
            // addNotify("Error", JSON.stringify(error));
             console.log(error.response);
             // console.log(error.response.status);
             // console.log(error.response.headers);
         });
         
      }
      
      try{
         
        setInterval(async () => {
         // await checkNotification()
      }, 2000);
         }catch(e){
          console.log(e);
         }
      return (
        <div className="col"> 
        <div className="dropdown" onClick={()=>toggleOpen()}>
        <a href="#"   className="icon icon-sm rounded-circle border"><i className="fa fa-bell"></i></a>
                               <span className="badge badge-pill badge-danger notify">{message.length}</span>
          <div className={`dropdown-menu${isOpen ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
          
 

          {message?message.map((d) =>  
            <a class="dropdown-item" href="#" onClick={()=>{ handleNotification()}}>{d.createdAt}<br/>{d.title}</a>
      
          ):<a class="dropdown-item" href="#" onClick={()=>{ handleNotification()}}>No New Notifications Available</a>}
    
          </div>
        </div>

        </div>
      );
    
  }
  