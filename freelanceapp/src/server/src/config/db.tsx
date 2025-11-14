import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()
const connectDB=async()=>{
    try{
        console.log("Attempting to connect to:", process.env.MONGO_URL?.substring(0, 25) + "...");

        if (!process.env.MONGO_URL) {

            throw new Error("MongoDB connection string is missing!");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongo connected')
    }catch(e){

        console.error('Error connecting to MongoDB:', e)
        process.exit(1) 
    }
}

export default connectDB