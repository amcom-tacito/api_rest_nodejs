//configuração inicial
require('dotenv').config();
import ConfigDB from './configDB';
//const env = require('../.env');
//import * as dotenv from 'dotenv';
//dotenv.config();
const express = require('express');
//const mongoose = require('mongoose');

//IMPORTAÇÕES
const PessoaRoutes = require('./routes/pessoaRoutes');
const GenericoRoutes = require('./routes/genericoRoutes');
const app = express();

//################### MIDDLEWARES ########################
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//################### ROTAS ########################
app.use('/pessoa', PessoaRoutes);
app.use('/', GenericoRoutes);
//FIM MIDDLEWARES

//################### CONFIGURANDO BD #####################
new ConfigDB(app);