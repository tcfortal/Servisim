const passport2 = require('passport')
const LocalStrategy2 = require('passport-local').Strategy;
const BearerStrategy2 = require('passport-http-bearer').Strategy;

const Provedor_modelo = require('./provedor-modelo');
const { InvalidArgumentError } = require('../erros');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ObjectId = require("mongodb").ObjectId;
const Provedor = require('../models/services-provider');

function verificarProvedor(provedor) {
    if (!provedor) {
        throw new InvalidArgumentError('Não existe provedor com esse email');
    }
}

async function verificarSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Email ou senha inválidos');
    }
}

passport2.use('local2',
    new LocalStrategy2({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {    
        const provedor = await Provedor_modelo.buscaPorEmail(email);
        verificarProvedor(provedor);       
        await verificarSenha(senha, provedor.senhaHash);

        done(null, provedor);
        } catch (erro) {
            done(erro);
        } 
    })
);

passport2.use('bearer2',
    new BearerStrategy2(
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.Chave_JWT);
                const provedor = await Provedor_modelo.buscaPorId(payload.id);
                done(null, provedor, {token: token}); 
            } catch (erro) {
                done(erro);
            }

        }
    )
);

