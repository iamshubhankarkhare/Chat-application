const express = require('express');
const router = express.Router();
const { rooms } = require('./users');

// @route - /api/getRoomDetails/:room
// desc - Get the room details of the specified room name
router.get('/getRoomDetails/:room', (req, res) => {
  const roomName = req.params.room;
  let index = rooms.findIndex((target) => target.room === roomName);
  let room = rooms[index];
  if (!room) {
    room = {};
  }
  res.json(room);
});

module.exports = router;
