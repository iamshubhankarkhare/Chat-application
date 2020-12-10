const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const index = rooms.findIndex((target) => target.room === room);
    if(index === -1){
        part = 1;
        rooms.push({room, part});
    }else{
        rooms[index].part = rooms[index].part + 1;
    }
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: "Sorry! This username is already taken" }
    }

    const user = { id, name, room };
    users.push(user);
    return { user };
};
const checkUser = (({ name, room }) => {
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return { error: "Sorry! This username is already taken" }
    }
})

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        const index_rooms = rooms.findIndex((target) => target.room === users[index].room);
        rooms[index_rooms].part = rooms[index_rooms].part - 1;
        if(rooms[index_rooms].part === 0)
            rooms.splice(index_rooms, 1)[0];
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getRooms = () => rooms.entries();

module.exports = { addUser, removeUser, getUser, getUsersInRoom, checkUser, getRooms, rooms}