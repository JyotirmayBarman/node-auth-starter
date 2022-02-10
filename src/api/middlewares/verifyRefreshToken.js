const jwt = require('jsonwebtoken');
const redis = require('../../config/databases/redis')



async function verifyRefreshToken(req,res,next){
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({error:"Refresh token invalid or expired"})
    }
    try {
        const valid = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
        if(!valid) {
            return res.status(401).json({error:"Refresh token invalid or expired"})
        }
        const id = valid.data._id;
        const value = await redis.GET(id);
        if(token == value){
            req.userId = id;
            next();
        }
        else{
            return res.status(400).json({error:"Refresh token invalid or expired"})
        }
    } catch (error) {
        return res.status(401).json({error:"Refresh token invalid or expired"})
    }
}

module.exports = verifyRefreshToken;