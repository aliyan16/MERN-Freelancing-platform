import mongoose,{Document,Schema} from "mongoose";

// export interface IOrder extends Document{
//     buyer:mongoose.Types.ObjectId;
//     seller:mongoose.Types.ObjectId;
//     gig:mongoose.Types.ObjectId;
//     requirements:'';
//     image:'';
//     price:number;
//     status:'in-progress' | 'completed' | 'canceled';
//     createdAt:Date;
//     updatedAt:Date;
// }
const Schema= mongoose.Schema;

const orderSchema=new Schema(
    {
        buyer:{type:Schema.Types.ObjectId,ref:'User',required:true},
        seller:{type:Schema.Types.ObjectId,ref:'User',required:true},
        gig:{type:Schema.Types.ObjectId,ref:'Gig',required:true},
        requirements:{type:String,required:true},
        image:{type:String},
        price:{type:Number,required:true},
        status:{type:String,enum:['in-progress','completed','canceled'],default:'in-progress'},
        createdAt:{type:Date,default:Date.now},
        updatedAt:{type:Date,default:Date.now}
    },
    {timestamps:true}
)

export default mongoose.model<IOrder>('Order',orderSchema)