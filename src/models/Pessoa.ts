//Arquivo models/Pessoa.js
/*const mongoose = require('mongoose');

const Pessoa = mongoose.model('Pessoa', {
	nome: String,
	salario: Number,
	ativo: Boolean
});

module.exports = Pessoa*/

import { Schema, model} from 'mongoose';


interface Pessoa {
	nome :string;
	salario :number;
	ativo :boolean;
}

const schPessoa = new Schema <Pessoa> ({
	nome: { type :String, required: true },
	salario: { type :Number, required: true },
	ativo: { type :Boolean, required: true}
});

export default model<Pessoa>('Pessoa', schPessoa);
//module.exports = PessoaModel;
