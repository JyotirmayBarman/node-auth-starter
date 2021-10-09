const express = require('express');
const mainRouter = require('./routes/main.router');
const cookie = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./middlewares/globalErrorHandler')

const app = express();
app.use(cors({
    origin: 'http://localhost:8000',
    credentials:true
}));
app.use(express.json());
app.use(cookie());

app.use(mainRouter);

app.use(errorHandler)

module.exports = app;