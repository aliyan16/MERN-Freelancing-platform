import mongoose, { Schema, Document } from "mongoose";

// export interface IGig extends Document {
//   sellerId: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   deliveryTime: number;
//   image: string;
//   imageUrl?: string;
//   impressions: number;
//   clicks: number;
//   orders: number;
//   cancellations: number;
//   status: "active" | "paused" | "pending" | "draft" | "denied";
// }
// const Schema=mongoose.Schema;

const GigSchema= new Schema(
  {
    sellerId:{type:String,required:true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    image: { type: String, required: false },
    // imageUrl:{type:String,required:false},
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    cancellations: { type: Number, default: 0 },
    status:{type:String,enum:['active','paused','pending','draft','denied'],default:'active'}
  },
  { timestamps: true }
);

GigSchema.index({status:1,createdAt:-1});
GigSchema.index({status:1,category:1,createdAt:-1});

export default mongoose.model("Gig", GigSchema);
