const validacoes = require('../validacoes-comuns');
const ObjectId = require("mongodb").ObjectId;
const Postt = require('../models/Post');
const { InvalidArgumentError } = require('../erros');

class Post {
  constructor(post) {
    this.id_provedor = post.id_provedor;
    this.comentario = post.comentario;
    this.estrelas = post.estrelas;

    this.valida();
  }

  adiciona() {
    if (!this.comentario) {
      throw new InvalidArgumentError('Comentário Vazio');
    }

    return Postt.create(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.comentario, 'conteúdo');
    validacoes.campoTamanhoMaximo(this.comentario, 'conteúdo', 250);
  }

  static lista() {
    return Postt.find();
  }

  static async buscaPorId_provedor(id_provedor) {
    return Postt.find({ id_provedor: id_provedor }).sort([['createdAt', -1]]);
  }
}

module.exports = Post;
