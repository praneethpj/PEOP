import React from 'react'
import { useHistory } from 'react-router';
import'./Dashboard.css';

export default function Sidebar(props) {
    const history = useHistory();
    const handleDashboard=()=>{
        history.push(`/dashboard`)
      }
      const handleHistory=()=>{
        history.push(`/history`)
      }
      const handleProfile=()=>{
        history.push(`/profile`)
      }
      const handleApplyProfile=()=>{
        history.push(`/applyprofession`)
      }
    return (
        <div>
                 <div class="sidebar">
  <a class={props.active=="dashboard"?"active":""} onClick={()=>handleDashboard()}>Appoinments</a>
  <a   class={props.active=="history"?"active":""}  onClick={()=>handleHistory()}>History</a>
  <a   class={props.active=="profile"?"active":""}  onClick={()=>handleProfile()}>My Profile</a>
  <a   class={props.active=="applyprofession"?"active":""}  onClick={()=>handleApplyProfile()}>Apply Profession</a>
  {/* <a href="#profile">My Profile</a> */}
</div> 
        </div>
    )
}
