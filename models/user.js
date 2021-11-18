const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(val) {
        return validator.isEmail(val);
      },
      message: 'Введите валидный email',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  name: {
    default: 'Сергей',
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema)