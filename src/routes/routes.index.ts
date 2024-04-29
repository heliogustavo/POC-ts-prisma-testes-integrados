import { Router } from 'express';
import { deletarBebida } from '../controller/deleteController';
import { addBebida } from '../controller/postBebida.controller';
import { listaDeBebidas } from '../controller/getListBebidas.controller';
import { atualizarBebida } from '../controller/editBebidas.controller';
import { validateAddBebida, validateAtualizarBebida } from '../middlewares/validationMiddleware';
import { getBebidaById } from '../controller/getBebidaById.controller';


const router = Router();

router.post('/add-bebida', validateAddBebida, addBebida);

router.get('/lista-de-bebidas', listaDeBebidas);

router.get('/bebidas-by-id/:id', getBebidaById);

router.put('/update/:id', validateAtualizarBebida, atualizarBebida);

router.delete('/delete/:id', deletarBebida);

export default router;


