const mongoose=require('mongoose')

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('MongoDB connected')
    }catch(e){
        console.error('Failed to connect mongoDB: ',e)
        process.exit(1)
    }
}

export default connectDB