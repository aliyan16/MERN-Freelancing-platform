import mongoose from "mongoose"
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('Mongo connected')
    }catch(e){

        console.error('Error connecting to MongoDB:', e)
        process.exit(1) 
    }
}

export default connectDB