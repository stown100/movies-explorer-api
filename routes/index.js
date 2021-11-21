const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { login, createUser } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = router;
