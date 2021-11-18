const { celebrate, Joi } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const routesUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const PORT = 3000;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', routesUsers);
app.use('/movies', routerMovies);

app.all('*', (req, res, next) => next(new NotFound('Ресурс не найден')));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Порт: ${PORT}`);
});
