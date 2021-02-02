const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors');
const sequelize = require('./database/connection');

const app = express();

sequelize.sync();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/', require('./routes'));

module.exports = app;