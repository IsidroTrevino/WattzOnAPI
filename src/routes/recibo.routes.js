import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get specific recibo by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recibo = await prisma.recibo.findUnique({
            where: { idRecibo: parseInt(id) },
            include: {
                concepto: {
                    include: { categoriaConcepto: true }
                }
            }
        });

        if (!recibo) {
            return res.status(404).json({ error: 'Recibo not found' });
        }

        res.json({
            idRecibo: recibo.idRecibo,
            usuarioId: recibo.usuarioId,
            LecturaActual: recibo.LecturaActual,
            LecturaAnterior: recibo.LecturaAnterior,
            InicioPeriodo: recibo.InicioPeriodo,
            FinPeriodo: recibo.FinPeriodo,
            Subtotal: recibo.Subtotal,
            conceptos: recibo.concepto.map(concepto => ({
                idConcepto: concepto.idConcepto,
                categoria: concepto.categoriaConcepto.Consumo,
                TotalPeriodo: concepto.TotalPeriodo,
                Precio: concepto.Precio
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all recibos for a specific user
router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recibos = await prisma.recibo.findMany({
            where: { usuarioId: parseInt(id) },
            include: {
                concepto: {
                    include: { categoriaConcepto: true }
                }
            }
        });

        if (recibos.length === 0) {
            return res.status(404).json({ message: 'No recibos found for this user' });
        }

        const formattedRecibos = recibos.map(recibo => ({
            idRecibo: recibo.idRecibo,
            usuarioId: recibo.usuarioId,
            LecturaActual: recibo.LecturaActual,
            LecturaAnterior: recibo.LecturaAnterior,
            InicioPeriodo: recibo.InicioPeriodo,
            FinPeriodo: recibo.FinPeriodo,
            Subtotal: recibo.Subtotal,
            conceptos: recibo.concepto.map(concepto => ({
                idConcepto: concepto.idConcepto,
                categoria: concepto.categoriaConcepto.Consumo,
                TotalPeriodo: concepto.TotalPeriodo,
                Precio: concepto.Precio
            }))
        }));

        res.json(formattedRecibos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => {
    const { usuarioId, LecturaActual, LecturaAnterior, InicioPeriodo, FinPeriodo, Subtotal, conceptos } = req.body;

    try {
        const recibo = await prisma.recibo.create({
            data: {
                usuarioId,
                LecturaActual,
                LecturaAnterior,
                InicioPeriodo: new Date(InicioPeriodo), // Ensure date format
                FinPeriodo: new Date(FinPeriodo),       // Ensure date format
                Subtotal,
                concepto: {
                    create: conceptos.map(concepto => ({
                        idCategoriaConcepto: concepto.idCategoriaConcepto,
                        TotalPeriodo: concepto.TotalPeriodo,
                        Precio: concepto.Precio
                    }))
                }
            },
            include: {
                concepto: true
            }
        });

        res.json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Update an existing recibo and its conceptos
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { usuarioId, LecturaActual, LecturaAnterior, InicioPeriodo, FinPeriodo, Subtotal, conceptos } = req.body;

    try {
        const recibo = await prisma.recibo.update({
            where: { idRecibo: parseInt(id) },
            data: {
                usuarioId,
                LecturaActual,
                LecturaAnterior,
                InicioPeriodo: new Date(InicioPeriodo),
                FinPeriodo: new Date(FinPeriodo),
                Subtotal,
                concepto: {
                    deleteMany: {}, // Remove existing conceptos
                    create: conceptos.map(concepto => ({
                        idCategoriaConcepto: concepto.idCategoriaConcepto,
                        TotalPeriodo: concepto.TotalPeriodo,
                        Precio: concepto.Precio
                    }))
                }
            },
            include: {
                concepto: true
            }
        });

        res.json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a recibo and its associated conceptos
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recibo = await prisma.recibo.delete({
            where: { idRecibo: parseInt(id) },
            include: {
                concepto: true
            }
        });

        res.json(recibo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
