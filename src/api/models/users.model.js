const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    newEmail:{
        type:String,
        default:null,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    verifyToken:{
        type:String,
    },
    resetToken:{
        type:String,
        default:null
    },
    verified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    avatar:{
        type:String
    },
    bio:{
        type:String,
        default:""
    }
},
{ 
    timestamps: true
});

module.exports = mongoose.model('user',userSchema);