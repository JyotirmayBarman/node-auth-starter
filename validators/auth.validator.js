const validator = require('joi');
const jwt = require('jsonwebtoken');

let error = {};
function validateRegistrationInput(req, res, next) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const registerInputSchema = validator.object({
        firstName: validator.string().required().label('First name'),
        lastName: validator.string().required().label('Last name'),
        email: validator.string().email().required().label('Email'),
        password: validator.string().min(6).max(1024).required().label('Password'),
        confirmPassword: validator.string().required().valid(validator.ref('password')).label("Confirmation Password").messages({
            'string.base': 'Confirmation password must be a string',
            'any.required': 'Confirmation password is required',
            'any.only': 'Confirmation password must match password'
        })
    });
    const valid = registerInputSchema.validate({ firstName, lastName, email, password, confirmPassword }, { abortEarly: true });
    console.log(valid);
    if (checkValidity(valid)) {
        return next();
    }
    return res.status(400).json(error)
}

function validateEmailVerificationToken(req, res, next) {
    const token = req.params.token;
    try {
        const valid = jwt.verify(token, process.env.VERIFY_EMAIL_SECRET);
        if (valid) {
            return next();
        }
        return res.status(400).json({ message: "Invalid verification link or it maybe expired" })
    } catch (error) {
        return res.status(400).json({ message: "Invalid verification link or it maybe expired" })
    }
}

function validateLoginInput(req,res,next) {
    const { email, password, remember } = req.body;

    const loginInputSchema = validator.object({
        email: validator.string().email().required().label('Email'),
        password: validator.string().min(6).max(1024).required().label('Password'),
        remember: validator.boolean().default(false).label('Remember')
    });

    const valid = loginInputSchema.validate({ email, password, remember });

    if (checkValidity(valid)) {
        return next();
    }

    return res.status(400).json(error)
}


function checkValidity(valid) {
    if (valid.error) {
        error = {
            error: valid.error.details[0].message,
            field: valid.error.details[0].path
        }
        return false;
    }
    return true;
}

module.exports = {
    validateRegistrationInput,
    validateEmailVerificationToken,
    validateLoginInput
}