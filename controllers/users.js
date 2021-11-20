const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const AuthorizedError = require('../errors/AuthorizedError');
const CastError = require('../errors/CastError');
const NotFound = require('../errors/NotFound');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name, email, password: hash,
  })
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new CastError('Переданны некорректные данные');
      }
      if (err.code === 11000) {
        throw new ConflictError('При регистрации указан email, который уже существует на сервере');
      }
      return next(err);
    }))
    .catch(next);
};

// const createUser = (req, res, next) => {
//   const { name, email, password } = req.body;
//   User.findOne({ email })
//     .then(() => bcrypt.hash(password, 10))
//     .then((hash) => {
//       User.create({
//         name, email, password: hash,
//       })
//         .then((user) => {
//           const newUser = user.toObject();
//           delete newUser.password;
//           res.send(newUser);
//         })
//         .catch((err) => {
//           if (err.name === 'ValidationError') {
//             throw new CastError('Переданны некорректные данные');
//           }
//           if (err.name === 'MongoServerError' || err.message === 'Validation failed') {
//             throw new
// ConflictError('При регистрации указан email, который уже существует на сервере');
//           }
//           return next(err);
//         });
//     })
//     .catch(next);
// };

const getUserMe = (req, res, next) => {
  const id = req.user._id;
  User.find({ _id: id })
    .orFail(() => {
      throw new NotFound('Пользователя с таким id не существует');
    })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFound('Пользователя с таким id не существует');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Переданны некорректные данные');
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователя с таким id не существует');
    })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new CastError('Переданны некорректные данные');
      }
    })
    .catch((err) => {
      if (err.name === 'DuplicateKey') {
        throw new ConflictError('Такой email уже существует');
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new CastError('Переданны некорректные данные');
      }
      return next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new CastError('Переданны некорректные данные');
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        console.log('2');
        throw new AuthorizedError('Неправильные почта или пароль');
      }
      // аутентификация успешна
      const token = jwt.sign(
        { _id: userId },
        'super-strong-secret',
        { expiresIn: '21d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  createUser, getUserMe, updateUser, login,
};
