const express = require('express');
const mainRouter = express.Router();

const authRouter = require('./auth.router')

mainRouter.use('/api/v1/auth',authRouter);

mainRouter.get('/',(req,res) => {
    res.status(200).json({
        message: "Yo I'm working !!!"
    })
})

module.exports = mainRouter;