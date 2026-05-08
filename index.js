const express = require('express');
const app = express();

//Estou dizendo para o Express usar o EJS como view engine
//Criar uma pasta "views" e salvar os arquivos HTML dentro dela
//Isso é um padrão que o EJS tem para a leitura dos arquivos
app.set('view engine', 'ejs');
app.use(express.static('public')); //aceitar carregamento de arquivos estáticos (css, js no frontend, imagens...)

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.listen(4000, () => {
  console.log('App rodando!');
});