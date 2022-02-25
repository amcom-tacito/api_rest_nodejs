//// IMPORTANDO O ROUTER DO express
const router :any = require('express').Router();

//// IMPORTANDO AS DEPENDÊNCIAS APENAS DESTE ARQUIVO
import PessoaController from '../controllers/PessoaController';

router.get('/', async(req :any, res: any) => { 
    /*
        #swagger.tags = ['Pessoas']
        #swagger.description = 'Recupera todas as pessoas getAll()'
        # swagger. parameters['obj'] = {
            in: 'body',
            description: 'Some description...',
            schema: {
                $name: 'Jhon Doe',
                $age: 29,
                $about: ''
            }
        }
        #swagger. security = [{
            "OAuth2": [
                'read', 
                'write'
            ]
        }]
        # swagger. requestBody = {
              required: true,
              content: {
                "application/json": {
                    schema:{
                        oneOf: [
                            {
                                $ref: "#/definitions/SomeSchema1",
                            },
                            {
                                $ref: "#/definitions/SomeSchema2"
                            }
                        ]
                    }
                }           
            }
          }
        # swagger. responses[200] = {
            description: "Some description... OpenAPI 3.x",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/User"
                    }
                }           
            }
        }
        # swagger. operationId = 'Your_operationId_here'
        # swagger. summary = 'Some summary...'
        */
       PessoaController.getAll(req, res) 
    } );

router.get('/:id', async (req :any, res :any) => {  
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Recupera uma pessoa pelo seu ObjectId'
    */
    PessoaController.getById(req, res) } );
    
router.post('/', async (req :any, res :any) => { 
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Cadastra uma nova pessoa'
    #swagger.requestBody = {
        $ref: "#/components/requestBodies/PostPessoa"           
    }
    #swagger.responses[201] = {
        $ref: "#/components/responses/PostPessoaCriada"
    }
    #swagger.responses[412] = {
        $ref: "#/components/responses/PostDadosIncompletos"
    }
    #swagger.responses[422] = {
        $ref: "#/components/responses/PostTiposErrados"
    }
    
    */
    PessoaController.create(req, res) });


//PUT = ATUALIZAÇÃO TOTAL & PATCH = ATUALIZAÇÃO PARCIAL
router.put('/:id', async (req :any, res :any) => {  
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Atualiza os dados de uma pessoa completamente'
    */
    PessoaController.updateByIdPUT(req, res) });

router.delete('/:id', async (req :any, res :any) => {  
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Exclui uma pessoa'
    */
    PessoaController.delete(req, res) } );

//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;