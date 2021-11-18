const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFound');
const CastError = require('../errors/CastError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then(movie => res.send(movie))
    .catch(next);
}

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRu, nameEn, thumbnail, movieId
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country, director, duration, year, description, image, trailer, nameRu, nameEn, thumbnail, movieId, owner
  })
    .then(movie => res.send(movie))
    .catch((err) => {
      if (err.message === 'Validation failed' || err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при создании карточки'));
      }
      const error = new Error('На сервере произошла ошибка');
      error.statusCode = 500;
      return next(error);
    })
    .catch(next);
}

const deleteMovie = (req, res, next) => {
  const movieById = req.user._id;
  Movie.findById({
    _id: req.params.movieId,
    owner: movieById,
  })
    .then((movie) => {
      if (!movie) {
        next(new NotFound('Нет фильма по заданному id'));
      }
      if (movie.owner.toString() === movieById.toString()) {
        Movie.findOneAndRemove({
          _id: req.params.movieId,
          owner: movieById,
        })
          .then((movieRes) => {
            res.send(movieRes);
          });
      } else {
        next(new ForbiddenError('Фильм добавили не вы!'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Невалидный id'));
      }
      if (err.message === 'NotFound') {
        next(new NotFound('Нет карточки/пользователя по заданному id'));
      }
      const error = new Error('На сервере произошла ошибка');
      error.statusCode = 500;
      return next(error);
    })
    .catch(next);
}

module.exports = { getMovies, createMovie, deleteMovie };