"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pessoa_1 = __importDefault(require("../models/Pessoa"));
const FieldException_1 = __importDefault(require("../models/FieldException"));
const Exception_1 = __importDefault(require("../models/Exception"));
class PessoaController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pessoas = yield Pessoa_1.default.find();
                res.status(200).json(pessoas);
            }
            catch (err) {
                res.status(500).json({ mensagem: `Ocorreu um erro ao buscar os dados`, erro: err.message });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pessoa = yield Pessoa_1.default.findOne({ _id: id });
                if (!pessoa) {
                    throw new Exception_1.default(404, "{mensagem: `Cadastro não encontrado`, filtro:{id}}");
                }
                res.status(200).json(pessoa);
            }
            catch (erro) {
                //const varToString = (varObj :Object) => Object.keys(varObj)[1]
                if (erro.constructor.name == "FieldException") {
                    res.status(erro.code).json({ Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix });
                }
                else if (erro.constructor.name == "Exception") {
                    res.status(erro.code).json(erro.msg);
                }
                else {
                    res.status(500).json({ mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message });
                }
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, salario, ativo } = req.body; //destructuring
                const created_at = new Date();
                const updated_at = new Date();
                const varToString = (varObj) => Object.keys(varObj)[0];
                if (typeof (nome) != "string") {
                    console.log("Nome :" + typeof (nome));
                    throw new FieldException_1.default(422, "O nome do usuário é obrigatório", varToString({ nome }), "string", typeof (nome));
                }
                if (typeof (salario) != "number") {
                    console.log("Salario :" + typeof (salario));
                    throw new FieldException_1.default(422, "O salário do usuário é obrigatório", varToString({ salario }), "number", typeof (salario));
                }
                if (typeof (ativo) != "boolean") {
                    console.log("Ativo :" + typeof (ativo));
                    throw new FieldException_1.default(422, "O status do usuário é obrigatório", varToString({ ativo }), "boolean", typeof (ativo));
                }
                const pessoa = { nome, salario, ativo, created_at, updated_at };
                //criando dados
                yield Pessoa_1.default.create(pessoa);
                res.status(201).json({
                    mensagem: 'Pessoa criada com sucesso!',
                    dados: [
                        {
                            nome: pessoa.nome,
                            salario: pessoa.salario,
                            ativo: pessoa.ativo,
                            created_at: pessoa.created_at,
                            updated_at: pessoa.updated_at
                        }
                    ]
                });
            }
            catch (erro) {
                //const varToString = (varObj :Object) => Object.keys(varObj)[1]
                if (erro.constructor.name == "FieldException") {
                    res.status(erro.code).json({ Criado: false, Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix });
                }
                else if (erro.constructor.name == "Exception") {
                    res.status(erro.code).json(erro.msg);
                }
                else {
                    res.status(500).json({ mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message });
                }
            }
        });
    }
    static updateByIdPUT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, salario, ativo } = req.body;
                const updated_at = new Date();
                const varToString = (varObj) => Object.keys(varObj)[0];
                if (typeof (nome) != "string") {
                    console.log("Nome :" + typeof (nome));
                    throw new FieldException_1.default(422, "O nome do usuário é obrigatório", varToString({ nome }), "string", typeof (nome));
                }
                if (typeof (salario) != "number") {
                    console.log("Salario :" + typeof (salario));
                    throw new FieldException_1.default(422, "O salário do usuário é obrigatório", varToString({ salario }), "number", typeof (salario));
                }
                if (typeof (ativo) != "boolean") {
                    console.log("Ativo :" + typeof (ativo));
                    throw new FieldException_1.default(422, "O status do usuário é obrigatório", varToString({ ativo }), "boolean", typeof (ativo));
                }
                const pessoaUp = { nome, salario, ativo, updated_at };
                //Verificar no banco se a pessoa existe
                const id = req.params.id;
                const pessoa = yield Pessoa_1.default.findOne({ _id: id });
                if (!pessoa) {
                    throw new Exception_1.default(404, { mensagem: "Cadastro não encontrado", filtro: { id } });
                }
                //Se existe, alteramos
                const upPessoa = yield Pessoa_1.default.updateOne({ _id: id }, pessoaUp, { "upsert": true });
                const pessoaUpted = yield Pessoa_1.default.findOne({ _id: id });
                //Se foi alterada, retornar os dados.
                if (upPessoa.modifiedCount > 0) {
                    res.status(200).json({
                        mensagem: 'Cadastro atualizado com sucesso!',
                        retorno: [upPessoa],
                        dados: [{ antigo: pessoa, novo: pessoaUpted }]
                    });
                }
                else {
                    throw new Exception_1.default(422, { mensagem: "Cadastro não atualizado. Sem dados novos." });
                }
            }
            catch (erro) {
                //const varToString = (varObj :Object) => Object.keys(varObj)[1]
                if (erro.constructor.name == "FieldException") {
                    res.status(erro.code).json({ Atualizado: false, Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix });
                }
                else if (erro.constructor.name == "Exception") {
                    res.status(erro.code).json(erro.msg);
                }
                else {
                    res.status(500).json({ mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message });
                }
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const pessoa = yield Pessoa_1.default.findOne({ _id: id });
                if (!pessoa) {
                    throw new Exception_1.default(404, { mensagem: `Cadastro não encontrado`, filtro: { id } });
                }
                const delPessoa = yield Pessoa_1.default.deleteOne({ _id: id });
                if (delPessoa.deletedCount > 0) {
                    res.status(200).json({ mensagem: "Usuário removido com sucesso!", retorno: [delPessoa], dados: [pessoa] });
                }
                else {
                    throw new Exception_1.default(422, { mensagem: "Usuário não pôde ser removido." });
                }
            }
            catch (erro) {
                if (erro.constructor.name == "FieldException") {
                    res.status(erro.code).json({ Deletado: false, Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix });
                }
                else if (erro.constructor.name == "Exception") {
                    res.status(erro.code).json(erro.msg);
                }
                else {
                    res.status(500).json({ mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message });
                }
            }
        });
    }
}
exports.default = PessoaController;
