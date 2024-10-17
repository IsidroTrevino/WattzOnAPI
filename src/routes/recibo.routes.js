import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recibo = await prisma.recibo.findUnique({
            where: {
                reciboId: parseInt(id)
            }
        });
    
        if (!recibo) {
            return res.status(404).json({ error: 'Recibo not found' });
        }
    
        res.json({
            reciboId: recibo.reciboId,
            usuarioId: recibo.usuarioId,
            fechainicioperiodo: recibo.fechainicioperiodo,
            fechafinperiodo: recibo.fechafinperiodo,
            consumo: recibo.consumo,
            monto: recibo.monto,
            tarifa: recibo.tarifa
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recibos = await prisma.recibo.findMany({
            where: {
                usuarioId: parseInt(id)
            }
        });

        if (recibos.length === 0) {
            return res.status(404).json({ message: 'No recibos found for this user' });
        }

        res.json(recibos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => {
    const { usuarioId, fechainicioperiodo, fechafinperiodo, consumo, monto, tarifa } = req.body;

    try {
        const recibo = await prisma.recibo.create({
            data: {
                usuarioId,
                fechainicioperiodo,
                fechafinperiodo,
                consumo,
                monto,
                tarifa
            }
        });

        res.json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { usuarioId, fechainicioperiodo, fechafinperiodo, consumo, monto, tarifa } = req.body;

    try {
        const recibo = await prisma.recibo.update({
            where: {
                reciboId: parseInt(id)
            },
            data: {
                usuarioId,
                fechainicioperiodo,
                fechafinperiodo,
                consumo,
                monto,
                tarifa
            }
        });

        res.json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recibo = await prisma.recibo.delete({
            where: {
                reciboId: parseInt(id)
            }
        });

        res.json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;