const nodemailer = require('../../config/email/nodemailer');
const types = require('./mail.types');
const generateHtml = require('./generateHtml');


async function sendMail(to, name, link, type=types.welcome){

    const html = await generateHtml(name, link, type);
    nodemailer.send({
        to:{
            name,
            email: to
        },
        html,
        from:{
            name:"Developerzilla",
            email:"admin@developerzilla.com"
        }
    });

}



module.exports = {
    sendMail
}
