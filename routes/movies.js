const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/api/movies', getMovies);

router.post('/api/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().regex(/[\wа-яё\s]/i).min(3)
      .max(60),
    director: Joi.string().required().regex(/[\wа-яё\s]/i),
    duration: Joi.number().required().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().regex(/[\wа-я.:!?"«»;@%№()*#,ё\s]/i),
    nameRU: Joi.string().required().regex(/[а-я.:!?"«»;@%№()*#,ё\s]/i),
    nameEN: Joi.string().required().regex(/[\w.:!?"«»;@%№()*#,\s]/i),
    movieId: Joi.number().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('Невалидный url');
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('Невалидный url');
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helper.message('Невалидный url');
    }),
  }),
}), createMovie);

router.delete('api//movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24)
      .required(),
  }),
}), deleteMovie);

module.exports = router;
