import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReciboById = async (req, res) => {
  const { id } = req.params;

  try {
    const recibo = await prisma.recibo.findUnique({
      where: { idRecibo: parseInt(id) },
      include: {
        concepto: {
          include: { categoriaConcepto: true },
        },
      },
    });

    if (!recibo) {
      return res.status(404).json({ error: "Recibo not found" });
    }

    res.json({
      idRecibo: recibo.idRecibo,
      usuarioId: recibo.usuarioId,
      LecturaActual: recibo.LecturaActual,
      LecturaAnterior: recibo.LecturaAnterior,
      InicioPeriodo: recibo.InicioPeriodo,
      FinPeriodo: recibo.FinPeriodo,
      Subtotal: recibo.Subtotal,
      conceptos: recibo.concepto.map((concepto) => ({
        idConcepto: concepto.idConcepto,
        categoria: concepto.categoriaConcepto.Consumo,
        TotalPeriodo: concepto.TotalPeriodo,
        Precio: concepto.Precio,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRecibosByUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    const recibos = await prisma.recibo.findMany({
      where: { usuarioId: parseInt(id) },
      include: {
        concepto: {
          include: {
            categoriaConcepto: true,
          },
        },
      },
    });

    if (recibos.length === 0) {
      return res.status(404).json({ message: "No recibos found for this user" });
    }

    const formattedRecibos = recibos.map((recibo) => ({
      idRecibo: recibo.idRecibo,
      usuarioId: recibo.usuarioId,
      LecturaActual: recibo.LecturaActual,
      LecturaAnterior: recibo.LecturaAnterior,
      InicioPeriodo: recibo.InicioPeriodo,
      FinPeriodo: recibo.FinPeriodo,
      Subtotal: recibo.Subtotal,
      conceptos: recibo.concepto.map((concepto) => ({
        categoria: concepto.categoriaConcepto.Consumo,
        TotalPeriodo: concepto.TotalPeriodo,
        Precio: concepto.Precio,
      })),
    }));

    res.json(formattedRecibos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createRecibo = async (req, res) => {
  const {
    usuarioId,
    LecturaActual,
    LecturaAnterior,
    InicioPeriodo,
    FinPeriodo,
    Subtotal,
    conceptos,
  } = req.body;

  try {
    const recibo = await prisma.recibo.create({
      data: {
        usuarioId: parseInt(usuarioId),
        LecturaActual: parseInt(LecturaActual),
        LecturaAnterior: parseInt(LecturaAnterior),
        InicioPeriodo: new Date(InicioPeriodo),
        FinPeriodo: new Date(FinPeriodo),
        Subtotal: parseFloat(Subtotal),
        concepto: {
          create: conceptos.map((concepto) => ({
            idCategoriaConcepto: parseInt(concepto.idCategoriaConcepto),
            TotalPeriodo: parseInt(concepto.TotalPeriodo),
            Precio: parseFloat(concepto.Precio),
          })),
        },
      },
      include: { concepto: true },
    });

    res.json(recibo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRecibo = async (req, res) => {
  const { id } = req.params;
  const {
    usuarioId,
    LecturaActual,
    LecturaAnterior,
    InicioPeriodo,
    FinPeriodo,
    Subtotal,
    conceptos,
  } = req.body;

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
          create: conceptos.map((concepto) => ({
            idCategoriaConcepto: concepto.idCategoriaConcepto,
            TotalPeriodo: concepto.TotalPeriodo,
            Precio: concepto.Precio,
          })),
        },
      },
      include: { concepto: true },
    });

    res.json(recibo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRecibo = async (req, res) => {
  const { id } = req.params;

  try {
    const recibo = await prisma.recibo.delete({
      where: { idRecibo: parseInt(id) },
      include: { concepto: true },
    });

    res.json(recibo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
