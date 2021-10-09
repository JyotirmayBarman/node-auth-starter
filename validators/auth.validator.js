const validator = require('joi');

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
    const valid = registerInputSchema.validate({ firstName, lastName, email, password, confirmPassword },{ abortEarly: true });
    console.log(valid);
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
    validateRegistrationInput
}