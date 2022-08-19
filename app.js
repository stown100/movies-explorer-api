const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const { PORT = 8080 } = process.env;
const { DATA_BASE, NODE_ENV } = process.env;
const app = express();

const corsOptions = {
  origin: [
    'https://api.nomoreparties.co/beatfilm-movies',
    'https://graduatework.nomoredomains.rocks/api',
    'http://graduatework.nomoredomains.rocks/api',
    'https://graduatework.nomoredomains.rocks',
    'http://graduatework.nomoredomains.rocks',
    'https://localhost:3000',
    'http://localhost:3000',
    'localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'localhost:3001',
    'https://hidden-harbor-00158.herokuapp.com/',
  ],
  methods: ['PUT', 'GET', 'POST', 'PATCH', 'DELETE', 'HEAD'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Accept'],
  credentials: true,
};

app.use('*', cors(corsOptions));

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

require('dotenv').config();

app.use(express.json());

// модуль helmet для установки заголовков, связанных с безопасностью
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.use(require('./middlewares/rateLimit'));

app.use(require('./routes'));

app.use(require('./middlewares/auth')); // все роуты ниже, требуют авторизации

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.all('*', (req, res, next) => next(new NotFound('Ресурс не найден')));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(require('./middlewares/errorHandler'));

// app.listen(PORT, () => {
//   console.log(`69 строка Порт: ${PORT}`);
// });

app.listen(process.env.PORT || PORT, () => {
  console.log(`69 строка Порт: ${PORT}`);
});
