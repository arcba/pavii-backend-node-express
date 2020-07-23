import { Router } from 'express';
import { AutenticacionController } from '../controllers/autenticacion.controller';
const router = Router();

router.post('/signup', AutenticacionController.signUp);
router.post('/signin', AutenticacionController.signIn);

export default router;