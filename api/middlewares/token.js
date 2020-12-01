const { ErrorMessage } = require('../constructors/errorMessage');

module.exports = async function tokenVerify(request, response) {

  const token = request.header('app-token');
  if (token != process.env.TOKEN_APP && token != process.env.TOKEN_WEB && token != process.env.TOKEN_DEV) throw new ErrorMessage('Invalid token').send(response);

}