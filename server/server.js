const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connect',(socket)=>{
    console.log('New user is connected');

        socket.emit('newMessage',{
            from : 'Admin',
            text : 'Welcome to chat app'
        });

        socket.broadcast.emit('newMessage',{
            from : 'Admin',
            text : 'New User joined',
            createdAt : new Date().getTime()
        });

        socket.on('createMessage',(message)=>{
            
            io.emit('newMessage',{
                from : message.to,
                text : message.text,
                createdAt : new Date().getTime()
            });
        });
        

        socket.on('disconnect',()=>{
            console.log('User disconnected');
        });
    });
   

server.listen(3000 , ()=>{
    console.log('Server is up on port 3000');
});