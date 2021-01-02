const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const path = require('path');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  checkUser,
  rooms,
} = require('./users');
const { generatePrivateCode } = require('./helper');

const PORT = process.env.PORT || 5000;

// const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/api', require('./router'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    );
  });
}

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', {
      user: 'Bot',
      text: `Hey ${user.name}!! Welcome to ${user.room}`,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'Bot',
      text: `${user.name} just joined the room`,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
    });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on('sendMessage', (data, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', {
        user: user.name,
        text: data.message,
        time: data.time,
      });
    }
    callback();
  });

  socket.on('typing', (data) => {
    if (data.typing === true) {
      io.emit('display', data);
    } else {
      io.emit('display', data);
    }
  });
  socket.on('check', ({ name, room }, callback) => {
    const error = checkUser({ name, room });
    return callback(error);
  });

  socket.emit('getrooms', rooms);

  socket.on('set_status', ({ room, status }) => {
    let index = rooms.findIndex((target) => target.room === room);
    if (index != -1 && rooms[index].status != status) {
      rooms[index].status = status;
      if (status === 'private') {
        const code = generatePrivateCode();
        rooms[index].privateCode = code;
      } else {
        rooms[index].privateCode = '';
      }
    }
  });

  socket.on('get_room_inf', (room, callback) => {
    let index = rooms.findIndex((target) => target.room === room);
    return callback(rooms[index]);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Bot',
        text: `${user.name} just left!`,
        time: new Date().getHours() + ':' + new Date().getMinutes(),
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
