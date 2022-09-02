const { InvalidArgumentError } = require('../erros');
const validacoes = require('../validacoes-comuns');
const bcrypt = require('bcrypt');

const Person = require('../models/Person');
const { JsonWebTokenError } = require('jsonwebtoken');
const ObjectId = require("mongodb").ObjectId;

class Usuario {
  constructor(usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senhaHash = usuario.senhaHash;
    this.telefone = usuario.telefone;
    this.genero = usuario.genero;
    this.data_nascimento = usuario.data_nascimento;
    this.cidade = usuario.cidade;
    this.estado = usuario.estado;
    this.endereco = usuario.endereco;
    this.endereco = usuario.endereco;
    this.emailVerificado = usuario.emailVerificado;

    this.valida();
  }

  async adiciona() {
    if (await Usuario.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return Person.create(this);
  }

  async adicionaSenha(senha) {

    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoTamanhoMaximo(this.nome, 'nome', 50);
    validacoes.validaInput(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.telefone, 'telefone');
    validacoes.campoStringNaoNulo(this.genero, 'genero');
    validacoes.campoStringNaoNulo(this.cidade, 'cidade');
    validacoes.campoTamanhoMaximo(this.cidade, 'cidade', 50);
    validacoes.campoStringNaoNulo(this.estado, 'estado');
    validacoes.campoTamanhoMaximo(this.estado, 'estado', 50);
    validacoes.campoStringNaoNulo(this.endereco, 'endereco');
    validacoes.campoTamanhoMaximo(this.endereco, 'endereco', 100);
    validacoes.validaDataNascimento(this.data_nascimento, 'data_nascimento');
    validacoes.campoStringNaoNulo(senha, 'senha');
    validacoes.campoTamanhoMinimo(senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(senha, 'senha', 16);
    validacoes.senhaForte(senha, 'senha');


    this.senhaHash = await Usuario.gerarSenhaHash(senha);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.email, 'email');
  }


  async deleta() {
    return Person.deleteOne(this);
  }

  static async buscaPorId(id) {
    const usuario = await Person.findById({ _id: ObjectId(id) });
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static async buscaPorEmail(email) {
    const usuario = await Person.findOne({ email: email });
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static lista() {
    return Person.find();
  }

  static gerarSenhaHash(senha) {
    const custoHash = 12;
    return bcrypt.hash(senha, custoHash);
  }

  async update(id, new_value) {
    validacoes.campoStringNaoNulo(new_value.$set.nome, 'nome')
    validacoes.campoTamanhoMaximo(new_value.$set.nome, 'nome', 50);
    validacoes.validaInput(new_value.$set.nome, 'nome');
    validacoes.campoStringNaoNulo(JSON.stringify(new_value.$set.telefone), 'telefone');
    validacoes.campoStringNaoNulo(new_value.$set.genero, 'genero');
    validacoes.campoStringNaoNulo(new_value.$set.cidade, 'cidade');
    validacoes.campoTamanhoMaximo(new_value.$set.cidade, 'cidade', 50);
    validacoes.campoStringNaoNulo(new_value.$set.estado, 'estado');
    validacoes.campoTamanhoMaximo(new_value.$set.estado, 'estado', 50);
    validacoes.campoStringNaoNulo(new_value.$set.endereco, 'endereco');
    validacoes.campoTamanhoMaximo(new_value.$set.endereco, 'endereco', 100);


    return Person.findByIdAndUpdate({ _id: ObjectId(id) }, new_value);
  }

  async update_email(email, new_value) {

    return Person.updateOne({ email: email }, new_value);

  }

  static async verificaemail(emailVerificado) {
    validacoes.validaEmail(emailVerificado);
  }

}

module.exports = Usuario;
