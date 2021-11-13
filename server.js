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
app.post('/init',jsonParser, (req, res) => {

const options = {
  host: "localhost",
  port: 8080,
  path: "/product/controller/addProduct",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
      "Authorization": 'Bearer ' + req.body.jwt
    },
};
  
  console.log(req.body);
  res.send("ok");
});
io.sockets.on('connection', socket => {
  let room = '';
  // sending to all clients in the room (channel) except sender
  socket.on('message', message => socket.broadcast.to(room).emit('message', message));
  socket.on('find', () => {
    const url = socket.request.headers.referer.split('/');
    room = url[url.length - 1];
    const sr = io.sockets.adapter.rooms[room];
    if (sr === undefined) {
      // no room with such name is found so create it
      socket.join(room);
      socket.emit('create');

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
  });
  socket.on('accept', id => {
    console.log("ID "+id);
    io.sockets.connected[id].join(room);
    // sending to all clients in 'game' room(channel), include sender
    io.in(room).em