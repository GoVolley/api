const router = require('express').Router();

const authController = require('./api/controllers/authController');

router.post('/login', async (request, response) => {authController.login(request, response)});

module.exports = router;