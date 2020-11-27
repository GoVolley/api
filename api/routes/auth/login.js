const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');

const validator = require('../../validator/auth/login');

router.post('/login', async (request, response) => {

  const {error} = validator.validate(request.body);

  if (error) {
    //TODO Quentin
  }

  const user = await User.findOne({ email: request.body.email });

  if (!user) { 
    //TODO Quentin
  }

  const verifyPasswd = await bcrypt.compare(request.body.password, user.password);

  if (!verifyPasswd) {
    //TODO Quentin
  }

  const token = jwt.sign({
    email: user.email,
    password: user.password,
  }, process.env.SECRET_TOKEN);

  return response.send(token);

});

module.exports = router;