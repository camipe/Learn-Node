const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();

  req.checkBody('email', 'Email is not valid!').isEmail();
  req.sanitize('email');

  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops, Passwords do not match!').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    console.log(req.body);
    req.flash('error', errors.map(err => err.msg));
    return res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
  }
  return next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  return next();
};
