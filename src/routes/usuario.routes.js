import { Router } from 'express';
import {
  loginController,
  registerController,
  getUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/usuario.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/:id', authenticateToken, getUserController);
router.put('/:id', authenticateToken, updateUserController);
router.delete('/:id', authenticateToken, deleteUserController);

export default router;