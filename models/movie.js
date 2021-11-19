const mongoose = require('mongoose');

const regex = /https?:\/\/(www\.)?[-\w@:%\\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\\+~#=//?&]*)/i;

const movieSchema = new mongoose.Schema({
  // страна создания фильма
  coyntry: {
    type: String,
    require: true,
  },
  // режиссёр фильма
  director: {
    type: String,
    require: true,
  },
  // длительность фильма
  duration: {
    type: Number,
    require: true,
  },
  // год выпуска фильма
  year: {
    type: String,
    require: true,
  },
  // описание фильма
  description: {
    type: String,
    require: true,
  },
  // ссылка на постер к фильму
  image: {
    type: String,
    require: true,
    validate: {
      validator(val) {
        return val.match(regex);
      },
      message: 'Введите валидный url',
    },
  },
  // ссылка на трейлер фильма
  trailer: {
    type: String,
    require: true,
    validate: {
      validator(val) {
        return val.match(regex);
      },
      message: 'Введите валидный url',
    },
  },
  // миниатюрное изображение постера к фильму
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(val) {
        return val.match(regex);
      },
      message: 'Введите валидный url',
    },
  },
  //  _id пользователя, который сохранил фильм
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: String,
    ref: 'user',
    required: true,
  },
  // название фильма на русском языке
  nameRu: {
    type: String,
    require: true,
  },
  // название фильма на английском языке
  nameEn: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
