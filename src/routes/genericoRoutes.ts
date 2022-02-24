const router :any = require('express').Router();

router.get('/', async(req :any, res: any) => { 
        res.json({saudacao: 'Oi, esta é a rota principal!'}); 
 } );

//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;