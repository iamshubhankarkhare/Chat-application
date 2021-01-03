const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  let index = rooms.findIndex((target) => target.room === room);
  if (index === -1) {
    // participants in the room
    part = 1;
    // status of the room
    // public, private, locked
    status = 'public';
    privateCode = '';
    rooms.push({ room, part, status, privateCode });
  } else {
    rooms[index].part = rooms[index].part + 1;
  }
  index = index === -1 ? rooms.length - 1 : index;

  const user = { id, name, room };
  users.push(user);
  return { user };
};
const checkUser = ({ name, room }) => {
  const existingUser = users.find((user) => user.room === room && user.name === name);
  const existingRoom = rooms.find((target) => target.room === room);

  if (existingUser) {
      return { error: "Sorry! This username is already taken" };
  }
  if((existingRoom) && (existingRoom.status === 'locked')){
      return { error: "You cannot join a locked room !"};
  }
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const index_rooms = rooms.findIndex(
      (target) => target.room === users[index].room
    );
    rooms[index_rooms].part = rooms[index_rooms].part - 1;
    if (rooms[index_rooms].part === 0) rooms.splice(index_rooms, 1)[0];
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getRooms = () => rooms.entries();

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  checkUser,
  getRooms,
  rooms,
};
