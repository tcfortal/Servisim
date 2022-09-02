const usuariosControlador = require('./usuarios-controlador');
const middlewaresAutenticacao = require('./middlewares-autenticator');
const { response } = require('express');

module.exports = app => {
  app
    .route('/usuario/login')
    .post(
      middlewaresAutenticacao.local,
      usuariosControlador.login
    );

  app
    .route('/usuario/logout')
    .post(
      ///[middlewaresAutenticacao.refresh, middlewaresAutenticacao.bearer],
      middlewaresAutenticacao.bearer,
      usuariosControlador.logout
    );

  app
    .route('/usuario/atualiza_token')
    .post(
      ///middlewaresAutenticacao.refresh,
      usuariosControlador.login
    );

  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)

  app
    .route('/usuario_lista')
    .get(usuariosControlador.lista);

  app
    .route('/usuario/:email')
    .get(usuariosControlador.lista_email);

  app
    .route('/usuario-busca/:id')
    .get(usuariosControlador.busca_id);

  app
    .route('/usuario/:id')
    .delete(
      middlewaresAutenticacao.bearer,
      usuariosControlador.deleta);

  app
    .route('/usuario-update/:id')
    .put(
      middlewaresAutenticacao.bearer,
      usuariosControlador.update);

  app
    .route('/usuario/verifica_email/:email')
    .get(
      middlewaresAutenticacao.verificacaoEmail,
      usuariosControlador.modificaEmailVerificado
      );
};
