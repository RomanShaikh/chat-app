const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage } = require('./utils/messages');
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect',(socket)=>{
    console.log('New user is connected');

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

        socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

        socket.on('createMessage',(message, callback) => {
            console.log('createMessage', message);
            io.emit('newMessage', generateMessage(message.from, message.text));
            callback('This is from the server.');
            // socket.broadcast.emit('newMessage', {
            //   from: message.from,
            //   text: message.text,
            //   createdAt: new Date().getTime()
            // });
          });
        socket.on('disconnect',()=>{
            console.log('User disconnected');
        });
    });
   

server.listen(3000 , ()=>{
    console.log('Server is up on port 3000');
});