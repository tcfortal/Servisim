const postsControlador = require('./posts-controlador');
const usuariosControlador = require('../usuarios/usuarios-controlador');
const middlewaresAutenticacao = require('../usuarios/middlewares-autenticator')

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    
  app
    .route('/post_add')
    .post(
      middlewaresAutenticacao.bearer,
      postsControlador.adiciona
    );

  app
    .route('/post/:id_provedor')
    .get(postsControlador.busca_id_provedor);
};
