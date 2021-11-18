module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': [1, { allow: ['_id'] }],
    'consistent-return': 0,
    'no-shadow': 0,
  },
};
