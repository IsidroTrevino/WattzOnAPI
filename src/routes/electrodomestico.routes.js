import { Router } from "express";
import {
  getElectrodomesticosByUsuarioId,
  getElectrodomesticoById,
  createElectrodomestico,
  updateElectrodomestico,
  deleteElectrodomestico,
} from '../controllers/electrodomestico.controller.js';

const router = Router();

router.get("/usuario/:id", getElectrodomesticosByUsuarioId);
router.get("/:id", getElectrodomesticoById);
router.post("/", createElectrodomestico);
router.put("/:id", updateElectrodomestico);
router.delete("/:id", deleteElectrodomestico);

export default router;
