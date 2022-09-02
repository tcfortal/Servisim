const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError } = require('../erros');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Person = require('../models/Person');

///const blacklist = require('../../redis/blacklist-acess-token')

function verificarUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com esse email');
    }
}

async function verificarSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Email ou senha inválidos');
    }
}

/*
async function verificaTokenNaBlacklist(token) {
    const tokenNaBlacklist = await blacklist.contemToken(token)
    if (tokenNaBlacklist) {
        throw new jwt.JsonWebTokenError('Token inválido por Logout!')
    }
}
*/

passport.serializeUser(
    function(user, done) {
        done(null, user.id);
  }
);

passport.deserializeUser(
    function(id, done) {
        Person.findOne({ _id: id }, function (err, user) {
            done(err, user);
        }
    );
  }
);

passport.use('local',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
        const usuario = await Usuario.buscaPorEmail(email);
        verificarUsuario(usuario);       
        await verificarSenha(senha, usuario.senhaHash);

        done(null, usuario);
        } catch (erro) {
            done(erro);
        } 
    })
);

passport.use('bearer',
    new BearerStrategy(
        async (token, done) => {
            try {
                //await verificaTokenNaBlacklist(token);
                const payload = jwt.verify(token, process.env.Chave_JWT);
                const usuario = await Usuario.buscaPorId(payload.id);
                done(null, usuario, {token: token});    
            } catch (erro) {
                done(erro);
            }

        }
    )
);