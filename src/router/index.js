const express = require('express');

const app = express();

///routes
app.use("/", require("./users.router"));
app.use("/", require("./roles.router"));
app.use("/", require("./posts.router"));
app.use("/", require("./scores.router"));
app.use("/", require("./audits.router"));


module.exports = app;
