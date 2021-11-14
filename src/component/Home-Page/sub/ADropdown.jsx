import React,{useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../../features/authenticationActivities';
import {viewProfileAs} from '../../../features/profileActivities';
import axios from 'axios';

export const ADropdown =()=> {
 
    const [isOpen,setIsOpen] = React.useState(false);
    const history = useHistory();
    const selectUser=useSelector((state)=>state.authActivity.user)
    const viewUserAs=useSelector((state)=>state.profileActivity.viewas)
    const [profileImg,setProfile]=React.useState('');


    const  dispatch = useDispatch();
  const handleLogout=()=>{
        dispatch(logout({}));


        
  }
  useEffect(() => {
    loadProfileImg();
  })

  const loadProfileImg=async()=>{
    
        

            

        await axios.get('http://localhost:5000/api/profile/'+selectUser.user, {
            "headers": {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(response => {
          if(typeof response.data !== 'undefined' || response.data.length !== 0 )
          {
            let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
            setProfile(response.data);
            console.log("profile "+profileImg);
            //setAppointments(response.data);
          }
          //  addNotify("Success", JSON.stringify(response));
        }).catch(error => {
           // addNotify("Error", JSON.stringify(error));
            console.log(error);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        });
  
  };
 
  const handleDashboard=()=>{
    history.push(`/dashboard`)
  }
  const handleView=(type)=>{
       
    dispatch(viewProfileAs({viewas:type}));
  }
    const toggleOpen = () =>{
         setIsOpen(!isOpen);
    }
  
  
      
      return (
        <div> 
        <div className="dropdown" onClick={()=>toggleOpen()}>
          <img
            className="icon icon-sm rounded-circle border"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            src={ "/assets/profileImg/"+profileImg ||"https://i.pinimg.com/474x/8c/70/8b/8c708b478e0e71f7599b75b9cc108ddf.jpg"}  
           
           />
          <div className={`dropdown-menu${isOpen ? " show" : ""}`} aria-labelledby="dropdownMenuButton">
          
            <a class="dropdown-item" href="#" onClick={()=>{ handleDashboard()}}>Dashboard</a>
     {viewUserAs.viewas=="1"?     <a class="dropdown-item" href="#"  onClick={()=>{handleView("2")}}>View as Professional</a>:    
                           <a class="dropdown-item" href="#"  onClick={()=>{handleView("1")}}>View as User</a>}
    <a class="dropdown-item" href="#" onClick={()=>{handleLogout()}}>Log out</a>
    
          </div>
        </div>

        </div>
      );
    
  }
  