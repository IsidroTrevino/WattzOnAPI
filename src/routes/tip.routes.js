import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
router.get('/', (req, res) => {
    res.send('Hello World');
});

export default router;