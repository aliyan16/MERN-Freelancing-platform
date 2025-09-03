import mongoose,{Document,Schema} from "mongoose";

export interface IOrder extends Document{
    buyer:mongoose.Types.ObjectId;
    seller:mongoose.Types.ObjectId;
    gig:mongoose.Types.ObjectId;
    price:number;
    status:'in-progress' | 'completed' | 'canceled';
    createdAt:Date;
    updatedAt:Date;
}

const orderSchema=new Schema<IOrder>(
    {
        buyer:{type:Schema.Types.ObjectId,ref:'User',required:true},
        seller:{type:Schema.Types.ObjectId,ref:'User',required:true},
        gig:{type:Schema.Types.ObjectId,ref:'Gig',required:true},
        price:{type:Number,required:true},
        status:{type:String,enum:['in-progress','completed','canceled'],required:true},
        createdAt:{type:Date,default:Date.now},
        updatedAt:{type:Date,default:Date.now}
    },
    {timestamps:true}
)

export default mongoose.model<IOrder>('Order',orderSchema)