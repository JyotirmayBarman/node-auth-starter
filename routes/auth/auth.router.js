const express = require('express');
const authRouter = express.Router();
const authController = require('../../controllers/auth/auth.controller');
const { errorResolver } = require('../../middlewares/globalErrorHandler');
const authValidator = require('../../validators/auth.validator')


authRouter.post('/register',authValidator.validateRegistrationInput,errorResolver(authController.httpPostRegister));


module.exports = authRouter;