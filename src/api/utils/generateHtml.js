const types = require('./mail.types');

async function generateTemplate(name, link, type = types.welcome){

    //* TODO: Create actual template genearation function

    return `<h1>Hi ${name}</h1>
            <h2>Welcome to developerzilla.com</h2>
            <p>Please verify your email by <a href="${link}">clicking here</a></p>
            <p>Otherwise copy the following link & paste in your browser</p>
            <a href="${link}">${link}</a>`
}

module.exports = generateTemplate