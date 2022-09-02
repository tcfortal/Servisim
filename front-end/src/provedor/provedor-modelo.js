const { InvalidArgumentError } = require('../erros');
const validacoes = require('../validacoes-comuns');
const bcrypt = require('bcrypt');

const servicesprovider = require('../models/services-provider');
const ObjectId = require("mongodb").ObjectId;


class Provedor {
  constructor(provedor) {
    this.id = provedor.id;
    this.nome = provedor.nome;
    this.email = provedor.email;
    this.senhaHash = provedor.senhaHash;
    this.telefone = provedor.telefone;
    this.genero = provedor.genero;
    this.data_nascimento = provedor.data_nascimento;
    this.cidade = provedor.cidade;
    this.estado = provedor.estado;
    this.endereco = provedor.endereco;
    this.descricao = provedor.descricao;
    this.services = provedor.services;

    this.valida();
  }

  async adiciona() {
    if (await Provedor.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return servicesprovider.create(this);
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
    validacoes.campoTamanhoMaximo(this.descricao, 'descricao', 200);
    validacoes.campoStringNaoNulo(senha, 'senha');
    validacoes.campoTamanhoMinimo(senha, 'senha', 8);
    validacoes.campoTamanhoMaximo(senha, 'senha', 16);
    validacoes.senhaForte(senha, 'senha');

    this.senhaHash = await Provedor.gerarSenhaHash(senha);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.nome, 'nome');
    validacoes.campoStringNaoNulo(this.email, 'email');
  }

  async deleta() {
    return servicesprovider.deleteOne(this);
  }

  static async buscaPorId(id) {
    const provedor = await servicesprovider.findById({ _id: ObjectId(id) });
    if (!provedor) {
      return null;
    }

    return new Provedor(provedor);
  }

  static async buscaPorEmail(email) {
    const provedor = await servicesprovider.findOne({ email: email });
    if (!provedor) {
      return null;
    }

    return new Provedor(provedor);
  }

  static lista() {
    return servicesprovider.find();
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

    return servicesprovider.findByIdAndUpdate({ _id: ObjectId(id) }, new_value);
  }

  async update_email(email, new_value) {

    return servicesprovider.updateOne({ email: email }, new_value);

  }

  static async verificaemail(emailVerificado) {
    validacoes.validaEmail(emailVerificado);
  }
}
module.exports = Provedor;
