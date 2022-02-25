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
//// IMPORTANDO O ROUTER DO express
const router = require('express').Router();
//// IMPORTANDO AS DEPENDÊNCIAS APENAS DESTE ARQUIVO
const PessoaController_1 = __importDefault(require("../controllers/PessoaController"));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    PessoaController_1.default.getAll(req, res);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Recupera uma pessoa pelo seu ObjectId'
    */
    PessoaController_1.default.getById(req, res);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    PessoaController_1.default.create(req, res);
}));
//PUT = ATUALIZAÇÃO TOTAL & PATCH = ATUALIZAÇÃO PARCIAL
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Atualiza os dados de uma pessoa completamente'
    */
    PessoaController_1.default.updateByIdPUT(req, res);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    #swagger.tags = ['Pessoas']
    #swagger.description = 'Exclui uma pessoa'
    */
    PessoaController_1.default.delete(req, res);
}));
//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;
