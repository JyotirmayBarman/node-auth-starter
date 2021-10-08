const express = require('express');
const mainRouter = require('./routes/main.router');

const { errorHandler } = require('./middlewares/globalErrorHandler')

const app = express();
app.use(express.json());

app.use(mainRouter);

app.use(errorHandler)

module.exports = app;