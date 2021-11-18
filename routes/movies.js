const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { isURL } = validator;
const urlValidator = (value, helpers) => (isURL(value) ? value : helpers.message('Нужно ввести URL адрес') && false);

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().regex(/[\wа-яё\s]/i).min(3)
      .max(60),
    director: Joi.string().required().regex(/[\wа-яё\s]/i),
    duration: Joi.number().required().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().regex(/[\wа-я.:!?"«»;@%№()*#,ё\s]/i),
    image: Joi.string().required().custom(urlValidator),
    trailer: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    nameRU: Joi.string().required().regex(/[а-я.:!?"«»;@%№()*#,ё\s]/i),
    nameEN: Joi.string().required().regex(/[\w.:!?"«»;@%№()*#,\s]/i),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex()
      .required(),
  }),
}), deleteMovie);

module.exports = router;
