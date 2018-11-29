var socket = io();
        socket.on('connect', function(){
            console.log('Connected to the server');

            socket.emit('createEmail',{
                to : 'romi@example.com',
                text : 'Hey Roms ... How are you ?'
            });

            //Create Message

            socket.emit('createMessage',{
                to : 'roms@example.com',
                text : 'Hello friends'
            });
        });

        socket.on('newMessage', function(message){
            console.log(message);
        });

        socket.on('disconnect', function(){
            console.log('Disconnected from the server');
        });

        socket.on('newEmail',function(email){
            console.log('New Email',email);
        });