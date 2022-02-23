//configuração inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//IMPORTAÇÕES
const PessoaRoutes = require('./routes/pessoaRoutes');

const app = express();



//INÍCIO - MIDDLEWARES
//forma de ler JSON / middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//declarar as rotas
app.use('/pessoa', PessoaRoutes);
//FIM MIDDLEWARES

//################### ROTAS ########################
app.get('/', (req, res) => {
	res.json({saudacao: 'Oi, Node.js!'});	
});

//String de conexão com o banco:
// "mongodb+srv://admin:Rpa#04102021@apicluster.c3zjm.mongodb.net/apinodejs_db?retryWrites=true&w=majority"
//Conectar ao banco e entregar uma porta para o express saber onde ele vai disponibilizar
mongoose.connect('mongodb+srv://'+ process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASSWORD) + '@apicluster.c3zjm.mongodb.net/'+ process.env.DB_NAME +'_db?retryWrites=true&w=majority')
.then(() => {
	console.log('Conectado ao MongoDB');
	app.listen(3000); //configurado no nodemon
})
.catch((err) => {
	console.log(err);
})