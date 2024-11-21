import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getElectrodomesticosByUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    const electrodomesticos = await prisma.electrodomestico.findMany({
      where: { usuarioId: parseInt(id) },
    });

    if (electrodomesticos.length === 0) {
      return res.status(404).json({ message: "No electrodomesticos found for this user" });
    }

    res.json(electrodomesticos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getElectrodomesticoById = async (req, res) => {
  const { id } = req.params;

  try {
    const electrodomestico = await prisma.electrodomestico.findUnique({
      where: { electrodomesticoId: parseInt(id) },
    });

    if (!electrodomestico) {
      return res.status(404).json({ error: "Electrodomestico not found" });
    }

    res.json({
      electrodomesticoId: electrodomestico.electrodomesticoId,
      usuarioId: electrodomestico.usuarioId,
      nombre: electrodomestico.nombre,
      tipo: electrodomestico.tipo,
      marca: electrodomestico.marca,
      modelo: electrodomestico.modelo,
      consumowatts: electrodomestico.consumowatts,
      descripcion: electrodomestico.descripcion,
      urlimagen: electrodomestico.urlimagen,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createElectrodomestico = async (req, res) => {
  const { usuarioId, nombre, tipo, marca, modelo, consumowatts, descripcion, urlimagen } = req.body;

  try {
    const electrodomestico = await prisma.electrodomestico.create({
      data: {
        usuarioId,
        nombre,
        tipo,
        marca,
        modelo,
        consumowatts,
        descripcion,
        urlimagen,
      },
    });

    res.json(electrodomestico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateElectrodomestico = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, marca, modelo, consumowatts, descripcion, urlimagen } = req.body;

  try {
    const electrodomestico = await prisma.electrodomestico.update({
      where: { electrodomesticoId: parseInt(id) },
      data: {
        nombre,
        tipo,
        marca,
        modelo,
        consumowatts,
        descripcion,
        urlimagen,
      },
    });

    res.json(electrodomestico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteElectrodomestico = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.electrodomestico.delete({
      where: { electrodomesticoId: parseInt(id) },
    });

    res.json({ message: "Electrodomestico deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
