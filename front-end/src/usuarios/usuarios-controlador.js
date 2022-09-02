const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
const jwt = require('jsonwebtoken');

const ObjectId = require("mongodb").ObjectId;
const Person = require('../models/Person');

const crypto = require('crypto');
const moment = require('moment');

///const blacklist = require('../../redis/blacklist-acess-token')
///const refreshlist = require('../../redis/refresh_token_list')
const { EmailVerificacao } = require('./email');

function geraEndereco(rota, email) {
  const baseURL = 'localhost:3002/';
  return `${baseURL}${rota}${email}`
}

function criaTokenJWT(usuario) {
  const payload = {
    id: usuario.id
  };

  const token = jwt.sign(payload, process.env.Chave_JWT, { expiresIn: '15m' });

  return token;

}

async function criaRefreshToken(usuario) {
  const refresh_token = crypto.randomBytes(24).toString('hex');
  const dataExperiracao = moment().add(5, 'd').unix();
  //await refreshlist.adiciona(refresh_token, usuario.id, dataExperiracao)

  return refresh_token;
}

function token_email(usuario) {
  const payload = {
    email: usuario.email
  };

  const token = jwt.sign(payload, process.env.Chave_JWT, { expiresIn: '30m' });

  return token;

}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha, telefone, genero, data_nascimento, endereco, cidade, estado } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
        telefone,
        genero,
        data_nascimento,
        endereco,
        cidade,
        estado
      });

      await usuario.adicionaSenha(senha);

      await usuario.adiciona();

      const token = token_email(usuario);

      const endereco_email = geraEndereco('usuario/verifica_email/', token)
      const emailVerificacao = new EmailVerificacao(usuario, endereco_email);
      emailVerificacao.enviaEmail().catch(console.log());

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

  login: async (req, res) => {
    try {
      const token = criaTokenJWT(req.user);
      const refreshToken = await criaRefreshToken(req.user);
      await Usuario.verificaemail(req.user.emailVerificado)
      res.set('Authorization', token);
      res.status(200).send({ refreshToken, token });
    } catch (erro) {
      res.status(500).json({ erro: erro.message })
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.token
      ///await blacklist.adiciona(token)  //logout redis
      res.status(204).send()
    } catch (erro) {
      res.status(500).json({ erro: erro.message })
    }
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  update: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.update(req.params.id, { $set: req.body });
      const token = req.token
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  lista_email: async (req, res) => {
    const usuario = await Usuario.buscaPorEmail(req.params.email);

    try {
      res.status(200).send(usuario);
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  busca_id: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);

    try {
      res.status(200).send(usuario);
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  modificaEmailVerificado: async (req, res) => {
    try {
      const payload = jwt.verify(req.params.email, process.env.Chave_JWT);

      const usuario = await Usuario.buscaPorEmail(payload.email);
      
      await usuario.update_email(payload.email, { $set: { emailVerificado: true } });
      res.status(200).send('<h1>Email verificado com sucesso!</h1>');
    } catch (erro) {
      if (erro && erro.name === 'TokenExpiredError') {
        res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt });
      } else {
        res.status(500).json({ erro: erro });
      };
    }
  },

}
