import React, { useState } from 'react'
import { useHistory } from 'react-router';
import './Dashboard.css';
import * as FaIcons from 'react-icons/fa';
import * as SimpleIcons from 'react-icons/si'
import * as Ionic5 from 'react-icons/io5'
import * as MaterialIcons from 'react-icons/md'
import * as BootsrapIcon from 'react-icons/bs'
import * as Antdesign from 'react-icons/ai'
import * as Vsicon from 'react-icons/vsc'
import { Card, Collapse } from 'react-bootstrap';


export default function Sidebar(props) {
  const history = useHistory();

  const [barActive, setBarActive] = useState(false);
  const [open, setOpen] = useState(true);

  const setBarState = () => {
    console.log(barActive)
    setBarActive(!barActive)
  }

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
      {/* <div className='barState'

        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>
          <div style={{width:"100%",height:"100%",cursor:'pointer'}}>
          <FaIcons.FaBars  style={{width:"2%",height:"2%"}}></FaIcons.FaBars>
          </div>
      

      </div> */}
      <div  >
        
          <div  >
          
            <div class="sidebar">
              <a class={props.active == "dashboard" ? "active" : ""} onClick={() => handleDashboard()}><SimpleIcons.SiGotomeeting></SimpleIcons.SiGotomeeting> Appoinments</a>
              <a class={props.active == "calls" ? "active" : ""} onClick={() => handleCalls()}><Ionic5.IoCallSharp></Ionic5.IoCallSharp> Calls</a>
              <a class={props.active == "history" ? "active" : ""} onClick={() => handleHistory()}><BootsrapIcon.BsClockHistory></BootsrapIcon.BsClockHistory> History</a>
              <a class={props.active == "notification" ? "active" : ""} onClick={() => handleNotifications()}><Ionic5.IoNotificationsOutline></Ionic5.IoNotificationsOutline> My Notification</a>
              <a class={props.active == "profile" ? "active" : ""} onClick={() => handleProfile()}><Antdesign.AiOutlineProfile></Antdesign.AiOutlineProfile> My Profile</a>
              {/* <a class={props.active == "editprofile" ? "active" : ""} onClick={() => handleEditprofile()}> Edit Profile</a> */}
              {/* <a class={props.active == "applyprofession" ? "active" : ""} onClick={() => handleApplyProfile()}><Vsicon.VscTypeHierarchy></Vsicon.VscTypeHierarchy> Profession</a> */}
              <a class={props.active == "profession" ? "active" : ""} onClick={() => handleTest()}><Vsicon.VscTypeHierarchy></Vsicon.VscTypeHierarchy> Profession</a>
              {/* <a href="#profile">My Profile</a> */}
            </div>
          
          </div>
  
      </div>
    </div>
  )
}
