const express = require('express');

const app = express();

///routes
app.use("/", require("./users.router"));
app.use("/", require("./roles.router"));
app.use("/", require("./posts.router"));


module.exports = app;
