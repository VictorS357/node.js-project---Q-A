const Sequelize = require('sequelize');
const connection = require('./database');
const { response } = require('express');

const Resposta = connection.define('resposta', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({force: false}).then(() => {
  console.log('Tabela de respostas criada!')
});

module.exports = Resposta;