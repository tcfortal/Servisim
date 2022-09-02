const validacoes = require('../validacoes-comuns');
const ObjectId = require("mongodb").ObjectId;
const Services = require('../models/Service');

class Service {
  constructor(service) {
    this.id_provedor = service.id_provedor;
    this.nome_provedor = service.nome_provedor;
    this.id_cliente = service.id_cliente;
    this.status = service.status;
    this.data_servico = service.data_servico;
    this.data_postagem = service.data_postagem;
    this.descricao = service.descricao;
    this.valor = service.valor;
    this.valor_pago = service.valor_pago;
    this.nome_cliente = service.nome_cliente;
    this.endereco_cliente = service.endereco_cliente;
    this.valida();
  }

  adiciona() {
    return Services.create(this);
  }

  valida() {
    validacoes.campoStringNaoNulo(this.descricao, 'conteúdo');
    validacoes.campoTamanhoMaximo(this.descricao, 'conteúdo', 250);
  }

  static lista() {
    return Services.find();
  }

  static async update(id, new_value) {
    return Services.findByIdAndUpdate({ _id: ObjectId(id) }, new_value);
  }


  static async buscaPorId(id) {
    const service = await Services.findById({ _id: ObjectId(id) });
    if (!service) {
      return null;
    }

    return new Service(service);
  }

  static async buscaPorId_provedor(id_provedor) {
    return Services.find({ id_provedor: id_provedor }).sort([['createdAt', -1]]);
  }

  static async buscaPorId_cliente(id_cliente) {
    return Services.find({ id_cliente: id_cliente }).sort([['createdAt', -1]]);
  }

  async deleta() {
    return Services.deleteOne(this);
  }
}

module.exports = Service;
