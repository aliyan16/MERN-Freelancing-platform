import mongoose, {Schema,Document} from "mongoose";



export interface IBid{
    freelancerId:string;
    amount:number;
    proposal:string;
    status:'pending'|'accepted'|'rejected'
}

export interface IJob extends Document{
    clientId:string;
    title:string;
    description:string;
    budget:number;
    bids:IBid[];
    status:'open'|'in-progress'|'completed'
}

const BidSchema=new Schema<IBid>({
    freelancerId:{type:String,required:true},
    amount:Number,
    proposal:String,
    status:{type:String,enum:['pending','accepted','rejected'],default:'pending'}

})

const JobSchema=new Schema<IJob>({
    clientId:{type:String,required:true},
    title:String,
    description:String,
    budget:Number,
    bids:[BidSchema],
    status:{type:String,enum:['open','in-progress','completed'],default:'open'}
})


export default mongoose.model<IJob>('Job',JobSchema)