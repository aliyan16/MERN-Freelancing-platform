import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import gigRoutes from './routes/gigRoutes';
import orderRoutes from './routes/orderRoutes';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();
connectDB();

const app=express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

app.use(mongoSanitize());
app.use(helmet());
app.use(limiter);

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/gigs',gigRoutes);
app.use('/api/orders',orderRoutes);


const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})