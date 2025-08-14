import mongoose from "mongoose";

const gigSchema=new mongoose.Schema({
    sellerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:String,
    image:String,
    impressions:{type:Number,default:0},
    clicks:{type:Number,default:0},
    orders:{type:Number,default:0},
    cancellations:{type:Number,default:0}

})

export default mongoose.model('Gig',gigSchema)