const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

// init express
const app = express();

// init general middleware
app.use(helmet());
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
