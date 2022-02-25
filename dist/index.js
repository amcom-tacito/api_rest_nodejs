"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//configuração inicial
require('dotenv').config();
const configDB_1 = __importDefault(require("./configDB"));
const cors = require('cors');
const express = require('express');
//IMPORTAÇÕES
const PessoaRoutes = require('./routes/pessoaRoutes');
const GenericoRoutes = require('./routes/genericoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const app = express();
//################### MIDDLEWARES ########################
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//################### ROTAS ########################
app.use('/', GenericoRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/pessoa', PessoaRoutes);
//FIM MIDDLEWARES
//################### CONFIGURANDO BD #####################
new configDB_1.default(app);
