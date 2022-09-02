const provedorControlador = require('./provedor-controlador');
const middlewaresAutenticacao2 = require('./middlewares-autenticator_provedor')
const passport2 = require('passport');

module.exports = app => {
  app
    .route('/services-provider/login')
    .post(
      middlewaresAutenticacao2.local2,
      provedorControlador.login
    );

  app
    .route('/services-provider')
    .post(provedorControlador.adiciona)
    .get(provedorControlador.lista)

  app
    .route('/services-provider/:email')
    .get(provedorControlador.lista_email);

  app
    .route('/services-provider-home/:id')
    .get(provedorControlador.busca_id);

  app
    .route('/services-update/:id')
    .put(
      middlewaresAutenticacao2.bearer2,
      provedorControlador.update);

  app
    .route('/services-provider/verifica_email/:email')
    .get(
      middlewaresAutenticacao2.verificacaoEmail2,
      provedorControlador.modificaEmailVerificado
    );

};