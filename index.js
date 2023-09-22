const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*" 
    }
});
const PORT = 3010;
io.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {

    socket.username = username;
  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', {
      username: socket.username,
      message: data.message,
    }); 
  });


});

