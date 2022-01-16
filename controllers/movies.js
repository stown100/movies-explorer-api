const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequestError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRu, nameEn, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRu,
    nameEn,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.message === 'Validation failed' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки');
      }
      return next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const movieById = req.user._id;
  Movie.findOne({ movieId: req.params._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Нет фильма по заданному id');
      }
      if (movie.owner.toString() !== movieById.toString()) {
        throw new ForbiddenError('Фильм добавили не вы!');
      }
      return Movie.findOneAndRemove({
        _id: movie._id,
        owner: movieById,
      })
        .then((movieRes) => res.send(movieRes));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id');
      }
      if (err.message === 'NotFound') {
        throw new NotFound('Нет карточки/пользователя по заданному id');
      }
      return next(err);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
