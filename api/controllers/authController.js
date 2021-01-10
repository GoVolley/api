const { ErrorMessage } = require('../constructors/errorMessage');
const { SuccessMessage } = require('../constructors/successMessage');
const validatorLogin = require('../validator/auth/login');
const validatorRegister = require('../validator/auth/register');
const validatorVerified = require('../validator/auth/verified');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");
const mailTransport = nodemailer.createTransport({
  host: "host",
  port: 2525,
  auth: {
    user: "username",
    pass: "password"
  }
});

const tokenVerify = require('../middlewares/token');
const User = require('../../database/models/User');

var url = require('url');

async function login(request, response)
{
  await tokenVerify(request, response);
  
  const {error} = validatorLogin.validate(request.body);
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

async function register(request, response)
{
  await tokenVerify(request, response);
  
  const {error} = validatorRegister.validate(request.body);
  if (error) return new ErrorMessage(error.details[0].message,error.details[0].context.key).send(response);

  if(request.body.password !== request.body.confirm_password) {
    return new ErrorMessage('Les deux mot de passe ne correspondent pas !', 'confirm_password').send(response);
  }

  const exist = await User.findOne({ where: {email: request.body.email} });
  if(exist) return new ErrorMessage('Un compte existe déjà avec cette adresse email !', 'email').send(response);

  const salt = await bcrypt.genSalt(16);
  const hashPassword = await bcrypt.hash(request.body.password, salt);

  const user = new User({
    email: request.body.email,
    password: hashPassword,
  });

  await user.save();

  const verifiedToken = jwt.sign({email: user.email,}, process.env.SECRET_TOKEN);

  const headerMail = await mailTransport.sendMail({
    from: '"Name" <email@email.fr>',
    to: request.body.email,
    subject: "Activation de votre compte",
    text: "Activation de votre compte",
    html: "<a href='localhost:3000/auth/verified?token="+verifiedToken+"'>Activer mon compte</a>",
  });

  const token = jwt.sign({
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }, process.env.SECRET_TOKEN);

  return response.json({
    token: token,
  })
}

async function verified(request, response)
{
  var q = url.parse(request.url, true);

  const {error} = validatorVerified.validate(q.query);
  if (error) return new ErrorMessage(error.details[0].message,error.details[0].context.key).send(response);
  
  const verified = await jwt.verify(q.query.token, process.env.SECRET_TOKEN);

  console.log(verified);

  // const user = User.findOne({ where: { email: verified.email } });
  // if(!user) return new ErrorMessage('error').send(response);

  await User.update({
    verified_at: Date.now()
  },
  {
    where: {
      email: verified.email
    }
  }).then(function() {
    return new SuccessMessage('success').send(response);
  }).catch(function(err) {
    return new ErrorMessage('error').send(response);
  })
}


module.exports = {
  login,
  register,
  verified
};