function validateImageInput(req,res,next){
    const allowedMimeTypes = ['image/jpg','image/jpeg','image/png'];
    
    if(!req.file && req.method == 'PATCH'){
        return next();
    }
    else if(!req.file){
        return res.status(401).json({
            error:"Image field should not be empty",
            field:'image'
        })
    }
    else if( req.file && allowedMimeTypes.includes(req.file.mimetype)){
        next();
    }
    else{
        return res.status(401).json({
            error:"Only .png, .jpg, .jpeg files are supported",
            field:'image'
        })
    }
}



module.exports = {
    validateImageInput
}
