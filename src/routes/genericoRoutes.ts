const router :any = require('express').Router();

router.get('/', async(req :any, res: any) => {

        /*
          #swagger.tags = ['Geral']
          #swagger.description = 'Detalhes de implementação'
          # swagger. summary = 'Some summary...'
        */

        res.status(200).json({saudacao: 'Oi, esta é a rota principal!'}); 
 } );

//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;