const Sequelize = require('sequelize');
const connection = require('./database');
const { FORCE } = require('sequelize/lib/index-hints');
// Criação do model para a tabela
// Model é a representação da tabela do banco de dados, porém em JS
const Pergunta = connection.define('perguntas', { //Criação da tabela
  titulo: {
    type: Sequelize.STRING,
    allowNull: false //impede que esse campo receba valores nulos
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({force: false}).then(() => {
  console.log('Tabela criada!');
}); 
//sincroniza a tabela criada aqui com o banco de dados
//force: false faz com que não force a criação da tabela caso ela já exista