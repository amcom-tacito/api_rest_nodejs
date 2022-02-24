//// IMPORTANDO O ROUTER DO express
const router :any = require('express').Router();
//const router = Router();

//// IMPORTANDO AS DEPENDÊNCIAS APENAS DESTE ARQUIVO
//const Pessoa = require('../models/Pessoa'); //Não preciso colocar a extensão
import Pessoa from '../models/Pessoa';
//const FieldException = require('../models/FieldException'); //Não preciso colocar a extensão
import FieldException from '../models/FieldException';
//const Exception = require('../models/Exception'); //Não preciso colocar a extensão
import Exception from '../models/Exception';

router.get('/', async (req :any, res :any) =>{
    try{       
        const pessoas = await Pessoa.find(); 
        res.status(200).json(pessoas);
    } catch (err :any){
        res.status(500).json({mensagem: `Ocorreu um erro ao buscar os dados`, erro: err.message});
    }
});

router.get('/:id', async (req :any, res :any) => {
    try{
        const id :String = req.params.id;
        const pessoa :any = await Pessoa.findOne({_id: id});
        if(!pessoa){
            throw new Exception(404, "{mensagem: `Cadastro não encontrado`, filtro:{id}}");
        }
        res.status(200).json(pessoa);
    } catch (erro :any){
        //const varToString = (varObj :Object) => Object.keys(varObj)[1]
        if(erro.constructor.name == "FieldException"){
            res.status(erro.code).json({Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix});
        } else if(erro.constructor.name == "Exception") {
            res.status(erro.code).json(erro.msg);
        } else {
            res.status(500).json({mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message});
        }
    }
});

router.post('/', async (req :any, res :any) => { //garantimos a função como assíncrona para esperarmos o DB
    try{
        const { nome, salario, ativo } = req.body //destructuring
        const created_at: Date = new Date();
        const updated_at: Date = new Date();
        const varToString = (varObj :Object) => Object.keys(varObj)[0]
        if(typeof(nome) != "string"){
            console.log("Nome :" + typeof(nome));
            throw new FieldException(422, "O nome do usuário é obrigatório", varToString({nome}), "string", typeof(nome));
        }
        if(typeof(salario) != "number"){
            console.log("Salario :" + typeof(salario));
            throw new FieldException(422, "O salário do usuário é obrigatório", varToString({salario}), "number", typeof(salario));
        }
        if(typeof(ativo) != "boolean"){
            console.log("Ativo :" + typeof(ativo));
            throw new FieldException(422, "O status do usuário é obrigatório", varToString({ativo}), "boolean", typeof(ativo));
        }
	    const pessoa = { nome, salario, ativo, created_at, updated_at };
        //criando dados
        await Pessoa.create(pessoa);
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
    } catch (erro :any){
        //const varToString = (varObj :Object) => Object.keys(varObj)[1]
        if(erro.constructor.name == "FieldException"){
            res.status(erro.code).json({Criado: false, Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix});
        } else if(erro.constructor.name == "Exception") {
            res.status(erro.code).json(erro.msg);
        } else {
            res.status(500).json({mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message});
        }
    }
});

//PUT = ATUALIZAÇÃO TOTAL & PATCH = ATUALIZAÇÃO PARCIAL
router.put('/:id', async (req :any, res :any) => {
    try {
        const {nome, salario, ativo} = req.body;
        const updated_at: Date = new Date();
        const varToString = (varObj :Object) => Object.keys(varObj)[0]
        if(typeof(nome) != "string"){
            console.log("Nome :" + typeof(nome));
            throw new FieldException(422, "O nome do usuário é obrigatório", varToString({nome}), "string", typeof(nome));
        }
        if(typeof(salario) != "number"){
            console.log("Salario :" + typeof(salario));
            throw new FieldException(422, "O salário do usuário é obrigatório", varToString({salario}), "number", typeof(salario));
        }
        if(typeof(ativo) != "boolean"){
            console.log("Ativo :" + typeof(ativo));
            throw new FieldException(422, "O status do usuário é obrigatório", varToString({ativo}), "boolean", typeof(ativo));
        }
        const pessoaUp = {nome, salario, ativo, updated_at};
        //Verificar no banco se a pessoa existe
        const id :string = req.params.id;
        const pessoa = await Pessoa.findOne({_id: id});
        if(!pessoa){
            throw new Exception(404, {mensagem: "Cadastro não encontrado", filtro:{id}});
        }

        //Se existe, alteramos
        const upPessoa = await Pessoa.updateOne({_id:id}, pessoaUp, {"upsert": true});
        const pessoaUpted = await Pessoa.findOne({_id:id});
        
        //Se foi alterada, retornar os dados.
        if(upPessoa.modifiedCount > 0){
            res.status(200).json({
                mensagem: 'Cadastro atualizado com sucesso!', 
                retorno: [upPessoa],
                dados:[{antigo: pessoa, novo: pessoaUpted}]
            });
        } else {
            throw new Exception(422, {mensagem: "Cadastro não atualizado. Sem dados novos."}); 
        }
    } catch (erro :any){
        //const varToString = (varObj :Object) => Object.keys(varObj)[1]
        if(erro.constructor.name == "FieldException"){
            res.status(erro.code).json({Atualizado: false, Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix});
        } else if(erro.constructor.name == "Exception") {
            res.status(erro.code).json(erro.msg);
        } else {
            res.status(500).json({mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message});
        }
    }
});

router.delete('/:id', async (req :any, res :any) => {
    try{
        const id :string = req.params.id;
        const pessoa = await Pessoa.findOne({_id: id});
        if(!pessoa){
            throw new Exception(404, {mensagem: `Cadastro não encontrado`, filtro:{id}});
        }
        const delPessoa = await Pessoa.deleteOne({_id:id});
        if(delPessoa.deletedCount > 0){
           res.status(200).json({mensagem: "Usuário removido com sucesso!", retorno: [delPessoa], dados:[pessoa]});
        } else {
            throw new Exception(422, {mensagem: "Usuário não pôde ser removido."}); 
        }
    } catch (erro :any){
        //const varToString = (varObj :Object) => Object.keys(varObj)[1]
        if(erro.constructor.name == "FieldException"){
            res.status(erro.code).json({Deletado: false, Erro: erro.constructor.name, Mensagem: erro.msg, Correção: erro.fix});
        } else if(erro.constructor.name == "Exception") {
            res.status(erro.code).json(erro.msg);
        } else {
            res.status(500).json({mensagem: `Ocorreu um erro ao atualizar os dados`, erro: erro.message});
        }
    }
});

//NÃO ESQUECER DE EXPORTAR O router

module.exports = router;