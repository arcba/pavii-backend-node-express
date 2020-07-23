import { Router } from 'express';
import { ArticulosFamiliasController } from '../controllers/articulosfamilias.controller';

const router = Router();
router.get('/articulosfamilias', ArticulosFamiliasController.getArticulosFamilias);

export default router;