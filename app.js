const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

//Import Routes
const login = require('./api/routes/auth/login');
const tokenVerify = require('./api/routes/auth/tokenVerify');

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/auth', login);
app.use('/auth', tokenVerify);

module.exports = app;