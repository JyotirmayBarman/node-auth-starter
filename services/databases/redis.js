const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
    port:process.env.REDIS_PORT,
    host:process.env.REDIS_HOST
});

client.on('ready',()=>{
    console.log("Connected to redis & ready to use");
});

client.on('end',()=>{
    console.log("Disconnected from redis");
});
client.on('error',(err)=>{
    console.log(err.message);
})


module.exports = client;