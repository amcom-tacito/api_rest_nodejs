"use strict";
//Arquivo models/Pessoa.js
/*const mongoose = require('mongoose');

const Pessoa = mongoose.model('Pessoa', {
    nome: String,
    salario: Number,
    ativo: Boolean
});

module.exports = Pessoa*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schPessoa = new mongoose_1.Schema({
    nome: { type: String, required: true },
    salario: { type: Number, required: true },
    ativo: { type: Boolean, required: true }
});
exports.default = (0, mongoose_1.model)('Pessoa', schPessoa);
//module.exports = PessoaModel;
