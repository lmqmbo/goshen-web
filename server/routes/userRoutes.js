const { Router } = require('express');
const {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
} = require('../controllers/userController');
const routes = Router();

routes.post('/', createUser);
routes.post('/login', loginUser);
routes.get('/logout', logoutUser);
routes.get('/', getUsers);

module.exports = routes;
