//// IMPORTANDO O ROUTER DO express
const router = require('express').Router();

//// IMPORTANDO AS DEPENDÊNCIAS APENAS DESTE ARQUIVO
const Pessoa = require('../models/Pessoa'); //Não preciso colocar a extensão
const FieldException = require('../models/FieldException'); //Não preciso colocar a extensão
const Exception = require('../models/Exception'); //Não preciso colocar a extensão

router.get('/', async (req, res) =>{
    try{       
        const pessoas = await Pessoa.find(); 
        res.status(200).json(pessoas);
    } catch (err){
        res.status(500).json({mensagem: `Ocorreu um erro ao buscar os dados`, erro: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const pessoa = await Pessoa.findOne({_id: id});

        if(!pessoa){
            throw new Exception(404, {mensagem: `Cadastro não encontrado`, filtro:{id}});
        }

        res.status(200).json(pessoa);
    } catch (err){
        if(err.code >= 400 || err.code <= 499){
            res.status(err.code).json(err.msg);
        } else{
            res.status(500).json({mensagem: `Ocorreu um erro ao buscar os dados`, erro: err.message});
        }
    }
});

router.post('/', async (req, res) => { //garantimos a função como assíncrona para esperarmos o DB
    try{
        const { nome, salario, ativo } = req.body //destructuring
        const varToString = varObj => Object.keys(varObj)[0]
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
	    const pessoa = { nome, salario, ativo };
        //criando dados
        await Pessoa.create(pessoa);
        res.status(201).json({
            mensagem: 'Pessoa criada com sucesso!', 
            dados: [
                { 
                    nome: pessoa.nome,
                    salario: pessoa.salario,
                    ativo: pessoa.ativo
                }
            ]
        });
    } catch (erro){
        res.status(erro.code).json({Erro: erro.msg, Correção: erro.fix});
    }
});

//PUT = ATUALIZAÇÃO TOTAL & PATCH = ATUALIZAÇÃO PARCIAL
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const {nome, salario, ativo} = req.body;
    const pessoaUp = {nome, salario, ativo};
    try {
        //Verificar no banco se a pessoa existe
        const id = req.params.id;
        const pessoa = await Pessoa.findOne({_id: id});
        if(!pessoa){
            throw new Exception(404, {mensagem: `Cadastro não encontrado`, filtro:{id}});
        }

        //Se existe, alteramos
        const upPessoa = await Pessoa.updateOne({_id:id}, pessoaUp, {"upsert": true});
        const pessoaUpted = await Pessoa.findOne({_id:id});
        
        //Se foi alterada, retornar os dados.
        if(upPessoa.modifiedCount > 0){
            res.status(200).json({
                mensagem: 'Cadastro atualizado com sucesso!', 
                retorno: [upPessoa],
                dados:[pessoaUpted]
            });
        } else {
            throw new Exception(422, {mensagem: "Cadastro não atualizado. Sem dados novos."}); 
        }
    } catch (err){
        //console.log(err);
        if(err.code >= 400 || err.code <= 499){
            res.status(err.code).json(err.msg);
        } else{
            res.status(500).json({mensagem: `Ocorreu um erro ao atualizar os dados`, erro: err.message});
        }
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
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
    } catch (err){
        if(err.code >= 400 || err.code <= 499){
            res.status(err.code).json(err.msg);
        } else{
            res.status(500).json({mensagem: err.msg});
        }
    }
});

//NÃO ESQUECER DE EXPORTAR O router

module.exports = router;