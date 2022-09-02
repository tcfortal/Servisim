const Services = require('./servicos-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');

module.exports = {
  adiciona: async (req, res) => {
    try {
      const service = new Services(req.body);
      await service.adiciona();

      res.status(201).send(service);
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  lista: async (req, res) => {
    try {
      const services = await Services.lista();
      res.send(services);
    } catch (erro) {
      return res.status(500).json({ erro: erro });
    }
  },

  deleta: async (req, res) => {
    const services = await Services.buscaPorId(req.params.id);
    try {
      await services.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  update: async (req, res) => { 
    await Services.update(req.params.id, {$set: req.body});  
    try {
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  busca_id_provedor: async (req, res) => {
    const services = await Services.buscaPorId_provedor(req.params.id_provedor);

    try {
      res.status(200).send(services);
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  busca_id_cliente: async (req, res) => {
    const services = await Services.buscaPorId_cliente(req.params.id_cliente);

    try {
      res.status(200).send(services);
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },
};
