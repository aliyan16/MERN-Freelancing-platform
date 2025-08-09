import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import jobRoutes from './routes/job.routes'


dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())


app.use('/api/auth',authRoutes)
app.use('/api/routes',jobRoutes)


export default app