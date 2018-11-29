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
    console.log('New user is connected')

    socket.emit('newEmail',{
        from : 'Roman@example.com',
        text : 'How are you ?'
    });

    //CreateMessage
    socket.emit('newMessage',{
        from : 'Server.com',
        text : 'Hellow from server',
        createdAt : new Date().getDate()
    });

    socket.on('createEmail',(createEmail)=>{
        console.log('Create Email : ',createEmail);
    });

    socket.on('createMessage',(newMessage)=>{
        console.log('Create message: ',newMessage);
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

server.listen(3000 , ()=>{
    console.log('Server is up on port 3000');
});