import { Router } from "express";
import { getReciboById, getRecibosByUsuarioId, createRecibo, updateRecibo, deleteRecibo } from '../controllers/recibo.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get("/:id", authenticateToken, getReciboById);
router.get("/usuario/:id", authenticateToken, getRecibosByUsuarioId);
router.post("/add", authenticateToken, createRecibo);
router.put("/:id", authenticateToken, updateRecibo);
router.delete("/:id", authenticateToken, deleteRecibo);

export default router;