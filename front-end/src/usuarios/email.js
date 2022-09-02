const nodemailer = require('nodemailer')
const { google } = require('googleapis');
const { gmail } = require('googleapis/build/src/apis/gmail');
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = encodeURIComponent(process.env.REDIRECT_URI);
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

class Email {
    async enviaEmail() {
        const accessToken = await oAuth2Client.getAccessToken()

        const transportador = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'servisim.auth@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const info = await transportador.sendMail(this);
    }
}

class EmailVerificacao extends Email {
    constructor(usuario, endereco) {
        super();
        this.from = '"ServiSIM" <servisim.auth@gmail.com>';
        this.to = usuario.email;
        this.subject = 'Verificação de Email';
        this.text = `Olá, ${usuario.nome}! Verifique seu email aqui: ${endereco}`;
        this.html = `<h1>Olá, ${usuario.nome}!</h1> 
        <div>Verifique seu email acessando o link abaixo<div> </br>
        <a href="${endereco}">${endereco}</a>`;
    }
}


module.exports = { EmailVerificacao }