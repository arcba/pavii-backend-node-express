import { Router } from 'express';
import { ArticulosController } from '../controllers/articulos.controller';

const router = Router();
router.get('/articulos', ArticulosController.getArticulos);
router.get('/articulos/:id', ArticulosController.getArticulosById);
router.post('/articulos', ArticulosController.postArticulos);
router.put('/articulos/:id', ArticulosController.putArticulos);
router.delete('/articulos/:id', ArticulosController.putArticulosActivarDesactivar)

export default router;