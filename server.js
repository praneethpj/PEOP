const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const sio = require('socket.io');
const favicon = require('serve-favicon');
const compression = require('compression');
const cors = require('cors');
var bodyParser = require('body-parser');
 

const app = express(),
  options = { 
    key: fs.readFileSync(__dirname + '/rtc-video-room-key.pem'),
    cert: fs.readFileSync(__dirname + '/rtc-video-room-cert.pem')
  },
  port = 8000,
  server = true ?
    http.createServer(app).listen(port) :
    https.createServer(options, app).listen(port),
  io = sio(server);
  console.log("Server started at "+port);
  app.use(cors());
  var jsonParser = bodyParser.json()
 
// compress all requests
//app.use(compression());
//app.use(express.static(path.join(__dirname, 'dist')));
//app.use((req, res) => res.sendFile(__dirname + '/dist/index.html'));
//app.use(favicon('./dist/favicon.ico'));
// Switch off the default 'X-Powered-By: Express' header
//app.disable('x-powered-by');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var granted=false;
app.post('/init',jsonParser, (req, res) => {

const options = {
  host: "localhost",
  port: 5000,
  path: "/api/videoserver/isSheduledAvailable",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // "Content-Length": req.body.length,
      "Authorization": 'Bearer ' + req.body.jwt
    },
};
  
const req2 = http.request(options, (res) => {
  //status code of the request sent
  console.log("statusCode: ", res.statusCode);
  let result = "";
  // A chunk of data has been recieved. Append it with the previously retrieved chunk of data
  res.on("data", (chunk) => {
    result += chunk;
  });
  //The whole response has been received. Display it into the console.
  res.on("end", () => {
    console.log("Result is: " + result);
    granted=result;
  });
});

req2.on("error", (err) => {
  console.log("Error: " + err.message);
});
//write data to request body

let data={   "roomid": req.body.roomid,
            "professionid":req.body.professionid,
            "userid":req.body.userid };
            console.log(data );
 
req2.write(JSON.stringify(data));
//to signify the end of the request - even if there is no data being written to the request body.
req2.end();

  
  res.send(granted);
});
io.sockets.on('connection', socket => {
  let room = '';
  // sending to all clients in the room (channel) except sender
  socket.on('message', message => socket.broadcast.to(room).emit('message', message));
  socket.on('find', () => {
    const url = socket.request.headers.referer.split('/');
    room = url[url.length - 1];
    const sr = io.sockets.adapter.rooms[room];
    if (sr === undefined ) {
      // no room with such name is found so create it
      if(true){
      socket.join(room);
      socket.emit('create');
      }else{
        console.log("Error: Server not granted ");
      }

    } else if (sr.length === 1) {
      socket.emit('join');
    } else { // max two clients
      socket.emit('full', room);
    }
  });
  socket.on('auth', data => {
    data.sid = socket.id;
    // sending to all clients in the room (channel) except sender
    socket.broadcast.to(room).emit('approve', data);

///this is newly added without accept
      io.sockets.connected[data.sid].join(room);
    // sending to all clients in 'game' room(channel), include sender
    io.in(room).emit('bridge');
    ///// to here
  });
  socket.on('accept', id => {
    console.log("ID "+id);
    io.sockets.connected[id].join(room);
    // sending to all clients in 'game' room(channel), include sender
    io.in(room).emit('bridge');
  });
  socket.on('reject', () => socket.emit('full'));
  socket.on('leave', () => {
    // sending to all clients in the room (channel) except sender
    socket.broadcast.to(room).emit('hangup');
    socket.leave(room);});
});