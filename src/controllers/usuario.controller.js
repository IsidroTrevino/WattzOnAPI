import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config.js'
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const loginController = async (req, res) => {
  const { email, password } = req.query;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || usuario.password !== hashedPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ usuarioId: usuario.usuarioId }, jwtSecret);

    res.json({
      token,
      usuario: {
        usuarioId: usuario.usuarioId,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        ciudad: usuario.ciudad,
        estado: usuario.estado,
        fecharegistro: usuario.fecharegistro,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const registerController = async (req, res) => {
    const { nombre, apellido, email, password, ciudad, estado } = req.body;
  
    try {
      if (!nombre || !apellido || !email || !password || !ciudad || !estado) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  
      const usuario = await prisma.usuario.create({
        data: { nombre, apellido, email, password: hashedPassword, ciudad, estado },
      });
  
      const token = jwt.sign({ usuarioId: usuario.usuarioId }, jwtSecret, { expiresIn: jwtExpiresIn });
  
      res.json({
        token,
        usuario: {
          usuarioId: usuario.usuarioId,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          ciudad: usuario.ciudad,
          estado: usuario.estado,
          fecharegistro: usuario.fecharegistro,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export const getUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { usuarioId: parseInt(id) },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      usuarioId: usuario.usuarioId,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      ciudad: usuario.ciudad,
      estado: usuario.estado,
      fecharegistro: usuario.fecharegistro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, ciudad, estado } = req.body;

  try {
    const usuario = await prisma.usuario.update({
      where: { usuarioId: parseInt(id) },
      data: { nombre, apellido, email, ciudad, estado },
    });

    res.json({
      usuarioId: usuario.usuarioId,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      ciudad: usuario.ciudad,
      estado: usuario.estado,
      fecharegistro: usuario.fecharegistro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (!usuario || usuario.usuarioId !== parseInt(id) || usuario.password !== hashedPassword) {
      return res.status(401).json({ error: 'Invalid email, password, or user ID' });
    }

    await prisma.usuario.delete({
      where: { usuarioId: parseInt(id) },
    });

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
