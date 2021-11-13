import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
 
import VideoCallMain from '../VideoCallMain';
import { useSelector,useDispatch } from 'react-redux';
import {setCalldetails} from '../../../features/readyCallActivities';

export function VideoCallMainPage () {
  const selectUser=useSelector((state)=>state.userActivity.value);
   const callActivity=useSelector((state)=>state.readyCallActivities.value)
  
    // this.defaultRoomId = String(new Date() - new Date().setHours(0, 0, 0, 0));
    // this.state = { roomId: this.defaultRoomId };
//   this.handleChange = this.handleChange.bind(this);
    console.log("userid "+selectUser.userid);
   const  dispatch = useDispatch();
  
  const handleChange=()=>{
//    this.setState({ roomId: e.target.value });
  dispatch(setCalldetails({status:true}));
  console.log("call act"+callActivity)
  }
 
    return (
      <VideoCallMain
        defaultRoomId={selectUser.userid}
        roomId={callActivity.roomid}
        username={callActivity.username}
    
      />
    );
  }
 

VideoCallMainPage.contextTypes = {
  router: PropTypes.object
};

 