function errorResolver(cb){
    return function (req,res,next) {
        return Promise.resolve(cb(req,res,next)).catch(next);
    }
}

function errorHandler(err, req, res, next){
    console.log(err);
    return res.status(500).json({
        error:"Something went wrong"
    })
}

module.exports = {
    errorResolver,
    errorHandler
}