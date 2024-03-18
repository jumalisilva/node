// Biblioteca express
var express = require('express');

const app = express();

// Chamando a biblioteca handlebars
const handlebars = require('express-handlebars');

// Chamando a biblioteca body-parser
const bodyParser = require('body-parser');

// Requisição da minha tabela
const Post = require('./post');

// Configurando o handlebars e o template engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
}}));
app.set('view.engine', 'handlebars');

// Configurando a body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Criar rota
app.get('/cad', function(req, res){
    res.render('formulario.handlebars');
});

// Rota para a Home
app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
    res.render('home.handlebars', {posts: posts})
});  
});

// Uma nova rota post
app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    .then(function(){
        res.redirect('/')
    })
    .catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
});

// Criando a rota para deletar um post
app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso!")
    }).catch(function(erro){
        res.send("Essa postagem não existe.")
    })
});



// Porta do protocolo http
app.listen(8081, function(){
    console.log("O servidor está rodando no endereço http://localhost:8081");
});