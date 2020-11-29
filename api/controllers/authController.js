const { ErrorMessage } = require('../constructors/errorMessage');
const validator = require('../validator/auth/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../database/models/User');

async function login(request, response)
{
  const {error} = validator.validate(request.body);
  if (error) return new ErrorMessage(error.details[0].message,error.details[0].context.key).send(response);

  const user = await User.findOne({ where: {email: request.body.email},attributes: {include: ['password']}});
  if (!user) return new ErrorMessage('Nous ne trouvons pas l\'adresse email !', 'email').send(response);

  const verifyPasswd = await bcrypt.compare(request.body.password, user.password);
  if (!verifyPasswd) return new ErrorMessage('Le mot de passe est invalide !', 'password').send(response);

  const token = jwt.sign({
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }, process.env.SECRET_TOKEN);

  return response.json({
    token: token,
  })
}

module.exports = {
  login
};