import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import testRoute from './routes/testRoute.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Food Delivery Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders',orderRoutes);
