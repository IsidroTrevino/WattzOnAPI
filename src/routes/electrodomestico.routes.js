import { Router } from "express";
import {
  getElectrodomesticosByUsuarioId,
  getElectrodomesticoById,
  createElectrodomestico,
  updateElectrodomestico,
  deleteElectrodomestico,
} from '../controllers/electrodomestico.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get("/usuario/:id", authenticateToken, getElectrodomesticosByUsuarioId);
router.get("/:id", authenticateToken, getElectrodomesticoById);
router.post("/", authenticateToken, createElectrodomestico);
router.put("/:id", authenticateToken, updateElectrodomestico);
router.delete("/:id", authenticateToken, deleteElectrodomestico);

export default router;