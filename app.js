const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const PORT = 3000;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  autoIndex: true, // make this also true
});

require('dotenv').config();

app.use(express.json());

// модуль helmet для установки заголовков, связанных с безопасностью
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.use(require('./routes'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.all('*', (req, res, next) => next(new NotFound('Ресурс не найден')));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Порт: ${PORT}`);
});
