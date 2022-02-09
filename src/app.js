require('dotenv').config();
const path = require('path')
const express = require('express');
const mainRouter = require('./api/routes/main.router');
const cookie = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./api/middlewares/globalErrorHandler')

const app = express();

app.use(cors({
    origin: process.env.CORS_URLS.split(','),
    credentials:true
}));
app.use(express.json());
app.use(cookie());

app.use(express.static(path.join(__dirname, 'uploads')))

app.use(mainRouter);

app.use(errorHandler)

module.exports = app;