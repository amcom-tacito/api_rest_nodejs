
const doc = {
    info: {
        version: '1.4.0',      // by default: '1.0.0'
        title: 'Rest API (Nodejs x Typescript x MongoDB)',        // by default: 'REST API'
        description: 'API de teste para aprendizado da stack utilizada',  // by default: ''
    },
    host: 'localhost:3000',      // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: ['http'],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
        /*{
            name: 'TESTE',         // Tag name
            description: 'DESC TESTE',  // Tag description
        },*/
        // { ... }
    ],
    //securityDefinitions: {},  // by default: empty object (Swagger 2.0)
    /*securityDefinitions: {
        OAuth2: {
            type: 'oauth2',
            flows: {
                authorizationCode: {
                    authorizationUrl: 'https://example.com/oauth/authorize',
                    tokenUrl: 'https://example.com/oauth/token',
                    scopes: {
                        read: 'Grants read access',
                        write: 'Grants write access',
                        admin: 'Grants access to admin operations'
                    }
                }
            }
        }
    },*/
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    definitions: {}, // by default: empty object (OpenAPI 3.x)
    components: {
        schemas: {
            "pessoa":{
                "nome": "João Silva",
                "salario": 1000.00,
                "ativo": true
            },
        },
        examples: {
            "pessoa": {
                "summary": "Model Pessoa",
                "value": {
                    "nome": "João Silva",
                    "salario": 1000.00,
                    "ativo": true
                }
            }
        },
        requestBodies: {
            "PostPessoa":{
                "description": "Pessoa para adicionar ao sistema",
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            $ref: "#/components/schemas/pessoa"
                        },
                        "example": {
                            "nome": "João Silva",
                            "salario": 1000.00,
                            "ativo": true
                        }
                    }
                }
            }
        },
        responses: {
            "PostPessoaCriada": {
                "description": "Pessoa criada com sucesso!",
                "content": {
                    "application/json": {
                        "example": {
                            "message": "Pessoa criada com sucesso!",
                            "dados": [{
                                "nome": "João Silva",
                                "salario": 1000.00,
                                "ativo": true
                            }]
                        }
                    }           
                }
            },
            "PostDadosIncompletos": {
                "description": "Dados incompletos",
                "content": {
                    "application/json": {
                        "example": {
                            "Criado": false,
                            "Erro": "FieldException",
                            "Mensagem": "O <field> do usuário é obrigatório",
                            "Correção": "Insira um valor: <field>: <string>"
                        }
                    }           
                }
            },
            "PostTiposErrados":{
                "description": "Dados com tipagens erradas",
                "content": {
                    "application/json": {
                        "example": {
                            "Criado": false,
                            "Erro": "FieldException",
                            "Mensagem": "O <field> do usuário é obrigatório",
                            "Correção": "O tipo inserido (<typeInserted>) não é aceito. O Correto é: <field>: <SchemaType>"
                        }
                    }           
                }
            }
        }
    } // by default: empty object
};

const options = {
    openapi: '3.0.3',          // Enable/Disable OpenAPI. By default is null
    language: 'pt-BR',         // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: true,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: true,       // Enable/Disable automatic query capture. By default is true
    autoBody: true         // Enable/Disable automatic body capture. By default is true
}

const swaggerAutogen = require('swagger-autogen')(options);

const outputFile = './dist/swagger/swagger_output.json';

const endpointsFiles = ['./dist/index'];

//swaggerAutogen(outputFile, endpointsFiles);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index'); // Your project's root file
});