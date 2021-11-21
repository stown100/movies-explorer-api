const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const { getUserMe, updateUser } = require('../controllers/users');

router.get('/api/users/me', getUserMe);

router.patch('/api/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateUser);

// router.use(errors());

module.exports = router;
