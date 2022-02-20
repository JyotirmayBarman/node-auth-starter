const nodemailer = require('nodemailer');
require('dotenv').config();

let send = (msg)=>{console.log("\x1b[33m%s\x1b[0m",'\bWARNING: Logging to console, as no mailing service is configured');console.log(msg);}
let transporter;

if(process.env.MAIL_ENV == 'api'){

    //TODO Custom configuration for any api lives here

}else if(process.env.MAIL_ENV == 'smtp'){
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    send = async (message) => {    
        const msg = {
            from:`${message.from.name} <${message.from.email}>`,
            to:`'${message.to.name}' <${message.to.email}>`,
            subject: message.subject,
            html: message.html,
        };

        try {  
            const res = await transporter.send(msg);
            console.log(res);
        } catch (error) {
            console.log(error);
        }   
    }
}else {
    console.log("\x1b[33m%s\x1b[0m","\bWARNING: No mailing service is configured hence mails will be console logged");
}



module.exports = {
    send
}
