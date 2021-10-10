const path = require('path')
const express = require('express');
const mainRouter = express.Router();

const authRouter = require('./auth/auth.router')

mainRouter.use('/api/v1/auth',authRouter);

mainRouter.get('/*',(req,res) => {
    res.sendFile(path.join(__dirname,'../','public','index.html'));
})

module.exports = mainRouter;