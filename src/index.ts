//configuração inicial
require('dotenv').config();
import ConfigDB from './configDB';
const cors = require('cors');
const express = require('express');


//IMPORTAÇÕES
const PessoaRoutes = require('./routes/pessoaRoutes');
const GenericoRoutes = require('./routes/genericoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const app = express();

//################### MIDDLEWARES ########################
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//################### ROTAS ########################
app.use('/', GenericoRoutes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/pessoa', PessoaRoutes);
//FIM MIDDLEWARES

//################### CONFIGURANDO BD #####################
new ConfigDB(app);