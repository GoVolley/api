const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database/connection');

const app = express();
sequelize.sync();

dotenv.config();

app.use(express.json());

app.use('/', require('./routes'));

module.exports = app;