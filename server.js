import express from 'express';
import database from './db.js';
import dotenv from 'dotenv';
import Router from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors';
dotenv.config();
database();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', Router);
app.use('/api/product', productRouter);
app.get('/' ,(req, res)=>{
    res.send("server found");
})
export default app;

