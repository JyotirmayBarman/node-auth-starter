// Here connection to mongodb lives
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on('open',()=>{
    console.log("Connected To Mongo DB");
});



async function mongoConnect(){
    try {
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
    } catch (error) {
        console.log(error);
    }
};

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}
