const express = require('express');
const authRouter = express.Router();
const authController = require('../../controllers/auth/auth.controller');

const { errorResolver } = require('../../middlewares/globalErrorHandler');


authRouter.post('/register',errorResolver(authController.httpPostRegister));


module.exports = authRouter;