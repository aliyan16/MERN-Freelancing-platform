import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import redisClient from "../../utilities/redisClient";



const registerUser=async(req:Request,res:Response)=>{
    try{
        const {firstName,lastName,email,password,dob,gender,role}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const saltRound=10
        const hashedPassword=await bcrypt.hash(password,saltRound);
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            dob,
            gender,
            role
        });
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET as string,{expiresIn:"1h"});
        await redisClient.setEx(`jwt_${user._id}`,3600,token)

        res.json({
            user:{id:user._id,name:`${user.firstName} ${user.lastName}`,role:user.role},
            token
        })
    }catch(e){
        res.status(500).json({message:"Error while registering user"})
    }
}

const loginUser=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET as string,{expiresIn:'1h'})
        await redisClient.setEx(`jwt_${user._id}`,3600,token)
        res.json({
            user:{id:user._id,name:`${user.firstName} ${user.lastName}`,role:user.role},
            token
        })
    }catch(e){
        res.status(500).json({message:"Error while logging in"})
    }
}
const logoutUser=async(req:Request,res:Response)=>{
    await redisClient.del(`jwt_${(req as any).userId}`);
    res.json({message:'Logged out successfully'})
}
export { registerUser, loginUser, logoutUser }