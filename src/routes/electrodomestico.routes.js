import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const electrodomesticos = await prisma.electrodomestico.findMany({
            where: {
                usuarioId: parseInt(id)
            }
        });

        if (electrodomesticos.length === 0) {
            return res.status(404).json({ message: 'No electrodomesticos found for this user' });
        }

        res.json(electrodomesticos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const electrodomestico = await prisma.electrodomestico.findUnique({
            where: {
                electrodomesticoId: parseInt(id)
            }
        });

        if (!electrodomestico) {
            return res.status(404).json({ error: 'Electrodomestico not found' });
        }

        res.json({
            electrodomesticoId: electrodomestico.electrodomesticoId,
            usuarioId: electrodomestico.usuarioId,
            nombre: electrodomestico.nombre,
            descripcion: electrodomestico.descripcion,
            potencia: electrodomestico.potencia,
            horasuso: electrodomestico.horasuso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const {usuarioId, nombre, tipo, consumoWatts, descripcion, urlimagen} = req.body;

    try {
        const electrodomestico = await prisma.electrodomestico.create({
            data: {
                usuarioId,
                nombre,
                tipo,
                consumoWatts,
                descripcion,
                urlimagen
            }
        });

        res.json(electrodomestico);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, consumoWatts, descripcion, urlimagen } = req.body;

    try {
        const electrodomestico = await prisma.electrodomestico.update({
            where: {
                electrodomesticoId: parseInt(id)
            },
            data: {
                nombre,
                tipo,
                consumoWatts,
                descripcion,
                urlimagen
            }
        });

        res.json(electrodomestico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.electrodomestico.delete({
            where: {
                electrodomesticoId: parseInt(id)
            }
        });

        res.json({ message: 'Electrodomestico deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;