const nodemailer = require('nodemailer');
require('dotenv').config();

let sendMail = ()=>{console.log("Invalid Email Configuration");}
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

    sendMail = async (message) => {    
        const msg = {
            from:`Developerzilla <no-reply@developerzilla.com>`,
            to:`'${message.to.name}' <${message.to.email}>`,
            subject: message.subject,
            html: message.html,
        };

        try {  
            const res = await transporter.sendMail(msg);
            console.log(res);
        } catch (error) {
            console.log(error);
        }   
    }
}else {
    console.log("Error: Provide A Valid mailing service");
}



module.exports = {
    sendMail
}
