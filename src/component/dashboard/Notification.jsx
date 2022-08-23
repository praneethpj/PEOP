 
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';

import Headers from '../Home-Page/Header';
 
import Sidebar from './Side-bar';
import '../../styles/Notification.css'

const SOCKET_URL = 'http://localhost:5000';
export default function Notification() {
    const [message, setMessage] = useState('You server message here.');
    const loggeduser=useSelector((state)=>state.authActivity.user)
    console.log("user "+loggeduser.user);

  let onConnected = () => {
    console.log("Connected!!");
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

    return (
         <div>
          <Headers/>
        <Sidebar active="notification"/>
      {/* <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/messages/'+loggeduser]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      /> */}
      <div className='main-header'>{message}</div>
      
    </div>
    )
}
