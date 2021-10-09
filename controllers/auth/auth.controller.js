const User = require('../../models/users/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('../../services/databases/redis')
/********************************************************************************************************* 
 * User input data should be validated beforehand with validator middllwares in router
 * Which means here all the data are clean and no need to validate again
 * 
 * If We also use "global error handler" then we don't need to use 'try-catch' anywhre in this controller 
 **********************************************************************************************************/




/* handles registration */
async function httpPostRegister(req, res) {

    //****** ALGORITHM*******//
    // 1. extract user data from req.body
    // 2. Check if user already exists in the DB
    // 3. If exists return error
    // 4. else hash the password using bcryptjs
    // 5. create a new user in the DB 
    // 6. create jwt verification token & save it to the DB to expire in 24 hours
    // 7. create verification link & sent to user's email & return success
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: 'User already exists with this email address' })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const verifyToken = generateVerificationToken(email);
    await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        verifyToken
    });

    const link = req.protocol + '://' + req.get('host') + req.baseUrl + '/verify/' + verifyToken;
    const name = firstName + ' ' + lastName;
    let message = {
        to: { name, email },
        subject: 'Verify email address ✔',
        html: `<h1>Hello ${name} ,</h1><br>
                We are thrilled to have you on board<br>
                Please verify your email by clicking this button below <br>
                <a href="${link}">Verify</a>`
    };

    //TODO: SEND ACTUAL MAIL for now jus log to the console
    console.log(message);

    return res.status(201).json({ message: "Successfully registered" });
}


/* handles email validation after registration */
async function httpPostVerifyEmail(req, res) {

    //****** ALGORITHM*******//
    // 1. extract verification token from request parameters
    // 2. Check if verify token exists in the DB with the unverified user
    // 3. If doesn't then return error
    // 4. otherwise the token is already checked in the validator middleware for its expiry so it's not expired if req reaches here
    // 5. set the user as verified & remove verifytoken from DB & return success
    const token = req.params.token;
    const user = await User.findOne({ verifyToken: token, verified: false });
    if (!user) {
        return res.status(404).json({ error: "Invalid verification link or it maybe expired" })
    }
    user.verifyToken = null;
    user.verified = true;
    await user.save();
    return res.status(200).json({
        message: "Email id successfully verified"
    });
}


/* handles logging in */
async function httpPostLogin(req, res) {

    //****** ALGORITHM*******//
    // 1. extract user data from req.body
    // 2. Check if user exists in the DB
    // 3. If doesn't then return error
    // 4. else check if the password matches
    // 5. If doesn't match return error
    // 6. else if remember option is true
    // 7. Then create a refresh token & store in redis DB which will (never or take much time) to expire
    // 8. send a strict same-site cookie to the browser with the token
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            error: "Invalid username or password"
        });
    }
    if (!user.verified) {
        return res.status(401).json({ error: "Email address must be verified before logging in" })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ error: "Invalid username or password" })
    }
    const { firstName, lastName, _id, role } = user;
    const expiry = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    const token = generateRefreshToken({ _id, role }, expiry);
    redis.SET(`${user._id}`, token, 'ex', expiry);
    return res.status(200).cookie('token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + expiry * 1000),
        httpOnly: true,
        secure: false
    }).json({
        message: "Logged in successfully",
        user: {
            _id,
            email,
            firstName,
            lastName,
            role
        }
    });
}

/* handles resending verification link to email */
async function httpPostResendVerificationLink(req, res) {
    //****** ALGORITHM*******//
    // 1. extract email from req.body
    // 2. if already verified  then return error
    // 3. Otherwise generate verification token again & set it to expire in 24 hours
    // 4. construct the link and resend it to the user's email

    const { email } = req.body;
    const user = await User.findOne({ email, verified: false });
    if (!user) {
        return res.status(400).json({
            error: "User is already verified or does not exist"
        });
    }
    user.verifyToken = generateVerificationToken(user.email);
    await user.save();
    const link = req.protocol + '://' + req.get('host') + req.baseUrl + '/verify/' + user.verifyToken;
    const name = user.firstName + ' ' + user.lastName;
    let message = {
        to: { name, email },
        subject: 'Verify email address ✔',
        html: `<h1>Hello ${name} ,</h1><br>
                We are thrilled to have you on board<br>
                Please verify your email by clicking this button below <br>
                <a href="${link}">Verify</a>`
    };

    //TODO: SEND ACTUAL MAIL for now jus log to the console
    console.log(message);

    return res.status(200).json({
        message: "Verification link resent successfully"
    })
}


