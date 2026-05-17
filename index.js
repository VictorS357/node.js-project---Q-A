const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database'); //importei a conexão criada com a database
const Perguntas = require('./database/Pergunta'); //importei a tabela criada com o model
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
  Perguntas.findAll({ raw: true, order: [ //isso permite trocar a ordem de exibição dos itens
    ['id', 'DESC'] // ASC = Crescente || DESC = Descrescente
  ] }).then(perguntas => { //esse json retira as informações adicionais sobre as perguntas, exibindo assim, apenas as perguntas
    res.render('index', {
      perguntas: perguntas
    });
  });
  
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
  const titulo = req.body.titulo; //Primeiro eu recebo os dados do formulário e salvo em variáveis
  const descricao = req.body.descricao;
  //Body parser permite utilizar o objeto body para pegar os dados da página pelo atributo 'name' no html
  Perguntas.create({ //Depois eu passo os dados do formulário para a tabela já criada
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect('/'); //Depois eu redireciono o usuário para a minha página principal
  })
});

app.get('/pergunta/:id', (req, res) => {
  const id = req.params.id;
  Perguntas.findOne({
    where: {id: id}
  }).then(pergunta => {
    if (pergunta != undefined) { //pergunta encontrada
      res.render('pergunta');
    } else {
      res.redirect('/');
    }
  });
});

app.listen(4000, () => {
  console.log('App rodando!');
});