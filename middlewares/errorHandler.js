module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode);
  res.send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};
