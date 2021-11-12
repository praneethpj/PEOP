import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
 
import VideoCallMain from '../VideoCallMain';
import { useSelector } from 'react-redux';

export function VideoCallMainPage () {
  const selectUser=useSelector((state)=>state.userActivity.value);
   const callActivity=useSelector((state)=>state.readyCallActivities.value)
  console.log("userid "+selectUser.userid);
   
    // this.defaultRoomId = String(new Date() - new Date().setHours(0, 0, 0, 0));
    // this.state = { roomId: this.defaultRoomId };
//   this.handleChange = this.handleChange.bind(this);
    
  
  const handleChange=(e)=>{
//    this.setState({ roomId: e.target.value });
  }
 
    return (
      <VideoCallMain
        defaultRoomId={selectUser.userid}
        roomId={callActivity.roomid}
        username={callActivity.username}
        // handleChange={()=>this.handleChange}
      />
    );
  }
 

VideoCallMainPage.contextTypes = {
  router: PropTypes.object
};

 