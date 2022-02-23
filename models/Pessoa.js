//Arquivo models/Pessoa.js
const mongoose = require('mongoose');

const Pessoa = mongoose.model('Pessoa', {
	nome: String,
	salario: Number,
	ativo: Boolean
});

module.exports = Pessoa