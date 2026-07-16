import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'
import beanRoutes from '../src/routes/bean.routes'

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/beans', beanRoutes)

export default app;