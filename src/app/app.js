const express = require('express');
const morgan = require('morgan');

const router = require('../router/users.router');

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.send("This is my APP");
})
app.use(express.json());
app.use("/api/v1", router);

module.exports = app