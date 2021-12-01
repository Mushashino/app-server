const express = require('express');
const app = express();
const cors = require('cors');
const UserRouter = require('./routers/user.router');

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', UserRouter);

module.exports = app;