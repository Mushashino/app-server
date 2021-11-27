const express = require('express');
const app = express();
const UserRouter = require('./routers/user.router');

app.use(express.json());

app.use('/api/v1/users', UserRouter);

module.exports = app;