const Booking = require('../models/bookingModel');

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    if (!bookings) {
      const error = new Error('Cant find bookings');
      error.status = 404;
      next(error);
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getSingleBooking = async (req, res, next) => {
  try {
    const singleBooking = await Booking.findById(req.params.id);
    if (!singleBooking) {
      const error = new Error("Can't find single booking");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(singleBooking);
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.create(req.body);
    if (!bookings) {
      const error = new Error('Cant create booking');
      error.status = 404;
      next(error);
    }
    const bookingList = await Booking.find();
    return res.status(201).json(bookingList);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBooking) {
      const error = new Error('Cant update booking');
      error.status = 404;
      next(error);
    }
    return res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      const error = new Error('Cant delete booking');
      error.status = 404;
      next(error);
    }
    const updatedBookings = await Booking.find();
    return res.status(200).json(updatedBookings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getSingleBooking,
};
