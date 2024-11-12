import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';
import tipRoutes from './routes/tip.routes.js';
import reciboRoutes from './routes/recibo.routes.js';
import electrodomesticoRoutes from './routes/electrodomestico.routes.js';

const app = express();

app.use(express.json());

app.use('/api/wattzon/usuario', usuarioRoutes);
app.use('/api/wattzon/tip', tipRoutes);
app.use('/api/wattzon/recibo', reciboRoutes);
app.use('/api/wattzon/electrodomestico', electrodomesticoRoutes);

app.listen(3000);

console.log('Server on port', 3000);