const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      const error = new Error('cant find users');
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const createUser = async (req, res, next) => {
  try {
    const { password, ...therest } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      password: hashedPW,
      ...therest,
    });
    if (!newUser) {
      const error = new Error("Can't create new user");
      error.status = 404;
      return next(error);
    }
    const { password: undefined, ...otherDetails } = newUser.toObject();
    return res.status(201).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (!isUser) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    const isCorrect = await bcrypt.compare(password, isUser.password);
    if (!isCorrect) {
      const error = new Error('Wrong password or email');
      error.status = 400;
      return next(error);
    }
    const token = jwt.sign({ id: isUser.id }, process.env.JWT_SECRET);
    res.cookie('jwt', token);

    const { password: _, ...rest } = isUser.toObject();
    return res.status(200).json({ ...rest });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  res.cookie('jwt', '', { expiresIn: '-1' });
  return res.json({ message: 'successfully logged out' });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
};
