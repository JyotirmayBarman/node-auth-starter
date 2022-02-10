const http = require('http');
const app = require('./app');
require('dotenv').config();
const redis = require('./config/databases/redis')

const mongo = require('./config/databases/mongo')

const PORT=process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT,async ()=>{
    console.log(`listening on port: http://localhost:${PORT}`);
    await mongo.mongoConnect();
    await redis.connect();
})