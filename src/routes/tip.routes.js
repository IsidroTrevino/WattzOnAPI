import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// router.get("/", authenticateToken, getTips);

export default router;