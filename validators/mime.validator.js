function validateImageInput(fieldName='image'){
    return (req,res,next)=>{
        const allowedMimeTypes = ['image/jpg','image/jpeg','image/png'];
        
        if(!req.file && req.method == 'PATCH'){
            return next();
        }
        else if(!req.file){
            return res.status(401).json({
                error:`${fieldName[0].toUpperCase() + fieldName.substring(1)} field should not be empty`,
                field:fieldName
            })
        }
        else if( req.file && allowedMimeTypes.includes(req.file.mimetype)){
            next();
        }
        else{
            return res.status(401).json({
                error:"Only .png, .jpg, .jpeg files are supported",
                field:fieldName
            })
        }
    }
}



module.exports = {
    validateImageInput
}
