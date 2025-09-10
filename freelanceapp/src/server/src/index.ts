import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import gigRoutes from './routes/gigRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();
connectDB();

const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/gigs',gigRoutes);
app.use('/api/orders',orderRoutes);


const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})