const express = require('express');
const authRouter = express.Router();
const authController = require('../../controllers/auth/auth.controller');
const { errorResolver } = require('../../middlewares/globalErrorHandler');
const verifyRefreshToken = require('../../middlewares/verifyRefreshToken');
const authValidator = require('../../validators/auth.validator')
const multer = require('multer');
const { validateImageInput } = require('../../validators/mime.validator');
const upload = multer({
    storage:multer.memoryStorage()
})

authRouter.get('/user', verifyRefreshToken, errorResolver(authController.httpGetLoggedInUser));

authRouter.post('/register', authValidator.validateRegistrationInput, errorResolver(authController.httpPostRegister));
authRouter.post('/verify/:token', authValidator.validateEmailVerificationToken, errorResolver(authController.httpPostVerifyEmail));
authRouter.post('/login', authValidator.validateLoginInput, errorResolver(authController.httpPostLogin));
authRouter.post('/resend', authValidator.validateEmailInput, errorResolver(authController.httpPostResendVerificationLink));
authRouter.post('/logout', verifyRefreshToken, errorResolver(authController.httpPostLogout));
authRouter.post('/reset', authValidator.validateEmailInput, errorResolver(authController.httpPostSendPasswordResetLink));

authRouter.patch('/reset/:token', authValidator.validatePasswordMatch, authValidator.validateEmailVerificationToken, errorResolver(authController.httpPatchResetPassword));
authRouter.patch('/update', verifyRefreshToken,upload.single('avatar'),validateImageInput, authValidator.validateUpdateProfileInput, errorResolver(authController.httpPatchUpdateProfile));
authRouter.patch('/update/verify/:token', authValidator.validateEmailVerificationToken, errorResolver(authController.httpPatchUpdateEmailVerification));


module.exports = authRouter;