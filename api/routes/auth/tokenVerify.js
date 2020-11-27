const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/tokenVerify', async (request, response) => {

  const token = request.header('auth-token');

  if (!token) {
    //TODO Quentin
  }

  try {

    const verify = await jwt.verify(token, process.env.SECRET_TOKEN);
    return response.send(verify);

  } catch (error) {
    
    //TODO Quentin

  }

});

module.exports = router;