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
const router = require('express').Router();
const axios = require('axios');
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
      #swagger.tags = ['Geral']
      #swagger.description = 'Detalhes de implementação'
      # swagger. summary = 'Some summary...'
    */
    res.status(200).json({ saudacao: 'Oi, esta é a rota principal!' });
}));
router.get('/external', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //response é a resposta do axios e o json retornado está em response.data
    //Aplicamos o destructuring como abaixo
    const { data } = yield axios('https://jsonplaceholder.typicode.com/users');
    return res.json(data);
}));
//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;
