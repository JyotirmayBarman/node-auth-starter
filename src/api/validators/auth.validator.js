const validator = require('joi');
const jwt = require('jsonwebtoken');

let error = {};
function validateRegistrationInput(req, res, next) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const registerInputSchema = validator.object({
        firstName: validator.string().required().label('First name'),
        lastName: validator.string().required().label('Last name'),
        email: validator.string().email().required().label('Email'),
        password: validator.string().regex(/[a-z]/,'lowercase').message("Password must consist an lowercase")
                .regex(/[A-Z]/,'uppercase').message("Password must consist an uppercase")
                .regex(/[0-9]/,'digit').message("Password must consist a digit")
                .regex(/.{8,}/,'mineight').message("Password must be atleast 8 chars long")
                .regex(/\W|_/,'special').message("Password must consist a special character")
                .required().label('Password'),
        confirmPassword: validator.string().required().valid(validator.ref('password')).label("Confirmation Password").messages({
            'string.base': 'Confirmation password must be a string',
            'any.required': 'Confirmation password is required',
            'any.only': 'Confirmation password must match password'
        })
    });
    const valid = registerInputSchema.validate({ firstName, lastName, email, password, confirmPassword }, { abortEarly: true });
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
        return res.status(400).json({ error: "Invalid verification link or it maybe expired" })
    } catch (error) {
        return res.status(400).json({ error: "Invalid verification link or it maybe expired" })
    }
}

function validateLoginInput(req, res, next) {
    const { email, password, remember } = req.body;

    const loginInputSchema = validator.object({
        email: validator.string().email().required().label('Email'),
        password: validator.string().required().label('Password'),
        remember: validator.boolean().default(false).label('Remember')
    });

    const valid = loginInputSchema.validate({ email, password, remember });

    if (checkValidity(valid)) {
        return next();
    }

    return res.status(400).json(error)
}

function validateEmailInput(req, res, next) {
    const { email } = req.body;
    const emailSchema = validator.object({
        email: validator.string().email().required().label('Email')
    });
    const valid = emailSchema.validate({ email });
    if (checkValidity(valid)) {
        return next();
    }
    return res.status(400).json(error)
}

function validatePasswordMatch(req, res, next) {
    const { password, confirmPassword } = req.body
    const matchPasswordSchema = validator.object({
        password: validator.string().required().label('Password'),
        confirmPassword: validator.string().required().valid(validator.ref('password')).label('Password confirmation').messages({
            'any.only': "Password confirmation must match password"
        })
    });

    const valid = matchPasswordSchema.validate({ password, confirmPassword });
    if (checkValidity(valid)) {
        return next();
    }
    return res.status(400).json(error)
}

function validateUpdateProfileInput(req, res, next) {
    const { firstName, lastName, email, password, bio } = req.body;

    const updateProfileSchema = validator.object({
        firstName: validator.string().required(),
        lastName: validator.string().required(),
        email: validator.string().email().required(),
        password: validator.string().required(),
        bio: validator.string()
    });
    const valid = updateProfileSchema.validate({ firstName, lastName, email, password, bio });
    if (checkValidity(valid)) {
        return next();
    }
    return res.status(400).json(error)
}

function checkValidity(valid) {
    if (valid.error) {
        error = {
            error: valid.error.details[0].message,
            field: valid.error.details[0].path[0]
        }
        return false;
    }
    return true;
}

module.exports = {
    validateRegistrationInput,
    validateEmailVerificationToken,
    validateLoginInput,
    validateEmailInput,
    validatePasswordMatch,
    validateUpdateProfileInput
}