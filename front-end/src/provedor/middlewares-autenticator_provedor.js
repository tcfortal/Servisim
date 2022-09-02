const passport2 = require('passport');
const Provider = require('./provedor-modelo')

module.exports = {
    local2: (req, res, next) => {
        passport2.authenticate(
            'local2',
            { session: false },
            (erro, provedor, info) => {
                if (erro && erro.name === 'InvalidArgumentError') {
                    return res.status(401).json({ erro: erro.message });
                }

                if (erro) {
                    return res.status(500).json({ erro: erro.message });
                }

                if (!provedor) {
                    return res.status(401).json();
                }

                req.user = provedor
                return next();
            }
        )(req, res, next);
    },

    bearer2: (req, res, next) => {
        passport2.authenticate(
            'bearer2',
            { session: false },
            (erro, provedor, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: erro.message });
                }

                if (erro && erro.name === 'TokenExpiredError') {
                    return res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt });
                }

                if (erro) {
                    return res.status(500).json({ erro: erro.message });
                }

                if (!provedor) {
                    return res.status(401).json();
                }

                if (erro && erro.name === 'ExpirationError') {
                    return res.status(401).json({ erro: erro.message });
                }

                req.user = provedor
                return next();
            }
        )(req, res, next);
    },

    async verificacaoEmail2(req, res, next) {

        const { email } = req.params;
        const provedor = await Provider.buscaPorEmail(email);
        req.user = provedor;
        next();

    }
};