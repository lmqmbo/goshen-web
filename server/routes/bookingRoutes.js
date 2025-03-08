const { Router } = require('express');

const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getSingleBooking,
} = require('../controllers/bookingController');

const routes = Router();

routes.get('/', getBookings);
routes.post('/', createBooking);
routes.put('/:id', updateBooking);
routes.delete('/:id', deleteBooking);
routes.get('/:id', getSingleBooking);

module.exports = routes;
