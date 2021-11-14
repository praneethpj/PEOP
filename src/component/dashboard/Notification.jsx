 
import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

import Headers from '../Home-Page/Header';
 
import Sidebar from './Side-bar';

const SOCKET_URL = 'http://localhost:5000/ws-message';
export default function Notification() {
    const [message, setMessage] = useState('You server message here.');

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

    return (
         <div>
          <Headers/>
        <Sidebar active="notification"/>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
      
    </div>
    )
}
