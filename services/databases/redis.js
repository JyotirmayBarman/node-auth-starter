const redis = require('redis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL || null;

const client = redis.createClient({
    url: redisUrl
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