/* handles logging out */
async function httpPostLogout(req, res) {

    //****** ALGORITHM*******//
    // 1. extract userId from req.userId as authentication check is handled by a verifyRefreshToken middleware
    //// 2. and it sets userId to req for us
    //// 3. If the userId exists in redis DB where we keep track of logged in users then
    // 2. remove userId from the redis DB & return a  cookie with token = null 
    redis.DEL(req.userId);
    return res.status(200).cookie('token', 'null', {
        sameSite: 'strict',
        path: '/',
        httpOnly: true,
        secure: false
    }).json({
        message: "Logged out successfully"
    });
}

/* handles sending pw reset link to the user email*/
async function httpPostSendPasswordResetLink(req, res) {
    //****** ALGORITHM*******//
    // 1. extract email from req.body
    // 2. generate a resetToken which will expire in 24 hours & save it to DB
    // 3. construct the link and send it to the user's email
    const { email } = req.body;
    const user = await User.findOne({ email ,verified:true });
    if (!user) {
        return res.status(404).json({
            error:  "Invalid email address"
        });
    }
    user.resetToken = generateVerificationToken(email);
    await user.save();
    const link = req.protocol + '://' + req.get('host') + req.baseUrl + '/verify/' + user.resetToken;
    const name = user.firstName + ' ' + user.lastName;
    let message = {
        to: {name,email},
        subject: 'Reset password ✔',
        html: `<h1>Hello ${name},</h1><br>
                Reset your password by clicking this link
                <a href="${link}">Reset</a>`
    };
    console.log(message);
    return res.status(200).json({
        message:"Password reset link sent successfully"
    })
}


/* handles resetting password with reset token */
async function httpPostResetPassword(req, res) {
    //****** ALGORITHM*******//
    // 1. extract reset token,password from request parameters & body respectively
    // 2. Check if reset token exists in the DB
    // 3. If doesn't then return error
    // 4. else check if the token is expired or not with jwt 
    // 5. if expired then return error
    // 5. otherwise encrypt the password with bcryptjs and set new password



}

/* returns user details if logged in */
async function httpGetLoggedInUser(req, res) {
    //****** ALGORITHM*******//
    // 1. extract userId from req.userId as authentication check is handled by a verifyRefreshToken middleware
    //// 2. and it sets userId to req for us
    //// 3. If the userId exists in redis DB where we keep track of logged in users then
    // 2. find user details using userId 
    // 3. If details found retun user details with success
    // 4. Else return error

}

/* handles updation of profile  */
async function httpPatchUpdateProfile(req, res) {
    //****** ALGORITHM*******//
    // 1. extract userId from req.userId as authentication check is handled by a verifyRefreshToken middleware
    //// 2. and it sets userId to req for us
    //// 3. If the userId exists in redis DB where we keep track of logged in users then
    // 2. find user details using userId 
    // 3. If details found then extract user update fields from req.body Else return error
    // 4. if password needs to be updated make sure old pass matches 
    // 5. if email needs to be updated then set email to newEmail in DB & generate verify token with 24 hours of expiry
    // 6. Then send the verfication link to new email
    // 7. change other details without any condition
    // 8. Lastly save the user & return success


}

/* handles email updation if anyone request for */
async function httpPatchUpdateEmailVerify(req, res) {

    //****** ALGORITHM*******//
    // 1. extract verification token from request parameters
    // 2. Check if verify token exists in the DB with the newEmail option
    // 3. If doesn't then return error
    // 4. else check if the token is expired or not with jwt 
    // 5. if expired then return error
    // 5. otherwise set the newEmail as user's email & remove verifytoken from DB & return success


}



//* Other helper functions *//

/* Generates jwt refresh token */
function generateRefreshToken(data, expiry = null) {
    let token;
    if (expiry) {
        token = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: expiry });
    } else {
        token = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET);
    }
    return token;
}

/* Generates jwt email verification token */
function generateVerificationToken(data) {
    const token = jwt.sign({ data }, process.env.VERIFY_EMAIL_SECRET, { expiresIn: '24h' });
    return token;
}



module.exports = {
    httpPostRegister,
    httpPostVerifyEmail,
    httpPostLogin,
    httpPostResendVerificationLink,
    httpPostLogout,
    httpPostSendPasswordResetLink
}