const express = require('express');

const mainRouter = express.Router();

mainRouter.get('/',(req,res) => {
    res.status(200).json({
        message: "Yo I'm working !!!"
    })
})

module.exports = mainRouter;