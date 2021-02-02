const router = require('express').Router();

const authController = require('./api/controllers/authController');
const sportController = require('./api/controllers/sportController');

router.post('/auth/login', async (request, response) => {authController.login(request, response)});
router.post('/sport/store', async (request, response) => {sportController.store(request, response)});
router.post('/sport/destroy', async (request, response) => {sportController.destroy(request, response)});
router.get('/sport/showAll', async (request, response) => {sportController.showAll(request, response)});

module.exports = router;