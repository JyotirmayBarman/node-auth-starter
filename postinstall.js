const fs = require('fs');
const {execSync} = require('child_process')
if (!fs.existsSync('./.env')){
    execSync("echo \"PORT=8000\n\nMONGO_URL=mongodb://localhost:27017/node_auth\n\nREDIS_URL=redis://localhost:6379\n\nREFRESH_TOKEN_SECRET=M@iR3fr3sHt0KenS3cR3T\nVERIFY_EMAIL_SECRET=v3riFYem@@iLsssecret\n\nMAIL_ENV=smtp\nSMTP_HOST=your-smtp-relay\nSMTP_PORT=587\nSMTP_USERNAME=your@username\nSMTP_PASSWORD=K5cr2zqbBYA4fkZD\" > .env");
}
if (!fs.existsSync('./.gitignore')){
    execSync("echo \"node_modules/\nuploads/\n.env\n.gitignore\" > .gitignore;")
}
if(!fs.existsSync('./uploads')){
    execSync("mkdir uploads")
}