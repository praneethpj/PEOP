import React from 'react'
import { useHistory } from 'react-router';
import './Dashboard.css';


export default function Sidebar(props) {
  const history = useHistory();


  const handleDashboard = () => {
    history.push(`/dashboard`)
  }
  const handleHistory = () => {
    history.push(`/history`)
  }
  const handleProfile = () => {
    history.push(`/profile`)
  }
  const handleApplyProfile = () => {
    history.push(`/applyprofession`)
  }
  const handleCalls = () => {
    history.push(`/calls`)
  }
  const handleNotifications = () => {
    history.push(`/notification`)
  }
  const handleEditprofile = () => {
    history.push(`/editprofile`)
  }
  const handleTest = () => {
    history.push(`/profession`)
  }
  //     {if(viewUserAs.viewas=="1"){
  //       return (
  //         <div>
  //                  <div class="sidebar">

  //   <a   class={props.active=="history"?"active":""}  onClick={()=>handleHistory()}>Appoinments History</a>
  //   <a   class={props.active=="profile"?"active":""}  onClick={()=>handleProfile()}>Payments</a>
  //   <a   class={props.active=="profile"?"active":""}  onClick={()=>handleProfile()}>My Profile</a>
  //   <a   class={props.active=="applyprofession"?"active":""}  onClick={()=>handleApplyProfile()}>Apply Profession</a>
  //   {/* <a href="#profile">My Profile</a> */}
  // </div> 
  //         </div>
  //     )
  //     }}
  return (
    <div>
      <div class="sidebar">
        <a class={props.active == "dashboard" ? "active" : ""} onClick={() => handleDashboard()}>Appoinments</a>
        <a class={props.active == "calls" ? "active" : ""} onClick={() => handleCalls()}>Calls</a>
        <a class={props.active == "history" ? "active" : ""} onClick={() => handleHistory()}>History</a>
        <a class={props.active == "notification" ? "active" : ""} onClick={() => handleNotifications()}>My Notification</a>
        <a class={props.active == "profile" ? "active" : ""} onClick={() => handleProfile()}>My Profile</a>
        <a class={props.active == "editprofile" ? "active" : ""} onClick={() => handleEditprofile()}>Edit Profile</a>
        <a class={props.active == "applyprofession" ? "active" : ""} onClick={() => handleApplyProfile()}>Profession</a>
        <a class={props.active == "profession" ? "active" : ""} onClick={() => handleTest()}>Test fun</a>
        {/* <a href="#profile">My Profile</a> */}
      </div>
    </div>
  )
}
