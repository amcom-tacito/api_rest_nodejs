const router :any = require('express').Router();
const axios = require('axios');

router.get('/', async(req :any, res: any) => {

        /*
          #swagger.tags = ['Geral']
          #swagger.description = 'Detalhes de implementação'
          # swagger. summary = 'Some summary...'
        */

        res.status(200).json({saudacao: 'Oi, esta é a rota principal!'}); 
 } );

 router.get('/external', async(req :any, res :any) =>{
   //response é a resposta do axios e o json retornado está em response.data
   //Aplicamos o destructuring como abaixo
   const {data} = await axios('https://jsonplaceholder.typicode.com/users');

   return res.json(data);

 });

//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;