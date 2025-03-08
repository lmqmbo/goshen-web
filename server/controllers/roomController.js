const Room = require('../models/roomModel');

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (rooms.length === 0) {
      const error = new Error("Can't find rooms");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

const createRooms = async (req, res, next) => {
  try {
    const rooms = await Room.create(req.body);
    return res.status(201).json(rooms);
  } catch (error) {
    return next(error);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const singleRoom = await Room.findById(req.params.id);
    if (!singleRoom) {
      const error = new Error("Can't find room");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(singleRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRoom) {
      const error = new Error("Can't update the room");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deleteRoom) {
      const error = new Error('cant delete room');
      error.status = 404;
      return next(error);
    }
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  createRooms,
  getSingle,
  updateRoom,
  deleteRoom,
};
