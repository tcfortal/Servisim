const Provedor = require('./provedor-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
const jwt = require('jsonwebtoken');

const ObjectId = require("mongodb").ObjectId;
const services_provider = require('../models/services-provider');

const crypto = require('crypto');
const moment = require('moment');

const { EmailVerificacao2 } = require('./email');

function geraEndereco(rota, email) {
  const baseURL = 'localhost:3002/';
  return `${baseURL}${rota}${email}`
}

function criaTokenJWT(provedor) {
    const payload = {
      id: provedor.id
    };

    const token = jwt.sign(payload, process.env.Chave_JWT, { expiresIn: '30m' });
    return token;

}

function criaRefreshToken(provedor) {
  const refresh_token =  crypto.randomBytes(24).toString('hex');
  const dataExperiracao = moment().add(5, 'd').unix();
  
  return refresh_token;
}

function token_email(provedor) {
  const payload = {
    email: provedor.email
  };

  const token = jwt.sign(payload, process.env.Chave_JWT, { expiresIn: '30m' });

  return token;

}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha, telefone, genero, data_nascimento, endereco, cidade, estado, services, descricao } = req.body;

    try {
      const provedor = new Provedor({
        nome,
        email,
        telefone,
        genero,
        data_nascimento,
        endereco,
        cidade,
        estado,
        services,
        descricao
      });

      await provedor.adicionaSenha(senha);

      await provedor.adiciona();

      const token = token_email(provedor);

      const endereco_email = geraEndereco('services-provider/verifica_email/', token)
      const emailVerificacao2 = new EmailVerificacao2(provedor, endereco_email);
      emailVerificacao2.enviaEmail().catch(console.log());

      res.status(201).json();
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

  login: (req, res) => {
    const token = criaTokenJWT(req.user);
    const refreshToken = criaRefreshToken(req.user);
    res.set('Authorization', token);
    res.status(200).send({ refreshToken, token });
  },

  logout: async (req, res) => {
    try {
      const token = req.token
      res.status(204).send()
    } catch (error) {
      res.status(500).json({erro: erro.message})
    }
  },

  lista_email: async (req, res) => {
    const provedor = await Provedor.buscaPorEmail(req.params.email);

    try {
      res.status(200).send(provedor);
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  lista: async (req, res) => {
    const provedor = await Provedor.lista();
    res.json(provedor);
  },

  busca_id: async (req, res) => {
    const provedor = await Provedor.buscaPorId(req.params.id);

    try {
      res.status(200).send(provedor);
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  update: async (req, res) => {
    const provedor = await Provedor.buscaPorId(req.params.id);;
    try {
      await provedor.update(req.params.id, { $set: req.body })
      const token = req.token
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  modificaEmailVerificado: async (req, res) => {
    try {
      const payload = jwt.verify(req.params.email, process.env.Chave_JWT);

      const provedor = await Provedor.buscaPorEmail(payload.email);
      
      await provedor.update_email(payload.email, { $set: { emailVerificado: true } });
      res.status(200).send('<h1>Email verificado com sucesso!</h1>');
    } catch (erro) {
      if (erro && erro.name === 'TokenExpiredError') {
        res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt });
      } else {
        res.status(500).json({ erro: erro });
      };
    }
  },
};
