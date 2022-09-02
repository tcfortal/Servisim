const comments = require('./src/comments');
const usuarios = require('./src/usuarios');
const provedor2 = require('./src/provedor');
const service = require('./src/servicos');

module.exports = app => {
  app.get('/', (req, res) => { res.send('Olá pessoa!') });
  usuarios.rotas(app);
  comments.rotas(app);
  service.rotas(app);
  provedor2.rotas2(app);
};