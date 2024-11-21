import { Router } from "express";
import {
  getReciboById,
  getRecibosByUsuarioId,
  createRecibo,
  updateRecibo,
  deleteRecibo,
} from '../controllers/recibo.controller.js';

const router = Router();

router.get("/:id", getReciboById);
router.get("/usuario/:id", getRecibosByUsuarioId);
router.post("/add", createRecibo);
router.put("/:id", updateRecibo);
router.delete("/:id", deleteRecibo);

export default router;
