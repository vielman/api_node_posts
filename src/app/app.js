const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('../router/index');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

app.use("/api/v1", router);

module.exports = app