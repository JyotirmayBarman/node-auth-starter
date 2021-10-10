require('dotenv').config();
const path = require('path')
const express = require('express');
const mainRouter = require('./routes/main.router');
const cookie = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./middlewares/globalErrorHandler')

const PORT=process.env.PORT || 8000;

const app = express();
app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials:true
}));
app.use(express.json());
app.use(cookie());

app.use(express.static(path.join(__dirname, 'uploads')))

app.use(mainRouter);

app.use(errorHandler)

module.exports = app;