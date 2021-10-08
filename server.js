const http = require('http');
const app = require('./app');
require('dotenv').config();

const mongo = require('./services/databases/mongo')

const PORT=process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT,async ()=>{
    console.log(`listening on port: http://localhost:${PORT}`);
    await mongo.mongoConnect();
})