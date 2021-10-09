function errorResolver(cb) {
    return function (req, res, next) {
        return Promise.resolve(cb(req, res, next)).catch(next);
    }
}

function errorHandler(err, req, res, next) {

    const re = /^4\d\d$/
    if (re.test(err.status)) {
        return res.status(err.status).json({
            error: err.message,
        })
    }
    console.log(err);
    return res.status(500).json({
        error: "Internal Server error",
    });
}

module.exports = {
    errorResolver,
    errorHandler
}