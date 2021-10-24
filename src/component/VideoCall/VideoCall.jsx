 
// import React, { useEffect, useState, useRef } from 'react';
 
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import styled from "styled-components";
// import axios from 'axios';
// import { useParams } from 'react-router';

// const Container = styled.div`
//   height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

// const Row = styled.div`
//   display: flex;
//   width: 100%;
// `;

// const Video = styled.video`
//   border: 1px solid blue;
//   width: 50%;
//   height: 50%;
// `;


// export default function VideoCall(props) {
//     const [yourID, setYourID] = useState("");
//     const [users, setUsers] = useState({});
//     const [stream, setStream] = useState();
//     const [receivingCall, setReceivingCall] = useState(false);
//     const [caller, setCaller] = useState("");
//     const [callerSignal, setCallerSignal] = useState();
//     const [callAccepted, setCallAccepted] = useState(false);
  
//     const userVideo = useRef();
//     const partnerVideo = useRef();
//     const socket = useRef();
    
//     const { id } = useParams();
    
//     useEffect(() => {
//         let myid=2;
//         let axiosConfig = {
//             headers: {
//                 'Content-Type': 'application/json;charset=UTF-8',
//                 "Access-Control-Allow-Origin": "*",
//             }
//           };
//         const article = { title: 'React POST Request Example' };
//         axios.post(`http://localhost:8000/initCall?id=${id}&callerid=${myid}`,article)
//             .then(response => console.log("ss "+response));
      

//       socket.current = io.connect("/");
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
//         setStream(stream);
//         if (userVideo.current) {
//           userVideo.current.srcObject = stream;
//         }
//       })
  
//       socket.current.on("yourID", (id) => {
//         setYourID(id);
//       })
//       socket.current.on("allUsers", (users) => {
//         setUsers(users);
//       })
  
//       socket.current.on("hey", (data) => {
//         setReceivingCall(true);
//         setCaller(data.from);
//         setCallerSignal(data.signal);
//       })
//     }, []);
  
//     function callPeer(id) {
//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         config: {
  
//           iceServers: [
//               {
//                   urls: "stun:numb.viagenie.ca",
//                   username: "sultan1640@gmail.com",
//                   credential: "98376683"
//               },
//               {
//                   urls: "turn:numb.viagenie.ca",
//                   username: "sultan1640@gmail.com",
//                   credential: "98376683"
//               }
//           ]
//       },
//         stream: stream,
//       });
  
//       peer.on("signal", data => {
//         // var room = "abc123";
//         // socket.current.emit("room", room)
       
//         socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
//       })
  
//       peer.on("stream", stream => {
//         if (partnerVideo.current) {
//           partnerVideo.current.srcObject = stream;
//         }
//       });
  
//       socket.current.on("callAccepted", signal => {
//         setCallAccepted(true);
//         peer.signal(signal);
//       })
  
//     }
  
//     function acceptCall() {
//       setCallAccepted(true);
//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: stream,
//       });
//       peer.on("signal", data => {
//         socket.current.emit("acceptCall", { signal: data, to: caller })
//       })
  
//       peer.on("stream", stream => {
//         partnerVideo.current.srcObject = stream;
//       });
  
//       peer.signal(callerSignal);
//     }
  
//     let UserVideo;
//     if (stream) {
//       UserVideo = (
//         <Video playsInline muted ref={userVideo} autoPlay />
//       );
//     }
  
//     let PartnerVideo;
//     if (callAccepted) {
//       PartnerVideo = (
//         <Video playsInline ref={partnerVideo} autoPlay />
//       );
//     }
  
//     let incomingCall;
//     if (receivingCall) {
//       incomingCall = (
//         <div>
//           <h1>{caller} is calling you</h1>
//           <button onClick={acceptCall}>Accept</button>
//         </div>
//       )
//     }
//     return (
//       <Container>
//         <Row>
//           {UserVideo}
//           {PartnerVideo}
//         </Row>
//         <Row>
//           {Object.keys(users).map(key => {
//             if (key === yourID) {
//               return null;
//             }
//             console.log(users);
//             return (
//               <button onClick={() => callPeer(key)}>Call {key}</button>
//             );
//           })}
//         </Row>
//         <Row>
//           {incomingCall}
//         </Row>
//       </Container>
//     );
// }
