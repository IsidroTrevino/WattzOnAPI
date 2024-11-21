import { Router } from 'express';
import {
  loginController,
  registerController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/usuario.controller.js';

const router = Router();

router.get('/login', loginController);
router.post('/register', registerController);
router.get('/:id', getUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
