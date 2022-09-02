const { get } = require('http');
const { promisify } = require('util');

module.exports = lista => {
    const setAsync = promisify(lista.set).bind(lista);
    const existsAsync = promisify(lista.exists).bind(lista);
    const getAsync = promisify(lista.get).bind(lista);
    const delAsync = promisify(lista.del).bind(lista);

    return {
        async adiciona(chave, valor, data_expiracao) {
            await setAsync(chave, valor);
            lista.expireat(chave, data_expiracao)
        },

        async contemToken(chave) {
            const resultado = await existsAsync(chave);
            return resultado === 1;
        },

        async buscaValor(chave) {
            return getAsync(chave)
        },

        async deleta(chave) {
            return delAsync(chave)
        }
    }

}