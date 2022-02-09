const fs = require('fs');
const {execSync} = require('child_process')
if (!fs.existsSync('./.env')){
    execSync("echo \"PORT=8000\nCORS_URLS='http://localhost:8000,http://localhost:8080'\n\nMONGO_URL=mongodb://localhost:27017/node_auth\n\nREDIS_URL=redis://localhost:6379\n\nREFRESH_TOKEN_SECRET=M@iR3fr3sHt0KenS3cR3T\nVERIFY_EMAIL_SECRET=v3riFYem@@iLsssecret\n\n#MAIL_ENV=smtp\n#SMTP_HOST=your-smtp-relay\n#SMTP_PORT=587\n#SMTP_USERNAME=your@username\n#SMTP_PASSWORD=K5cr2zqbBYA4fkZD\" > .env");
}
if (!fs.existsSync('./.gitignore')){
    execSync("echo \"node_modules/\nuploads/\n.env\n.gitignore\" > .gitignore;")
}
if(!fs.existsSync('./uploads')){
    execSync("mkdir uploads")
}
