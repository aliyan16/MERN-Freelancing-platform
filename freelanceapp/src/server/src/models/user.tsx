import { timeStamp } from 'console'
import mongoose from 'mongoose'
import { Document,Schema } from 'mongoose'


export interface IUser extends Document {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    dob:string,
    gender:string,
    role:string,
}


const userSchema=new Schema<IUser>(
    {
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dob:{type:String,required:true},
    gender:{type:String,required:true},
    role:{type:String,required:true}
    },
    {

        timestamps:true
    }
)

export default mongoose.model<IUser>('User', userSchema)
