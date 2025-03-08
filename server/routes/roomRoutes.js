const { Router } = require('express');
const routes = Router();
const {
  getRooms,
  createRooms,
  getSingle,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

routes.get('/', getRooms);
routes.get('/:id', getSingle);
routes.post('/', createRooms);
routes.put('/:id', updateRoom);
routes.delete('/:id', deleteRoom);

module.exports = routes;
