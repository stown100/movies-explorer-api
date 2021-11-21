const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;
const { DATA_BASE, NODE_ENV } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

require('dotenv').config();

app.use(require('./middlewares/rateLimit'));

app.use(express.json());

// модуль helmet для установки заголовков, связанных с безопасностью
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.use(require('./routes'));

// все роуты ниже, требуют авторизации
app.use(require('./middlewares/auth'));

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.all('*', (req, res, next) => next(new NotFound('Ресурс не найден')));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(require('./middlewares/errorHandler'));

app.listen(PORT, () => {
  console.log(`Порт: ${PORT}`);
});
