//// IMPORTANDO O ROUTER DO express
const router :any = require('express').Router();

//// IMPORTANDO AS DEPENDÊNCIAS APENAS DESTE ARQUIVO
import PessoaController from '../controllers/PessoaController';

router.get('/', async(req :any, res: any) => { PessoaController.getAll(req, res) } );
router.post('/', async (req :any, res :any) => { PessoaController.create(req, res) });
router.get('/:id', async (req :any, res :any) => { PessoaController.getById(req, res) } );
//PUT = ATUALIZAÇÃO TOTAL & PATCH = ATUALIZAÇÃO PARCIAL
router.put('/:id', async (req :any, res :any) => { PessoaController.updateByIdPUT(req, res) });
router.delete('/:id', async (req :any, res :any) => { PessoaController.delete(req, res) } );

//NÃO ESQUECER DE EXPORTAR O router
module.exports = router;