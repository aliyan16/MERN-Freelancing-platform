import mongoose, { Schema, Document } from "mongoose";

export interface IGig extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  deliveryTime: number;
  image: string;
  imageUrl?: string;
  impressions: number;
  clicks: number;
  orders: number;
  cancellations: number;
}

const GigSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<IGig>("Gig", GigSchema);
