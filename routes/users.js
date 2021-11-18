const { errors, celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const { getUserMe, updateUser } = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  })
}), updateUser);

router.use(errors());

module.exports = router;