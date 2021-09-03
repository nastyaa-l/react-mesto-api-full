/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Auth = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Auth('Необходима авторизация:', authorization);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new Auth('Необходима авторизация:', payload);
  }

  req.user = payload;

  next();
};

module.exports = auth;
