const redis = require('redis');
const manipulaLista = require('./manipula-lista')
const refreshlist = redis.createClient({ prefix: 'refresh-token-list:' });

///module.exports = manipulaLista(refreshlist)