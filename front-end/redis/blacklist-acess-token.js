const redis = require('redis');
const blacklist = redis.createClient({ prefix: 'blacklist-acess-token:' });
const manipulaLista = require('./manipula-lista');
const manipulaBlacklist = manipulaLista(blacklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto')

function gera_tokenhash(token){
    return createHash('sha256')
    .update(token)
    .digest('hex');
}

module.exports = {
    async adiciona(token) {
        const data_expiracao = jwt.decode(token).exp;
        const tokenHash = gera_tokenhash(token);
        await manipulaBlacklist.adiciona(tokenHash, '', data_expiracao);
    },

     async contemToken(token) {
        const tokenHash = gera_tokenhash(token);
        return manipulaBlacklist.contemToken(tokenHash);
    },
}