const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    let index = rooms.findIndex((target) => target.room === room);
    if(index === -1){
        // participants in the room
        part = [name];
        // status of the room
        // public, private, locked
        status = "public";
        privateCode = '';
        rooms.push({room, part, status,privateCode});
    }else{
        rooms[index].part.push(name);
    }
    const existingUser = users.find((user) => user.room === room && user.name === name);
    index = (index === -1)?rooms.length - 1:index;
    
    if (existingUser) {
        return { error: "Sorry! This username is already taken" }
    }
    if (rooms[index].status === "locked"){
        return {error: "Sorry! The room is locked, you cannot join"}
    }

    const user = { id, name, room };
    users.push(user);
    return { user };
};
const checkUser = (({ name, room }) => {
    const existingUser = users.find((user) => user.room === room && user.name === name);
    const existingRoom = rooms.find((target) => target.room === room);
    if (existingUser) {
        return { error: "Sorry! This username is already taken" };
    }
    if((existingRoom) && (existingRoom.status === 'locked')){
        return { error: "You cannot join a locked room !"};
    }
})

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        const index_rooms = rooms.findIndex((target) => target.room === users[index].room);
        const index_part = rooms[index_rooms].part.findIndex((target) => target === users[index].name);
        rooms[index_rooms].part.splice(index_part, 1)[0];
        if(rooms[index_rooms].part.length === 0)
            rooms.splice(index_rooms, 1)[0];
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getRooms = () => rooms.entries();

module.exports = { addUser, removeUser, getUser, getUsersInRoom, checkUser, getRooms, rooms}