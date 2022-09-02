const serviceControlador = require('./servicos-controlador');
const middlewaresAutenticacao = require('../usuarios/middlewares-autenticator')
const middlewaresAutenticacao2 = require('../provedor/middlewares-autenticator_provedor')

module.exports = app => {
  app
    .route('/service')
    .get(serviceControlador.lista)
    .post(
      serviceControlador.adiciona
    );

  app
    .route('/service_provider/:id_provedor')
    .get(serviceControlador.busca_id_provedor);

  app
    .route('/service_client/:id_cliente')
    .get(serviceControlador.busca_id_cliente);

  app
    .route('/service_delete/:id')
    .delete(
      middlewaresAutenticacao.bearer,
      serviceControlador.deleta);

  app
    .route('/service_delete_2/:id')
    .delete(
      middlewaresAutenticacao2.bearer2,
      serviceControlador.deleta);

  app
    .route('/service-update/:id')
    .put(
      serviceControlador.update);

};
