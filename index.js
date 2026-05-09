const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database'); //importei a conexão criada com a database
// Database

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!');
  })
  .catch((error) => {
    console.log(error);
  });

//Estou dizendo para o Express usar o EJS como view engine
//Criar uma pasta "views" e salvar os arquivos HTML dentro dela
//Isso é um padrão que o EJS tem para a leitura dos arquivos
app.set('view engine', 'ejs');
app.use(express.static('public')); //aceitar carregamento de arquivos estáticos (css, js no frontend, imagens...)
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
  const titulo = req.body.titulo; //Body parser permite utilizar o objeto body para pegar os dados da página pelo atributo 'name' no html
  const descricao = req.body.descricao;

  res.send(`Formulário recebido! Titulo: ${titulo} Descricao: ${descricao}`);
});

app.listen(4000, () => {
  console.log('App rodando!');
});